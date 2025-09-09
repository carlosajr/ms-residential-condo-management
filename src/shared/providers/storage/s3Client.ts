import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  tls: true,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
