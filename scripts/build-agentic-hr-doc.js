/**
 * Generates "Agentic HR — Claude Code Build Prompt" as a Word document.
 *
 * House style for this document: narrative prose, no bullet lists, no em dashes.
 * Tables are used only for reference data that is genuinely tabular.
 *
 * Run: node scripts/build-agentic-hr-doc.js
 */
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  PageBreak, PageOrientation, Header, Footer, PageNumber, TabStopType,
} = require("docx");

const INK = "1B1B1F";
const MUTED = "55555F";
const ACCENT = "1B4DB1";
const RULE = "D9D9DF";
const BAND = "F4F4F7";
const WARN = "8A5A00";
const CONTENT_W = 9360; // US Letter minus 1in margins each side, in DXA

// ---------------------------------------------------------------- helpers
const P = (text, opts = {}) =>
  new Paragraph({
    spacing: { before: opts.before ?? 0, after: opts.after ?? 160, line: opts.line ?? 276 },
    alignment: opts.align,
    indent: opts.indent,
    border: opts.border,
    shading: opts.shading,
    children: [
      new TextRun({
        text,
        size: opts.size ?? 21,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? INK,
        font: opts.font ?? "Calibri",
      }),
    ],
  });

/** Paragraph built from alternating plain/bold segments: rich(["plain ", ["bold"], " plain"]) */
const rich = (parts, opts = {}) =>
  new Paragraph({
    spacing: { before: opts.before ?? 0, after: opts.after ?? 160, line: 276 },
    shading: opts.shading,
    border: opts.border,
    children: parts.map((p) =>
      Array.isArray(p)
        ? new TextRun({ text: p[0], bold: true, size: opts.size ?? 21, color: opts.color ?? INK, font: "Calibri" })
        : new TextRun({ text: p, size: opts.size ?? 21, color: opts.color ?? INK, font: "Calibri" }),
    ),
  });

const H1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    keepNext: true,
    keepLines: true,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, size: 30, bold: true, color: INK, font: "Calibri" })],
  });

const H2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    keepNext: true,
    keepLines: true,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, size: 25, bold: true, color: INK, font: "Calibri" })],
  });

const H3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    keepNext: true,
    keepLines: true,
    spacing: { before: 260, after: 120 },
    children: [new TextRun({ text, size: 22, bold: true, color: ACCENT, font: "Calibri" })],
  });

const CODE = (text) =>
  new Paragraph({
    spacing: { before: 60, after: 160, line: 240 },
    shading: { type: ShadingType.CLEAR, fill: BAND },
    indent: { left: 200, right: 200 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      left: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      right: { style: BorderStyle.SINGLE, size: 2, color: RULE },
    },
    children: [new TextRun({ text, size: 18, font: "Consolas", color: INK })],
  });

const NOTE = (label, text) =>
  new Paragraph({
    spacing: { before: 160, after: 200, line: 276 },
    shading: { type: ShadingType.CLEAR, fill: "FFF6E5" },
    indent: { left: 160, right: 160 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "E8C77A" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "E8C77A" },
      left: { style: BorderStyle.SINGLE, size: 12, color: "C9922B" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "E8C77A" },
    },
    children: [
      new TextRun({ text: `${label}  `, bold: true, size: 20, color: WARN, font: "Calibri" }),
      new TextRun({ text, size: 20, color: INK, font: "Calibri" }),
    ],
  });

const RULE_P = () =>
  new Paragraph({
    spacing: { before: 120, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE } },
    children: [new TextRun({ text: "", size: 2 })],
  });

function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const scale = CONTENT_W / total;
  const w = widths.map((x) => Math.round(x * scale));
  const cell = (text, width, opts = {}) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      shading: opts.head ? { type: ShadingType.CLEAR, fill: BAND } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [
        new Paragraph({
          spacing: { before: 0, after: 0, line: 240 },
          children: [
            new TextRun({
              text,
              size: opts.head ? 17 : 18,
              bold: opts.head || opts.bold,
              color: opts.head ? MUTED : INK,
              font: opts.mono ? "Consolas" : "Calibri",
            }),
          ],
        }),
      ],
    });
  return new Table({
    columnWidths: w,
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: RULE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => cell(h, w[i], { head: true })),
      }),
      ...rows.map(
        (r) =>
          new TableRow({
            children: r.map((c, i) =>
              cell(typeof c === "object" ? c.t : c, w[i], {
                mono: typeof c === "object" ? c.mono : false,
                bold: i === 0,
              }),
            ),
          }),
      ),
    ],
  });
}

const SPACER = (after = 200) => new Paragraph({ spacing: { after }, children: [new TextRun("")] });

// ---------------------------------------------------------------- content
const body = [];

// Cover
body.push(
  new Paragraph({
    spacing: { before: 1400, after: 80 },
    children: [new TextRun({ text: "AGENTIC HR", size: 20, bold: true, color: ACCENT, font: "Calibri", characterSpacing: 60 })],
  }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "Claude Code Build Prompt", size: 52, bold: true, color: INK, font: "Calibri" })],
  }),
  RULE_P(),
  P(
    "A complete, executable brief for building an AI native HR and finance platform with twelve cloud hosted agents, real onboarding and subscriptions, and no fabricated data of any kind.",
    { size: 24, color: MUTED, after: 300 },
  ),
  P("Prepared for Peter Alesso", { size: 21, color: MUTED, after: 40 }),
  P("14 September 2026", { size: 21, color: MUTED, after: 600 }),
  P(
    "Part One explains the three decisions you must make before running the prompt, and what the research found. Part Two is the prompt itself, written to be pasted into Claude Code without further editing.",
    { size: 20, color: MUTED },
  ),
  new Paragraph({ children: [new PageBreak()] }),
);

// ---------------------------------------------------- PART ONE
body.push(H1("Part One. Read this before you run the prompt"));

body.push(H2("What this document is"));
body.push(
  P(
    "The previous build produced a site called Meridian that looked strong but carried six defects you identified: only two agents ran and both depended on a model on your laptop, the customer section invented eight companies that do not exist, the menu was cluttered, typography drifted, the name was wrong, and it was never measured against the incumbent it has to beat.",
  ),
);
body.push(
  P(
    "This prompt fixes all six by construction rather than by later correction. It was written after twelve research agents examined the live Workday site, the OpenRouter model catalogue, current Supabase and Stripe integration patterns, Vercel execution limits, public data sources that can be used lawfully, and the navigation of eleven competing products. Four adversarial critics then attacked the result looking for gaps, and what they found is folded in. Their most useful contributions were the things nobody had specified: what happens when the model API key runs out of credit, who is allowed to call the endpoint that spends money, and what physically occupies the part of the homepage where a normal company puts customer logos.",
  ),
);

body.push(H2("Decision one. The name collides with Workday's own copy"));
body.push(
  NOTE(
    "Verify before you commit.",
    "Workday's artificial intelligence page currently uses the exact phrase Agentic HR as a section heading, alongside Agentic Finance and Agentic IT. The name you have chosen is therefore a phrase your largest competitor already uses in its own marketing to describe a category.",
  ),
);
body.push(
  P(
    "This is not necessarily fatal and it may even be an advantage, because the phrase is descriptive and immediately understood. It does carry two risks worth weighing. The first is legal, since a descriptive term used by an incumbent may still be contested, and I am not qualified to advise on trademark availability, so a search through counsel is the sensible step. The second is positional, because a challenger named after a category heading in the leader's own copy can read as derivative rather than as an alternative.",
  ),
);
body.push(
  P(
    "The prompt uses Agentic HR throughout, as you instructed. If you would rather differentiate, changing one line at the top of the prompt changes the name everywhere, and I have written it so that no other edit is required.",
  ),
);

body.push(H2("Decision two. Vercel plan tier, which is a deploy time failure and not a preference"));
body.push(
  P(
    "Twelve agents running continuously in the cloud requires scheduled execution, and on Vercel that means cron. The Hobby plan limits cron to once per day and rejects a more frequent expression at deploy time rather than degrading quietly, so a schedule written for hourly sweeps will simply fail to deploy. Hobby also caps function duration at three hundred seconds with no extension available.",
  ),
);
body.push(
  P(
    "The prompt therefore assumes the Pro plan at twenty dollars per month and states this explicitly so the build does not discover it late. It also includes a Hobby safe fallback in which agents run on a single daily sweep and on demand, in case you would rather not upgrade. Choose one before you start, because the two produce different schedule files.",
  ),
);

body.push(H2("Decision three. Accounts to provision, and who holds each key"));
body.push(
  P(
    "Four accounts are needed and all four have free or low cost entry tiers. You will need an OpenRouter account with a small credit balance, since the free model variants are rate limited to twenty requests per minute and fifty per day until ten dollars of credit is purchased, and several of them do not support the structured output the agents depend on. You will need a Supabase project, a Stripe account in test mode, and a Vercel project.",
  ),
);
body.push(
  P(
    "One rule matters more than the others. The OpenRouter management key, which can mint further keys and read your balance, must never be added to Vercel. Only a scoped inference key with a hard monthly limit belongs in the deployment, and the prompt instructs the build to set that limit rather than leaving it uncapped.",
  ),
);
body.push(new Paragraph({ children: [new PageBreak()] }));

// ---------------------------------------------------- PART TWO
body.push(H1("Part Two. The prompt"));
body.push(
  P(
    "Everything from here to the end of the document is the prompt. Paste it into Claude Code as a single message. It is long because the research showed that every omission becomes a wrong guess, and a wrong guess in this build is a broken deployment rather than a cosmetic flaw.",
    { italics: true, color: MUTED },
  ),
);
body.push(RULE_P());

// ---- Gauntlet
body.push(H2("Gauntlet Loop"));
body.push(H3("Task"));
body.push(
  P(
    "Build a state of the art AI native agent platform for HR and finance called Agentic HR, deployed on Vercel as a live domain with real time updates. Twelve agents must run in the cloud on open weight models reached through OpenRouter, never on a local machine. Fan out sub agents and ultra code.",
  ),
);
body.push(H3("Build"));
body.push(
  P(
    "Fan out sub agents and have each one take a single area so the research and the site are complete and competitive with the best AI agent software on the market. Loop on each item, and have a separate sub agent check it visually to confirm it looks AAA. That reviewing sub agent must be a genuinely harsh critic, and if the work is not triple A it sends it back and the loop continues.",
  ),
);
body.push(H3("Bar"));
body.push(
  P(
    "Do not stop until every reviewing sub agent is unreservedly impressed when the work is set beside a real production dashboard. Composite each page side by side with the reference in randomised order and have a reviewer who cannot tell which is ours say which looks better. Use Three.js for the signature moment. Loop until it is right. Fan out sub agents and ultra code.",
  ),
);
body.push(
  rich([
    ["The benchmark is workday.com. "],
    "Every page must be composited against the closest equivalent Workday page and must win on clarity, typography and restraint. Workday's own weaknesses, established by audit, are the openings: pricing is buried three levels deep inside a sub panel rather than sitting in the navigation, reaching a product detail page takes three clicks through click driven flyouts with no hover intent, and the Products menu carries more than eighty links behind a single label. Beat those three specifically.",
  ]),
);

// ---- 1 Non negotiables
body.push(H2("1. Non negotiables"));
body.push(
  P(
    "These six rules override anything else in this prompt, and any instruction that appears to conflict with them is to be resolved in their favour.",
  ),
);
body.push(
  rich([
    ["No invented data, ever. "],
    "No fictional customer companies, no invented testimonials, no invented people, no invented outcome statistics, no invented certifications, and no logo wall. Where a number appears it must either be computed live from a cited public source or be a measurement of this system itself. If neither is available, the number does not appear and the space is used for something true.",
  ]),
);
body.push(
  rich([
    ["Twelve agents, all of them in the cloud. "],
    "Every agent executes through OpenRouter from a Vercel deployment. No agent may depend on a process running on a developer machine. A localhost model endpoint anywhere in the shipped configuration is a build failure.",
  ]),
);
body.push(
  rich([
    ["Real onboarding instead of fake proof. "],
    "The product has no customers yet, and the site says so plainly. In place of a customers page there is a working signup and onboarding flow that writes to Postgres, and a benchmarks page built from public data.",
  ]),
);
body.push(
  rich([
    ["Light mode only, with two fonts and no third. "],
    "Inter and JetBrains Mono, three weights in total. Typography is enforced by tokens and a lint rule, not by discipline.",
  ]),
);
body.push(
  rich([
    ["Governance below the model. "],
    "An agent proposes. Deterministic code scopes its data, decides the outcome and executes the action. The model never chooses what it may read and never chooses what happens next.",
  ]),
);
body.push(
  rich([
    ["Fail closed and say so. "],
    "A missing key, an exhausted balance or output that will not validate produces an honest error. Nothing is ever simulated in place of a real result, and no endpoint returns a success it did not achieve.",
  ]),
);

// ---- 2 Repo
body.push(H2("2. Repository, name and inheritance"));
body.push(
  P(
    "Create a new repository called agentic-hr. This is a greenfield build. Do not import code, content or configuration from the existing enterprise-hr-finance repository, which contains a different product and a content layer full of fictional companies that must not survive into this one. You may read that repository for reference only.",
  ),
);
body.push(
  P(
    "The product is called Agentic HR. The legal entity name is not invented and does not appear anywhere. There is no About page describing a team that does not exist, no leadership section with invented names, and no founding story. A short Company page may state honestly what the product is and who is building it, and nothing more.",
  ),
);

// ---- 3 Stack
body.push(H2("3. Stack, fixed"));
body.push(
  P(
    "Next.js 16 App Router with React 19 and TypeScript in strict mode. Tailwind CSS v4 with CSS first tokens. Supabase for Postgres, authentication and row level security. Stripe in test mode for subscriptions. OpenRouter for all model calls. Three.js through React Three Fiber for one signature visual. Zod for validation at every boundary. Deployed on Vercel.",
  ),
);
body.push(
  P(
    "Pin React at 19.2 rather than 19.3, because the React Three Fiber peer range excludes 19.3 and npm will otherwise resolve a tree that cannot build.",
  ),
);

// ---- 4 The twelve agents
body.push(H2("4. The twelve agents"));
body.push(
  P(
    "The twelve are fixed, and they are grouped into three columns of four that carry through the navigation, the site structure and the product. Name them by their job and never append the word Agent to a label in the interface, because the parent menu already supplies that word and repeating it twelve times adds nothing.",
  ),
);
body.push(SPACER(120));
body.push(
  table(
    ["Group", "Agents", "What the group owns"],
    [
      ["Hire and onboard", "Sourcing, Screening, Offers and contracts, Employee onboarding", "Bringing a person into the organisation"],
      ["Pay and comply", "Payroll, Benefits, Time and leave, Compliance", "Paying them correctly and lawfully"],
      ["Spend and close", "Expenses, Bills and AP, Month end close, Forecasting", "Controlling money and closing the books"],
    ],
    [2000, 4400, 2960],
  ),
);
body.push(SPACER(200));
body.push(
  P(
    "Each agent is defined by a single workflow it owns, the trigger that starts it, the data it may read expressed as a field level allow list, the actions it may take alone, the actions that always require a human, and its model tier. Write these definitions as typed data in one module so the site, the runtime and the navigation all read from the same source and cannot drift apart.",
  ),
);
body.push(
  P(
    "Do not attach an invented outcome metric to any agent. Where an agent card wants a number, use either a figure computed from the public data described in section eight with its source shown, or a measurement of the running system such as the median duration of that agent's last hundred runs. An agent with no honest number shows no number.",
  ),
);

// ---- 5 What live in the cloud means
body.push(H2("5. What running in the cloud actually means"));
body.push(
  P(
    "Each agent is reachable two ways. It runs on demand through an authenticated endpoint when a signed in user asks for it, and it runs on a schedule through Vercel Cron with no user present. Both paths write a run row, its findings and its model calls to Postgres, and the dashboard reads from those rows. There is no separate simulation anywhere in the system.",
  ),
);
body.push(
  P(
    "Assume the Vercel Pro plan. Write the cron entries into vercel.json as three grouped sweeps rather than twelve separate ones, so the deployment stays within plan limits and the schedule stays readable. Run the hire and onboard sweep hourly, the pay and comply sweep every two hours, and the spend and close sweep every four hours. Protect every cron route with a CRON_SECRET bearer check and reject any request that does not carry it.",
  ),
);
body.push(
  NOTE(
    "The idle rule, stated verbatim because it is the difference between a few dollars a month and an unattended runaway bill.",
    "A scheduled sweep that finds no due work must make zero model calls, write no run row, and return in under one second. Never generate activity to keep a feed looking alive.",
  ),
);
body.push(
  P(
    "If you are on the Hobby plan instead, collapse the three sweeps into one daily entry and state that limitation on the status page rather than writing a schedule that will be rejected at deploy time.",
  ),
);

// ---- 6 Model routing
body.push(H2("6. Model routing through OpenRouter"));
body.push(
  P(
    "All model access goes through a single module. No other file may call a model endpoint, because that single choke point is what makes provider switching a configuration change and what makes cost accounting possible.",
  ),
);
body.push(
  P(
    "The base URL is https://openrouter.ai/api/v1 and the endpoint is POST /chat/completions in the OpenAI chat completions shape. Authenticate with a bearer token from OPENROUTER_API_KEY, which stays server side and must never be prefixed NEXT_PUBLIC. Send HTTP-Referer with the site URL and X-OpenRouter-Title with the application name on every request.",
  ),
);
body.push(
  NOTE(
    "Two details that will be wrong if you rely on memory or older tutorials.",
    "The attribution header is X-OpenRouter-Title, not X-Title, and the old name still works so the mistake fails silently. Fallback models are supplied as an ordered models array on the request body, not as a route parameter, which is likewise ignored silently if you use the old form.",
  ),
);
body.push(H3("Default model assignment"));
body.push(
  P(
    "Open weights are the default for all twelve agents. Closed models are available and switchable per agent through configuration, so a reviewer who asks what a frontier model would do can be shown within seconds, but nothing ships pointing at a closed model by default.",
  ),
);
body.push(SPACER(120));
body.push(
  table(
    ["Tier", "Default model id", "Price per million in and out", "Used for"],
    [
      ["Triage", { t: "meta-llama/llama-3.3-70b-instruct", mono: true }, "0.10 and 0.32", "Extraction, classification, grounded answers"],
      ["Judgment", { t: "deepseek/deepseek-v3.2", mono: true }, "0.269 and 0.40", "Finance decisions with money at stake"],
      ["Cheap bulk", { t: "openai/gpt-oss-120b", mono: true }, "0.037 and 0.17", "High volume screening passes"],
      ["Closed, opt in", { t: "anthropic/claude-sonnet-5", mono: true }, "2.00 and 10.00", "Escalation and comparison only"],
    ],
    [1500, 3500, 2200, 2160],
  ),
);
body.push(SPACER(200));
body.push(
  P(
    "Request structured output with response_format of type json_schema, set strict to true, and pair it with a provider object carrying require_parameters so OpenRouter only routes to endpoints that genuinely implement schema enforcement. Do not trust strict mode as a guarantee, because enforcement varies by provider and some treat the schema as a strong hint. Validate every response with Zod and retry once with the validator's complaint appended before failing the run.",
  ),
);
body.push(
  P(
    "Check supported_parameters on a model before assigning it to a task that needs structured output, because support is inconsistent even within a model family. Avoid the free variants for anything user facing, since they are capped at twenty requests per minute and fifty per day until credits are purchased, and many of them lack structured output even where their paid equivalents have it.",
  ),
);

// ---- 7 Cost, security, kill switch
body.push(H2("7. Cost control, access control and the stop button"));
body.push(
  P(
    "Twelve agents on a metered API with a real card attached is the part of this build most likely to go wrong quietly, so treat the following as requirements rather than as hardening to add later.",
  ),
);
body.push(
  P(
    "Estimate first so the caps have a basis. A typical run is roughly four thousand prompt tokens and eight hundred completion tokens, which on the triage default costs about seven hundredths of a cent. Twelve agents across the three sweeps described above produce on the order of two hundred runs per day, or about fifteen cents. Budget five dollars per month for normal operation and set the ceilings well above that but far below anything alarming.",
  ),
);
body.push(SPACER(120));
body.push(
  table(
    ["Control", "Value", "Where enforced"],
    [
      ["OpenRouter key limit", "25 dollars per month, resetting monthly", "Set on the key at provisioning"],
      ["Global daily ceiling", "2 dollars, checked before every model call", "Ledger query in the runtime"],
      ["Per request token cap", "2000 completion tokens", "Request body"],
      ["Per organisation monthly cap", "From the plan row, enforced in code", "Runtime, before the call"],
      ["Emergency stop", { t: "AGENTS_ENABLED=0", mono: true }, "Read at the top of every agent entry point"],
    ],
    [2600, 3400, 3360],
  ),
);
body.push(SPACER(200));
body.push(
  P(
    "Record every model call as its own ledger row keyed by organisation, agent, run and call, carrying the model actually used as returned by the response, the token counts and the computed cost. Per run totals are not sufficient, because one run makes several calls and you cannot attribute or cap spend at a granularity coarser than the thing that costs money.",
  ),
);
body.push(
  P(
    "The endpoint that triggers an agent spends money, so it requires an authenticated session, enforces a per address token bucket, and checks the global daily ceiling before it calls anything. An unauthenticated route that reaches a paid model is a defect regardless of how convenient it makes the demo.",
  ),
);
body.push(
  P(
    "Define the exhausted state as a product state and not as an error path. When the balance is gone OpenRouter returns a payment required response, including on free models, so a free tier fallback does not rescue a lapsed account. The dashboard shows an honest banner, the status page reflects it, partially completed runs are persisted with their real state, and nothing is fabricated to cover the gap. Document that changing the environment variable does not affect deployments already running, so the stop procedure is to set the variable and then redeploy or roll back.",
  ),
);

// ---- 8 Honest data
body.push(H2("8. What replaces the customers page"));
body.push(
  P(
    "Workday devotes a band of its homepage to seven or eight named customers each carrying a hard number. You have no customers, so that band must be filled with something else that is true rather than with something invented that looks similar. Use live public data, and show its provenance.",
  ),
);
body.push(SPACER(120));
body.push(
  table(
    ["Source", "Access", "What an agent can honestly demonstrate"],
    [
      ["SEC EDGAR company facts", "No key, User-Agent required", "Accounts payable balances across thousands of real filers"],
      ["City of Chicago payments", "No key, SoQL queries", "Real duplicate payment detection over 464,000 rows"],
      ["Bureau of Labor Statistics", "Free key", "Real wage benchmarks by occupation and area"],
      ["Nager public holidays", "No key", "Leave and scheduling across real national calendars"],
      ["Frankfurter exchange rates", "No key, v2 endpoint", "Multi currency payroll and expense conversion"],
    ],
    [2700, 2200, 4460],
  ),
);
body.push(SPACER(200));
body.push(
  P(
    "The Chicago payments dataset deserves particular attention, because it lets the spend and close agents demonstrate genuine duplicate detection against real municipal payment records rather than against a fixture you wrote. Group on vendor, amount and date in the query itself, then let the agent judge only the cases the query cannot settle.",
  ),
);
body.push(
  P(
    "Two obligations come with these sources. Requests to SEC hosts must carry a User-Agent naming you and a contact address and must stay within ten requests per second, and several sources require a verbatim attribution line stating that the product uses their API but is not endorsed or certified by them. Render those lines where the data appears.",
  ),
);
body.push(
  P(
    "The homepage proof band therefore shows live public benchmarks with their sources, the agent roster with real measured run statistics from this system, and an honest statement that the product is pre revenue and looking for design partners. That last sentence is a stronger asset than an invented testimonial, because a visitor can check it.",
  ),
);

// ---- 9 Onboarding and subscriptions
body.push(H2("9. Onboarding, accounts and subscriptions"));
body.push(
  P(
    "Signup is real and writes to Postgres. Use Supabase authentication with the current server client pattern for the App Router, creating the client per request inside Server Components, Route Handlers and Server Actions rather than sharing one across requests.",
  ),
);
body.push(
  P(
    "The onboarding flow is four steps and each step saves as it completes, so an interrupted signup resumes rather than restarting. Step one collects the work email and creates the account. Step two collects the organisation name, employee count band, country of primary operation and industry. Step three asks which systems they run today for payroll, accounting and applicant tracking, offered as a select list with an other field, because this determines which agents can be useful to them. Step four asks which of the twelve agents they want first and what outcome they are hoping for, as free text, which is the single most valuable field on the form for a pre revenue product.",
  ),
);
body.push(
  P(
    "Never ask for a national identifier, a bank account or a date of birth. There is no lawful basis to hold those at signup and their presence would make the security review harder for no benefit.",
  ),
);
body.push(SPACER(120));
body.push(
  table(
    ["Table", "Holds", "Row level security"],
    [
      ["organisations", "Tenant record, name, size band, country", "Members of the organisation only"],
      ["profiles", "One row per auth user", "The user themselves"],
      ["memberships", "User to organisation with role", "Members of the organisation only"],
      ["onboarding_submissions", "Step by step answers, resumable", "The submitting user and their organisation"],
      ["plans", "Plan catalogue, limits, Stripe price ids", "Readable by all, writable by none"],
      ["subscriptions", "Stripe subscription state per organisation", "Members read, service role writes"],
      ["agent_runs", "One row per run with status and timings", "Members of the owning organisation"],
      ["agent_findings", "What a run produced, with evidence", "Members of the owning organisation"],
      ["approvals", "Human decisions with actor and timestamp", "Members, insert restricted by role"],
      ["model_calls", "Cost ledger, one row per model call", "Service role only, aggregates exposed"],
      ["audit_log", "Append only, hash chained", "Members read, nobody updates or deletes"],
    ],
    [2600, 4000, 2760],
  ),
);
body.push(SPACER(200));
body.push(
  P(
    "Enable row level security on every table without exception and write the policies as part of the migration rather than afterwards. A table with security enabled and no policy denies everything, which is the correct failure direction, and a table without security enabled is open to anyone holding the anonymous key.",
  ),
);
body.push(
  P(
    "Stripe runs in test mode. Build the full subscription flow with checkout sessions, the customer portal for plan changes and cancellation, and webhook handling that keeps the subscriptions table in step. Read the raw request body in the webhook route handler before verifying the signature, because parsing it first invalidates the signature. Handle the session completed, subscription updated and subscription deleted events at minimum. Since the product bills for completed agent actions rather than seats, implement usage reporting against a metered price and show the running total in the dashboard.",
  ),
);
body.push(
  P(
    "Display the Stripe test card number on the pricing page while the site is in test mode, so a reviewer can complete a real subscription in one attempt without hunting for it.",
  ),
);

// ---- 10 Navigation
body.push(H2("10. Navigation"));
body.push(
  P(
    "Four items on the left and three on the right. The left group is Agents, Platform, Pricing and Resources. The right cluster, visually separated from the navigation group and holding exactly one filled button, is Log in, Book a demo and Start free.",
  ),
);
body.push(
  P(
    "Pricing is a plain link and not a dropdown, and it sits in the navigation rather than buried inside a panel. Ten of the eleven sites audited do this and Workday is the one that does not, which is an opening rather than a precedent.",
  ),
);
body.push(
  P(
    "The Agents panel is three columns of four, headed Hire and onboard, Pay and comply, and Spend and close, with one line of description per column and none per agent. Twelve items in three groups reads comfortably; twelve items with twelve descriptions becomes the wall of links that made the previous attempt feel cluttered. The panel foot carries two links, one to all agents and one to how agents work. The Platform panel uses the same three column rhythm so the panel does not jump in height as the pointer moves between menus.",
  ),
);
body.push(
  P(
    "Do not create a top level label called Onboarding, because that word already names one of the twelve agents and a navigation label colliding with a product name guarantees misclicks. Customer onboarding lives in the primary button and as the first item under Platform, named by outcome rather than by process.",
  ),
);
body.push(
  P(
    "On mobile use drill down panels with an explicit back affordance rather than accordions, since three groups of four reaches any agent in two taps, and pin an action bar inside the panel repeating the primary calls to action.",
  ),
);

// ---- 11 Design
body.push(H2("11. Design system"));
body.push(
  P(
    "Two font families and no third. Inter through next/font/google with the optical size axis for everything, and JetBrains Mono for identifiers, amounts in tables and code. Three weights are used in total, being regular for prose, medium for interface labels and numerals, and semibold for headings. Remove light and bold from the build so they cannot be reached. There is no serif and no display face, because the previous attempt's inconsistency came from mixing families and this removes the possibility.",
  ),
);
body.push(
  P(
    "Define a complete type scale as named tokens with a size, line height, letter spacing and weight for each, and forbid any component from declaring a raw font size. Bind letter spacing to rendered pixel size through a stated band rule rather than choosing it per component, so that tighter tracking at display sizes and neutral tracking at small sizes happen automatically. Enforce both with a lint rule that bans font size and letter spacing declarations outside the global stylesheet. This single mechanism is what makes the typography consistent, and it is not optional.",
  ),
);
body.push(
  P(
    "Colour is a warm neutral ramp in OKLCH with a single accent, semantic colours for success, warning and danger, and a six colour categorical set for charts. Provide a contrast table proving every text and background pair meets WCAG AA, and treat amber as reserved throughout the product for exactly one meaning, which is that a human must decide.",
  ),
);
body.push(
  P(
    "Workday's palette is navy and white with one blue, which reads as trustworthy and slightly dated. The opening is to be visibly more modern without becoming an AI startup cliche, which means no gradient meshes, no glassmorphism, no neon, and no dark hero on a light site. Hairlines and spacing do the structural work that shadows and gradients do on weaker sites.",
  ),
);
body.push(
  P(
    "One signature Three.js moment on the homepage, gated so that it mounts only above seven hundred and sixty eight pixels, only without a reduced motion preference, only where WebGL is available, and only once its container is in view and the browser is idle. Everyone else receives a static poster generated from the same constants. It must never block the largest contentful paint and it must pause when scrolled out of view or when the tab is hidden.",
  ),
);

// ---- 12 Real time
body.push(H2("12. Real time behaviour"));
body.push(
  P(
    "The dashboard streams genuine agent activity over Server Sent Events, reading from the run, finding and approval rows that agents actually wrote. Send a snapshot on connect, then events as they occur, with a heartbeat comment every fifteen seconds and a deliberate self close before the platform function ceiling so that the ceiling is never what ends the stream. The browser reconnects on its own. Fall back to polling a snapshot endpoint after repeated failures, and tear the connection down entirely while the tab is hidden.",
  ),
);
body.push(
  P(
    "When there is no activity the feed says so honestly and shows when each agent last ran. An empty state is acceptable and an invented one is not.",
  ),
);

// ---- 13 Quality loop
body.push(H2("13. The quality loop"));
body.push(
  P(
    "Build the blind comparison harness before building the pages, because a quality bar that arrives late is a quality bar that is negotiated down. The harness screenshots every page from the production build, composites each one beside the closest equivalent Workday page in randomised left to right order, and hands the composite to a reviewing sub agent that cannot tell which panel is ours. A separate decoder maps the verdict back afterwards.",
  ),
);
body.push(
  P(
    "A page passes only when the blind reviewer either picks it or cannot tell the two apart, and scores it at least nine out of ten on hierarchy, typography, spacing rhythm, colour discipline, component craft, motion restraint, copy clarity and responsiveness at three widths. Expect to be sent back. Fix causes rather than symptoms, and when a reviewer repeats a criticism across rounds treat the repetition as evidence that the fix so far has been cosmetic.",
  ),
);
body.push(
  P(
    "Run an automated audit across every route for heading structure, canonical tags, structured data, landmark regions, labelled form fields and colour contrast, and treat any finding as blocking. Typecheck, lint and production build must all pass before any page is considered done.",
  ),
);

// ---- 14 Definition of done
body.push(H2("14. Definition of done"));
body.push(
  P(
    "The build is complete when all twelve agents execute in the cloud through OpenRouter on open weight models with no local dependency, and each one can be triggered on demand and also runs on its schedule. A visitor can sign up, complete the four step onboarding, subscribe with a Stripe test card and see their organisation and subscription rows in Postgres with row level security enforced.",
  ),
);
body.push(
  P(
    "The site contains no invented company, person, testimonial, logo or statistic, and every number on it is traceable to a public source or to a measurement of the running system. The navigation carries four items with pricing among them. Typography uses two families and three weights enforced by lint. Every page has passed the blind comparison against its Workday equivalent.",
  ),
);
body.push(
  P(
    "Spend is capped at the key, at the day and at the request, every model call is recorded in a ledger, the endpoint that spends money requires authentication, and a named environment variable stops all twelve agents. The exhausted balance state is a designed screen rather than an error.",
  ),
);
body.push(RULE_P());
body.push(
  P(
    "End of prompt.",
    { italics: true, color: MUTED, after: 0 },
  ),
);

// ---------------------------------------------------------------- doc
const doc = new Document({
  creator: "Peter Alesso",
  title: "Agentic HR Claude Code Build Prompt",
  description: "Executable build brief for the Agentic HR platform",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 21, color: INK } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              spacing: { after: 240 },
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE } },
              tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
              children: [
                new TextRun({ text: "Agentic HR", size: 16, bold: true, color: MUTED, font: "Calibri" }),
                new TextRun({ text: "\tClaude Code Build Prompt", size: 16, color: MUTED, font: "Calibri" }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED, font: "Calibri" }),
              ],
            }),
          ],
        }),
      },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Agentic-HR-Build-Prompt.docx", buf);
  console.log("wrote Agentic-HR-Build-Prompt.docx", buf.length, "bytes");
});
