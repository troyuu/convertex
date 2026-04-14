export default function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    // PRIVACY: Log method, path, status, duration ONLY — never file names or content
    console.log(`[${req.method}] ${req.path} — ${res.statusCode} — ${duration}ms`);
  });

  next();
}
