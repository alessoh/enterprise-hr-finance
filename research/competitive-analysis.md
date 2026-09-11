# Competitive analysis — reference set for the Meridian gauntlet

Captured 2026-09-10 at 1440x900 (fold + full page) and 390x844 (mobile), headless Chromium, cookie/chat overlays removed.
Screenshots live in `research/refs/<site>/`. The blind-gauntlet reference list is `research/refs/manifest.json`.

Sites: Stripe, Attio, Anthropic, Ramp, Linear, Sierra, Rippling, Writer, Vercel, Harvey, Mercury, Deel, Brex, Glean, Decagon, Personio, Sana, Workday.

---

## A. Per-site analysis

### Stripe (stripe.com)
- **Nav**: Products ▾ · Solutions ▾ · Developers ▾ · Resources ▾ · Pricing | Sign in · **Contact sales** (filled pill). Product pages add a second-level in-page tab bar (Overview · Features · Payment methods · … · Docs) under a breadcrumb.
- **Hero**: left-aligned 2-col. Live eyebrow counter ("Global GDP running on Stripe: 1.7132…%"). H1 6 words ("Financial infrastructure to grow your revenue.") followed by a run-in sentence set in the same display size but in a gradient/lighter ink. CTAs: **Get started ›** (filled) + **Sign up with Google** (outline). Visual: animated WebGL gradient ribbon bleeding off the top-right, then a logo bar (Amazon, NVIDIA, Ford, Coinbase, Google, Shopify…).
- **Section sequence**: hero → logo bar → "Flexible solutions for every business model" bento of *real, localized product UI* (checkout in 3 currencies, usage meter, issuing, stablecoins) → dark video band (Sessions) → 4 big stats (135+ currencies, $1.9T, 99.999% uptime, 200M+ subscriptions) → "Powering businesses of all sizes" segmented by Enterprise / Startups / Platforms, each with story cards carrying metrics and "Products used" → professional services trio → quote carousel → dark developer band with API stats (500M+ req/day) → integration paths (no-code / platform / build) → news carousel → closing split CTA ("Start now" / "Contact sales" + "See what you'll pay") → mega footer.
- **Type**: Sohne. H1 ≈ 56px, -0.02em, leading ≈ 1.1. Navy ink (#0a2540), muted slate sub (#425466). Section titles pair a dark sentence with a lighter grey run-in sentence (the "two-tone sentence" device).
- **Color**: white / very light blue-grey canvas, navy text, one accent purple (#635bff) for primary CTAs and links, gradient only in the hero ribbon and section bands. Customer cards borrow the customer's brand colour as a tinted overlay.
- **Borders / shadows / radius**: hairline vertical guide columns (1px, dotted) framing the content grid on pricing and customers pages; cards 8px radius with a soft 1-level shadow; buttons fully rounded; diagonal (skewed) section dividers.
- **Motion**: gradient canvas, odometer counter, auto-advancing product tabs, subtle card hover lift. Nothing bounces.
- **Pricing**: "Pricing built for businesses of all sizes." Two cards: **Standard** (white; "2.9% + $0.30 per successful transaction", Get started) vs **Custom** (dark navy; IC+ pricing · volume discounts · multi-product discounts · country-specific rates, Contact sales). Then a sticky in-page tab bar (Standard pricing / Custom pricing / FAQs), "Features available out of the box", a very long per-product rate table with a sticky left index, an enterprise band, FAQs. Model: transactional take-rate with negotiated enterprise.
- **AAA because**: proof is real product UI, not illustration; strict single accent; hairline grid discipline; every customer card carries a number and the products used; the ticker makes scale tangible.
- **Weakness**: the hero headline is really a paragraph in display size; the page is 14,668px tall; the sales chat bubble sits on top of every page.

### Attio (attio.com)
- **Nav**: black announcement bar ("Orchestrate revenue agents with Workflows →") · Platform ▾ · Resources ▾ · Customers · Pricing | Sign in (outline) · **Start for free** (black).
- **Hero**: centered. Pill badge above ("GTM lessons from Elena Verna and more ›"). H1 4 words ("Welcome to agentic revenue.") ≈ 64px. Sub: one sentence, grey, 16 words. CTAs: **Talk to sales** (outline) + **Start for free** (black). Mobile swaps to an email field + "Send me a demo". Visual: a full-width product window (browser chrome with traffic lights) showing the CRM with the agent panel ("Ask Attio", meeting transcript, agent tool calls listed like a terminal: "Ran 3 commands ⎿ search-notes-by-metadata…").
- **Section sequence**: hero → logo row → "The intelligent system that never sleeps. Picks up leads at 2am. Catches renewals before they slip." with a 5-tab tour (Build pipeline / Convert leads / Run sales motions / Forecast revenue / Retain and expand), each tab = product UI + two small caption cards → "Live from day one" (inbox/calendar sync) → dark band "Universal Context™" with a feature grid → integrations icon row → "SDK. API. MCP. Build anything on Attio." → single large quote → "Run at any scale" 4 stats → "Trusted by 30,000+ customers" logos + photo → changelog cards → footer.
- **Type**: Inter-class grotesk, H1 ≈ 64px semibold with -0.03em tracking, body 16–18px grey (#6b6b6b). Small mono/caps labels on the dark band. Sentence-case everywhere; full stops on headlines.
- **Color**: white + near-black + 3 greys. Colour lives only inside the product UI; one light-blue ring marks the recommended pricing tier.
- **Borders / shadows / radius**: 1px hairlines (#e5e5e5), 12–16px radius, no drop shadows (flat), dotted-grid backgrounds behind product windows, "+" crosshair marks at grid intersections on pricing.
- **Motion**: scroll reveals, auto-advancing tabs, the agent transcript "types". Restrained.
- **Pricing**: "From zero to IPO." + "Designed for every stage of your journey. Start today, no credit card required." Monthly/Annual segmented toggle. Four cards: Free $0 · Plus $35 (Save 20%) · **Pro $79** (ringed, black button "Continue with Pro") · Enterprise Custom (Talk to sales). Below: a comparison table that opens with a **Credits** block — seat credits (100 / 500 / 1,000 / 2,500 per user/mo), workspace credits (250 / 1,500 / 10,000 / custom) and **add-on credit packs** (+5,000/mo $85 … +50,000/mo $595, annual discount shown) — then grouped feature rows (Workspace, Integrations, Automations, Email, Enrichment, Reporting, Security & admin, Support). Model: per-seat + bundled credits + credit packs — the closest analogue to Meridian's plan.
- **Product page** (/platform/workflows): eyebrow pill "Workflows", H1 "Revenue agents at your team's command.", one-line sub, Start for free / Talk to sales, right side a workflow node graph (Trigger → Web Agent → Custom Agent → branches) with green "Completed" chips on a dotted grid.
- **AAA because**: the calmest system in the set — black/white/hairlines/dotted grid — and the product UI does all the talking; credit economics are shown transparently; typographic scale is flawless.
- **Weakness**: hero sub copy is generic; the announcement bar + cookie banner eat 160px of fold; almost no outcome numbers on the home page.

### Anthropic (anthropic.com; claude.com for product/pricing/customers; trust.anthropic.com)
- **Nav**: Research ▾ · Policy · Commitments ▾ · Learn ▾ · News | **Try Claude** split button. claude.com: Meet Claude ▾ · Platform ▾ · Solutions ▾ · Pricing ▾ · Resources ▾ · Login · Contact sales (outline) · **Try Claude** (black), plus a thin breadcrumb bar ("Pricing … Explore here ▾").
- **Hero**: editorial 2-col on warm paper (#f4f1ea). Left: oversized sans H1 (9 words, two words underlined). Right: a serif paragraph (mission statement). **No CTA in the hero.** Below: one full-width rounded photo card (sky) with a serif headline ("Claude Fable 5.1 and Mythos 5.1"), sub, and a white "Read more →" pill.
- **Section sequence** (short page, 3,195px): hero → feature card → "Latest releases" 3 tan cards with DATE / CATEGORY meta rows and black "Read announcement →" buttons → mission statement + list of links (title | category) → black mega footer.
- **Type**: sans (Styrene-like) for headlines, serif (Tiempos-like) for body and quotes. Big sizes, generous leading, tight measure. The serif/sans pairing is the signature.
- **Color**: warm off-white, black, terracotta (#d97757) as the single accent (Ask Claude button, trust-center banner), tan panels, one muted blue image. Hand-drawn black line illustrations on product pages.
- **Borders / shadows / radius**: 12–24px radius, no shadows, flat tan panels, thin rules between list rows.
- **Motion**: essentially none.
- **Pricing** (claude.com/pricing): serif "Pricing" centered; segmented control Individual / Team & Enterprise / API; three cards Free $0 · Pro $17 (annual, $20 monthly) · Max from $100, each with a small line-art glyph, black full-width "Try Claude", check list. Model: per-seat tiers + API usage tab.
- **Product page** (claude.com): serif "Meet your thinking partner", one-line sub, an inline prompt field ("How can I help you today?" + terracotta "Ask Claude ↑"), line-art illustration.
- **Security**: trust.anthropic.com is a real trust center — terracotta banner, tabs (Overview / Resources / Subprocessors / FAQ / Updates), a compliance matrix by product (SOC 2 Type 2, ISO 27001, ISO 42001, CSA STAR, HIPAA, NIST 800-171, FedRAMP, DoD IL4/IL5), "Request access" for documents.
- **Customers** (claude.com/customers): serif "Meet the teams building what's next", left filter rail (Sort · Industry · Product · Size · Partner · Geography), story search, grid/list toggle, logo tiles with outcome-style titles ("Pictet turns weeks of work into hours").
- **AAA because**: unmistakable editorial voice; warm palette nobody else uses; restraint (no hero CTA, no hero product shot); the trust center is a matrix, not a badge wall.
- **Weakness**: the corporate home is not a SaaS funnel (no product proof, no CTA); the anthropic.com / claude.com split fragments navigation.

### Ramp (ramp.com)
- **Nav**: black announcement bar ("New: AI Token Spend Management…") · Products ▾ · Partners ▾ · Solutions ▾ · Resources ▾ · Customers · Pricing | Sign in · **See a demo** (lime) · **Get started** (black).
- **Hero**: left-aligned. Live eyebrow in small caps ("US CORPORATE PAYMENTS PROCESSED BY RAMP: 0.8718257%", odometer digits). H1 5 words ("Time is money. Save both.") ≈ 64px. Sub 11 words. Email field + **Get started for free** (lime). Visual: a large product-UI card (invoice/reporting) with floating annotation cards ("MATCHING TO P.O.", "SCANNING FOR FRAUD", "AUTO-CODING") on a dotted grid. A **sticky bottom ticker** — "AGENTS AT WORK TODAY: Receipts processed 2,235,304 · Agent interactions 1,656 · Expenses reviewed 312,380 · Invoices processed 68,507 · Violations classified 3,708" — with live counters.
- **Section sequence**: hero → "Join 70,000 companies growing 3.2x faster" logos + video card ("$1M+ saved") → "One platform for all of finance. Agents for every workflow, working 24/7." bento of 5 product cards → dark "See recommendations for your business" (paste your website URL) → "Systems that never spoke" (five-tools illustration) → "Built on the intelligence of 70k+ finance teams" → Stack video → three alternating story blocks, each a quote + the agent that did the work (Policy Agents…) → "See what agents can automate" CTA → "Scale the team. Shrink the paperwork." pair → testimonial wall ("We've got the receipts") → closing CTA → mega footer + legal disclosures.
- **Type**: Inter-class grotesk, H1 ≈ 64px medium, -0.02em; small-caps mono-ish eyebrows; body grey. Headlines are short declaratives with periods.
- **Color**: off-white (#f7f7f5) canvas, black, **one accent lime (#e4f222)**. Product UI is greyscale with lime highlights. Beige (#e8e5de) panels on the security page.
- **Borders / shadows / radius**: 1px hairlines, 8–12px radius, flat, dotted-grid backgrounds, black footers; annotation cards use a 1px border with corner dots.
- **Motion**: odometer counters, floating annotation cards, the ticker. Purposeful — every animation is a number.
- **Pricing**: "Start for free. Scale with Intelligence." Three cards with tab-style labels above them (AI-assisted / **AI-powered** / AI-tailored): Free $0/mo/user · Plus $15/mo/user + platform fee (lime ring, "Save 20% with annual billing") · Enterprise custom. Each card carries its own email field + CTA, then long grouped feature lists and "View all features". Model: per-seat + platform fee; enterprise negotiated.
- **Security**: "Peace of mind at every step" + SSO tiles (Google, Okta, Azure) on beige panels; SSO / access sections.
- **Customers**: "Customer Stories" set as full-width display type; "70,000+ companies…" logo marquee; large video/photo story cards.
- **AAA because**: live numbers make "agents at work" tangible; single accent; the product UI is the proof; hairline system is consistent; copy is short and declarative.
- **Weakness**: 9,960px of sections; promotional CTAs ("Claim your $150"); disclosure-heavy footer.

### Linear (linear.app) — dark theme (excluded from light-mode manifest categories)
- **Nav**: Product · Resources · Customers · Pricing · Now · Contact | Log in · **Sign up** (white pill).
- **Hero**: left. H1 8 words ("The product development system for teams and agents") ≈ 64px, -0.03em. Sub 12 words. No button in the hero (CTA lives in the nav); a small "New · Loops →" link sits right. Visual: full-width product UI with the agent panel ("Linear · Opus 5", "Worked for 10 sec", diff summary).
- **Section sequence**: hero → logos (OpenAI, Vercel, Figma, Cursor, Coinbase, Ramp) → "A new species of product tool." three isometric line drawings captioned "Fig 0.1–0.3" (Purpose-built / Powered by agents / Designed for speed) → four capability chapters (Intake and integrations · Planning and monitoring · AI and automations · Build, review, and ship), each: 2-col heading, product-UI collage, "Features" link list → changelog cards → two coloured quote cards (blue, chartreuse) → "Built for the future. Available today." CTAs → footer.
- **Type**: Inter Display; H1 tight; section titles ≈ 40px; body in muted lavender-grey. Sentence case, periods.
- **Color**: #08090a canvas, white text, desaturated purple-greys, one blue for toggles; colour only in the two quote cards.
- **Borders / shadows / radius**: 1px borders at ~8% white, 8px radius, no shadows; product UIs framed with a 1px edge.
- **Motion**: gentle reveals; agent panel "works".
- **Pricing**: left-aligned "Pricing"; four columns separated by vertical hairlines (Free $0 · Basic $10 · Business $16 · Enterprise custom), per-column "Billed yearly" toggle, check lists that include "Agent platform" and "Linear Agent" on Free. Model: per-seat.
- **Product page** (/agents): eyebrow "Linear for Agents", H1 "Artificial colleagues. Natural collaboration.", sub, **▶ Watch example**, a horizontal row of agent chat panels.
- **Security**: "Safe, secure, and private." centered + compliance grid (SOC 2, GDPR, HIPAA, ISO 27001) with "Request SOC 2 →" links.
- **Customers**: "Customers" + category tabs (Featured · SaaS · AI · Fintech · …) + 3-col cards with outcome titles ("The coding agent behind 75% of Ramp's merged PRs").
- **AAA because**: typographic precision; agents shown inside the real product; one 1px system everywhere; every card title is a result.
- **Weakness**: dark-only; hero has no explicit CTA; the isometric drawings are decorative.

### Sierra (sierra.ai)
- **Nav**: blue announcement bar (Sierra Summit) · Product · Industries · Customers · Company | Sign in · **Learn more** (dark-green pill). Green logotype.
- **Hero**: full-bleed video still (person on the phone). H1 5 words, white ("Better outcomes. Built on Sierra."). One white pill "Learn more". On mobile a floating agent bubble ("Sierra Agent — Hi, how can I assist you today?") sits over the video.
- **Section sequence**: hero → "Leading brands succeed with Sierra" logo grid → "Standout customer experiences. Stronger growth." one large green card + three coloured cards (Empower every team / Unify your channels / **Pay for a job well done**) → "The results speak for themselves" four quote cards with logos → (large empty dotted spacer) → "The agent-building agent" (Ghostwriter) → "Use AI to improve your AI" (Explorer / Monitors / Experiments / Observability) → "Turn conversations into outcomes" (Long-horizon planning / Customer context / Outcome optimization / Proactive engagement) → "Trust and reliability" badge row → CTA → footer.
- **Type**: light-weight humanist grotesk; H1 ≈ 64px light; centered section titles ≈ 36px; grey subs. Calm, low-contrast weights.
- **Color**: white canvas, forest green primary, blue bar, and four saturated card colours (green/blue/purple/orange) — more colour than peers but confined to cards.
- **Borders / shadows / radius**: 24px+ radius photo cards, soft edges, no visible borders.
- **Motion**: video; gentle.
- **Pricing**: no pricing page (404). Pricing is a message ("Pay for a job well done" — outcome-based), not a table.
- **Product** (/product/ghostwriter): H1 "Ghostwriter" + grey sub "The agent-building agent"; one giant rounded photo card with a prompt UI.
- **Security** (/product/trust-and-reliability): title + grey sub; blue card with an "Encrypted" lock animation.
- **Customers**: "Our customers in their own words" + full-bleed video testimonial (Chief Product and Design Officer, Redfin).
- **AAA because**: cinematic photography, light grotesk, outcome-led copy, the agent shown in situ as a chat bubble.
- **Weakness**: almost no product UI; abstract hero; a large blank spacer mid-page; no pricing transparency.

### Rippling (rippling.com)
- **Nav**: lavender announcement bar → dark plum nav: Products ▾ · Platform ▾ · Solutions ▾ · Global ▾ · Resources ▾ · Pricing | EN · Login · **See a demo** (orange).
- **Hero**: dark plum gradient. G2 eyebrow ("4.8 stars · 13k+ reviews"). H1 7 words, white, bold ("Manage your entire workforce on one system"). Sub 2 lines. **Create free account** (orange) + "Take a product tour". Row of review badges (Software Advice, PC Magazine, Capterra). Visual: photographed tablet with product UI. A Qualified chat popup ("Hey there! 👋") auto-opens over the hero.
- **Section sequence** (partial): hero → badges → product pillars → AI band ("AI that isn't all talk") → … (long).
- **Type**: geometric grotesk, H1 ≈ 56px bold, tight; white on plum.
- **Color**: dark plum/maroon + orange + white; gradients and 3D renders (coins on the payroll page).
- **Borders / shadows / radius**: 4px radius (square-ish buttons), flat panels.
- **Motion**: 3D coin parallax; auto-opening chat.
- **Pricing**: quote-only. "The platform for companies that want to grow faster" + a 6-field quote form ("Get my free quote"); no prices; review badges.
- **Product** (/payroll): dark plum, 3D coins, "Cut hours of manual payroll work with AI", tablet UI showing an AI prompt ("Add commission to these employees" → "Would you like to proceed?").
- **Security**: "Data security is our top priority" centered, lock icon, two CTAs, phishing-notice band.
- **Customers**: "Customer stories" + horizontal photo-card carousel.
- **AAA because**: strong ownership of one brand colour; social-proof density; AI shown as a confirm-before-act prompt.
- **Weakness**: dark, busy heroes; aggressive lead-gen; quote-only pricing; dated 3D.

### Writer (writer.com)
- **Nav** (black): Product ▾ · Solutions ▾ · Research · Plans · Customers · Resources ▾ | Log in · **Try for free** (indigo pill). Condensed heavy wordmark.
- **Hero**: centered on black. Caps eyebrow "ENTERPRISE AI PLATFORM". H1 12 words ("From first touch to close. AI agents for marketing and revenue teams."). Email field + **Request a demo** (indigo). Visual: person cut-out over a holographic gradient, flanked by "PLAYBOOK" cards (Account intelligence playbook / Competitive digest playbook) that list agent steps as check items — agents made concrete as playbooks.
- **Section sequence**: hero → logos (Uber, Salesforce, KPMG, Dropbox, Vanguard…) → "Always on, across marketing and revenue" (infinity diagram) → "Not a tool you prompt. An agent you delegate to." → "Your company's DNA, encoded in AI agents." four cards (Playbooks / Connectors / Voice & style guide / Skills) → "Measurable outcomes from leading enterprises" (KPMG 70%, Vanguard 57%) → "Same team. Exponential impact." three alternating rows → "Your IT and technology teams, on board from day one." → resources → CTA → footer. Black throughout.
- **Type**: geometric sans (Poppins-like) heavy; a serif display appears only on Plans/Customers/Trust titles ("Plans & Pricing") — inconsistent.
- **Color**: black + indigo (#5551ff) + holographic gradients + lilac blocks.
- **Borders / shadows / radius**: 24px cards, white cards on gradients.
- **Motion**: gradients; modest.
- **Pricing** ("Plans"): two cards, no prices. Starter (Try for free, 14-day trial; up to 5 users, WRITER Agent, 5 Playbooks, basic connectors) vs Enterprise (Contact sales; unrestricted playbooks, orchestration + approvals + admin controls, full Knowledge Graph, **granular agent governance, observability, auditability**).
- **Security**: "World-class enterprises trust WRITER" + Contact us / Visit Trust Center + logos + 3 cards.
- **Customers**: "Built for enterprises and *loved* by champions" + KPMG video card + filters (Industry / Department / Use case / Feature) + tinted case-study cards with logos.
- **AAA because**: agents made legible as playbooks with visible steps; outcome percentages tied to logos; governance named in pricing.
- **Weakness**: heavy, dark, marketing-loud; 12-word headline; serif/sans inconsistency; gradient overload.

### Glean (glean.com)
- **Nav**: navy announcement bar (Glean:GO replays) · Product ▾ · Customers ▾ · Solutions ▾ · Resources ▾ · Company ▾ | site search field · Sign in · **Get a demo** (blue pill with an iridescent glow ring). The Product mega-menu exposes the whole agent story: Glean Enterprise Context · Connectors & actions (250+) · Glean Protect · Glean Intelligence (Auto routing, Model hub, Usage controls, AI gateway) · Glean Assistant · **Glean Agents (Agent builder, Agent orchestration, Agent governance, Agent library)**.
- **Hero**: centered. Mono eyebrow ("Enterprise AI that understands your company"). H1 9 words ("Complete context that makes AI work at enterprise scale."). One CTA, **Get a demo** (black pill). Visual: full-width iridescent 3D render with an embedded product UI (prompt bar + connector chips: Slack, Google Drive, Jira, Confluence, SharePoint, GitHub, Salesforce).
- **Type**: rounded geometric sans, H1 ≈ 56px regular weight; mono eyebrows; generous line-height.
- **Color**: white canvas + Glean blue (#343ced) + pink/blue/purple iridescence; the primary button carries a rainbow halo.
- **Borders / radius**: 24px rounded media; pill buttons; soft shadows on UI cards.
- **Pricing**: `/pricing` resolves to the home hero — no public pricing.
- **Product** (/product/agents): mono eyebrow "Glean Agents", H1 "Scale agents like enterprise software.", sub "Turn agent sprawl into agents that scale and deliver measurable ROI…", **Get a demo**; right: UI collage — Enterprise graph / Personal graph, "Builder assistant" Q&A, and an agent "Instructions" card structured as **What I do / How I work / What I need from you**.
- **Security** (/security) exists; **Customers** (/customers) returned a non-200 (stories live under /customers/<slug>).
- **AAA because**: agent governance is a first-class nav item; the agent instruction card is a legible, reusable pattern; one blue.
- **Weakness**: an Osano cookie wall + announcement bar on every page; the iridescent render is decorative; no pricing.

### Mercury (mercury.com)
- **Nav**: light announcement bar (ChatGPT plugin) · Products ▾ · Solutions ▾ · Resources ▾ · About ▾ · Pricing | Log in · **Open account** (periwinkle pill, #5266eb).
- **Hero**: full-bleed cinematic photograph (a desk on a misty hillside). Centered white H1, 3 words ("Radically different banking"). Sub 1 sentence with a footnote marker. Email field + **Open account** + **Launch demo** (glass pill). A floating bottom pill carries the regulatory disclosure — the cleanest disclosure treatment in the set.
- **Home full page**: the scroll-driven sections do not paint in a full-page capture (black void between hero and footer) — excluded from the manifest.
- **Type**: neo-grotesk, H1 ≈ 64px medium; everything centered.
- **Color**: white + one periwinkle accent + photography; dark navy only on the security page.
- **Borders / radius**: pills for inputs and buttons, 16px product frames, soft gradient mats behind UI.
- **Pricing**: "Pricing that fits your business" + "Banking services and essential tools are always $0/mo — with more plans available as your business grows." One bordered container labelled COMPARE PLANS with an "Annual Pricing (15% off)" toggle; three columns Mercury $0/mo · Mercury Plus $29.90/mo · Mercury Pro $299/mo; the filled button only on the free column; "Jump to section" links inside the first column; "Everything you get with a Mercury account, plus:" lists. Model: flat monthly tiers.
- **Product** (/bill-pay): centered H1 "Simplify with bill pay and banking in one", sub, email + Open account + Contact sales, a large Bill Pay dashboard in a soft gradient frame.
- **Security**: dark navy radial hero "Banking with built-in peace of mind" + lock mark; same CTA row.
- **AAA because**: cinematic restraint; centered composition discipline; disclosure as a floating pill; a crisp single-container pricing table.
- **Weakness**: the hero says nothing about the product; scroll-jacked sections; product UI is small in the fold.

### Personio (personio.com)
- **Nav**: Platform ▾ · Solutions ▾ · Pricing · Resources ▾ · About ▾ | EN ▾ · Login · **Book your demo** (black pill).
- **Hero**: centered. G2 eyebrow ("Mid-Market Leader for Core HR · Summer 2026"). H1 4 words, ≈ 72px ("The intelligent HR platform"). Sub 1 sentence. Email + **Request free demo** (black). "Trusted by 1.5M+ employees at over 16,000 organisations" logo ticker. A violet radial glow. Then product-category pills (Core HR · **AI & Analytics** · Payroll · Talent Management · Performance & Development) switching a large product UI (Headcount analytics with an "Assistant" side panel).
- **Section sequence**: hero + tabbed product UI → "Built for how HR really works" (Core HR / Apps / Payroll cards + 200+ integrations) → "HR doesn't stand still. Neither should your HR platform." tabs by company size (Growth / Scale / Enterprise / International) → "Trusted by HR teams across Europe" video + quote → dark-blue "Compliance built for European organisations" (GDPR, hosting, ISO badges) → "Real-time answers. Better decisions." (AI Assistant chat UI + six use-case tiles + demo/tour CTAs) → **inline pricing** ("Pricing that adapts as your business grows", Core vs Core Pro) → "Switch with confidence, from day one" (implementation timeline) → "HR evolves. So do we." (updates) → "Explore Intelligent HR" CTA pair → brown footer.
- **Type**: geometric grotesk, H1 ≈ 72px semibold, body 18px; centered section titles with small caps eyebrows.
- **Color**: white + violet glow + black CTAs + lavender tints; dark blue for compliance; brown footer. G2 badge colours leak in.
- **Borders / radius**: 12–16px cards, pill CTAs, soft shadows, glassy product frames.
- **Pricing**: "Plans that scale with you" + "Tailored HR solutions designed to grow with your business." G2 badge row; two cards **Core** vs **Core PRO** (MOST POPULAR), both "Book a demo", "Includes… / Everything in Core, plus…"; the price ("Starts from €7.60 per month/employee") is in the copy, not the cards. Model: per-employee, demo-gated.
- **Product** ("AI at Personio"): a dark-purple microsite with its own sub-nav (AI Assistant · Trust · How it works · Customers · Capabilities · Roadmap), glowing logo, "EST. 2015 / MADE IN MUNICH", two-tone H1 "One intelligent platform. For the next era of HR."
- **AAA because**: hero hierarchy is textbook (eyebrow → 4-word H1 → 1-line sub → single form → proof ticker → product); category tabs inside the hero; compliance addressed for the buyer's geography; pricing surfaced on the home page.
- **Weakness**: violet glow everywhere; 12,700px page; the AI page abandons the light system for a dark microsite.

<!-- Sections for Vercel, Harvey, Deel, Brex, Decagon, Sana, Workday are appended below once captured. -->
