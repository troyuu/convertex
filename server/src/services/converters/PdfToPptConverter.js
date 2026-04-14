import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';

export default class PdfToPptConverter extends BaseConverter {
  constructor() {
    super('pdf-to-ppt');
  }

  getOutputExtension() {
    return '.pptx';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    // Use Draw PDF import filter — this imports PDF pages as slides
    await convertWithLibreOffice(inputPath, jobDir, 'pptx', {
      infilter: 'draw_pdf_import',
      exportFilter: 'Impress MS PowerPoint 2007 XML',
    });
  }
}
