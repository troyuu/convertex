import BaseConverter from './BaseConverter.js';
import { getJobDir } from '../../utils/tempManager.js';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export default class PdfToExcelConverter extends BaseConverter {
  constructor() {
    super('pdf-to-excel');
  }

  getOutputExtension() {
    return '.xlsx';
  }

  async execute(jobId) {
    const jobDir = await getJobDir(jobId);
    const files = await readdir(jobDir);
    const inputFile = files.find(f => f.startsWith('input'));
    if (!inputFile) throw new Error('Input file not found');

    const inputPath = join(jobDir, inputFile);
    const outputPath = join(jobDir, 'output.xlsx');

    const { PDFDocument } = await import('pdf-lib');
    const ExcelJS = await import('exceljs');

    const pdfBytes = await readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    const workbook = new ExcelJS.default.Workbook();

    for (let i = 0; i < pages.length; i++) {
      const sheet = workbook.addWorksheet(`Page ${i + 1}`);
      const page = pages[i];
      const { width, height } = page.getSize();

      sheet.columns = [
        { header: 'Property', key: 'prop', width: 20 },
        { header: 'Value', key: 'val', width: 40 },
      ];

      sheet.addRow({ prop: 'Page Number', val: i + 1 });
      sheet.addRow({ prop: 'Width (pt)', val: width });
      sheet.addRow({ prop: 'Height (pt)', val: height });
      sheet.addRow({ prop: 'Note', val: 'PDF text extraction requires OCR for scanned documents' });
    }

    // Summary sheet
    const summary = workbook.addWorksheet('Summary');
    summary.columns = [
      { header: 'Property', key: 'prop', width: 20 },
      { header: 'Value', key: 'val', width: 40 },
    ];
    summary.addRow({ prop: 'Total Pages', val: pages.length });
    summary.addRow({ prop: 'Title', val: pdfDoc.getTitle() || 'N/A' });
    summary.addRow({ prop: 'Author', val: pdfDoc.getAuthor() || 'N/A' });

    await workbook.xlsx.writeFile(outputPath);
    return { outputPath, outputFilename: 'output.xlsx' };
  }
}
