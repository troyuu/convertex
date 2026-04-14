import { GuestBookEntry } from '../models/index.js';
import AppError from '../utils/AppError.js';
import {
  MAX_GUESTBOOK_NAME_LENGTH,
  MAX_GUESTBOOK_MESSAGE_LENGTH,
  MAX_GUESTBOOK_WEBSITE_LENGTH,
  GUESTBOOK_PAGE_SIZE,
} from '../utils/constants.js';

export async function getEntries(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * GUESTBOOK_PAGE_SIZE;

    const { count, rows } = await GuestBookEntry.findAndCountAll({
      order: [['created_at', 'DESC']],
      limit: GUESTBOOK_PAGE_SIZE,
      offset,
    });

    res.json({
      entries: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / GUESTBOOK_PAGE_SIZE),
    });
  } catch (error) {
    next(error);
  }
}

export async function addEntry(req, res, next) {
  try {
    const { name, message, website } = req.body;

    if (!name || !message) {
      throw new AppError('Name and message are required', 400, 'GUESTBOOK_INVALID');
    }

    if (name.length > MAX_GUESTBOOK_NAME_LENGTH) {
      throw new AppError('Name too long', 400, 'GUESTBOOK_INVALID');
    }

    if (message.length > MAX_GUESTBOOK_MESSAGE_LENGTH) {
      throw new AppError('Message too long', 400, 'GUESTBOOK_INVALID');
    }

    if (website && website.length > MAX_GUESTBOOK_WEBSITE_LENGTH) {
      throw new AppError('Website URL too long', 400, 'GUESTBOOK_INVALID');
    }

    const entry = await GuestBookEntry.create({
      name: name.trim(),
      message: message.trim(),
      website: website ? website.trim() : null,
    });

    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
}
