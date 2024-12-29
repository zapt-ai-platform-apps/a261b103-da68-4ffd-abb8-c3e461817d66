import { drizzle } from 'drizzle-orm';
import postgres from 'postgres';
import { albums } from './schema/albums';
import { photos } from './schema/photos';

const sql = postgres(process.env.COCKROACH_DB_URL);

export const db = drizzle(sql, { schema: [albums, photos] });