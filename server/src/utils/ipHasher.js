import { createHash } from 'crypto';
import env from '../config/environment.js';

export function hashIp(ip) {
  if (!ip) return null;
  return createHash('sha256')
    .update(ip + env.ipHashSalt)
    .digest('hex');
}
