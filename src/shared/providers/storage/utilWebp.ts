import heicConvert from 'heic-convert';
import sharp from 'sharp';

export async function convertToWebP(buffer: Buffer, mimetype: string = ''): Promise<Buffer> {
  let bufferConvert = buffer;
  if (mimetype === 'image/heic') {
    bufferConvert = (await heicConvert({
      buffer,
      format: 'JPEG',
      quality: 1,
    })) as Buffer;
  }

  return sharp(bufferConvert)
    .webp({ quality: 50 }) // ajustável entre 0-100
    .toBuffer();
}

/**
 * Converte qualquer imagem para WebP com compressão **sem perda**.
 */
export async function convertToLosslessWebP(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .webp({ lossless: true }) // <-- essa opção garante 100% de fidelidade
    .toBuffer();
}
