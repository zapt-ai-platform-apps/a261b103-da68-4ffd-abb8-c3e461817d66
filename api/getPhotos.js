import { initializeSentry, authenticateOwner } from './_apiUtils.js';

initializeSentry();

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { albumId, shareToken } = req.query;

    if (shareToken) {
      // Viewing via shared link
      const album = await db.select().from(albums).where(albums.share_token.eq(shareToken)).first();

      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }

      const albumPhotos = await db.select().from(photos).where(photos.album_id.eq(album.id));

      res.status(200).json({ album, photos: albumPhotos });
    } else {
      // Owner viewing
      const ownerId = authenticateOwner(req);

      if (!albumId) {
        return res.status(400).json({ error: 'Album ID is required' });
      }

      const album = await db.select().from(albums).where(albums.id.eq(albumId)).first();

      if (!album || album.owner_id !== ownerId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const albumPhotos = await db.select().from(photos).where(photos.album_id.eq(album.id));

      res.status(200).json({ album, photos: albumPhotos });
    }
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching photos' });
    }
  }
}