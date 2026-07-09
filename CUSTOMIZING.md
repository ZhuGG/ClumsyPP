# Customizing ClumsyPP

ClumsyPP is designed to be easy to reskin. Replace the files below with your own assets, keeping the same filenames, formats, and dimensions unless you also update the game code.

## Images

- `data/img/bg.png` - `900x504px` background image.
- `data/img/clumsy.png` - `255x60px` player animation sheet with 3 frames.
- `data/img/gameover.png` - `245x132px` Game Over logo.
- `data/img/gameoverbg.png` - `505x361px` Game Over score panel.
- `data/img/getready.png` - `405x134px` start prompt image.
- `data/img/ground.png` - `900x96px` scrolling ground image.
- `data/img/logo.png` - `351x145px` title logo.
- `data/img/new.png` - `48x48px` new high score badge.
- `data/img/pipe.png` - `148x1664px` obstacle sheet used by the pipe placement logic.
- `data/img/share.png` - share button.
- `data/img/tweet.png` - tweet button.
- `data/img/touch-icon-iphone.png` - mobile home-screen icon.
- `data/img/touch-icon-iphone-retina.png` - high-resolution mobile home-screen icon.
- `data/img/favicon.ico` - browser icon.

## Audio

- `data/bgm/theme.mp3` and `data/bgm/theme.ogg` - background music.
- `data/sfx/wing.mp3`, `data/sfx/wing.ogg`, and `data/sfx/wing.wav` - flap sound.
- `data/sfx/hit.mp3` and `data/sfx/hit.ogg` - collision sound.
- `data/sfx/lose.mp3` and `data/sfx/lose.ogg` - game over sound.

Music credit for this project: https://www.youtube.com/watch?v=mCjLODPPLWk

## Rebuild

If you only replace files in `data/`, you do not need to rebuild while using the dev server. Before publishing to GitHub Pages, refresh the static output:

```sh
npm run build
```
