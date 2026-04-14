import env from './environment.js';

export default {
  maxFileSize: env.maxFileSize,
  tempDir: env.tempDir,
  allowedMimeTypes: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/webp': ['.webp'],
    'text/html': ['.html', '.htm'],
    'text/csv': ['.csv'],
    'text/plain': ['.csv', '.txt'],
    'application/octet-stream': ['.docx', '.xlsx', '.pptx', '.doc', '.xls', '.ppt'],
    'application/zip': ['.docx', '.xlsx', '.pptx'],
    'application/x-zip-compressed': ['.docx', '.xlsx', '.pptx'],
  },
};
