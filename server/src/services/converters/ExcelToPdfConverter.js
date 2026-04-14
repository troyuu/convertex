import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';

export default class ExcelToPdfConverter extends BaseConverter {
  constructor() {
    super('excel-to-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    await convertWithLibreOffice(inputPath, jobDir, 'pdf');
  }
}
