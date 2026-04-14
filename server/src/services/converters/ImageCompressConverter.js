import BaseConverter from './BaseConverter.js';
import sharp from 'sharp';

export default class ImageCompressConverter extends BaseConverter {
  constructor() {
    super('image-compress');
  }

  getOutputExtension() {
    return '.jpg';
  }

  async convert(inputPath, outputPath) {
    await sharp(inputPath)
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(outputPath);
  }
}
