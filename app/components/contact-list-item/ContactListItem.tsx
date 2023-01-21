"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Contact } from ".prisma/client";
import { classNames } from "@/utils/classNames";
import { Modal } from "@/app/components/modal/Modal";
import { Popover } from "@/app/components/popover/Popover";
import { ContactImage } from "@/app/components/contact-image/ContactImage";
import { useDeleteContact } from "@/network/useDeleteContact.network";
import { Button } from "@/app/components/button/Button";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

import Mute from "@/app/assets/mute.svg";
import Headphone from "@/app/assets/headphone.svg";
import Settings from "@/app/assets/settings.svg";
import Heart from "@/app/assets/heart.svg";
import Trash from "@/app/assets/trash.svg";

import styles from "./ContactListItem.module.css";

interface ContactListItemProps {
  contact: Contact;
}

export function ContactListItem({ contact }: ContactListItemProps) {
  const { makeRequest } = useDeleteContact(contact.id);
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.contactListItem}>
      {open && <Modal onClose={() => setOpen(false)} contact={contact} />}
      <div className={styles.contactListItemContent}>
        <ContactImage imageUrl={contact.imageUrl} size={40} />
        <div>
          <h3>{contact.name}</h3>
          <p className={classNames("message", styles.contactListItemMessage)}>
            {formatPhoneNumber(contact.phone)}
          </p>
        </div>
      </div>
      <div className={styles.contactListItemButtons}>
        <Button icon={<Mute />} variant="secondary" />
        <Button icon={<Headphone />} variant="secondary" />
        <Popover>
          <Button
            className="popoverButton"
            icon={<Settings />}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <Button icon={<Heart />} className="popoverButton">
            Favourite
          </Button>
          <Button
            icon={<Trash />}
            className="popoverButton"
            onClick={() => {
              makeRequest(undefined);
              refresh();
            }}
          >
            Remove
          </Button>
        </Popover>
      </div>
    </div>
  );
}
