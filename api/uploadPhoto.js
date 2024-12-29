import { initializeSentry, authenticateOwner } from './_apiUtils.js';
import multer from 'multer';
import { S3 } from 'aws-sdk';

initializeSentry();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    await new Promise((resolve, reject) => {
      upload.single('photo')(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const ownerId = authenticateOwner(req);
    const { albumId, caption } = req.body;

    if (!albumId || !req.file) {
      return res.status(400).json({ error: 'Album ID and photo file are required' });
    }

    const album = await db.select().from(albums).where(albums.id.eq(albumId)).first();

    if (!album || album.owner_id !== ownerId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const fileName = `${albumId}/${Date.now()}-${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();

    const newPhoto = await db.insert(photos).values({
      album_id: albumId,
      url: uploadResult.Location,
      caption,
    }).returning();

    res.status(201).json(newPhoto[0]);
  } catch (error) {
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error uploading photo' });
    }
  }
}