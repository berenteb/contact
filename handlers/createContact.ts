import { NextApiRequest } from "next";

import { Contact } from "@prisma/client";

import { parseForm } from "@/utils/parse-form";
import { firstField } from "@/utils/firstField";
import { createContact } from "@/prisma/contacts";
import s3Upload from "@/utils/s3Upload";

const createContactHandler = async (
  req: NextApiRequest
): Promise<Contact | undefined> => {
  const { files, fields } = await parseForm(req);
  const file = firstField(files.image);
  let uploadedFilePath;
  if (file) {
    uploadedFilePath = await s3Upload(file);
  }
  const newContact = await createContact({
    name: firstField(fields.name),
    email: firstField(fields.email),
    phone: firstField(fields.phone),
    imageUrl: uploadedFilePath || null,
  });
  return newContact?.contact;
};

export default createContactHandler;
