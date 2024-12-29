import { initializeSentry, authenticateOwner } from './_apiUtils.js';
import jwt from 'jsonwebtoken';

initializeSentry();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const ownerId = authenticateOwner(req);
    const { albumId } = req.body;

    if (!albumId) {
      return res.status(400).json({ error: 'Album ID is required' });
    }

    const album = await db.select().from(albums).where(albums.id.eq(albumId)).first();

    if (!album || album.owner_id !== ownerId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Generate JWT for shared access
    const token = jwt.sign({ albumId: album.id }, process.env.ALBUM_SHARE_SECRET, { expiresIn: '7d' });

    const shareLink = `${process.env.APP_BASE_URL}/view/${token}`;

    res.status(200).json({ shareLink });
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error generating share link' });
    }
  }
}