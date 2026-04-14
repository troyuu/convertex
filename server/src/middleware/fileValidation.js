import { CONVERSION_TYPES } from 'shared/conversionTypes.js';
import AppError from '../utils/AppError.js';
import { getExtension } from '../utils/fileUtils.js';

export function validateFile(req, res, next) {
  const { type } = req.params;
  const conversionType = CONVERSION_TYPES[type];

  if (!conversionType) {
    return next(new AppError('Unknown conversion type', 400, 'INVALID_CONVERSION_TYPE'));
  }

  if (!req.file && !req.files) {
    return next(new AppError('No file uploaded', 400, 'NO_FILE_UPLOADED'));
  }

  const files = req.files || [req.file];

  for (const file of files) {
    const ext = getExtension(file.originalname);
    if (!conversionType.inputFormats.includes(ext)) {
      return next(new AppError('File type not supported for this conversion', 400, 'INVALID_FILE_TYPE'));
    }

    if (file.size > conversionType.maxSize) {
      return next(new AppError('File too large', 400, 'FILE_TOO_LARGE'));
    }
  }

  next();
}
