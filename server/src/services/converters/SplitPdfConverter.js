import BaseConverter from './BaseConverter.js';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { createWriteStream } from 'fs';

export default class SplitPdfConverter extends BaseConverter {
  constructor() {
    super('split-pdf');
  }

  getOutputExtension() {
    return '.zip';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    const pdfBytes = await readFile(inputPath);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();

    const archiver = (await import('archiver')).default;
    const output = createWriteStream(outputPath);
    const archive = archiver('zip');
    archive.pipe(output);

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);
      const pageBytes = await newPdf.save();
      archive.append(Buffer.from(pageBytes), { name: `page-${i + 1}.pdf` });
    }

    await archive.finalize();
    await new Promise(resolve => output.on('close', resolve));
  }
}
