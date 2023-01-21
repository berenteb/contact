import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

import generateRandomString from "@/utils/randomString";

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.cwd(), `/uploads/`);
    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 1,
      maxFileSize: 10 * 1024 * 1024,
      uploadDir,
      filename: (_name, _ext, part) => {
        return `${generateRandomString(10)}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
      },
      filter: (part) => {
        return (
          part.name === "image" && (part.mimetype?.includes("image") || false)
        );
      },
    });
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
