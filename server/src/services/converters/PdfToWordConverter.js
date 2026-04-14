import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';

export default class PdfToWordConverter extends BaseConverter {
  constructor() {
    super('pdf-to-word');
  }

  getOutputExtension() {
    return '.docx';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    await convertWithLibreOffice(inputPath, jobDir, 'docx', {
      infilter: 'writer_pdf_import',
      exportFilter: 'MS Word 2007 XML',
    });
  }
}
