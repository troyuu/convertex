import BaseConverter from './BaseConverter.js';
import ExcelJS from 'exceljs';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export default class CsvToExcelConverter extends BaseConverter {
  constructor() {
    super('csv-to-excel');
  }

  getOutputExtension() {
    return '.xlsx';
  }

  async convert(inputPath, outputPath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    const rl = createInterface({ input: createReadStream(inputPath), crlfDelay: Infinity });
    for await (const line of rl) {
      // Simple CSV parsing (handles basic cases)
      const cells = line.split(',').map(cell => cell.replace(/^"|"$/g, '').trim());
      worksheet.addRow(cells);
    }

    await workbook.xlsx.writeFile(outputPath);
  }
}
