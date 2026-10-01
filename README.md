# Sun Wheels — Manga reader

A responsive comic-book website for the existing Sun Wheels story. All ten chapters, character profiles, and bundled illustrations are preserved.

## Run locally

Requires Node.js 22.12+ or 24+.

```sh
cd foliobook
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run lint` for the TypeScript check and `npm run build` for a production build. Deploy the `foliobook` directory with Vite; output directory: `dist`.

## Reading

- Start reading from the cover or open a chapter from the shelf.
- Swipe left/right on touchscreens, use the Previous/Next buttons, or press the arrow keys to turn pages. Vertical scrolling stays native so long pages remain readable.
- Page turns cross chapter boundaries; the final page disables Next.
- Scroll mode displays the current chapter continuously and tracks the visible page.
- Use the page slider or chapter selector to jump directly.
- Bookmark pages and return through the Bookmarked shelf. Reading progress and bookmarks are saved on this browser.
- Switch between color and black-and-white artwork, or light and dark paper.
- Zoom a panel using its magnifier. Escape closes zoom or returns to the library.
- Reduced-motion preferences disable page-turn animation.

The source contains 37 actual pages across ten chapters. Counts are derived from the page data rather than the older chapter metadata.

## Team

Sivaranjani.l, Nancy Evanjalin.s, pavithra.v, sathish kumar.s, and giri.s.

This project is for learning purposes as part of the Google Cloud Generative AI Engineer program on SkillWallet.
