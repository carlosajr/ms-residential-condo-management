import sharp from 'sharp';

export async function compressImage(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer)
    .jpeg({ quality: 80 }) // compressão
    .toBuffer();
}
