import BaseConverter from './BaseConverter.js';
import { convertWithLibreOffice } from '../../config/libreoffice.js';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { readdir, rename } from 'fs/promises';
import { join } from 'path';

const execFileAsync = promisify(execFile);

export default class WordToImageConverter extends BaseConverter {
  constructor() {
    super('word-to-image');
  }

  getOutputExtension() {
    return '.png';
  }

  async convert(inputPath, outputPath, { jobDir }) {
    // Step 1: Word -> PDF via LibreOffice
    await convertWithLibreOffice(inputPath, jobDir, 'pdf');

    // Find the generated PDF
    const files = await readdir(jobDir);
    const pdfFile = files.find(f => f.endsWith('.pdf') && !f.startsWith('output'));
    if (!pdfFile) throw new Error('Conversion failed');
    const pdfPath = join(jobDir, pdfFile);

    // Step 2: PDF -> Image via Poppler
    await execFileAsync('pdftoppm', ['-png', '-r', '300', '-singlefile', pdfPath, join(jobDir, 'output')], { timeout: 120000 });
    // pdftoppm with -singlefile creates output.png for first page
  }
}
