# Alex Mah — Game Programmer Portfolio

Source for https://alexmah123.github.io, a static site served by GitHub Pages from the `gh-pages` branch.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | Home page. Tabs (`#home`, `#personal-portfolio`, `#about`, `#resume`) are `.content-region` divs switched by the URL hash. About holds Experience / Education / Skills; keep it in sync with LinkedIn and `mainpage-assets/resume.pdf`. |
| `header.html`, `footer.html` | Shared header and footer, fetched into `#header` / `#footer` on every page. |
| `script.js` | Loads the header/footer, handles tab switching and the click-to-enlarge screenshot viewer. |
| `loadGoogleAnalytics.js` | Google Analytics (gtag). |
| `subpages/projects/`, `subpages/game-jam/` | One page per game. |
| `game-thumbnail/` | 315×250 card images used on the home page. |
| `game-screenshot/<Game>/` | Screenshots (JPEG) shown on each game page. |
| `mainpage-assets/` | Background, headshot, social icons and `resume.pdf`. |
| `mainStyle.css` | All site styles (one file, sectioned by component). |
| `favicon.svg` | Browser tab icon. |

## Adding a game

1. Copy an existing page in `subpages/` and update the title, YouTube/itch.io embeds, summary, text and screenshots.
2. Screenshots: add `class="generic_image" loading="lazy"` to each `<img>`; `script.js` makes them open full size.
3. Add a thumbnail to `game-thumbnail/` and a `game_cell` card to the matching grid in `index.html`.

## Running locally

Pages use root-relative paths (`/header.html`, `/script.js`), so serve the folder from its root rather than opening files directly, e.g. `npx serve .` or `python -m http.server`.
