# ARCO — brand website

Static website for the ARCO brand. No build step: plain HTML, CSS and JS.

| Page | What it covers |
| --- | --- |
| `index.html` | ARCO home: the two platforms (Optics and Communication) |
| `labs.html` | Arco Labs, an optical laboratory ERP |
| `wholesale.html` | Arco Wholesale, a B2B ERP for optical distribution |
| `retail.html` | Arco Retail, an optical store app |
| `communication.html` | ARCO Communication, a WhatsApp CRM and Shopify suite |
| `contact.html` | Enquiry form (opens email or WhatsApp) |

## Before going live

1. **Contact details:** edit `ARCO_CONTACT` at the top of `assets/main.js` (email, phone, WhatsApp number). They are filled in across every page automatically.
2. **Brand colours:** the tokens are at the top of `assets/styles.css` (`--navy`, `--indigo`).

## Run locally

```bash
npx http-server . -p 5510
```

## Deploy

Upload the folder to any static host (Vercel, Netlify, GitHub Pages, cPanel). On Vercel, import the folder with the "Other" framework preset and leave the build command empty.
