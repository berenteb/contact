import process from "process";
import fs from "fs";
import { S3 } from "aws-sdk";
import formidable from "formidable";

const s3 = new S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_IAM_SECRET || "",
  },
  signatureVersion: "v4",
});

async function s3Upload(file: formidable.File) {
  const uploaded = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: file.newFilename,
      Body: fs.readFileSync(file.filepath),
    })
    .promise();
  fs.rmSync(file.filepath);
  return uploaded.Location;
}

export default s3Upload;
