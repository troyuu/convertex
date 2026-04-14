import { postFile, postFiles, get, getBlob } from './api';

export async function startConversion(type, file) {
  return postFile(`/convert/${type}`, file, 'file');
}

export async function checkStatus(jobId) {
  return get(`/convert/status/${jobId}`);
}

export async function downloadFile(jobId) {
  return getBlob(`/convert/download/${jobId}`);
}

export async function mergePdfs(files) {
  return postFiles('/convert/merge-pdf', files, 'files');
}

export async function splitPdf(file) {
  return postFile('/convert/split-pdf', file, 'file');
}
