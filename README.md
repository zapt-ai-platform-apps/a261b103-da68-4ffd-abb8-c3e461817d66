# Photo Album App

A ReactJS application that allows album owners to manage photo albums by adding, editing, and captioning photos. Owners can share album links with others who can view the photos without editing permissions.

## User Journeys

1. [Create and Manage Album](docs/journeys/create-and-manage-album.md) - Create a new photo album, add photos, edit captions, and manage album details.
2. [Share Album Link](docs/journeys/share-album-link.md) - Generate a shareable link for an album to allow others to view photos.
3. [View Shared Album](docs/journeys/view-shared-album.md) - Access and view a shared photo album using the provided link.

## External Services

- **AWS S3**: Used for storing uploaded photos. Environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_S3_BUCKET_NAME` are required.
- **Sentry**: Implements error logging for both frontend and backend. Environment variables `VITE_PUBLIC_SENTRY_DSN` and `VITE_PUBLIC_APP_ENV` are required.
- **Umami**: Used for analytics tracking. Environment variable `VITE_PUBLIC_UMAMI_WEBSITE_ID` is required.

## Environment Variables

Ensure the following environment variables are set in the `.env` file:

- `COCKROACH_DB_URL`
- `NPM_TOKEN`
- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_APP_ENV`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `ALBUM_SHARE_SECRET`

---
For detailed instructions on each user journey, refer to the respective documentation in the `docs/journeys/` directory.