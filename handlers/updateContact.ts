import { NextApiRequest } from "next";

import { Contact } from "@prisma/client";

import { parseForm } from "@/utils/parse-form";
import { firstField } from "@/utils/firstField";
import { updateContact } from "@/prisma/contacts";
import s3Upload from "@/utils/s3Upload";

const updateContactHandler = async (
  req: NextApiRequest
): Promise<Contact | undefined> => {
  const { contactId } = req.query;
  const { files, fields } = await parseForm(req);
  const file = firstField(files.image);
  let uploadedFilePath;
  if (file) {
    uploadedFilePath = await s3Upload(file);
  }
  const updateFields: Partial<Contact> & { id: number } = {
    id: parseInt(firstField(contactId || "")),
    name: firstField(fields.name),
    email: firstField(fields.email),
    phone: firstField(fields.phone),
  };
  if (typeof fields.image !== "undefined") {
    updateFields.imageUrl = null;
  } else if (uploadedFilePath) {
    updateFields.imageUrl = uploadedFilePath;
  }
  const updatedContact = await updateContact(updateFields);
  return updatedContact?.contact;
};

export default updateContactHandler;
