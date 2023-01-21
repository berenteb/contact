import { NextApiRequest, NextApiResponse } from "next";

import createContactHandler from "@/handlers/createContact";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const contact = await createContactHandler(req);
        return res.status(200).json({ contact });
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
