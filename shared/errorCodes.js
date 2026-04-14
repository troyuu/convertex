export const ERROR_CODES = {
  INVALID_FILE_TYPE: {
    code: 'INVALID_FILE_TYPE',
    message: 'ERROR: That file type is not supported, dude! Check the accepted formats.',
    status: 400,
  },
  FILE_TOO_LARGE: {
    code: 'FILE_TOO_LARGE',
    message: 'FATAL ERROR: File too large! Max size is 50MB. Shrink it and come back!',
    status: 400,
  },
  NO_FILE_UPLOADED: {
    code: 'NO_FILE_UPLOADED',
    message: 'ERROR: No file detected! Did you forget to attach one?',
    status: 400,
  },
  CONVERSION_FAILED: {
    code: 'CONVERSION_FAILED',
    message: 'ERROR: Something went wrong, dude! Hit that BACK button and try again.',
    status: 500,
  },
  JOB_NOT_FOUND: {
    code: 'JOB_NOT_FOUND',
    message: 'ERROR: Job not found! It may have expired or never existed.',
    status: 404,
  },
  JOB_NOT_READY: {
    code: 'JOB_NOT_READY',
    message: 'Hold your horses! The conversion is still in progress.',
    status: 202,
  },
  JOB_FAILED: {
    code: 'JOB_FAILED',
    message: 'ERROR: This conversion failed. Please try uploading again.',
    status: 500,
  },
  FILE_EXPIRED: {
    code: 'FILE_EXPIRED',
    message: 'ERROR: File has been deleted! Files are removed after download or 30 minutes.',
    status: 410,
  },
  RATE_LIMITED: {
    code: 'RATE_LIMITED',
    message: 'Whoa there, slow down! Too many requests. Try again in a minute.',
    status: 429,
  },
  INVALID_CONVERSION_TYPE: {
    code: 'INVALID_CONVERSION_TYPE',
    message: 'ERROR: Unknown conversion type! Check the homepage for available options.',
    status: 400,
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'SYSTEM ERROR: The server encountered an unexpected problem. Try again later.',
    status: 500,
  },
  GUESTBOOK_INVALID: {
    code: 'GUESTBOOK_INVALID',
    message: 'Please fill in both your name and message for the guestbook!',
    status: 400,
  },
};

export const getError = (code) => ERROR_CODES[code] || ERROR_CODES.SERVER_ERROR;
