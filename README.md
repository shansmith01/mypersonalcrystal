# Home Block Crystals

A small static website for Home Block Crystals, a mum-and-dad shop in Feilding, New Zealand. Pat and Ngaire Bennett post a cheap crystal or a lump of cheap metal. The buyer pays postage and a flat customising fee of NZ$15. A short birth survey (date, rough time, town and country) picks a tropical sun-sign stone and a cheap metal.

The site is plain HTML, one CSS file (`style.css`) and one JavaScript file (`site.js`). The birth survey stays in the browser and is not emailed. The order form and the contact form post to a Cloudflare Worker, which sends the mail with Cloudflare Email Service. There is no frontend build.

## Run it locally

From this folder:

```bash
python3 -m http.server 8742 --bind 0.0.0.0
```

Open http://127.0.0.1:8742

Photo credits are in `images/CREDITS.txt`.

## Cloudflare

The HTML is served as Worker static assets. `worker/index.js` handles `POST /api/order` and `POST /api/contact`. There is no build step and no package.json.

Mail uses the Email Service Workers API: the `send_email` binding named `EMAIL`, then `env.EMAIL.send()`. From is `orders@forms.mypersonalcrystal.com`. To is `orders@mypersonalcrystal.com`. The visitor's address is Reply-To. The public mailto stays `orders@mypersonalcrystal.com`. This is not Email Routing forwarding. There is no Worker route or custom domain on `forms.mypersonalcrystal.com`. The pages and `/api/*` stay on the same host.

Deploy from this folder, once the domain is onboarded:

```bash
npx wrangler deploy
```

1. The domain mypersonalcrystal.com has to be on the Cloudflare account, and the account has to use Cloudflare DNS. Email Service requires that.
2. Email Sending is onboarded on forms.mypersonalcrystal.com. Let Cloudflare add its own records. Do not copy those records into this repo.
3. Outbound Email Service is documented as a Workers Paid feature. The account needs that plan if the dashboard still says so.
4. `npx wrangler login`, then `npx wrangler deploy`. Attach mypersonalcrystal.com to this Worker so the pages and `/api/order` and `/api/contact` are on the same host.
5. The local Python server only serves the files. On this machine the form will show an error, because the Worker is not running here. That is not a sent message.
