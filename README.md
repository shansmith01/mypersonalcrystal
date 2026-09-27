# Home Block Crystals

A small static website for Home Block Crystals, a mum-and-dad shop in Feilding, New Zealand. Pat and Ngaire Bennett post a cheap crystal or a lump of cheap metal. The buyer pays postage and a flat customising fee of NZ$15. A short birth survey (date, rough time, town and country) picks a tropical sun-sign stone and a cheap metal.

The site is plain HTML, one CSS file (`style.css`) and one JavaScript file (`site.js`). Forms stay in the browser. Nothing is built and nothing is sent to a server.

## Run it locally

From this folder:

```bash
python3 -m http.server 8742 --bind 0.0.0.0
```

Open http://127.0.0.1:8742

Photo credits are in `images/CREDITS.txt`.

## Cloudflare Pages

The folder is already the finished site. Pages does not need a build.

1. Create a Pages project and connect the Git repository, or upload this folder.
2. Leave the build command empty. There is no package install and nothing to compile.
3. Set the build output directory to the site root (`/`), where the HTML files sit next to `style.css`, `site.js` and `images/`.
4. Deploy. Pages publishes those files as they are.
5. Later changes deploy the same way: no build step, output is still the site root.
6. Attach the custom domain mypersonalcrystal.com in the project after the first deploy. There is still no build step. The files do not change.
7. Preview deploys use that same empty build command and the same root output.
