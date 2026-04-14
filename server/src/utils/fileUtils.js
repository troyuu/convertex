import { extname } from 'path';

export function getExtension(filename) {
  return extname(filename).toLowerCase();
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function isAllowedExtension(filename, allowedExtensions) {
  const ext = getExtension(filename);
  return allowedExtensions.includes(ext);
}
