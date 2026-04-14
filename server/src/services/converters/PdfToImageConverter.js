import BaseConverter from './BaseConverter.js';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { readdir, rename, access } from 'fs/promises';
import { join } from 'path';
import { createWriteStream } from 'fs';

const execFileAsync = promisify(execFile);

export default class PdfToImageConverter extends BaseConverter {
  constructor() {
    super('pdf-to-image');
  }

  getOutputExtension() {
    return '.png';
  }

  async execute(jobId) {
    const { getJobDir } = await import('../../utils/tempManager.js');
    const jobDir = await getJobDir(jobId);
    const files = await readdir(jobDir);
    const inputFile = files.find(f => f.startsWith('input'));
    if (!inputFile) throw new Error('Input file not found');
    const inputPath = join(jobDir, inputFile);

    await execFileAsync('pdftoppm', ['-png', '-r', '300', inputPath, join(jobDir, 'page')], { timeout: 120000 });

    const afterFiles = await readdir(jobDir);
    const pages = afterFiles.filter(f => f.startsWith('page') && f.endsWith('.png')).sort();

    if (pages.length === 1) {
      const outputPath = join(jobDir, 'output.png');
      await rename(join(jobDir, pages[0]), outputPath);
      return { outputPath, outputFilename: 'output.png' };
    }

    // Multi-page: create zip
    const archiver = (await import('archiver')).default;
    const zipPath = join(jobDir, 'output.zip');
    const output = createWriteStream(zipPath);
    const archive = archiver('zip');
    archive.pipe(output);
    for (const page of pages) {
      archive.file(join(jobDir, page), { name: page });
    }
    await archive.finalize();
    await new Promise(resolve => output.on('close', resolve));
    return { outputPath: zipPath, outputFilename: 'output.zip' };
  }
}
