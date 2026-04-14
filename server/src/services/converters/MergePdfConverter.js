import BaseConverter from './BaseConverter.js';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

export default class MergePdfConverter extends BaseConverter {
  constructor() {
    super('merge-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async execute(jobId) {
    const { getJobDir } = await import('../../utils/tempManager.js');
    const jobDir = await getJobDir(jobId);
    const files = await readdir(jobDir);
    const pdfFiles = files.filter(f => f.endsWith('.pdf')).sort();

    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const pdfBytes = await readFile(join(jobDir, file));
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const outputPath = join(jobDir, 'output.pdf');
    const mergedBytes = await mergedPdf.save();
    await writeFile(outputPath, mergedBytes);

    return { outputPath, outputFilename: 'output.pdf' };
  }
}
