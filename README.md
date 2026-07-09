# ClumsyPP

ClumsyPP is a small HTML5 arcade game built with melonJS. It is based on the open-source Clumsy Bird project and keeps the same quick, one-button, "just one more try" rhythm: fly, avoid the pipes, and chase a better score.

## Play

Open `index.html` in a browser, or run the local development server:

```sh
npm install
npm run dev
```

Then visit the local URL printed by Vite, usually `http://localhost:8001/`.

## Build

The project uses Vite for local serving and preview, plus a small static build script for GitHub Pages compatibility.

```sh
npm run check
npm run build
npm run preview
```

`npm run build` writes a static site to `dist/`. You can publish that folder with GitHub Pages, or keep serving the repository root if your Pages setup already does that. The `.nojekyll` file is included so GitHub Pages serves the static files as-is.

## Controls

- `Space`, left click, or tap: flap / start
- `M`: mute or unmute sound
- `C`: show or hide credits on the title screen
- `Fullscreen`: enter or exit fullscreen on supported mobile browsers

## Project Structure

- `index.html` and `index.css`: page shell and basic layout
- `js/`: game source code
- `scripts/`: build and syntax-check helpers
- `dist/`: generated GitHub Pages build output
- `build/clumsy-min.js`: legacy pre-migration bundle kept only for reference
- `data/img/`: sprites, backgrounds, UI images, and icons
- `data/bgm/`: background music
- `data/sfx/`: sound effects
- `CUSTOMIZING.md`: asset replacement guide

## Customize

Most visual changes can be made by replacing assets in `data/img/` while keeping the same filenames and dimensions. See [CUSTOMIZING.md](CUSTOMIZING.md) for the full asset list.

The game loads the files in `js/` directly, which makes asset and gameplay iteration faster. Rebuild the GitHub Pages output with:

```sh
npm run build
```

## Credits

ClumsyPP is based on [Clumsy Bird](https://github.com/ellisonleao/clumsy-bird) by Ellison Leao.

Music: YouTube source provided for this project: https://www.youtube.com/watch?v=mCjLODPPLWk

Original engine/framework: [melonJS](https://melonjs.org/).

## License

This project inherits the original GPL license from Clumsy Bird. See [LICENSE.md](LICENSE.md).
