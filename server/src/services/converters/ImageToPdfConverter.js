import BaseConverter from './BaseConverter.js';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';

export default class ImageToPdfConverter extends BaseConverter {
  constructor() {
    super('image-to-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath) {
    const imageBuffer = await readFile(inputPath);
    const metadata = await sharp(imageBuffer).metadata();
    const pngBuffer = await sharp(imageBuffer).png().toBuffer();

    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(pngBuffer);
    const page = pdfDoc.addPage([metadata.width, metadata.height]);
    page.drawImage(pngImage, { x: 0, y: 0, width: metadata.width, height: metadata.height });

    const pdfBytes = await pdfDoc.save();
    await writeFile(outputPath, pdfBytes);
  }
}
