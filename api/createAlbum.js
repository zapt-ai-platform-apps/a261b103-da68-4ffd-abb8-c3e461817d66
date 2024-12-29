import { initializeSentry, authenticateOwner, generateShareToken } from './_apiUtils.js';

initializeSentry();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const ownerId = authenticateOwner(req);
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const shareToken = generateShareToken();

    const newAlbum = await db.insert(albums).values({
      owner_id: ownerId,
      title,
      description,
      share_token: shareToken,
    }).returning();

    res.status(201).json(newAlbum[0]);
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error creating album' });
    }
  }
}