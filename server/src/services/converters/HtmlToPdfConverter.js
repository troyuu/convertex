import BaseConverter from './BaseConverter.js';
import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import { pathToFileURL } from 'url';

export default class HtmlToPdfConverter extends BaseConverter {
  constructor() {
    super('html-to-pdf');
  }

  getOutputExtension() {
    return '.pdf';
  }

  async convert(inputPath, outputPath) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    try {
      const page = await browser.newPage();
      const fileUrl = pathToFileURL(inputPath).href;
      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.pdf({ path: outputPath, format: 'A4', printBackground: true });
    } finally {
      await browser.close();
    }
  }
}
