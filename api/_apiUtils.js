import * as Sentry from "@sentry/node";
import { db } from '../drizzle/schema.js';
import { albums } from '../drizzle/schema/albums.js';
import { photos } from '../drizzle/schema/photos.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export function initializeSentry() {
  Sentry.init({
    dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
    environment: process.env.VITE_PUBLIC_APP_ENV,
    initialScope: {
      tags: {
        type: 'backend',
        projectId: process.env.VITE_PUBLIC_APP_ID
      }
    }
  });
}

export function authenticateOwner(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ALBUM_SHARE_SECRET);
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function generateShareToken() {
  return uuidv4();
}