import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const albums = pgTable('albums', {
  id: uuid('id').primaryKey().defaultRandom(),
  owner_id: uuid('owner_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
  share_token: text('share_token').notNull(),
});