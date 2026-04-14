export const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.csv': 'text/csv',
  '.zip': 'application/zip',
};

export const EXTENSIONS_BY_MIME = Object.entries(MIME_TYPES).reduce((acc, [ext, mime]) => {
  if (!acc[mime]) acc[mime] = [];
  acc[mime].push(ext);
  return acc;
}, {});

export const getAcceptString = (extensions) => {
  return extensions.map((ext) => MIME_TYPES[ext] || ext).join(',');
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};
