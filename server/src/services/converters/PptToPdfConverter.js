import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';

export default class PptToPdfConverter extends BaseConverter {
  constructor() {
    super('ppt-to-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    await convertWithLibreOffice(inputPath, jobDir, 'pdf');
  }
}
