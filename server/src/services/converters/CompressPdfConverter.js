import BaseConverter from './BaseConverter.js';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export default class CompressPdfConverter extends BaseConverter {
  constructor() {
    super('compress-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath) {
    await execFileAsync('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dPDFSETTINGS=/ebook',
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${outputPath}`,
      inputPath,
    ], { timeout: 120000 });
  }
}
