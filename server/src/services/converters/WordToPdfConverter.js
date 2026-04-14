import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';

export default class WordToPdfConverter extends BaseConverter {
  constructor() {
    super('word-to-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    await convertWithLibreOffice(inputPath, jobDir, 'pdf');
  }
}
