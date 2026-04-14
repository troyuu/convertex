import BaseConverter from './BaseConverter.js';
import mammoth from 'mammoth';
import { writeFile } from 'fs/promises';

export default class WordToHtmlConverter extends BaseConverter {
  constructor() {
    super('word-to-html');
  }

  getOutputExtension() {
    return '.html';
  }

  async convert(inputPath, outputPath) {
    const result = await mammoth.convertToHtml({ path: inputPath });
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Converted Document</title></head><body>${result.value}</body></html>`;
    await writeFile(outputPath, html);
  }
}
