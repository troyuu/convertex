import BaseConverter from './BaseConverter.js';
import Tesseract from 'tesseract.js';
import { writeFile } from 'fs/promises';

export default class ImageToWordConverter extends BaseConverter {
  constructor() {
    super('image-to-word');
  }

  getOutputExtension() {
    return '.docx';
  }

  async convert(inputPath, outputPath) {
    const { data: { text } } = await Tesseract.recognize(inputPath, 'eng');

    // Build a simple docx with the extracted text
    const { Document, Packer, Paragraph, TextRun } = await import('docx');
    const doc = new Document({
      sections: [{
        properties: {},
        children: text.split('\n').filter(line => line.trim()).map(line =>
          new Paragraph({ children: [new TextRun(line)] })
        ),
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    await writeFile(outputPath, buffer);
  }
}
