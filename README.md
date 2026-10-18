# FUNKPOP — K-pop mini games

A small, mobile-friendly K-pop fan-game prototype built with plain HTML, CSS and JavaScript. No build step, package manager, or external image assets are required.

## What's included

- **Quiz Rush** — five multiple-choice K-pop questions with explanations and a final score.
- **Bias Battle** — five quick either/or choices for a playful bias check.
- **Find the Intruder** — spot the group that doesn't fit the category.
- **Emoji Decoder** — solve K-pop group clues from emoji wordplay.
- Responsive layout, accessible dialog labels, keyboard Escape-to-close, score feedback, replay buttons, and reduced-motion support.

## Run locally

Open \`index.html\` in a browser. The game runs entirely on the client.

## Publish with GitHub Pages

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Push to \`main\`. The included workflow publishes the site automatically.
4. After the first successful run, the Pages URL appears in **Settings → Pages**.

## Project structure

- \`index.html\` — landing page and game dialog.
- \`style.css\` — layout, card illustrations, responsive styling, and modal UI.
- \`app.js\` — sample questions and mini-game logic.
- \`.github/workflows/pages.yml\` — GitHub Pages deployment workflow.

## Next steps

1. Add more question packs and difficulty levels.
2. Add a game-data file so questions can be edited without changing game logic.
3. Add language selection (English/Russian) and custom round lengths.
4. Test on multiple phone sizes and browsers.
5. Review and verify every question as the content library grows.

## Disclaimer

FUNKPOP is an unofficial fan-made prototype and is not affiliated with any K-pop artist, group, agency, or game channel. Artist and group names are used for trivia and fan-game identification. The design uses original CSS illustrations rather than copied channel artwork.