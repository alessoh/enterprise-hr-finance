"""Generates the Meridian investor deck (24 slides, 16:9).

Design follows DESIGN.md: warm paper, ink type, hairlines doing the structural work,
one accent blue used only for emphasis. Every number on a slide is either measured from
this repository, cited to a public source, or explicitly labelled as modelled.

Run:  python scripts/deck.py
Out:  Meridian-Investor-Deck.pptx
"""

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt

# --- palette (DESIGN.md section 3) ---------------------------------------------------
BG = RGBColor(0xFE, 0xFD, 0xFC)
BG_SUBTLE = RGBColor(0xF9, 0xF7, 0xF4)
BG_MUTED = RGBColor(0xF2, 0xF0, 0xEC)
INK = RGBColor(0x1C, 0x17, 0x12)
MUTED = RGBColor(0x5A, 0x54, 0x4E)
SUBTLE = RGBColor(0x70, 0x6B, 0x64)
FAINT = RGBColor(0xA2, 0x9E, 0x98)
BORDER = RGBColor(0xE3, 0xE1, 0xDD)
BORDER_STRONG = RGBColor(0xCD, 0xCA, 0xC5)
ACCENT = RGBColor(0x1F, 0x53, 0x90)
ACCENT_SOFT = RGBColor(0xE7, 0xF1, 0xFE)
SUCCESS = RGBColor(0x1D, 0x7D, 0x3E)
WARNING = RGBColor(0x99, 0x5C, 0x00)
DANGER = RGBColor(0xBE, 0x23, 0x23)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

SANS = "Segoe UI"
SERIF = "Georgia"
MONO = "Consolas"

W, H = Inches(13.333), Inches(7.5)
ML, MR = Inches(0.9), Inches(0.9)
CONTENT_W = W - ML - MR

prs = Presentation()
prs.slide_width, prs.slide_height = W, H
BLANK = prs.slide_layouts[6]

_slide_no = 0


# --- primitives ----------------------------------------------------------------------
def _bg(slide, color=BG):
    r = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    r.fill.solid()
    r.fill.fore_color.rgb = color
    r.line.fill.background()
    r.shadow.inherit = False
    return r


def rect(slide, x, y, w, h, fill=None, line=None, lw=Pt(0.75)):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    if fill is None:
        s.fill.background()
    else:
        s.fill.solid()
        s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = lw
    s.shadow.inherit = False
    return s


def hairline(slide, x, y, w, color=BORDER, weight=Pt(0.75)):
    return rect(slide, x, y, w, Emu(0), None, color, weight)


def text(
    slide,
    x,
    y,
    w,
    h,
    runs,
    align=PP_ALIGN.LEFT,
    anchor=MSO_ANCHOR.TOP,
    line_spacing=None,
    space_after=Pt(0),
):
    """runs: list of paragraphs; each is a list of (string, dict) run specs."""
    tb = slide.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    for i, para in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if line_spacing:
            p.line_spacing = line_spacing
        p.space_after = space_after
        if isinstance(para, str):
            para = [(para, {})]
        for s, spec in para:
            r = p.add_run()
            r.text = s
            f = r.font
            f.name = spec.get("font", SANS)
            f.size = Pt(spec.get("size", 14))
            f.bold = spec.get("bold", False)
            f.italic = spec.get("italic", False)
            f.color.rgb = spec.get("color", INK)
    return tb


def eyebrow_text(s):
    return [(s.upper(), {"size": 10.5, "bold": True, "color": SUBTLE})]


def est_lines(txt, size_pt, width_emu, ratio=0.50):
    """Estimate wrapped line count. ratio = average glyph width as a fraction of size."""
    chars_per_line = max(8, int((width_emu / 914400.0) * 72.0 / (size_pt * ratio)))
    words, line, lines = txt.split(), 0, 1
    for w in words:
        add = len(w) + (1 if line else 0)
        if line + add > chars_per_line:
            lines += 1
            line = len(w)
        else:
            line += add
    return lines


def slide(eyebrow=None, title=None, lede=None, dark=False):
    """Standard content slide. Returns (slide, y_cursor)."""
    global _slide_no
    s = prs.slides.add_slide(BLANK)
    _bg(s, INK if dark else BG)
    _slide_no += 1

    y = Inches(0.62)
    tcol = BG if dark else INK
    mcol = BORDER_STRONG if dark else MUTED
    if eyebrow:
        text(s, ML, y, CONTENT_W, Inches(0.22),
             [[(eyebrow.upper(), {"size": 10.5, "bold": True,
                                  "color": FAINT if dark else SUBTLE})]])
        y += Inches(0.36)
    if title:
        n = est_lines(title, 31, CONTENT_W, 0.52)
        text(s, ML, y, CONTENT_W, Inches(0.55) * n,
             [[(title, {"font": SERIF, "size": 31, "color": tcol})]], line_spacing=1.06)
        y += Inches(0.50) * n + Inches(0.10)
    if lede:
        lw = Inches(10.2)
        n = est_lines(lede, 14.5, lw, 0.50)
        text(s, ML, y, lw, Inches(0.30) * n,
             [[(lede, {"size": 14.5, "color": mcol})]], line_spacing=1.32)
        y += Inches(0.27) * n + Inches(0.08)

    y += Inches(0.14)
    hairline(s, ML, y, CONTENT_W, BORDER_STRONG if not dark else RGBColor(0x3A, 0x33, 0x2C))
    y += Inches(0.30)

    text(s, ML, H - Inches(0.46), Inches(6), Inches(0.2),
         [[("Meridian", {"size": 9, "color": FAINT}),
           ("  ·  Confidential  ·  September 2026", {"size": 9, "color": FAINT})]])
    text(s, W - MR - Inches(1.0), H - Inches(0.46), Inches(1.0), Inches(0.2),
         [[(f"{_slide_no}", {"size": 9, "color": FAINT})]], align=PP_ALIGN.RIGHT)
    return s, y


def source(s, note):
    text(s, ML, H - Inches(0.95), CONTENT_W, Inches(0.4),
         [[(note, {"size": 9, "color": FAINT})]], line_spacing=1.25)


def bullets(s, x, y, w, items, size=13.5, gap=Inches(0.40), color=INK, sub=MUTED):
    """items: list of str, or (bold_lead, rest)."""
    cy = y
    tw = w - Inches(0.26)
    for it in items:
        if isinstance(it, tuple):
            runs = [[(it[0], {"size": size, "bold": True, "color": color}),
                     (it[1], {"size": size, "color": sub})]]
            raw = it[0] + it[1]
        else:
            runs = [[(it, {"size": size, "color": sub})]]
            raw = it
        n = est_lines(raw, size, tw, 0.50)
        rect(s, x, cy + Inches(0.09), Emu(int(Inches(0.09))), Emu(int(Inches(0.09))),
             ACCENT, None)
        text(s, x + Inches(0.26), cy, tw, Inches(0.3) * n, runs, line_spacing=1.32)
        cy += Inches(0.26) * n + (gap - Inches(0.26))
    return cy


def stats(s, y, items, h=Inches(1.5), value_size=40, dark=False):
    """items: list of (value, label, optional note). Hairline-divided columns."""
    n = len(items)
    colw = CONTENT_W / n
    for i, it in enumerate(items):
        x = ML + colw * i
        if i:
            rect(s, x - Inches(0.02), y + Inches(0.05), Emu(0), h - Inches(0.2),
                 None, BORDER if not dark else RGBColor(0x3A, 0x33, 0x2C))
        val, lab = it[0], it[1]
        note = it[2] if len(it) > 2 else None
        text(s, x + Inches(0.16), y, colw - Inches(0.3), Inches(0.7),
             [[(val, {"size": value_size, "color": BG if dark else INK})]])
        text(s, x + Inches(0.16), y + Inches(0.72), colw - Inches(0.34), Inches(0.5),
             [[(lab, {"size": 11.5, "color": BORDER_STRONG if dark else MUTED})]],
             line_spacing=1.25)
        if note:
            text(s, x + Inches(0.16), y + Inches(1.18), colw - Inches(0.34), Inches(0.4),
                 [[(note, {"size": 9.5, "color": FAINT})]], line_spacing=1.2)
    return y + h


def card(s, x, y, w, h, title, body, tone=None, title_size=13.5, body_size=11.5):
    rect(s, x, y, w, h, WHITE, BORDER)
    if tone:
        rect(s, x, y, w, Inches(0.035), tone, None)
    text(s, x + Inches(0.24), y + Inches(0.24), w - Inches(0.48), Inches(0.3),
         [[(title, {"size": title_size, "bold": True, "color": INK})]])
    text(s, x + Inches(0.24), y + Inches(0.62), w - Inches(0.48), h - Inches(0.8),
         [[(body, {"size": body_size, "color": MUTED})]], line_spacing=1.32)


def table(s, x, y, w, cols, rows, widths=None, row_h=Inches(0.42), size=11.5,
          head_fill=BG_SUBTLE):
    """Hairline table: header band, then rows separated by hairlines."""
    widths = widths or [w / len(cols)] * len(cols)
    rect(s, x, y, w, Inches(0.36), head_fill, None)
    hairline(s, x, y, w, BORDER)
    hairline(s, x, y + Inches(0.36), w, BORDER)
    cx = x
    for c, cw in zip(cols, widths):
        text(s, cx + Inches(0.14), y + Inches(0.10), cw - Inches(0.2), Inches(0.22),
             [[(c.upper(), {"size": 9, "bold": True, "color": SUBTLE})]])
        cx += cw
    cy = y + Inches(0.36)
    for r in rows:
        cx = x
        for j, (cell, cw) in enumerate(zip(r, widths)):
            spec = {"size": size, "color": INK if j == 0 else MUTED}
            if isinstance(cell, tuple):
                cell, extra = cell
                spec.update(extra)
            text(s, cx + Inches(0.14), cy + Inches(0.11), cw - Inches(0.2), Inches(0.3),
                 [[(cell, spec)]])
            cx += cw
        cy += row_h
        hairline(s, x, cy, w, BORDER)
    return cy


# =====================================================================================
# 1 — Title
# =====================================================================================
s = prs.slides.add_slide(BLANK)
_bg(s, BG)
_slide_no += 1
rect(s, Inches(0), Inches(0), Inches(0.055), H, ACCENT, None)
text(s, ML, Inches(2.15), Inches(11), Inches(0.4),
     [eyebrow_text("Pre-seed  ·  Enterprise AI infrastructure")])
text(s, ML, Inches(2.62), Inches(11.2), Inches(1.5),
     [[("Meridian", {"font": SERIF, "size": 58, "color": INK})]])
text(s, ML, Inches(3.72), Inches(10.4), Inches(1.0),
     [[("AI agents that run HR and finance — with a named human accountable for every "
        "consequential action.", {"size": 19, "color": MUTED})]], line_spacing=1.3)
hairline(s, ML, Inches(4.92), CONTENT_W, BORDER_STRONG)
text(s, ML, Inches(5.2), Inches(11), Inches(0.9),
     [[("Working product, deployed and public:  ", {"size": 12, "color": SUBTLE}),
       ("enterprise-hr-finance.vercel.app", {"size": 12, "bold": True, "color": ACCENT})],
      [("Source:  ", {"size": 12, "color": SUBTLE}),
       ("github.com/alessoh/enterprise-hr-finance", {"size": 12, "color": ACCENT})]],
     space_after=Pt(6))
text(s, ML, H - Inches(0.9), Inches(8), Inches(0.3),
     [[("Peter Alesso  ·  Founder  ·  September 2026", {"size": 11.5, "color": MUTED})]])

# =====================================================================================
# 2 — The problem
# =====================================================================================
s, y = slide("The problem",
             "Enterprises bought agents. Almost none run them.",
             "Adoption is near-universal and production deployment is rare. The gap is not "
             "model capability — it is that nobody can answer who is accountable when "
             "software acts.")
y = stats(s, y, [
    ("79%", "of enterprises say they have adopted AI agents", "Industry survey, 2026"),
    ("11%", "actually run them in production", "Same survey"),
    ("40%+", "of agentic projects may be cancelled by 2027", "Gartner"),
    ("40%", "of enterprise apps will embed task-specific agents by end-2026",
     "up from under 5% in 2025 · Gartner"),
], value_size=36)
text(s, ML, y + Inches(0.34), CONTENT_W, Inches(0.8),
     [[("Gartner attributes the cancellations to unclear value, rising costs and ",
        {"size": 14, "color": MUTED}),
       ("weak governance", {"size": 14, "bold": True, "color": INK}),
       (". Analysts describe the blocker as unglamorous: data quality, integration "
        "readiness and governance maturity.", {"size": 14, "color": MUTED})]],
     line_spacing=1.35)
source(s, "Sources: Gartner agentic AI forecasts, 2026; enterprise AI agent adoption "
          "surveys aggregated 2026. Figures are third-party and cited, not ours.")

# =====================================================================================
# 3 — Why it happens
# =====================================================================================
s, y = slide("The insight",
             "A CFO cannot deploy something that cannot be held accountable.",
             "Every vendor ships a chat box and a promise of autonomy. Four questions kill "
             "the deal, and none of them are about the model.")
q = [("Who owns this agent?", "There is no org chart for software that acts on its own."),
     ("What is it allowed to read?", "Permissions are set in prompts, not in the data layer."),
     ("What can it do without asking?", "The blast radius is undefined at purchase time."),
     ("Can I hand the log to an auditor?", "Chat transcripts are not audit evidence.")]
cw = (CONTENT_W - Inches(0.75)) / 4
for i, (t, b) in enumerate(q):
    card(s, ML + (cw + Inches(0.25)) * i, y, cw, Inches(2.0), t, b, tone=WARNING)
text(s, ML, y + Inches(2.35), CONTENT_W, Inches(0.9),
     [[("The market treats governance as a compliance page bolted on at the end. ",
        {"size": 15, "color": MUTED}),
       ("We treat it as the product.", {"size": 15, "bold": True, "color": INK})]],
     line_spacing=1.35)

# =====================================================================================
# 4 — Founder (pre-seed convention: team early)
# =====================================================================================
s, y = slide("Founder",
             "Who is building this, and why now for me.",
             "Pre-seed is a bet on the builder. Here is the evidence I can put in front of "
             "you today rather than a claim about the future.")
left = Inches(6.2)
bullets(s, ML, y, left, [
    ("Peter Alesso — ", "founder and sole engineer to date. Background in enterprise AI "
     "systems and applied machine learning."),
    ("Built the entire platform solo, ", "orchestrating parallel AI agents against a "
     "written architecture spec — the same discipline the product sells."),
    ("Shipped to production, not to a demo folder. ", "165 pages, live URL, public "
     "repository, real security headers, verified performance."),
    ("Domain grounding: ", "the product model is derived from how HR and finance "
     "incumbents actually deploy agents, not from what AI vendors market."),
], size=13)
rect(s, ML + left + Inches(0.5), y - Inches(0.05), CONTENT_W - left - Inches(0.5),
     Inches(3.1), BG_SUBTLE, BORDER)
bx = ML + left + Inches(0.8)
text(s, bx, y + Inches(0.25), Inches(4.3), Inches(0.3),
     [eyebrow_text("What I am not claiming")])
bullets(s, bx, y + Inches(0.68), Inches(4.1), [
    "No revenue. No paying customers. No prior exits claimed here.",
    "No team yet — the first three hires are in the ask.",
    "The agent execution layer is not built. The platform around it is.",
], size=12)
source(s, "This slide is deliberately blunt. Everything on the following slides is either "
          "measurable in the repository, cited to a public source, or labelled as modelled.")

# =====================================================================================
# 5 — Why now
# =====================================================================================
s, y = slide("Why now",
             "Three curves crossed in 2026.",
             "This company was not buildable in 2024 and will be crowded by 2028.")
rows = [
    ("Capability", "Frontier models became reliable enough for narrow, bounded workflows — "
     "not open-ended autonomy.", "Agents can finally finish a scoped job."),
    ("Standards", "Model Context Protocol and agent-to-agent protocols turned tool access "
     "into an interoperable layer.", "A governance layer can sit above any vendor."),
    ("Pricing", "97% of surveyed SaaS CEOs plan to retire seat-based pricing within two "
     "years; seat-based fell 21% to 15% in 12 months.",
     "Consumption billing is now the expected shape."),
]
table(s, ML, y, CONTENT_W, ["Curve", "What changed", "What it unlocks"],
      [(a, b, (c, {"color": INK})) for a, b, c in rows],
      widths=[Inches(1.7), Inches(6.2), Inches(3.63)], row_h=Inches(0.78), size=12)
text(s, ML, y + Inches(3.0), CONTENT_W, Inches(0.7),
     [[("The window: agents are credible, the plumbing is standard, and the buyer has "
        "budget — but governance is still missing. That is a narrow opening.",
        {"size": 14, "color": MUTED})]], line_spacing=1.35)
source(s, "Source: Cruxy survey of 300 SaaS CEOs, April 2026; SaaS pricing model share "
          "data, 2026.")

# =====================================================================================
# 6 — What Meridian is
# =====================================================================================
s, y = slide("The product",
             "Twelve narrow agents, one governance layer, metered by completed work.",
             "Not an assistant. A workforce with an org chart, permissions and an audit "
             "trail.")
cols = [
    ("Agents", "Twelve agents, each scoped to exactly one workflow: HR cases, payroll "
     "pre-checks, shift coverage, month-end close, audit evidence, contract redlines and "
     "six more.", ACCENT),
    ("Governance", "Registry, Gateway, Data Fabric, Studio, Assist and Trust — the layer "
     "that records who owns each agent, what it may read and what needs a human.", INK),
    ("Metering", "Consumption credits priced per completed action, so the buyer pays for "
     "work finished rather than seats occupied.", SUCCESS),
]
cw = (CONTENT_W - Inches(0.6)) / 3
for i, (t, b, tone) in enumerate(cols):
    card(s, ML + (cw + Inches(0.3)) * i, y, cw, Inches(2.35), t, b, tone=tone,
         title_size=16, body_size=12)
text(s, ML, y + Inches(2.7), CONTENT_W, Inches(0.8),
     [[("Positioning: ", {"size": 14, "bold": True, "color": INK}),
       ("infrastructure beneath the agents an enterprise runs — including agents we did "
        "not build. The Registry is the system of record; that is the durable position.",
        {"size": 14, "color": MUTED})]], line_spacing=1.35)

# =====================================================================================
# 7 — The mechanic
# =====================================================================================
s, y = slide("The mechanic",
             "Every agent ships under the same six terms.",
             "This contract is printed on every agent page and enforced below the agent, "
             "not inside its prompt.")
terms = ["Scoped to one workflow", "Reads only permitted data", "Every action logged",
         "Consequential actions require human approval", "Carries a measurable outcome",
         "Runs on your chosen model"]
cw = (CONTENT_W - Inches(0.5)) / 3
for i, t in enumerate(terms):
    x = ML + (cw + Inches(0.25)) * (i % 3)
    yy = y + (Inches(1.05)) * (i // 3)
    rect(s, x, yy, cw, Inches(0.88), BG_SUBTLE, BORDER)
    text(s, x + Inches(0.22), yy + Inches(0.17), Inches(0.5), Inches(0.3),
         [[(f"{i + 1:02d}", {"font": MONO, "size": 11, "color": ACCENT})]])
    text(s, x + Inches(0.22), yy + Inches(0.44), cw - Inches(0.44), Inches(0.4),
         [[(t, {"size": 12.5, "color": INK})]], line_spacing=1.25)
yy = y + Inches(2.32)
rect(s, ML, yy, CONTENT_W, Inches(1.02), ACCENT_SOFT, None)
text(s, ML + Inches(0.3), yy + Inches(0.2), CONTENT_W - Inches(0.6), Inches(0.7),
     [[("Why this is the wedge: ", {"size": 13.5, "bold": True, "color": INK}),
       ("the six terms are what a procurement reviewer needs and what no chat-based "
        "vendor can produce. They also define the data model — owner, scope, permission, "
        "approval, outcome, model — which is exactly what the Registry stores.",
        {"size": 13.5, "color": MUTED})]], line_spacing=1.32)

# =====================================================================================
# 8 — The twelve agents
# =====================================================================================
s, y = slide("Product depth",
             "Twelve agents, each with a number attached.",
             "Narrow scope is the deployment strategy: one workflow, one owner, one "
             "measurable result.")
agents = [
    ("Help Desk", "HR cases resolved from policy", "HR"),
    ("Recruiting", "Screens and shortlists candidates", "HR"),
    ("Payroll", "Catches errors before the run", "HR"),
    ("Scheduling", "Fills open shifts", "HR"),
    ("Performance", "Drafts evidence-based reviews", "HR"),
    ("Job Architecture", "Benchmarks roles and pay bands", "HR"),
    ("Audit", "Packages audit evidence", "Finance"),
    ("Planning", "Explains variances", "Finance"),
    ("Controls", "Tests every transaction", "Finance"),
    ("Close", "Orchestrates month-end", "Finance"),
    ("Revenue Contracts", "Flags revenue risk", "Finance"),
    ("Contract Review", "Redlines third-party paper", "Legal"),
]
cw = (CONTENT_W - Inches(0.45)) / 4
for i, (n, d, cat) in enumerate(agents):
    x = ML + (cw + Inches(0.15)) * (i % 4)
    yy = y + Inches(0.78) * (i // 4)
    rect(s, x, yy, cw, Inches(0.68), WHITE, BORDER)
    tone = ACCENT if cat == "HR" else (INK if cat == "Finance" else WARNING)
    rect(s, x, yy, Inches(0.03), Inches(0.68), tone, None)
    text(s, x + Inches(0.2), yy + Inches(0.11), cw - Inches(0.4), Inches(0.24),
         [[(n, {"size": 12, "bold": True, "color": INK})]])
    text(s, x + Inches(0.2), yy + Inches(0.37), cw - Inches(0.4), Inches(0.24),
         [[(d, {"size": 10, "color": MUTED})]])
text(s, ML, y + Inches(2.52), CONTENT_W, Inches(0.5),
     [[("Blue: HR      Ink: Finance      Amber: Legal and operations          ",
        {"size": 11, "color": SUBTLE}),
       ("All twelve are specified in the repository with data sources, guardrails, credit "
        "costs and FAQs.", {"size": 11, "color": FAINT})]])

# =====================================================================================
# 9 — One agent in depth
# =====================================================================================
s, y = slide("One agent in depth",
             "The Controls Agent, and why the market validates it.",
             "It tests every transaction for duplicates, anomalies and policy breaches "
             "before payment leaves.")
table(s, ML, y, CONTENT_W,
      ["", "Today: recovery audit", "Meridian: continuous control"],
      [("When", "After the money has left", ("Before the payment run", {"color": INK})),
       ("Cycle", "45 to 90 days to recover", ("Continuous", {"color": INK})),
       ("Success", "60 to 70% of claims recovered", ("Prevented, not recovered", {"color": INK})),
       ("Coverage", "Sampled, by an external firm", ("Every transaction", {"color": INK}))],
      widths=[Inches(1.5), Inches(5.0), Inches(5.03)], row_h=Inches(0.46), size=12)
yy = y + Inches(2.5)
rect(s, ML, yy, CONTENT_W, Inches(1.42), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.3), yy + Inches(0.2), Inches(5.4), Inches(1.0),
     [[("The size of the problem is public. ", {"size": 13, "bold": True, "color": INK}),
       ("Duplicate payments run 0.1% to 0.5% of AP spend in controlled environments and "
        "above 1% in weak ones. APQC benchmarking puts the range at 0.8% to 2%.",
        {"size": 13, "color": MUTED})]], line_spacing=1.3)
text(s, ML + Inches(6.2), yy + Inches(0.2), Inches(5.2), Inches(1.0),
     [[("What that means per customer. ", {"size": 13, "bold": True, "color": INK}),
       ("An enterprise with $100M of AP spend carries $100K to $500K of annual exposure. "
        "One agent, one workflow, pays for the platform.", {"size": 13, "color": MUTED})]],
     line_spacing=1.3)
source(s, "Sources: APQC Open Standards Benchmarking; AP recovery audit industry "
          "benchmarks, 2026. The $100M example is arithmetic on those published rates, "
          "not a customer result.")

# =====================================================================================
# 10 — Platform layer
# =====================================================================================
s, y = slide("The platform",
             "The layer that makes twelve agents governable — and any other agent too.",
             "This is the infrastructure position. It appreciates as the number of agents "
             "in an enterprise grows, whoever built them.")
pill = [
    ("Registry", "System of record for every agent: owner, role, permission scope, "
     "data touched."),
    ("Gateway", "Third-party agents connect through open standards: MCP, "
     "OpenTelemetry, your IdP."),
    ("Data Fabric", "Zero-copy reads against the warehouse. No second copy of your "
     "data to secure."),
    ("Studio", "Low-code builder: customers create their own agents inside the same "
     "guardrails."),
    ("Assist", "Conversational front door across Meridian and connected systems."),
    ("Trust", "Approvals, immutable audit trail, RBAC, data residency, model choice."),
]
cw = (CONTENT_W - Inches(0.5)) / 3
for i, (n, d) in enumerate(pill):
    x = ML + (cw + Inches(0.25)) * (i % 3)
    yy = y + Inches(1.38) * (i // 3)
    card(s, x, yy, cw, Inches(1.22), n, d, tone=ACCENT if i == 0 else None,
         title_size=13, body_size=10.5)
text(s, ML, y + Inches(2.92), CONTENT_W, Inches(0.7),
     [[("The Registry is the wedge that becomes the moat. ",
        {"size": 13.5, "bold": True, "color": INK}),
       ("Once an enterprise records its agents, owners and approval rules in one place, "
        "that record is the thing everything else has to integrate with.",
        {"size": 13.5, "color": MUTED})]], line_spacing=1.32)

# =====================================================================================
# 11 — What is deployed
# =====================================================================================
s, y = slide("Evidence", "This is not a mockup. It is deployed and you can open it now.",
             "Every number here is measured from the production build and the public "
             "repository.")
y = stats(s, y, [
    ("165", "pages prerendered at build time"),
    ("27,400", "lines of TypeScript, strict mode"),
    ("~50,000", "words of original domain content"),
    ("0", "cumulative layout shift measured"),
    ("<820ms", "largest contentful paint, production"),
], value_size=31, h=Inches(1.3))
yy = y + Inches(0.28)
items = [
    ("Live real-time layer. ", "Server-Sent Events endpoint streaming an operations feed, "
     "metrics and an approvals queue, with reconnect, backoff and a polling fallback."),
    ("Working subscription scaffold. ", "Stripe checkout wired end to end, env-gated, "
     "running in explicit demo mode until keys are set."),
    ("Real security posture. ", "HSTS with preload, nosniff, frame and referrer policy on "
     "every response; input validated at every endpoint."),
    ("Machine-readable for AI search. ", "Structured data across eleven schema types, plus "
     "llms.txt and a 252 KB full-content file for generative engines."),
]
bullets(s, ML, yy, CONTENT_W, items, size=12.5, gap=Inches(0.46))

# =====================================================================================
# 12 — Governance architecture
# =====================================================================================
s, y = slide("Defensibility", "Governance is enforced below the agent, not inside a prompt.",
             "A prompt instruction is a suggestion. A permission boundary is a control. "
             "The distinction is the whole business.")
cw = (CONTENT_W - Inches(0.6)) / 2
rect(s, ML, y, cw, Inches(2.62), BG_MUTED, BORDER)
text(s, ML + Inches(0.28), y + Inches(0.22), cw - Inches(0.56), Inches(0.3),
     [eyebrow_text("What competitors do")])
bullets(s, ML + Inches(0.28), y + Inches(0.68), cw - Inches(0.56), [
    "Guardrails written into the system prompt",
    "Permissions inherited from whoever ran the chat",
    "Audit trail is a conversation transcript",
    "Failure mode: the model decides whether to comply",
], size=11.5)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(2.62), WHITE, ACCENT, Pt(1.1))
text(s, ML + cw + Inches(0.88), y + Inches(0.22), cw - Inches(0.56), Inches(0.3),
     [[("WHAT MERIDIAN DOES", {"size": 10.5, "bold": True, "color": ACCENT})]])
bullets(s, ML + cw + Inches(0.88), y + Inches(0.68), cw - Inches(0.56), [
    "Scope enforced at the data layer, before the model sees anything",
    "Permissions inherited from the enterprise IdP, per agent",
    "Hash-chained log of every action, exportable as evidence",
    "Failure mode: the action cannot execute, whatever the model says",
], size=11.5)
text(s, ML, y + Inches(2.92), CONTENT_W, Inches(0.6),
     [[("This is also the answer to model risk: because the controls sit below the model, "
        "the customer can swap models — or bring their own — without renegotiating "
        "governance.", {"size": 13, "color": MUTED})]], line_spacing=1.32)

# =====================================================================================
# 13 — Market
# =====================================================================================
s, y = slide("Market", "A large, budgeted market with an adjacent one arriving fast.",
             "We do not need to create a category or a budget line. Both exist.")
y = stats(s, y, [
    ("$37.5B", "human capital management market, 2026", "growing to $77.4B by 2034"),
    ("$34.3B", "HCM spend in the next 12 months", "across 362,000 companies"),
    ("$9.9B", "standalone agentic AI market, 2026", "up from ~$7B in 2025"),
    ("$8.0B", "Workday subscription revenue, FY2026", "+16% year over year"),
], value_size=34, h=Inches(1.6))
text(s, ML, y + Inches(0.35), CONTENT_W, Inches(1.1),
     [[("How we think about our slice. ", {"size": 13.5, "bold": True, "color": INK}),
       ("We are not selling an HRIS. We sell the governance and execution layer on top of "
        "one. The serviceable wedge is enterprises that already own an HCM or ERP system "
        "and are now being asked by their board to deploy agents against it — the same "
        "buyers, the same budget cycle, a new line item.",
        {"size": 13.5, "color": MUTED})]], line_spacing=1.35)
source(s, "Sources: Fortune Business Insights HCM market report; HG Insights HCM spend "
          "data; agentic AI market roundups, 2026; Workday FY2026 reported results.")

# =====================================================================================
# 14 — Wedge and GTM
# =====================================================================================
s, y = slide("Go to market", "Land on one agent with a hard number. Expand to the Registry.",
             "The wedge is chosen for measurability, not for size.")
steps = [
    ("01", "Land", "Controls Agent or Audit Agent — the two where the customer can verify "
     "the saving from their own ledger within one quarter."),
    ("02", "Prove", "A 90-day paid pilot with a pre-agreed measurement plan. Success is a "
     "number the customer's own finance team calculates, not ours."),
    ("03", "Expand", "Second and third agents in the same function, then across into HR. "
     "Credits pool across the account, so expansion is a budget change, not a new contract."),
    ("04", "Anchor", "The Registry becomes the system of record for every agent the "
     "enterprise runs — including competitors' agents. That is the renewal lock."),
]
cw = (CONTENT_W - Inches(0.75)) / 4
for i, (n, t, d) in enumerate(steps):
    x = ML + (cw + Inches(0.25)) * i
    rect(s, x, y, cw, Inches(2.25), WHITE, BORDER)
    rect(s, x, y, cw, Inches(0.035), ACCENT, None)
    text(s, x + Inches(0.22), y + Inches(0.26), Inches(1), Inches(0.25),
         [[(n, {"font": MONO, "size": 11, "color": ACCENT})]])
    text(s, x + Inches(0.22), y + Inches(0.55), cw - Inches(0.44), Inches(0.3),
         [[(t, {"size": 15, "bold": True, "color": INK})]])
    text(s, x + Inches(0.22), y + Inches(0.92), cw - Inches(0.44), Inches(1.2),
         [[(d, {"size": 11, "color": MUTED})]], line_spacing=1.3)
text(s, ML, y + Inches(2.55), CONTENT_W, Inches(0.7),
     [[("First motion is founder-led, direct to the CFO organisation, because the first "
        "ten deals are about learning what the measurement plan must say — not about "
        "volume.", {"size": 13, "color": MUTED})]], line_spacing=1.32)

# =====================================================================================
# 15 — Competition
# =====================================================================================
s, y = slide("Competition", "Three groups will come at this, and each has a structural gap.",
             "We are not claiming they cannot move. We are claiming what they would have "
             "to give up to.")
table(s, ML, y, CONTENT_W,
      ["Who", "What they have", "Structural gap", "Our position"],
      [("HCM and ERP incumbents",
        "The data, the install base, the budget line",
        "Agents are a feature that protects the suite; they will not govern a rival's agent",
        ("Neutral registry across vendors", {"color": INK})),
       ("Horizontal agent platforms",
        "Model access, developer mindshare, capital",
        "No HR or finance domain model; governance is generic, not workflow-specific",
        ("Domain depth and named outcomes", {"color": INK})),
       ("Point AI tools",
        "A single sharp workflow, fast to buy",
        "One workflow each; the enterprise ends up with ungoverned sprawl",
        ("We are what governs the sprawl", {"color": INK})),
       ("Status quo: consultants and recovery audits",
        "Trusted, outcome-priced, no IT project",
        "Retrospective and sampled; finds problems after the money moved",
        ("Prevention instead of recovery", {"color": INK}))],
      widths=[Inches(2.7), Inches(3.0), Inches(4.0), Inches(1.83)],
      row_h=Inches(0.76), size=11)

# =====================================================================================
# 16 — The five questions
# =====================================================================================
s, y = slide("Diligence", "The five questions you are going to ask.",
             "Answered directly, including where the answer is currently weak.")
qa = [
    ("What happens when a frontier lab ships this?",
     "They ship capability; we ship the enterprise's record of who owns what. Model-agnostic "
     "by design — a better model makes our agents better, not redundant."),
    ("What is the model strategy?",
     "Bring your own. Controls sit below the model, so customers can switch providers "
     "without renegotiating governance. No dependency on one lab's roadmap."),
    ("Where is the data flywheel?",
     "Honest answer: not yet. It comes from approval decisions — which exceptions humans "
     "accept or reject, per workflow, per customer. That is proprietary and compounding, "
     "and it requires customers we do not have."),
    ("How do you handle hallucination?",
     "Scope plus approval. Agents act on structured records, not free text, and anything "
     "consequential stops at a person. A wrong suggestion costs a review, not a payment."),
    ("What is the gross margin after inference?",
     "Credits are priced per completed action, so inference is a variable cost inside a "
     "metered unit. Margin discipline is a pricing input, not an afterthought — but it is "
     "unproven until real volume runs."),
]
cy = y
QW, AW = Inches(4.6), CONTENT_W - Inches(4.9)
for q_, a_ in qa:
    nq = est_lines(q_, 12.5, QW, 0.50)
    na = est_lines(a_, 12, AW, 0.50)
    n = max(nq, na)
    text(s, ML, cy, QW, Inches(0.26) * nq,
         [[(q_, {"size": 12.5, "bold": True, "color": INK})]], line_spacing=1.25)
    text(s, ML + Inches(4.9), cy, AW, Inches(0.26) * na,
         [[(a_, {"size": 12, "color": MUTED})]], line_spacing=1.28)
    cy += Inches(0.24) * n + Inches(0.26)
    hairline(s, ML, cy - Inches(0.13), CONTENT_W, BORDER)

# =====================================================================================
# 17 — Business model
# =====================================================================================
s, y = slide("Business model", "Credits, not seats. You pay for work finished.",
             "The market has already moved this way; we are shaped for it rather than "
             "retrofitting.")
table(s, ML, y, Inches(6.6), ["Plan", "Monthly", "Annual", "Credits / mo"],
      [("Starter", "$499", "$399", ("5,000", {"color": INK})),
       ("Growth", "$2,499", "$1,999", ("30,000", {"color": INK})),
       ("Enterprise", "Custom", "Custom", ("Pooled", {"color": INK}))],
      widths=[Inches(2.0), Inches(1.5), Inches(1.5), Inches(1.6)], row_h=Inches(0.46),
      size=12.5)
table(s, ML + Inches(7.0), y, Inches(4.53), ["What a credit buys", "Credits"],
      [("HR case resolved", ("2", {"color": INK})),
       ("Candidate screened", ("1", {"color": INK})),
       ("Invoice tested", ("0.05", {"color": INK})),
       ("Contract redlined", ("8", {"color": INK}))],
      widths=[Inches(3.0), Inches(1.53)], row_h=Inches(0.42), size=12)
yy = y + Inches(2.35)
rect(s, ML, yy, CONTENT_W, Inches(1.05), ACCENT_SOFT, None)
text(s, ML + Inches(0.3), yy + Inches(0.2), CONTENT_W - Inches(0.6), Inches(0.7),
     [[("Why this shape wins: ", {"size": 13, "bold": True, "color": INK}),
       ("a subscription presentation layer the customer budgets against, on a metered "
        "settlement layer that tracks cost to serve. That is the architecture the AI agent "
        "market converged on in 2026. Overage is $0.12 per credit.",
        {"size": 13, "color": MUTED})]], line_spacing=1.3)
source(s, "Pricing is implemented in the live product, including a working calculator. "
          "Source on market convergence: SaaS and AI agent pricing analyses, 2026.")

# =====================================================================================
# 18 — Unit economics (modelled)
# =====================================================================================
s, y = slide("Unit economics", "The shape of a Growth account, modelled.",
             "These are illustrative calculations from published rates and our own pricing "
             "— not observed results. We have no customers yet.")
rect(s, ML, y - Inches(0.08), CONTENT_W, Inches(0.42), RGBColor(0xFF, 0xF2, 0xD6), None)
text(s, ML + Inches(0.22), y + Inches(0.02), CONTENT_W - Inches(0.44), Inches(0.3),
     [[("MODELLED — no customer has paid Meridian anything. Treat as a pricing "
        "hypothesis to test, not evidence.",
        {"size": 11, "bold": True, "color": WARNING})]])
yy = y + Inches(0.56)
tbl_end = table(s, ML, yy, CONTENT_W,
      ["Input (mid-market enterprise)", "Assumption", "Source of the assumption"],
      [("Employees", "2,500", "Calculator default in the live product"),
       ("HR cases per month", "1,800", "Calculator default"),
       ("Invoices tested per month", "6,000", "Calculator default"),
       ("Estimated credits per month", ("~5,400", {"color": INK}), "Computed by the product's own model"),
       ("Recommended plan", ("Growth, $2,499/mo", {"color": INK}), "Plan threshold at 30,000 credits"),
       ("Staff hours returned per month", ("~800", {"color": INK}),
        "0.25h per case, 0.2h per screen, published in-product"),
       ("Value at $48/hour fully loaded", ("~$38,400/mo", {"color": INK}),
        "Blended cost assumption, stated in the product")],
      widths=[Inches(4.0), Inches(2.6), Inches(4.93)], row_h=Inches(0.365), size=11.5)
text(s, ML, tbl_end + Inches(0.22), CONTENT_W, Inches(0.6),
     [[("The ratio is the point, not the precision: ", {"size": 12.5, "bold": True, "color": INK}),
       ("a plan priced in the low thousands against time savings modelled in the tens of "
        "thousands leaves room for both a real discount and a real margin. Inference cost "
        "sits inside the credit and is the number we most need real volume to learn.",
        {"size": 12.5, "color": MUTED})]], line_spacing=1.3)

# =====================================================================================
# 19 — Status: honest
# =====================================================================================
s, y = slide("Status", "What is real today, and what is not.",
             "Stated plainly so diligence finds nothing we did not tell you first.")
cw = (CONTENT_W - Inches(0.6)) / 2
rect(s, ML, y, cw, Inches(2.9), WHITE, BORDER)
rect(s, ML, y, cw, Inches(0.04), SUCCESS, None)
text(s, ML + Inches(0.28), y + Inches(0.26), cw - Inches(0.56), Inches(0.3),
     [[("BUILT AND DEPLOYED", {"size": 10.5, "bold": True, "color": SUCCESS})]])
bullets(s, ML + Inches(0.28), y + Inches(0.72), cw - Inches(0.56), [
    "Full commercial platform, live and public, 165 pages",
    "Twelve agents fully specified: data, guardrails, credit costs",
    "Real-time operations layer over Server-Sent Events, verified in production",
    "Stripe subscription flow, env-gated demo mode",
    "Security headers, input validation, trust documentation",
], size=11.5, gap=Inches(0.42))
rect(s, ML + cw + Inches(0.6), y, cw, Inches(2.9), WHITE, BORDER)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(0.04), DANGER, None)
text(s, ML + cw + Inches(0.88), y + Inches(0.26), cw - Inches(0.56), Inches(0.3),
     [[("NOT BUILT — THIS IS THE RAISE", {"size": 10.5, "bold": True, "color": DANGER})]])
bullets(s, ML + cw + Inches(0.88), y + Inches(0.72), cw - Inches(0.56), [
    "The agent execution layer. The dashboard is a deterministic simulation and says so on the page",
    "Persistence: no database yet. Registry is specified, not stored",
    "Authentication: no SSO or SCIM implemented",
    "Zero revenue, zero customers, zero pilots",
    "Design partners shown in the product are illustrative, not real companies",
], size=11.5, gap=Inches(0.42))
source(s, "The last line matters: the customer names and outcome figures in the live "
          "product are clearly-labelled demonstration content. None represent a real "
          "deployment, and we will not present them as traction.")

# =====================================================================================
# 20 — Execution evidence
# =====================================================================================
s, y = slide("Execution", "How fast this was built, and how quality was proven.",
             "At pre-seed the question is whether the founder ships. Here is a measurable "
             "answer.")
y2 = stats(s, y, [
    ("~2 days", "from empty repository to deployed platform"),
    ("26", "commits, one engineer, AI-orchestrated"),
    ("372", "blind design judgements across 8 rounds"),
    ("44 / 51", "final-round wins against production sites"),
], value_size=34, h=Inches(1.45))
yy = y2 + Inches(0.3)
rect(s, ML, yy, CONTENT_W, Inches(1.55), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.3), yy + Inches(0.22), CONTENT_W - Inches(0.6), Inches(1.1),
     [[("The blind gauntlet. ", {"size": 13, "bold": True, "color": INK}),
       ("Quality was not self-assessed. A script screenshots every page from the "
        "production build, composites it side by side with a captured page from Stripe, "
        "Attio, Ramp, Brex, Mercury, Anthropic or Harvey in randomised order, and hands it "
        "to a reviewer who cannot tell which panel is ours. Final round: 44 of 51, with "
        "perfect records against Attio, Ramp, Brex, Mercury, Anthropic and Harvey. Asked "
        "which set to ship, the reviewer chose ours without knowing which it was.",
        {"size": 13, "color": MUTED})]], line_spacing=1.3)

# =====================================================================================
# 21 — Roadmap
# =====================================================================================
s, y = slide("Roadmap", "Eighteen months, three gates.",
             "Each gate is a decision point with a number attached, not a feature list.")
phases = [
    ("Months 0–6", "Make one agent real",
     ["Execution runtime behind the Gateway", "Postgres Registry with immutable audit log",
      "SSO and SCIM", "Controls Agent running on real customer data",
      "Gate: 3 paid pilots live"], ACCENT),
    ("Months 6–12", "Prove the measurement",
     ["Audit and Close agents to GA", "Per-agent evaluation sets gating promotion",
      "Metered billing switched on in Stripe", "Published reliability data",
      "Gate: verified saving at 3 customers"], INK),
    ("Months 12–18", "Open the Registry",
     ["Third-party agents through the Gateway", "SOC 2 Type II evidence pipeline",
      "Studio in limited release", "First non-founder sales hire",
      "Gate: Series A metrics or a clear kill decision"], SUCCESS),
]
cw = (CONTENT_W - Inches(0.6)) / 3
for i, (per, title_, items, tone) in enumerate(phases):
    x = ML + (cw + Inches(0.3)) * i
    rect(s, x, y, cw, Inches(3.35), WHITE, BORDER)
    rect(s, x, y, cw, Inches(0.04), tone, None)
    text(s, x + Inches(0.26), y + Inches(0.24), cw - Inches(0.5), Inches(0.25),
         [[(per.upper(), {"size": 10, "bold": True, "color": SUBTLE})]])
    text(s, x + Inches(0.26), y + Inches(0.55), cw - Inches(0.5), Inches(0.3),
         [[(title_, {"size": 15, "bold": True, "color": INK})]])
    cy = y + Inches(0.98)
    for it in items:
        last = it.startswith("Gate:")
        rect(s, x + Inches(0.26), cy + Inches(0.07), Emu(int(Inches(0.08))),
             Emu(int(Inches(0.08))), tone if last else BORDER_STRONG, None)
        text(s, x + Inches(0.48), cy, cw - Inches(0.72), Inches(0.35),
             [[(it, {"size": 11, "bold": last, "color": INK if last else MUTED})]],
             line_spacing=1.25)
        cy += Inches(0.30) * est_lines(it, 11, cw - Inches(0.72), 0.50) + Inches(0.08)

# =====================================================================================
# 22 — Risks
# =====================================================================================
s, y = slide("Risks", "What would kill this, and what we do about it.",
             "The first three are real and unresolved. We would rather argue them with you "
             "now than in month nine.")
table(s, ML, y, CONTENT_W, ["Risk", "Why it is serious", "Mitigation"],
      [("No customers yet",
        "Every claim on the product page is modelled. The measurement plan is untested against a real ledger.",
        ("Paid pilots designed so the customer's own finance team computes the number", {"color": INK})),
       ("Incumbent bundling",
        "Workday or SAP can ship adequate governance free inside the suite",
        ("Be the neutral registry across vendors — the thing a suite structurally will not build", {"color": INK})),
       ("Enterprise sales cycle vs runway",
        "Security review alone can take a quarter; 18 months is few cycles",
        ("Land on a single agent with a ledger-verifiable number; trust centre built before first call", {"color": INK})),
       ("Inference cost compression of margin",
        "Credit pricing is fixed while model cost is not",
        ("Credits are per completed action, repriceable per agent; model-agnostic routing", {"color": INK})),
       ("Solo founder concentration",
        "Single point of failure on all technical knowledge",
        ("First two hires are engineering; architecture is documented in-repo", {"color": INK}))],
      widths=[Inches(2.7), Inches(4.4), Inches(4.43)], row_h=Inches(0.68), size=11)

# =====================================================================================
# 23 — The ask
# =====================================================================================
s, y = slide("The ask", "$1.5M pre-seed for 18 months to a Series A decision.",
             "Sized to reach three paying customers with an independently verified saving "
             "— the only metric that matters next.")
y2 = stats(s, y, [
    ("$1.5M", "pre-seed round"),
    ("18 mo", "runway to the gate"),
    ("3", "engineering hires"),
    ("3", "paying customers, verified"),
], value_size=36, h=Inches(1.35))
yy = y2 + Inches(0.25)
table(s, ML, yy, Inches(6.4), ["Use of funds", "Share"],
      [("Engineering — 3 hires: runtime, data, security", ("62%", {"color": INK})),
       ("Founder-led sales and pilot delivery", ("16%", {"color": INK})),
       ("SOC 2 Type II, pen testing, legal", ("12%", {"color": INK})),
       ("Infrastructure and model inference", ("10%", {"color": INK}))],
      widths=[Inches(4.9), Inches(1.5)], row_h=Inches(0.44), size=12)
rect(s, ML + Inches(6.9), yy, Inches(4.63), Inches(2.78), BG_SUBTLE, BORDER)
text(s, ML + Inches(7.18), yy + Inches(0.22), Inches(4.1), Inches(0.3),
     [eyebrow_text("What we want beyond money")])
bullets(s, ML + Inches(7.18), yy + Inches(0.62), Inches(4.0), [
    "A warm introduction to a CFO or controller willing to run a paid pilot",
    "An operator who has sold governance software into finance",
    "Pressure on the measurement plan before a customer sees it",
], size=11.5, gap=Inches(0.44))

# =====================================================================================
# 24 — Close
# =====================================================================================
s = prs.slides.add_slide(BLANK)
_bg(s, INK)
_slide_no += 1
rect(s, Inches(0), Inches(0), Inches(0.055), H, ACCENT, None)
text(s, ML, Inches(2.0), Inches(11), Inches(0.4),
     [[("THE ONE-LINE VERSION", {"size": 10.5, "bold": True, "color": FAINT})]])
text(s, ML, Inches(2.5), Inches(11.2), Inches(2.0),
     [[("Agents will do the work.\nSomebody still has to be accountable.",
        {"font": SERIF, "size": 40, "color": BG})]], line_spacing=1.15)
text(s, ML, Inches(4.3), Inches(10.2), Inches(0.9),
     [[("Meridian is the record of who that is — for every agent an enterprise runs, "
        "including the ones we did not build.",
        {"size": 16, "color": BORDER_STRONG})]], line_spacing=1.35)
hairline(s, ML, Inches(5.45), CONTENT_W, RGBColor(0x3A, 0x33, 0x2C))
text(s, ML, Inches(5.75), Inches(11), Inches(1.0),
     [[("Open the product:  ", {"size": 13, "color": FAINT}),
       ("enterprise-hr-finance.vercel.app", {"size": 13, "bold": True, "color": BG})],
      [("Read the source:  ", {"size": 13, "color": FAINT}),
       ("github.com/alessoh/enterprise-hr-finance", {"size": 13, "color": BG})],
      [("Peter Alesso  ·  Founder", {"size": 13, "color": BORDER_STRONG})]],
     space_after=Pt(7))


# --- speaker notes -------------------------------------------------------------------
NOTES = {
 1: "Open with the one-liner, then say the live URL out loud and invite them to open it "
    "during the call. The product being real is the strongest thing in the room.",
 2: "Do not rush this slide. The 79/11 gap is the whole reason the company exists. If "
    "they push on the survey, concede the number varies by source and hold the point: "
    "production deployment lags adoption badly, and Gartner names governance as a cause.",
 3: "These four questions are what an actual CFO asked of agent vendors. Ask the investor "
    "which of the four they think a chat-based vendor answers well. None of them.",
 4: "Pre-seed is a bet on the founder, so this comes early. Read the right-hand box "
    "aloud. Volunteering what you are not claiming buys credibility for everything else.",
 5: "The pricing curve is the least obvious and the most useful: the market has already "
    "moved to consumption, so our billing model is not a bet, it is the convention.",
 6: "Land 'infrastructure, not application'. The Registry governing agents we did not "
    "build is the line that separates this from a point tool.",
 7: "The six terms are the data model as well as the pitch. If they only remember one "
    "slide, this is the one.",
 8: "Do not read twelve names. Say: one workflow each, a number attached to each, and "
    "point at two examples. Offer to open any agent page live.",
 9: "This is the proof that the wedge is real and already budgeted: recovery audits are "
    "an existing paid market that works retrospectively. We prevent instead.",
 10: "Registry first, everything else supports it. The moat argument lives here.",
 11: "Offer to share the screen. The dashboard streaming live is more persuasive than "
     "any slide. Say plainly that the feed is simulated and the platform is not.",
 12: "The below-the-model argument also answers model risk and pricing risk. Slow down "
     "on 'a prompt instruction is a suggestion, a permission boundary is a control'.",
 13: "Do not claim the whole HCM market. The wedge is enterprises that already own an "
     "HCM or ERP and are being told by their board to deploy agents against it.",
 14: "The pilot design is the real content: the customer's own finance team computes the "
     "number. That is what makes the first ten deals worth more than their revenue.",
 15: "The honest line is that incumbents can move. What they will not do is govern a "
     "rival's agent, because the suite exists to prevent rivals.",
 16: "Expect these five. The data flywheel answer is deliberately weak because it is "
     "weak. Saying so is worth more than a fabricated answer they will test later.",
 17: "Two-layer pricing is the market convention now, not our invention. The calculator "
     "is live in the product if they want to interrogate it.",
 18: "Say 'modelled' before they read it. Then make the ratio argument: low thousands of "
     "price against tens of thousands of modelled saving leaves room for discount and "
     "margin. Concede inference cost is the unknown.",
 19: "The most important slide in the deck for trust. Read the right-hand column out "
     "loud, including that the design partners are illustrative. Never let diligence "
     "discover this instead of hearing it from you.",
 20: "This answers 'can this founder ship' with a number rather than an adjective. The "
     "blind gauntlet is unusual enough to be memorable; offer to show the composites.",
 21: "Each phase ends in a gate, including a kill decision. Investors respond well to a "
     "founder who has pre-committed to a stop condition.",
 22: "Lead with 'no customers yet' rather than burying it. The mitigation column is "
     "where the thinking shows.",
 23: "State the number and stop talking. Then the three asks beyond money - the CFO "
     "introduction is the one that actually matters.",
 24: "End on the one-line version and the live URL. Do not add a thank-you slide.",
}

for i, sl in enumerate(prs.slides, start=1):
    if i in NOTES:
        sl.notes_slide.notes_text_frame.text = NOTES[i]


prs.save("Meridian-Investor-Deck.pptx")
print(f"saved Meridian-Investor-Deck.pptx with {len(prs.slides.__iter__.__self__._sldIdLst)} slides")
