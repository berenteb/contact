"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { string, object } from "yup";
import { Contact } from "@prisma/client";

import { useForm } from "react-hook-form";
import { useCreateContact } from "@/network/useCreateContact.network";
import { FileUpload } from "@/app/components/file-upload/FileUpload";
import { ContactImage } from "@/app/components/contact-image/ContactImage";
import { useUpdateContact } from "@/network/useUpdateContact.network";
import { Button } from "@/app/components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { classNames } from "@/utils/classNames";

import Plus from "@/app/assets/plus.svg";
import Trash from "@/app/assets/trash.svg";
import Replace from "@/app/assets/replace.svg";

import styles from "./Modal.module.css";

const formValidation = object({
  name: string().required(),
  phone: string()
    .matches(/\+?\d{10,11}/)
    .required(),
  email: string().email().required(),
});

interface ModalProps {
  contact?: Contact;
  onClose: () => void;
}

type ContactForm = Omit<Contact, "id" | "imageUrl">;

export function Modal({ contact, onClose }: ModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(contact?.imageUrl);
  const createContact = useCreateContact();
  const updateContact = useUpdateContact(contact?.id || 0);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const { register, handleSubmit } = useForm<ContactForm>({
    defaultValues: {
      name: contact?.name,
      phone: contact?.phone,
      email: contact?.email,
    },
    resolver: yupResolver(formValidation),
  });

  const onSubmit = (values: ContactForm) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append("image", file);
    } else if (!imageUrl) {
      data.append("image", "");
    }
    if (contact) {
      updateContact.makeRequest(data, () => {
        onClose();
        router.refresh();
      });
    } else {
      createContact.makeRequest(data, () => {
        onClose();
        router.refresh();
      });
    }
  };

  const onFileChange = (file?: File) => {
    if (file) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      setFile(undefined);
      setImageUrl(undefined);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
        <h2>{contact ? "Edit" : "Add"} contact</h2>
        <div className={styles.imageSelector}>
          <ContactImage imageUrl={imageUrl} />
          <div className={styles.buttonGroup}>
            <FileUpload
              ref={inputRef}
              name="image"
              style={{ marginRight: imageUrl ? undefined : "25px" }}
              icon={imageUrl ? <Replace /> : <Plus />}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) onFileChange(selectedFile);
              }}
            >
              {imageUrl ? "Change picture" : "Add picture"}
            </FileUpload>
            <Button
              icon={<Trash />}
              type="button"
              style={{ visibility: imageUrl ? "visible" : "hidden" }}
              onClick={() => onFileChange()}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name")} placeholder="Jamie Wright" />
        </div>
        <div>
          <label htmlFor="phone">Phone number</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+01 23 456 7890"
          />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="jamie.wright@mail.com"
          />
        </div>
        <div
          className={classNames(styles.buttonGroup, styles.footerNavigation)}
        >
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Done</button>
        </div>
      </form>
    </div>
  );
}
