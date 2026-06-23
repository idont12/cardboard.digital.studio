<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d0dd6e45-490d-4510-a81b-83af422d9dbb

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Analytics

To enable Google Analytics 4, add `VITE_GA_MEASUREMENT_ID` to [.env.local](.env.local) using your GA measurement ID, such as `G-XXXXXXXXXX`. The app tracks modal opens, plus clicks on the `PLAY PROTOTYPE` and `VIEW ON ITCH` buttons with the game id and title.

## Highlight Page

You can open the focused highlight view by adding a `highlight` query parameter with one or more prototype IDs, for example `?highlight=stars-connection,card-path`.

To add card artwork for the highlight view, add an optional `backgroundImage` field to each game in [public/games.json](public/games.json). Use a path inside `public/`, such as `images/my-card.jpg`, or a full external URL.
