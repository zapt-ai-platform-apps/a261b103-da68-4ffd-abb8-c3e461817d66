import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const photos = pgTable('photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  album_id: uuid('album_id').notNull(),
  url: text('url').notNull(),
  caption: text('caption'),
  created_at: timestamp('created_at').defaultNow(),
});