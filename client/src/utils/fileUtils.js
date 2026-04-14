export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function getFileExtension(filename) {
  if (!filename) return '';
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot).toLowerCase();
}

export function truncateFilename(filename, maxLength = 30) {
  if (!filename || filename.length <= maxLength) return filename;
  const ext = getFileExtension(filename);
  const name = filename.slice(0, filename.length - ext.length);
  const truncatedName = name.slice(0, maxLength - ext.length - 3);
  return `${truncatedName}...${ext}`;
}
