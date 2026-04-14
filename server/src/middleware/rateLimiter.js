import rateLimit from 'express-rate-limit';
import { hashIp } from '../utils/ipHasher.js';

export const conversionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => hashIp(req.ip),
  message: {
    error: 'RATE_LIMITED',
    message: 'Whoa there, slow down! Too many requests. Try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const guestbookLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => hashIp(req.ip),
  message: {
    error: 'RATE_LIMITED',
    message: 'Too many guestbook entries. Try again in a few minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: (req) => hashIp(req.ip),
  standardHeaders: true,
  legacyHeaders: false,
});
