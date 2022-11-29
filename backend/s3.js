import * as dotenv from "dotenv";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";

dotenv.config();

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: { accessKeyId: AWS_PUBLIC_KEY, secretAccessKey: AWS_SECRET_KEY },
});

async function uploadFile(file) {
  console.log(file);
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);

  return await client.send(command);
}
async function getFile(fileName) {
  console.log(fileName);
  const getParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
  };

  const command = new GetObjectCommand(getParams);

  const result = await client.send(command);

  result.Body.pipe(fs.createWriteStream("./images/test.jpg"));
}
export { uploadFile, getFile };
