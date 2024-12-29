import { initializeSentry, authenticateOwner } from './_apiUtils.js';

initializeSentry();

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      res.setHeader('Allow', ['PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const ownerId = authenticateOwner(req);
    const { albumId, title, description } = req.body;

    if (!albumId || !title) {
      return res.status(400).json({ error: 'Album ID and title are required' });
    }

    const album = await db.select().from(albums).where(albums.id.eq(albumId)).first();

    if (!album || album.owner_id !== ownerId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await db.update(albums).set({
      title,
      description,
    }).where(albums.id.eq(albumId));

    res.status(200).json({ message: 'Album updated successfully' });
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error updating album' });
    }
  }
}