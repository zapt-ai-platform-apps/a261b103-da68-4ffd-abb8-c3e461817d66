CREATE TABLE "photos" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "album_id" UUID NOT NULL REFERENCES "albums"("id") ON DELETE CASCADE,
  "url" TEXT NOT NULL,
  "caption" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);