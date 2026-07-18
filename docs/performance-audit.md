# Production performance audit

## Scope

This audit covers public Next.js routes and their shared data, image, font, and client-component paths. The public interface, routes, copy, filtering, WhatsApp links, admin logic, and Supabase schema were preserved.

## Findings and fixes

| Issue | Affected file(s) | Impact | Implemented fix | Verification |
| --- | --- | --- | --- | --- |
| Public cards requested every kitten column and every gallery image. | `lib/supabase/queries/kittens.ts` | Unnecessary database payload and image URL serialization on `/` and `/kittens`. | Added lightweight card selects and one batched primary-image query; detail records still load the complete ordered gallery. | Production build and lint pass. |
| Card data carried fields that are not rendered by the card or filters. | `lib/types/kitten.ts`, `lib/mock-kittens.ts`, `lib/mappers/kitten.ts`, `components/KittenCard.tsx`, `components/kittens/KittensCatalog.tsx` | Larger RSC/client payload than necessary. | Introduced card-specific data/types and serialized only card-rendered fields. | TypeScript production build passes. |
| Storage URL mapping initialized the browser Supabase client during server-side card mapping. | `lib/mappers/kitten.ts` | Avoidable client-SDK dependency in the public rendering path. | Generate the public storage URL directly from the existing public URL and `storage_path`, retaining the stored `url` fallback. | TypeScript production build passes. |
| Settings and public kitten data lacked explicit request-level deduplication and mutation tags. | `lib/supabase/queries/settings.ts`, `lib/supabase/queries/kittens.ts` | Repeated requests during one render and stale public cache after admin updates. | Wrapped cached helpers with React request cache and added `site-settings`/`kittens` cache tags. | Production route generation passes. |
| Admin changes did not explicitly invalidate the associated shared data cache. | `app/admin/(protected)/settings/actions.ts`, `app/admin/(protected)/kittens/new/actions.ts`, `app/admin/(protected)/kittens/[id]/edit/actions.ts` | Public content could remain stale until its timed revalidation elapsed. | Revalidate the relevant tag with Next.js 16's `max` profile, while retaining existing route invalidation. | Lint and production build pass. |
| Homepage and kitten listing loaded independent settings and kitten data serially. | `app/page.tsx`, `app/kittens/page.tsx` | Avoidable server render waterfall. | Start both independent requests together with `Promise.all`; existing kitten-query fallback remains. | Production build passes. |
| Playfair Display was a render-blocking external CSS import. | `app/globals.css`, `app/layout.tsx` | Extra network dependency and potential font-related layout shift. | Replaced it with `next/font/google`, self-hosted output, only weights 500/600, and `display: swap`; retained the existing serif stack/appearance. | Production HTML contains no Google Fonts import; build passes after font download. |
| Responsive page heroes rendered separate priority image elements for mobile and desktop. | `components/PageHero.tsx`, `components/faq/FAQHero.tsx` | Duplicate preloads/downloads were possible, especially on mobile. | Reworked side-image heroes to one responsive `Image` element and reused it for FAQ. | `/kittens`, `/contact`, `/testimonials`, and `/faq` return 200 in production mode. |
| Main public hero images used the default image quality. | `components/home/HomeHero.tsx`, `components/PageHero.tsx`, `components/about/AboutHero.tsx`, `components/breeds/BreedsHero.tsx` | LCP image clarity was not explicitly controlled. | Kept exactly one above-the-fold priority image per hero and set `fetchPriority="high"`, accurate `sizes`, and quality 85. | Production HTML uses Next image URLs. |
| Above-fold and below-fold image loading policy needed review. | Public components using `next/image` | Potential eager media competition and CLS. | Cards, testimonials, parents, content images, thumbnails, and gallery alternatives remain lazy by default; their fill containers reserve dimensions. Lightbox renders only its selected image after opening. | Code review and production-route smoke tests. |

## Deliberately not changed

- No UI, typography, copy, routes, data schema, filtering, WhatsApp, auth, or kitten CRUD behavior was changed.
- No cookie banner, analytics, SEO/AEO/GEO feature, or third-party script was added. `app/layout.tsx` remains the clear future integration boundary for consent-controlled scripts.
- No new production dependency, animation library, or bundle analyzer was added.
- The existing interactive client components remain client-side because they require state, effects, focus management, or browser APIs: navigation, filters/drawers, gallery/lightbox, FAQ accordion, and contact/admin forms.

## Validation

- `npm.cmd run lint` — passed.
- `npm.cmd run build` — passed. The build statically generated the public routes and retained 2-minute kitten revalidation / 5-minute settings-derived public revalidation.
- Production `next start` smoke test — HTTP 200 for `/`, `/kittens`, `/about`, `/breeds`, `/testimonials`, `/faq`, and `/contact`; all emitted Next image optimization URLs and no `fonts.googleapis.com` import.
- Initial detail-route check used a seed assumption and returned 404; this was superseded by the final live Supabase lookup and browser validation below.

## Remaining production-hosting checks

- Measure LCP, CLS, and INP on the deployed site with real image/CDN cache state and compare them against the local Lighthouse measurement below.
- Verify cache-tag propagation after an authenticated admin mutation in the deployed environment.
- Verify the single responsive hero request in a browser network panel on mobile and desktop.

## Final production validation

### Tested kitten route

- Supabase lookup selected the live Luna record and now uses the canonical slug `luna-british-shorthair`.
- Legacy route `/kittens/bella-british-shorthair` should permanently redirect to `/kittens/luna-british-shorthair`.

### Browser validation against `next start`

Headless Chrome validated the detail route at 1440 × 900 desktop and 390 × 844 mobile viewports.

| Check | Desktop | Mobile |
| --- | --- | --- |
| Primary image loaded | Pass — 780 × 585 optimized image in a 780 × 760 cover container | Pass — 390 × 292 optimized image in a 358 × 448 cover container |
| Gallery thumbnails | Pass — four thumbnails, all marked `loading="lazy"` | Pass — four thumbnails, all marked `loading="lazy"` |
| Thumbnail selection and previous/next navigation | Pass | Pass |
| Fullscreen lightbox | Opens; arrow navigation keeps it open; Escape closes it | Opens; arrow navigation keeps it open; Escape closes it |
| Direct navigation and refresh | Pass | Pass |
| WhatsApp detail | Pass — generated link names Luna and British Shorthair | Pass — generated link names Luna and British Shorthair |
| Hydration warnings | None observed | None observed |

The image elements use `object-fit: cover` with the existing approved aspect ratios. The automated check confirmed their optimized natural dimensions and successful load; visual crop judgement remains best confirmed on the deployed CDN with real devices.

### Regression fixed during validation

- Chrome identified three 404 console errors, all for `/favicon.ico`.
- `app/layout.tsx` now declares the existing `/design/brand-mark-minimal.svg` as the document icon, preventing the fallback favicon request.

### Lighthouse measurements

Only completed Lighthouse reports are recorded below. Lighthouse 13.4.0 completed the mobile `/kittens` report; its remaining local invocations ended before writing reports, so no scores are claimed for those routes or desktop.

| Route | Mode | Performance | Accessibility | Best Practices | SEO | LCP | CLS | INP | TBT | Speed Index |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/kittens` | Mobile | 92 | 94 | 100 | 100 | 3.395 s | 0 | Not reported | 24 ms | 2.135 s |

### Bundle inspection

- Turbopack emitted shared client root chunks rather than route-size summaries. The two largest raw JavaScript chunks are 222 KiB and 115 KiB; these are shared runtime/framework output, not an identified public-route outlier.
- No unusually large route-specific public bundle was identifiable from the production manifests. A route-level analyzer would be needed for compressed per-route attribution.

### Final status and limitations

- Production build, live-data detail rendering, desktop/mobile gallery behavior, lazy thumbnail markup, keyboard close behavior, refresh behavior, and WhatsApp details are validated.
- Re-run Lighthouse in a stable CI or deployed environment for `/`, `/kittens/[slug]`, and all desktop measurements. Local Lighthouse was not stable enough to produce the remaining reports.
