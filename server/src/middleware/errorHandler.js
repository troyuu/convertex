export default function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'SERVER_ERROR';

  // PRIVACY: Never include file names, paths, or content in error responses
  const safeMessage = err.isOperational
    ? err.message
    : 'SYSTEM ERROR: The server encountered an unexpected problem. Try again later.';

  // Log generic info only — NEVER log file names or content
  console.error(`[ERROR] ${errorCode} — ${statusCode} — ${req.method} ${req.path}`);
  if (!err.isOperational) {
    console.error(`[ERROR_DETAIL]`, err.message);
  }

  res.status(statusCode).json({
    error: errorCode,
    message: safeMessage,
  });
}
