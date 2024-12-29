import { initializeSentry, authenticateOwner } from './_apiUtils.js';

initializeSentry();

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const ownerId = authenticateOwner(req);

    const userAlbums = await db.select().from(albums).where(albums.owner_id.eq(ownerId));

    res.status(200).json(userAlbums);
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching albums' });
    }
  }
}