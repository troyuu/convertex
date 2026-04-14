import { join } from 'path';
import { rename, readdir, access } from 'fs/promises';
import { getJobDir } from '../../utils/tempManager.js';

export default class BaseConverter {
  constructor(type) {
    this.type = type;
  }

  async validate(inputPath) {
    // Override in subclass for type-specific validation
    return true;
  }

  async convert(inputPath, outputPath, options = {}) {
    throw new Error('convert() must be implemented by subclass');
  }

  async cleanup(files) {
    // Override if converter creates extra temp files
  }

  async execute(jobId) {
    const jobDir = await getJobDir(jobId);
    const { inputFile, inputPath, outputPath, outputFilename } = await this.getPaths(jobDir);

    await this.validate(inputPath);
    await this.convert(inputPath, outputPath, { jobDir });

    // Some tools (e.g. LibreOffice) name output based on input file.
    // If the expected output doesn't exist, find and rename it.
    try {
      await access(outputPath);
    } catch {
      const ext = this.getOutputExtension();
      const files = await readdir(jobDir);
      const candidate = files.find(
        (f) => f.endsWith(ext) && f !== inputFile
      );
      if (candidate) {
        await rename(join(jobDir, candidate), outputPath);
      }
    }

    return { outputPath, outputFilename };
  }

  async getPaths(jobDir) {
    const files = await readdir(jobDir);
    const inputFile = files.find(f => f.startsWith('input'));

    if (!inputFile) {
      throw new Error('Input file not found');
    }

    const inputPath = join(jobDir, inputFile);
    const outputFilename = `output${this.getOutputExtension()}`;
    const outputPath = join(jobDir, outputFilename);

    return { inputFile, inputPath, outputPath, outputFilename };
  }

  getOutputExtension() {
    throw new Error('getOutputExtension() must be implemented by subclass');
  }
}
