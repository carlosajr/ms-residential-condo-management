import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import { s3 } from './s3Client';

export async function uploadToS3(buffer: Buffer, filename: string, folder = ''): Promise<string> {
  const key = `${folder ? `${folder}/` : ''}${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/jpeg',
    ContentLength: buffer.length, // <- Essencial!
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`;
}

export async function uploadToS3Webp(
  buffer: Buffer,
  filename: string,
  folder = '',
): Promise<string> {
  const key = `${folder ? `${folder}/` : ''}${Date.now()}-${filename.replace(/\.[^.]+$/, '')}.webp`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/webp',
    ContentLength: buffer.length, // <- Essencial!
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${key}`;
}

export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
  });

  await s3.send(command);
}
