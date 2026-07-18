# Cookie and Privacy Audit

Last updated: 18 July 2026

This audit was completed against the current TamysweetUK codebase and local production build behaviour.

Implemented according to the current audited website behaviour and documented UK guidance; final business-policy details require owner confirmation.

## Summary

- Public banner required now: No.
- Reason: no optional analytics, marketing, or preference technologies were verified as active on the public website before user interaction.
- Consent categories used: `Necessary`, `Preferences`, `Analytics`, `Marketing`.
- Optional categories default: off.
- Necessary technologies remain active.
- Consent foundation added: yes, using first-party `localStorage` only for the visitor's consent decision.

## Audited technologies and storage

| Technology / storage name | Provider | Purpose | Storage type | Category | Duration | Scope | Consent required | Affected file | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `tamysweetuk-admin-access-token` | TamysweetUK / Supabase | Keeps an authenticated administrator signed in across protected admin routes. | First-party HTTP-only cookie | Necessary | Matches the Supabase session expiry returned at login; Requires production verification | Admin-only | No | `lib/supabase/server.ts` | Keep as necessary admin authentication storage; do not expose through public consent preferences. |
| `tamysweetuk-admin-refresh-token` | TamysweetUK / Supabase | Supports administrator session continuity and re-authentication. | First-party HTTP-only cookie | Necessary | 30 days from issuance in the current implementation | Admin-only | No | `lib/supabase/server.ts` | Keep as necessary admin authentication storage; verify the configured lifecycle in production. |
| `tamysweetuk-consent` | TamysweetUK | Stores only the visitor's consent choices, consent version, and saved timestamp when they use Cookie settings. | First-party `localStorage` entry | Necessary | Until changed by the visitor or invalidated by a consent-version update | Public and admin | No | `lib/consent/storage.ts` | Keep minimal and store only the consent decision. |
| Supabase public image URLs | Supabase | Serves kitten gallery and site media from public storage. | Network request only; no browser storage verified from code | Necessary | N/A | Public and admin | No | `lib/mappers/kitten.ts`, `lib/supabase/queries/kittens.ts` | Continue using direct image delivery; no consent control required based on current audit. |
| Outbound WhatsApp links (`wa.me`) | WhatsApp | Opens an external WhatsApp conversation only after user click. | Outbound navigation; no browser storage verified before click | Necessary user-requested communication | N/A | Public | No | `components/WhatsAppButton.tsx`, `app/contact/contact-form.tsx`, `components/kitten/KittenDetailContent.tsx` | Keep direct-link behaviour; explain third-party processing in the Privacy Policy. |
| External social links (Instagram/Facebook) | Meta / Instagram | Opens the relevant third-party page only after user click. | Outbound navigation; no browser storage verified before click | Necessary only at user request | N/A | Public | No | `app/contact/page.tsx`, `components/Footer.tsx` | Keep as normal links; no consent gating needed based on current audit. |
| Playfair Display font download during build | Google Fonts build-time fetch via Next.js | Downloads font assets at build time so runtime pages can use self-hosted font output. | Build-time network request, not a runtime browser cookie or storage item | Necessary build infrastructure | Build-time only | Public and admin | No | `app/layout.tsx` | No consent control required; runtime still needs production verification for final asset hosting behaviour. |

## What was searched

The codebase was searched for:

- `document.cookie`
- `cookies()` from Next.js
- `localStorage`
- `sessionStorage`
- IndexedDB
- Supabase authentication storage
- Analytics, tag managers, pixels, heatmaps, chat widgets
- `next/script`
- third-party iframes and embeds
- Google Maps, reCAPTCHA, YouTube, Vimeo
- consent libraries
- tracking-related package dependencies

## Verified findings

### Public website

- No analytics or marketing libraries were found in `package.json` or the application code.
- No `document.cookie`, `sessionStorage`, or IndexedDB usage was found in the public site code.
- No embedded YouTube, Vimeo, Google Maps, reCAPTCHA, social widgets, or chat widgets were found.
- No third-party iframes were found.
- The public contact form is client-side only and redirects the user to WhatsApp with a composed message; it does not submit to a TamysweetUK server action or database.
- No public cookie banner or consent library existed before this task.

### Admin authentication

- Admin authentication uses Supabase sign-in with server-set first-party cookies.
- The cookie names are explicitly defined in code:
  - `tamysweetuk-admin-access-token`
  - `tamysweetuk-admin-refresh-token`
- These are HTTP-only cookies and are only used for the protected admin area.
- The current implementation sets the refresh token cookie expiry to 30 days.
- The access-token cookie expiry depends on the Supabase session returned at login.

### Supabase browser client

- `lib/supabase/client.ts` enables `persistSession: true` and `autoRefreshToken: true`.
- No current import path in the audited public or admin routes was found for `getSupabaseClient()`.
- Result: this browser client is present in the codebase but was not verified as active in current route execution.
- Recommended action: keep documented for future review if client-side Supabase auth is introduced.

## Contact form audit

- Fields collected:
  - `fullName` (required)
  - `email` (required)
  - `phone` (optional)
  - `interest` (required)
  - `subject` (required)
  - `message` (required)
- Destination:
  - Opens a WhatsApp link on the visitor's device.
- Database storage:
  - None verified in the current implementation.
- Email provider:
  - None verified in the current implementation.
- Logs containing personal data:
  - No contact-form browser logging found.
- Retention behaviour:
  - Not defined in code. Owner confirmation required.
- Spam-prevention technology:
  - None verified.

## Banner decision

No intrusive public consent banner is currently displayed because the audit did not verify any optional public tracking or preference technology that needs prior consent.

Instead, the site now provides:

- a Cookie Policy page,
- a Privacy Policy draft,
- a permanent footer `Cookie settings` control,
- a central consent architecture for future optional technologies.

## Consent architecture added

Files added:

- `lib/consent/types.ts`
- `lib/consent/config.ts`
- `lib/consent/storage.ts`
- `components/consent/ConsentProvider.tsx`
- `components/consent/CookieBanner.tsx`
- `components/consent/CookieSettings.tsx`
- `components/consent/CookieSettingsLink.tsx`
- `components/consent/ConsentScripts.tsx`

Behaviour:

- `Necessary` is always active.
- `Preferences`, `Analytics`, and `Marketing` default to `false`.
- Consent version is configurable via `CONSENT_VERSION`.
- Consent is stored only if the user saves a settings choice.
- Optional scripts render nothing unless the relevant category is true.
- The current codebase keeps optional script slots empty.

## Code changes in this task

- Added the internal consent architecture and future script-gating foundation.
- Added `/cookie-policy`.
- Added `/privacy-policy`.
- Added footer links for `Privacy Policy`, `Cookie Policy`, and `Cookie settings`.
- Added a contact-form privacy notice with a Privacy Policy link and clearer WhatsApp explanation.
- Did not add analytics, advertising, or third-party consent dependencies.
- Did not add a public banner because the current audit did not justify one.

## Owner confirmation required

- `[BUSINESS LEGAL NAME REQUIRED]`
- `[BUSINESS CONTACT EMAIL REQUIRED]`
- `[BUSINESS ADDRESS OR SERVICE ADDRESS REQUIRED]`
- `[OWNER CONFIRMATION REQUIRED: enquiry retention period]`
- `[OWNER CONFIRMATION REQUIRED: reservation data collected]`
- `[OWNER CONFIRMATION REQUIRED: payment provider]`
- `[OWNER CONFIRMATION REQUIRED: international data transfers]`
- `[OWNER CONFIRMATION REQUIRED: lawful bases by business process]`
- `[OWNER CONFIRMATION REQUIRED: customer records retained outside the website]`
- `[OWNER CONFIRMATION REQUIRED: customer record retention period]`

## Production checks still required

- Verify the exact access-token cookie expiry returned by Supabase in production.
- Verify whether any hosting or edge platform adds additional cookies in production.
- Verify the final runtime asset and font hosting behaviour on the deployed site.
- Verify the admin login flow in production still sets only the expected authentication cookies.
- Re-check browser storage and network requests after any future optional script or embed is introduced.

## Adding future analytics safely

1. Add the new vendor to `docs/cookie-privacy-audit.md` and `lib/consent/config.ts`.
2. Decide the correct category, purpose, provider, and verified duration before release.
3. Render the vendor only through `components/consent/ConsentScripts.tsx` or a category-specific child component.
4. Keep server-rendered output free of optional scripts by default.
5. Turn `OPTIONAL_CONSENT_FEATURES_ACTIVE` on only when optional technology is genuinely active and gated.
6. Re-test first visit, accept, reject, withdraw, and version-change flows before deployment.

## Incrementing the consent version

1. Update `CONSENT_VERSION` in `lib/consent/config.ts`.
2. Document the material change in this audit.
3. Re-test the settings UI and first-visit behaviour.
4. If optional technologies become active, re-evaluate whether a first-layer banner is then required.
