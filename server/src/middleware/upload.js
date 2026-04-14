import multer from 'multer';
import { join } from 'path';
import fileConfig from '../config/fileConfig.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, req.jobDir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    cb(null, `input${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: fileConfig.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = Object.keys(fileConfig.allowedMimeTypes);
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  },
});

export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 20);
export default upload;
