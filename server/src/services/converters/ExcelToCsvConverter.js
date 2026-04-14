import BaseConverter from './BaseConverter.js';
import ExcelJS from 'exceljs';
import { writeFile } from 'fs/promises';

export default class ExcelToCsvConverter extends BaseConverter {
  constructor() {
    super('excel-to-csv');
  }

  getOutputExtension() {
    return '.csv';
  }

  async convert(inputPath, outputPath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputPath);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    worksheet.eachRow((row) => {
      const cells = row.values.slice(1).map(v => {
        if (v === null || v === undefined) return '';
        const str = String(v);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"` : str;
      });
      rows.push(cells.join(','));
    });

    await writeFile(outputPath, rows.join('\n'));
  }
}
