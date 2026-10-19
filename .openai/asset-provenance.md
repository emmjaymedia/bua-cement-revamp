# BUA Cement homepage assets

Retrieved 16 October 2026 from the company website, https://www.buacement.com/, for a private redesign preview authorized by the user, who supplied legacy page references. Logo retained without redrawing. Photos resized and converted to WebP. Product transparency preserved.

- logo.png: /images/logo.png
- industrial-hero.webp: /images/operation_banner.jpg
- hero.webp: /images/hero_banner_one.png (AGM)
- people.webp: /images/strong.png
- environment.webp: /images/sustainability.png
- plant-edo.webp: /images/edo_det.png
- plant-sokoto.webp: /images/sokoto_det.png
- office.webp: /images/lagos_det.jpg
- logistics.webp: /images/product20241127155356.jpg
- product.webp: /wp-content/uploads/2020/12/slide3-1.png
- news-farming.webp: /images/press/press_release_108m_farmInputs-A20260702093456.jpg
- news-environment.webp: /images/press/IMG_441420260611101638.jpg
- news-people.webp: /images/press/about_us_banner20260724041010.jpg
- Nigeria state map: inline SVG from corporate homepage. Bundled as reviewed markup with accessible selection controls outside the SVG.

Corporate link destinations were read from the homepage navigation. Inner pages remain on the existing corporate website during this homepage-only phase. No live financial feed or form submission is simulated. News dates are from supplied/source content; titles are editorial summaries, not new company announcements.

## Interactive globe
Land geometry from Natural Earth, ne_110m_land.geojson, retrieved 16 October 2026 from https://github.com/nvkelso/natural-earth-vector (public-domain geographic data). Derived land points and coastlines bundled locally in lib/world-geography.json. Orthographic globe implemented in Canvas 2D, with geographic rotation and camera easing. Nigeria remains the reviewed state SVG, with approximate city markers and location list.

## Market data and social links
Use the public NGX issuer EOD JSON feed already embedded by the existing BUA Cement website; upstream fields validated as Symbol, Last, Change, PerChange, TradeDate and Timestamp. New route /api/market-quote requests it server-side. The UI refreshes every five minutes and on tab visibility; it labels the data end-of-day, uses the source trading date, and never labels a fetch time as a trade timestamp. No hardcoded price fallback. Public social destinations copied from the legacy website: Facebook, Instagram, X, YouTube, LinkedIn and TikTok.

## Who We Are stack
Three source images matched to supplied October 16 references: Strong Financials → /images/strong.png (existing people.webp); Our Leadership → /images/team.png (leadership.webp); Sustainability → /images/sustainability.png (existing environment.webp). Destinations retain original company URLs /financialreport, /leadership, /sustainability. Sticky overlap follows the supplied four-second recording, with pointer-responsive imagery and keyboard-accessible full-card links.

## Inside BUA Cement carousel
Expanded from three to ten stories using the original BUA homepage article metadata, exact /pressreleases destinations and seven additional original article images. New cards match the AGM, distributors awards, NGX compliance award, CBMI signing, equipment training and revenue stories in the supplied 16.50.35 and 16.50.57 screenshots. Carousel uses Embla, loops every 5.5 seconds, supports arrows/swipe and pause, and suspends autoplay on hover, keyboard focus, hidden tabs, off-screen views and reduced motion.

## About page — 17 October 2026
Layout informed by user-supplied Coca-Cola and legacy BUA About screenshots. Coca-Cola branding and copy are not reused. Company facts and R.I.C.E. values checked against https://www.buacement.com/aboutus, /company-profile, /history, /merger and /leadership. Portraits from the official leadership page: leader-rabiu.webp from /images/board/abdulsamad.jpg; leader-binji.webp from /images/board/eng_yusuf.jpg; leader-ajaero.webp from /images/board/Chikezie-2023@1.5x.jpg; leader-satomi.webp from /images/board/hauwa_satomi.jpg. Converted to WebP. Other photos reuse the original assets listed above. About is now local at /about with /aboutus redirect; other unfinished pages retain corporate destinations.

## Company overview copy — 17 October 2026
Replaced the two-paragraph overview on /about with the full 13-paragraph company history explicitly supplied by the user in the annotated revision. Preserved the supplied wording, historical figures and ordering; this revision is supplied corporate copy, not a new independent verification of its current-capacity or ranking claims.

## Remaining corporate pages — 17 October 2026
Expanded the redesign to 81 additional local content routes: corporate/category pages, 15 leadership biographies (including the chairman sourced from the leadership overview), 31 press-release articles, five galleries and three archived job descriptions. Text, document destinations and photography captured from each page’s original www.buacement.com URL, stored in lib/corporate/pages.json. Capture date: 17 October 2026. Source relationships and image URLs are retained in lib/corporate/image-sources.json; 167 original images were optimized as local WebP files. The supplied image(20261017-163106).png is the legacy Operations screenshot, reviewed as content/layout evidence.

Rebuilt page families in the current editorial red/gold/cream visual system, with shared responsive navigation and footer, report year/search filtering, article topic/search filtering, expandable investor FAQs, photo viewer, city/state depot search and email-draft enquiry composition. No original third-party scripts, tracking or chatbot copied. Corporate information retains its source context; old job descriptions are explicitly closed (source closing date 7 November 2025), not presented as current vacancies. Downloads (including 13 earnings-call MP3 recordings) remain direct links to original company files. Enquiries open a real email draft and never claim to have been submitted; no new backend submission service is implied. Stock data remains the existing source-dated NGX feed. Source content is statically bundled, not scraped at request time.

Verified TypeScript, production build and programmatic local route/image/document/anchor inventory. Browser visual QA was unavailable in this environment.

## History timeline — 17 October 2026
Recreated /history with the eight original 2008, 2009, 2015, 2017, 2018, 2020, 2021 and 2022 milestones, their full descriptions and their corresponding original photos (/images/2008.png, /images/2022.png for the original acquisition card, /images/2015.png, /images/2017.png, /images/2018.png, /images/2020.png, /images/2021.png and /images/2022.png). Data retained in lib/corporate/history.json. User reference image(20261017-170810).png informed alternating cards, centre spine and date markers. New implementation adds scroll reveal, scroll progress, active-year links, mobile single-column layout and reduced-motion handling. Original historical copy is preserved in its dated context.

## Shared Connect with us — 17 October 2026
User reference Screenshot 2026-10-17 at 18.24.51.png shows original Connect With Us image, newsletter fields, Linktree and social channels. Rebuilt as a shared editorial section directly before the footer on all inner pages; homepage explicitly opts out to match the requested legacy placement. Original social_img.png is requested for the local connect-people.webp photograph, with the already-sourced team photograph as fallback. Shared verified social destinations are reused, including Linktree. The original subscribe anchor has no endpoint. The new validated name/email/consent form opens a subscription-request email to info@buacement.com; it states that the team will confirm the subscription, without faking a successful signup. Newsletter API integration remains for the .NET backend phase.

## Operations product presentation — 17 October 2026
User reference image(20261017-174337).png requests the legacy product description, clearly visible full product bags and three product actions in a modern balanced layout. Rebuilt Operations content with dedicated facility cards and a separate product presentation. Original /images/bua_cement.png and /images/sokoto_cement.png are saved as product-bua.webp and product-sokoto.webp with original alpha transparency preserved; object-fit:contain prevents cropping. Product copy is based on the original Operations page and actions lead to the original Quality Policy PDF and local distributor/depot sections. The prior generic importer flattened alpha onto black; these display assets correct that issue without altering product artwork.

## Edo and Sokoto plant pages — 17 October 2026
References image(20261017-181805).png and image(20261017-181839).png show the original Edo and Sokoto page structure: introduction, plant information/video, location, production capacity by line, completion dates and at-a-glance features. Rebuilt both as dedicated responsive pages with local section links, video dialog, structured capacity/completion cards, full feature lists, four-photo galleries and cross-plant navigation. Plant facts and completion dates are retained from the original plant profiles, with dated profile context. The conflicting Edo power figures in the original profile (50MW introductory copy and 78MW feature list) are not repeated; the redesign describes gas-power infrastructure without inventing a reconciliation.

Plant video IDs Q2wFxnSYmx8 (Edo) and Cw-O85NZ7Y0 (Sokoto) come from the original pages’ video-player scripts. Videos load only after a visitor chooses Play, in a native dialog with close/focus restoration and a direct YouTube fallback. Original edo_video.jpg and sokoto_video.jpg posters are downloaded and optimized locally. Source image associations are in lib/corporate/plant-images.json; all gallery photographs reuse the captured original plant images.
