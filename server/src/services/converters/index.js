import WordToPdfConverter from './WordToPdfConverter.js';
import PdfToWordConverter from './PdfToWordConverter.js';
import PdfToImageConverter from './PdfToImageConverter.js';
import ImageToPdfConverter from './ImageToPdfConverter.js';
import WordToImageConverter from './WordToImageConverter.js';
import ImageToWordConverter from './ImageToWordConverter.js';
import ExcelToPdfConverter from './ExcelToPdfConverter.js';
import PdfToExcelConverter from './PdfToExcelConverter.js';
import PptToPdfConverter from './PptToPdfConverter.js';
import PdfToPptConverter from './PdfToPptConverter.js';
import MergePdfConverter from './MergePdfConverter.js';
import SplitPdfConverter from './SplitPdfConverter.js';
import CompressPdfConverter from './CompressPdfConverter.js';
import ImageCompressConverter from './ImageCompressConverter.js';
import WordToHtmlConverter from './WordToHtmlConverter.js';
import HtmlToPdfConverter from './HtmlToPdfConverter.js';
import CsvToExcelConverter from './CsvToExcelConverter.js';
import ExcelToCsvConverter from './ExcelToCsvConverter.js';

const converters = {
  'word-to-pdf': new WordToPdfConverter(),
  'pdf-to-word': new PdfToWordConverter(),
  'pdf-to-image': new PdfToImageConverter(),
  'image-to-pdf': new ImageToPdfConverter(),
  'word-to-image': new WordToImageConverter(),
  'image-to-word': new ImageToWordConverter(),
  'excel-to-pdf': new ExcelToPdfConverter(),
  'pdf-to-excel': new PdfToExcelConverter(),
  'ppt-to-pdf': new PptToPdfConverter(),
  'pdf-to-ppt': new PdfToPptConverter(),
  'merge-pdf': new MergePdfConverter(),
  'split-pdf': new SplitPdfConverter(),
  'compress-pdf': new CompressPdfConverter(),
  'image-compress': new ImageCompressConverter(),
  'word-to-html': new WordToHtmlConverter(),
  'html-to-pdf': new HtmlToPdfConverter(),
  'csv-to-excel': new CsvToExcelConverter(),
  'excel-to-csv': new ExcelToCsvConverter(),
};

export function getConverter(type) {
  const converter = converters[type];
  if (!converter) throw new Error(`No converter for type: ${type}`);
  return converter;
}
