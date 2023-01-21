import { NextApiRequest, NextApiResponse } from "next";

import { deleteContact } from "@/prisma/contacts";
import { firstField } from "@/utils/firstField";
import updateContactHandler from "@/handlers/updateContact";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contactId } = req.query;
  if (!contactId)
    return res.status(400).json({ error: "Contact ID is missing" });
  try {
    switch (req.method) {
      case "DELETE":
        const deletedContact = await deleteContact(firstField(contactId));
        return res.status(200).json({ contact: deletedContact });
      case "PATCH":
        const patchedContact = await updateContactHandler(req);
        return res.status(200).json({ contact: patchedContact });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
