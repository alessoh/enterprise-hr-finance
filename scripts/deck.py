"""Generates the Meridian investor deck (24 slides, 16:9).

Structure is a strategic narrative in three acts, per Raskin: name the shift in the
world, show there are winners and losers, describe the promised land, then present
capabilities as the way to reach it. Never open with the product or the founder.

  Act I   (2-8)    The problem
  Act II  (9-18)   How we solve it
  Act III (19-24)  How we should be funded

Every number is measured from this repository, cited to a public source on the slide,
or explicitly labelled as modelled.

Run:  python scripts/deck.py    Out:  Meridian-Investor-Deck.pptx
"""

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt

BG = RGBColor(0xFE, 0xFD, 0xFC)
BG_SUBTLE = RGBColor(0xF9, 0xF7, 0xF4)
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
DARK_RULE = RGBColor(0x3A, 0x33, 0x2C)

SANS, SERIF, MONO = "Segoe UI", "Georgia", "Consolas"
W, H = Inches(13.333), Inches(7.5)
ML, MR = Inches(1.0), Inches(1.0)
CW = W - ML - MR

prs = Presentation()
prs.slide_width, prs.slide_height = W, H
BLANK = prs.slide_layouts[6]
_no = 0


def _bg(s, c=BG):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    r.fill.solid()
    r.fill.fore_color.rgb = c
    r.line.fill.background()
    r.shadow.inherit = False


def rect(s, x, y, w, h, fill=None, line=None, lw=Pt(0.75)):
    sh = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill
    if line is None:
        sh.line.fill.background()
    else:
        sh.line.color.rgb = line
        sh.line.width = lw
    sh.shadow.inherit = False
    return sh


def hline(s, x, y, w, c=BORDER, wt=Pt(0.75)):
    return rect(s, x, y, w, Emu(0), None, c, wt)


def text(s, x, y, w, h, paras, align=PP_ALIGN.LEFT, ls=None, after=Pt(0)):
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.TOP
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if ls:
            p.line_spacing = ls
        p.space_after = after
        if isinstance(para, str):
            para = [(para, {})]
        for t, sp in para:
            r = p.add_run()
            r.text = t
            f = r.font
            f.name = sp.get("font", SANS)
            f.size = Pt(sp.get("size", 14))
            f.bold = sp.get("bold", False)
            f.italic = sp.get("italic", False)
            f.color.rgb = sp.get("color", INK)
    return tb


def lines(txt, size, width, ratio=0.50):
    cpl = max(8, int((width / 914400.0) * 72.0 / (size * ratio)))
    n, cur = 1, 0
    for wd in txt.split():
        add = len(wd) + (1 if cur else 0)
        if cur + add > cpl:
            n += 1
            cur = len(wd)
        else:
            cur += add
    return n


def chrome(s):
    text(s, ML, H - Inches(0.46), Inches(6), Inches(0.2),
         [[("Meridian  ·  Confidential", {"size": 9, "color": FAINT})]])
    text(s, W - MR - Inches(1), H - Inches(0.46), Inches(1), Inches(0.2),
         [[(str(_no), {"size": 9, "color": FAINT})]], align=PP_ALIGN.RIGHT)


def slide(eyebrow=None, title=None, lede=None, title_size=34):
    """Content slide. Generous type, one idea. Returns (slide, y)."""
    global _no
    s = prs.slides.add_slide(BLANK)
    _bg(s)
    _no += 1
    y = Inches(0.66)
    if eyebrow:
        text(s, ML, y, CW, Inches(0.22),
             [[(eyebrow.upper(), {"size": 10.5, "bold": True, "color": SUBTLE})]])
        y += Inches(0.38)
    if title:
        n = lines(title, title_size, CW, 0.52)
        text(s, ML, y, CW, Inches(0.58) * n,
             [[(title, {"font": SERIF, "size": title_size, "color": INK})]], ls=1.06)
        y += Inches(0.52) * n + Inches(0.10)
    if lede:
        n = lines(lede, 15, Inches(10.4), 0.50)
        text(s, ML, y, Inches(10.4), Inches(0.32) * n,
             [[(lede, {"size": 15, "color": MUTED})]], ls=1.34)
        y += Inches(0.29) * n + Inches(0.10)
    y += Inches(0.16)
    hline(s, ML, y, CW, BORDER_STRONG)
    chrome(s)
    return s, y + Inches(0.40)


def divider(act, title, sub):
    """Dark act opener. Marks the three-act structure."""
    global _no
    s = prs.slides.add_slide(BLANK)
    _bg(s, INK)
    _no += 1
    rect(s, 0, 0, Inches(0.06), H, ACCENT, None)
    text(s, ML, Inches(2.35), CW, Inches(0.3),
         [[(act.upper(), {"size": 11, "bold": True, "color": FAINT})]])
    n = lines(title, 44, Inches(11), 0.52)
    text(s, ML, Inches(2.85), Inches(11), Inches(0.75) * n,
         [[(title, {"font": SERIF, "size": 44, "color": BG})]], ls=1.1)
    text(s, ML, Inches(2.85) + Inches(0.68) * n + Inches(0.26), Inches(9.6), Inches(0.8),
         [[(sub, {"size": 16, "color": BORDER_STRONG})]], ls=1.35)
    chrome(s)
    return s


def stats(s, y, items, vsize=40, h=Inches(1.5)):
    n = len(items)
    colw = CW / n
    for i, it in enumerate(items):
        x = ML + colw * i
        if i:
            rect(s, x - Inches(0.02), y + Inches(0.04), Emu(0), h - Inches(0.25),
                 None, BORDER)
        text(s, x + Inches(0.14), y, colw - Inches(0.28), Inches(0.72),
             [[(it[0], {"size": vsize, "color": INK})]])
        text(s, x + Inches(0.14), y + Inches(0.76), colw - Inches(0.34), Inches(0.6),
             [[(it[1], {"size": 12, "color": MUTED})]], ls=1.28)
        if len(it) > 2:
            text(s, x + Inches(0.14), y + Inches(1.30), colw - Inches(0.34), Inches(0.4),
                 [[(it[2], {"size": 9.5, "color": FAINT})]], ls=1.2)
    return y + h


def bullets(s, x, y, w, items, size=14, gap=Inches(0.22), dot=ACCENT):
    cy = y
    tw = w - Inches(0.30)
    for it in items:
        if isinstance(it, tuple):
            runs = [[(it[0], {"size": size, "bold": True, "color": INK}),
                     (it[1], {"size": size, "color": MUTED})]]
            raw = it[0] + it[1]
        else:
            runs = [[(it, {"size": size, "color": MUTED})]]
            raw = it
        n = lines(raw, size, tw, 0.50)
        rect(s, x, cy + Inches(0.10), Emu(int(Inches(0.085))), Emu(int(Inches(0.085))),
             dot, None)
        text(s, x + Inches(0.30), cy, tw, Inches(0.30) * n, runs, ls=1.34)
        cy += Inches(0.28) * n + gap
    return cy


def card(s, x, y, w, h, title, body, tone=None, ts=15, bs=12.5, fill=WHITE):
    rect(s, x, y, w, h, fill, BORDER)
    if tone:
        rect(s, x, y, w, Inches(0.035), tone, None)
    tw = w - Inches(0.52)
    tn = lines(title, ts, tw, 0.50)
    text(s, x + Inches(0.26), y + Inches(0.26), tw, Inches(0.30) * tn,
         [[(title, {"size": ts, "bold": True, "color": INK})]], ls=1.22)
    by = y + Inches(0.26) + Inches(0.26) * tn + Inches(0.18)
    text(s, x + Inches(0.26), by, tw, h - (by - y) - Inches(0.2),
         [[(body, {"size": bs, "color": MUTED})]], ls=1.34)


def table(s, x, y, w, cols, rows, widths=None, rh=Inches(0.46), size=12.5):
    widths = widths or [w / len(cols)] * len(cols)
    rect(s, x, y, w, Inches(0.36), BG_SUBTLE, None)
    hline(s, x, y, w)
    hline(s, x, y + Inches(0.36), w)
    cx = x
    for c, cwi in zip(cols, widths):
        text(s, cx + Inches(0.16), y + Inches(0.10), cwi - Inches(0.2), Inches(0.22),
             [[(c.upper(), {"size": 9, "bold": True, "color": SUBTLE})]])
        cx += cwi
    cy = y + Inches(0.36)
    for r in rows:
        cx = x
        hmax = 1
        for j, (cell, cwi) in enumerate(zip(r, widths)):
            sp = {"size": size, "color": INK if j == 0 else MUTED}
            if isinstance(cell, tuple):
                cell, extra = cell
                sp.update(extra)
            hmax = max(hmax, lines(cell, size, cwi - Inches(0.3), 0.50))
            text(s, cx + Inches(0.16), cy + Inches(0.13), cwi - Inches(0.3), Inches(0.3),
                 [[(cell, sp)]], ls=1.28)
            cx += cwi
        cy += max(rh, Inches(0.26) * hmax + Inches(0.24))
        hline(s, x, cy, w)
    return cy


def source(s, note):
    text(s, ML, H - Inches(0.92), CW, Inches(0.36),
         [[(note, {"size": 9, "color": FAINT})]], ls=1.25)


# =====================================================================================
# 1 — Title
# =====================================================================================
s = prs.slides.add_slide(BLANK)
_bg(s)
_no += 1
rect(s, 0, 0, Inches(0.06), H, ACCENT, None)
text(s, ML, Inches(2.5), Inches(11), Inches(1.4),
     [[("Meridian", {"font": SERIF, "size": 62, "color": INK})]])
text(s, ML, Inches(3.75), Inches(10.2), Inches(1.0),
     [[("AI agents that run HR and finance — and a named human accountable for "
        "every consequential action.", {"size": 20, "color": MUTED})]], ls=1.32)
hline(s, ML, Inches(5.05), CW, BORDER_STRONG)
text(s, ML, Inches(5.35), Inches(11), Inches(0.8),
     [[("Pre-seed  ·  Peter Alesso, Founder  ·  September 2026",
        {"size": 13, "color": MUTED})],
      [("enterprise-hr-finance.vercel.app", {"size": 13, "bold": True, "color": ACCENT})]],
     after=Pt(7))

# =====================================================================================
# ACT I — THE PROBLEM
# =====================================================================================
divider("Act one", "The problem",
        "Enterprises have been handed a new kind of worker, and no way to hold it "
        "accountable.")

# 3 — The shift
s, y = slide("The shift", "Work is being handed to software that acts on its own.",
             "This is not a forecast. It is the operating assumption every board has "
             "already given its CFO and CHRO for the coming year.")
y = stats(s, y, [
    ("<5% → 40%", "of enterprise applications embedding task-specific agents, "
     "2025 to 2026", "Gartner forecast"),
    ("$9.9B", "standalone agentic AI market in 2026", "up from about $7B in 2025"),
    ("97%", "of surveyed SaaS CEOs plan to retire per-seat pricing within two years",
     "Cruxy, 300 CEOs, April 2026"),
], vsize=40, h=Inches(2.0))
text(s, ML, y + Inches(0.4), CW, Inches(0.9),
     [[("When software does the work, two things break at once: ",
        {"size": 17, "color": MUTED}),
       ("how you pay for it, and who answers for it.",
        {"size": 17, "bold": True, "color": INK})]], ls=1.35)
source(s, "Sources: Gartner agentic AI forecasts 2026; agentic AI market roundups 2026; "
          "Cruxy SaaS pricing survey, April 2026.")

# 4 — Winners and losers
s, y = slide("Winners and losers", "Almost everyone has bought. Almost nobody has shipped.",
             "The gap between adoption and production is where this market is actually "
             "being decided.")
rect(s, ML, y, Inches(5.4), Inches(2.4), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.4), y + Inches(0.38), Inches(4.6), Inches(1.0),
     [[("79%", {"size": 60, "color": INK})]])
text(s, ML + Inches(0.4), y + Inches(1.48), Inches(4.6), Inches(0.7),
     [[("say they have adopted AI agents", {"size": 15, "color": MUTED})]], ls=1.3)
rect(s, ML + Inches(5.9), y, Inches(5.43), Inches(2.4), WHITE, ACCENT, Pt(1.2))
text(s, ML + Inches(6.3), y + Inches(0.38), Inches(4.6), Inches(1.0),
     [[("11%", {"size": 60, "color": ACCENT})]])
text(s, ML + Inches(6.3), y + Inches(1.48), Inches(4.6), Inches(0.7),
     [[("actually run them in production", {"size": 15, "color": MUTED})]], ls=1.3)
text(s, ML, y + Inches(2.75), CW, Inches(0.9),
     [[("Gartner expects more than 40% of agentic projects to be cancelled by 2027. The "
        "reasons it gives are unclear value, rising cost and ",
        {"size": 15, "color": MUTED}),
       ("weak governance", {"size": 15, "bold": True, "color": INK}),
       (".", {"size": 15, "color": MUTED})]], ls=1.35)
source(s, "Sources: enterprise AI agent adoption surveys, 2026; Gartner, 2026.")

# 5 — The human story
s, y = slide("The buyer", "Meet the person who has to sign.",
             "Not a persona invented for this deck. This is the job title that owns the "
             "budget we sell into.")
text(s, ML, y, Inches(6.6), Inches(3.0),
     [[("The controller at a mid-market manufacturer approves about ",
        {"size": 16, "color": MUTED}),
       ("6,000 invoices a month", {"size": 16, "bold": True, "color": INK}),
       (".", {"size": 16, "color": MUTED})],
      [("She already knows some are duplicates. Benchmarking puts it between 0.1% and 2% "
        "of everything she pays out.", {"size": 16, "color": MUTED})],
      [("She learns which ones 60 days later, from an outside audit firm that keeps a "
        "share of whatever it recovers.", {"size": 16, "color": MUTED})]],
     ls=1.38, after=Pt(14))
rect(s, ML + Inches(7.2), y - Inches(0.05), Inches(4.13), Inches(2.6), BG_SUBTLE, BORDER)
text(s, ML + Inches(7.5), y + Inches(0.26), Inches(3.5), Inches(0.3),
     [[("WHAT SHE IS OFFERED TODAY", {"size": 10, "bold": True, "color": SUBTLE})]])
bullets(s, ML + Inches(7.5), y + Inches(0.74), Inches(3.5), [
    "An assistant she must supervise",
    "A chat box with no record of who decided",
    "A pilot her auditors will not accept",
], size=13, gap=Inches(0.22), dot=WARNING)
text(s, ML, y + Inches(2.95), CW, Inches(0.6),
     [[("She does not need a smarter model. She needs the money to stop leaving, and a "
        "name on the decision.", {"size": 16, "bold": True, "color": INK})]], ls=1.35)
source(s, "Duplicate payment rates: APQC Open Standards Benchmarking and AP recovery "
          "audit industry benchmarks, 2026.")

# 6 — The four questions
s, y = slide("The obstacle",
             "Four questions kill every agent deal. None are about the model.")
qs = [("Who owns this agent?", "There is no org chart for software that acts alone."),
      ("What may it read?", "Permissions live in a prompt, not in the data layer."),
      ("What can it do unsupervised?", "The blast radius is undefined at purchase time."),
      ("Can I give the log to an auditor?", "A chat transcript is not audit evidence.")]
cw = (CW - Inches(0.75)) / 4
for i, (t, b) in enumerate(qs):
    card(s, ML + (cw + Inches(0.25)) * i, y, cw, Inches(2.3), t, b, tone=WARNING,
         ts=14.5, bs=12.5)
text(s, ML, y + Inches(2.7), CW, Inches(0.9),
     [[("Every vendor answers these with a paragraph of policy. ",
        {"size": 16, "color": MUTED}),
       ("The buyer needs them answered by the system itself.",
        {"size": 16, "bold": True, "color": INK})]], ls=1.35)

# 7 — Why today's answers fail
s, y = slide("Why nothing on the market fixes it",
             "Three things she can buy today, and why each one stalls.")
table(s, ML, y, CW, ["What she can buy", "Why it appeals", "Why it stalls"],
      [("An AI assistant or copilot", "Fast to try, no integration",
        ("Supervises nothing. She is still the control, so it never scales",
         {"color": INK})),
       ("A point AI tool per workflow", "One sharp job, quick win",
        ("Each one ungoverned. Ten tools become ten unaudited actors", {"color": INK})),
       ("A recovery audit firm", "Outcome-priced, trusted, no IT project",
        ("Finds the loss 60 days after the money left, on a sample", {"color": INK}))],
      widths=[Inches(3.3), Inches(3.4), Inches(4.63)], rh=Inches(0.70), size=13)
text(s, ML, y + Inches(2.75), CW, Inches(0.8),
     [[("The common failure: each one puts the human either fully in the loop, or fully "
        "out of it. Neither is deployable in finance.",
        {"size": 15, "color": MUTED})]], ls=1.35)

# 8 — The promised land
s, y = slide("The promised land", "What it looks like when this is solved.",
             "This is the outcome we sell. Everything in Act Two exists to reach it.")
pl = [("The work runs itself. ", "Invoices tested, cases answered, the close orchestrated "
       "— continuously, with nobody driving."),
      ("Every agent has an owner. ", "A name, a scope and a permission set, recorded in "
       "one place, the way an employee has a manager."),
      ("Consequential actions stop at a person. ", "Not every action — only the ones "
       "that move money or affect an employee."),
      ("The log is the evidence. ", "When the auditor asks who approved it, the answer is "
       "a record, not a conversation.")]
bend = bullets(s, ML, y, Inches(11.0), pl, size=15, gap=Inches(0.16))
rect(s, ML, bend + Inches(0.20), CW, Inches(0.9), ACCENT_SOFT, None)
text(s, ML + Inches(0.32), bend + Inches(0.40), CW - Inches(0.64), Inches(0.6),
     [[("Machine speed, with human accountability intact. Nobody sells that today.",
        {"size": 16, "bold": True, "color": INK})]], ls=1.3)

# =====================================================================================
# ACT II — HOW WE SOLVE IT
# =====================================================================================
divider("Act two", "How we solve it",
        "Narrow agents that do the work, and a governance layer that makes them "
        "accountable.")

# 10 — What Meridian is
s, y = slide("The solution", "Agents do the work. A question box stops at a human.",
             "That is the whole mechanic, and it is already running in the deployed "
             "product.")
rect(s, ML, y, Inches(5.3), Inches(2.4), WHITE, BORDER)
rect(s, ML, y, Inches(5.3), Inches(0.04), ACCENT, None)
text(s, ML + Inches(0.36), y + Inches(0.36), Inches(4.6), Inches(0.4),
     [[("Twelve agents work", {"size": 19, "bold": True, "color": INK})]])
text(s, ML + Inches(0.36), y + Inches(0.88), Inches(4.6), Inches(1.2),
     [[("Each scoped to one workflow, running continuously against the customer's own "
        "systems of record.", {"size": 14, "color": MUTED})]], ls=1.34)
text(s, ML + Inches(5.62), y + Inches(0.95), Inches(0.7), Inches(0.5),
     [[("→", {"size": 28, "color": BORDER_STRONG})]])
rect(s, ML + Inches(6.35), y, Inches(4.98), Inches(2.4), WHITE, ACCENT, Pt(1.2))
rect(s, ML + Inches(6.35), y, Inches(4.98), Inches(0.04), WARNING, None)
text(s, ML + Inches(6.71), y + Inches(0.36), Inches(4.3), Inches(0.4),
     [[("A person decides", {"size": 19, "bold": True, "color": INK})]])
text(s, ML + Inches(6.71), y + Inches(0.88), Inches(4.3), Inches(1.2),
     [[("Anything consequential stops and waits, with the evidence attached and the "
        "decision recorded against a name.", {"size": 14, "color": MUTED})]], ls=1.34)
text(s, ML, y + Inches(2.78), CW, Inches(0.8),
     [[("Not an assistant a human babysits. Not an autonomous agent nobody controls. ",
        {"size": 16, "color": MUTED}),
       ("A workforce with an org chart.", {"size": 16, "bold": True, "color": INK})]],
     ls=1.35)

# 11 — The six terms
s, y = slide("How we make that safe", "Every agent ships under the same six terms.",
             "Enforced below the agent, in the data and permission layer — not "
             "written into a prompt.")
terms = ["Scoped to one workflow", "Reads only permitted data", "Every action logged",
         "Consequential actions need a human", "Carries a measurable outcome",
         "Runs on your chosen model"]
cw = (CW - Inches(0.5)) / 3
for i, t in enumerate(terms):
    x = ML + (cw + Inches(0.25)) * (i % 3)
    yy = y + Inches(1.02) * (i // 3)
    rect(s, x, yy, cw, Inches(0.86), BG_SUBTLE, BORDER)
    text(s, x + Inches(0.24), yy + Inches(0.16), Inches(0.6), Inches(0.26),
         [[(f"{i + 1:02d}", {"font": MONO, "size": 11, "color": ACCENT})]])
    text(s, x + Inches(0.24), yy + Inches(0.44), cw - Inches(0.48), Inches(0.34),
         [[(t, {"size": 13.5, "color": INK})]], ls=1.25)
text(s, ML, y + Inches(2.35), CW, Inches(0.9),
     [[("A prompt instruction is a suggestion. A permission boundary is a control. ",
        {"size": 16, "color": MUTED}),
       ("That distinction is the entire business.",
        {"size": 16, "bold": True, "color": INK})]], ls=1.35)

# 12 — The twelve agents
s, y = slide("The workforce", "Twelve agents. Each does one job and owns one number.")
ag = [("Help Desk", "HR cases resolved"), ("Recruiting", "Candidates screened"),
      ("Payroll", "Errors caught pre-run"), ("Scheduling", "Open shifts filled"),
      ("Performance", "Reviews drafted"), ("Job Architecture", "Pay bands benchmarked"),
      ("Audit", "Evidence packaged"), ("Planning", "Variances explained"),
      ("Controls", "Transactions tested"), ("Close", "Month-end orchestrated"),
      ("Revenue Contracts", "Revenue risk flagged"), ("Contract Review", "Paper redlined")]
cw = (CW - Inches(0.45)) / 4
for i, (n, d) in enumerate(ag):
    x = ML + (cw + Inches(0.15)) * (i % 4)
    yy = y + Inches(0.76) * (i // 4)
    rect(s, x, yy, cw, Inches(0.66), WHITE, BORDER)
    tone = ACCENT if i < 6 else (INK if i < 11 else WARNING)
    rect(s, x, yy, Inches(0.03), Inches(0.66), tone, None)
    text(s, x + Inches(0.2), yy + Inches(0.11), cw - Inches(0.4), Inches(0.24),
         [[(n, {"size": 12.5, "bold": True, "color": INK})]])
    text(s, x + Inches(0.2), yy + Inches(0.37), cw - Inches(0.4), Inches(0.24),
         [[(d, {"size": 10.5, "color": MUTED})]])
text(s, ML, y + Inches(2.5), CW, Inches(0.8),
     [[("Narrow is the deployment strategy. ", {"size": 15, "bold": True, "color": INK}),
       ("A buyer can say yes to one workflow this quarter. Nobody says yes to a "
        "general-purpose agent with access to payroll.", {"size": 15, "color": MUTED})]],
     ls=1.35)

# 13 — The money proof
s, y = slide("Proof the wedge is real",
             "One agent, against a loss the customer already knows they take.",
             "The Controls Agent tests every transaction before payment leaves, instead "
             "of recovering it afterwards.")
table(s, ML, y, CW, ["", "Recovery audit (today)", "Meridian (continuous)"],
      [("When", "After the money has left", ("Before the payment run", {"color": INK})),
       ("Cycle", "45 to 90 days", ("Continuous", {"color": INK})),
       ("Success", "60 to 70% of claims recovered",
        ("Prevented, not recovered", {"color": INK})),
       ("Coverage", "A sample, by an outside firm",
        ("Every transaction", {"color": INK}))],
      widths=[Inches(1.6), Inches(4.8), Inches(4.93)], rh=Inches(0.44), size=13)
rect(s, ML, y + Inches(2.35), CW, Inches(1.2), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.34), y + Inches(2.58), CW - Inches(0.68), Inches(0.85),
     [[("The exposure is public and already budgeted. ",
        {"size": 15, "bold": True, "color": INK}),
       ("At published duplicate-payment rates, an enterprise with $100M of AP spend "
        "carries $100K to $500K of annual leakage, and firms are already paid a share of "
        "it to find that money late. One agent, one workflow, pays for the platform.",
        {"size": 15, "color": MUTED})]], ls=1.34)
source(s, "Sources: APQC Open Standards Benchmarking; AP recovery audit benchmarks 2026. "
          "The $100M figure is arithmetic on published rates, not a customer result.")

# 14 — Governance below the model
s, y = slide("Why it holds up",
             "Governance sits below the model, where it cannot be talked out of.")
cw = (CW - Inches(0.6)) / 2
rect(s, ML, y, cw, Inches(2.4), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.3), y + Inches(0.26), cw - Inches(0.6), Inches(0.3),
     [[("EVERYONE ELSE", {"size": 10.5, "bold": True, "color": SUBTLE})]])
bullets(s, ML + Inches(0.3), y + Inches(0.76), cw - Inches(0.6), [
    "Guardrails written into the prompt",
    "Permissions of whoever opened the chat",
    "The model decides whether to comply",
], size=13.5, gap=Inches(0.26), dot=BORDER_STRONG)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(2.4), WHITE, ACCENT, Pt(1.2))
text(s, ML + cw + Inches(0.9), y + Inches(0.26), cw - Inches(0.6), Inches(0.3),
     [[("MERIDIAN", {"size": 10.5, "bold": True, "color": ACCENT})]])
bullets(s, ML + cw + Inches(0.9), y + Inches(0.76), cw - Inches(0.6), [
    "Scope enforced before the model sees data",
    "Permissions inherited per agent from your IdP",
    "The action cannot execute, whatever the model says",
], size=13.5, gap=Inches(0.26))
text(s, ML, y + Inches(2.7), CW, Inches(0.8),
     [[("This is also the answer to model risk: customers can switch models, or bring "
        "their own, without renegotiating governance.",
        {"size": 15, "color": MUTED})]], ls=1.35)

# 15 — The Registry / the moat
s, y = slide("Why it compounds",
             "The Registry becomes the system of record for every agent an enterprise "
             "runs.",
             "Including agents we did not build. This is the durable position, and it "
             "appreciates as agents multiply.", title_size=32)
steps = [("Land", "One agent, one verifiable number"),
         ("Record", "Owner, scope, permissions, approvals"),
         ("Expand", "More agents, same guardrails, pooled credits"),
         ("Anchor", "Third-party agents register here too")]
cw = (CW - Inches(0.75)) / 4
for i, (t, d) in enumerate(steps):
    x = ML + (cw + Inches(0.25)) * i
    rect(s, x, y, cw, Inches(1.55), WHITE, BORDER)
    rect(s, x, y, cw, Inches(0.035), ACCENT, None)
    text(s, x + Inches(0.24), y + Inches(0.28), Inches(0.6), Inches(0.25),
         [[(f"0{i + 1}", {"font": MONO, "size": 11, "color": ACCENT})]])
    text(s, x + Inches(0.24), y + Inches(0.58), cw - Inches(0.48), Inches(0.3),
         [[(t, {"size": 16, "bold": True, "color": INK})]])
    text(s, x + Inches(0.24), y + Inches(0.95), cw - Inches(0.48), Inches(0.5),
         [[(d, {"size": 11.5, "color": MUTED})]], ls=1.28)
    if i < 3:
        text(s, x + cw + Inches(0.04), y + Inches(0.62), Inches(0.25), Inches(0.3),
             [[("→", {"size": 16, "color": BORDER_STRONG})]])
text(s, ML, y + Inches(1.9), CW, Inches(0.9),
     [[("A suite will never govern a competitor's agent — the suite exists to keep "
        "competitors out. ", {"size": 15, "color": MUTED}),
       ("A neutral registry is the one thing they structurally will not build.",
        {"size": 15, "bold": True, "color": INK})]], ls=1.35)

# 16 — It is live
s, y = slide("It exists", "Not a concept. Deployed, public, and open during this meeting.")
y = stats(s, y, [
    ("165", "pages, prerendered"),
    ("27,400", "lines of TypeScript"),
    ("<820ms", "largest contentful paint"),
    ("0", "layout shift"),
    ("Live", "streaming operations feed"),
], vsize=32, h=Inches(1.35))
bullets(s, ML, y + Inches(0.3), CW, [
    ("The live dashboard ", "streams an operations feed, metrics and an approvals queue "
     "over Server-Sent Events, with reconnect and a polling fallback."),
    ("Subscription billing ", "is wired end to end through Stripe, env-gated to demo mode "
     "until keys are set."),
    ("The security posture is real: ", "HSTS, nosniff, frame and referrer policy on every "
     "response, with input validated at every endpoint."),
], size=14, gap=Inches(0.22))
source(s, "enterprise-hr-finance.vercel.app  ·  github.com/alessoh/enterprise-hr-finance")

# 17 — Competition
s, y = slide("Competition", "Who else comes at this, and what they would have to give up.")
table(s, ML, y, CW, ["Who", "Their advantage", "What stops them", "Our position"],
      [("HCM and ERP suites", "The data and the budget line",
        "Agents defend the suite; they will not govern a rival's",
        ("Neutral across vendors", {"color": INK})),
       ("Horizontal agent platforms", "Models, capital, mindshare",
        "No HR or finance domain model; governance stays generic",
        ("Domain depth, named outcomes", {"color": INK})),
       ("Point AI tools", "One sharp workflow, fast to buy",
        "Ten tools become ten ungoverned actors",
        ("We govern the sprawl", {"color": INK})),
       ("Recovery audit firms", "Outcome-priced and trusted",
        "Retrospective and sampled, by design",
        ("Prevention, not recovery", {"color": INK}))],
      widths=[Inches(2.7), Inches(2.7), Inches(4.1), Inches(1.83)], rh=Inches(0.64),
      size=11.5)

# 18 — Business model
s, y = slide("How we make money", "Credits, not seats. You pay for work finished.",
             "When software does the work, charging per human charges for the wrong "
             "thing.")
table(s, ML, y, Inches(6.5), ["Plan", "Per month", "Credits"],
      [("Starter", "$499", ("5,000", {"color": INK})),
       ("Growth", "$2,499", ("30,000", {"color": INK})),
       ("Enterprise", "Custom", ("Pooled", {"color": INK}))],
      widths=[Inches(2.4), Inches(2.0), Inches(2.1)], rh=Inches(0.46), size=13)
table(s, ML + Inches(6.9), y, Inches(4.43), ["A credit buys", "Credits"],
      [("An HR case resolved", ("2", {"color": INK})),
       ("A candidate screened", ("1", {"color": INK})),
       ("An invoice tested", ("0.05", {"color": INK})),
       ("A contract redlined", ("8", {"color": INK}))],
      widths=[Inches(2.9), Inches(1.53)], rh=Inches(0.42), size=12.5)
rect(s, ML, y + Inches(2.45), CW, Inches(1.0), ACCENT_SOFT, None)
text(s, ML + Inches(0.32), y + Inches(2.67), CW - Inches(0.64), Inches(0.7),
     [[("A subscription the customer budgets against, on a metered layer that tracks cost "
        "to serve. ", {"size": 14.5, "color": MUTED}),
       ("That is the architecture this market converged on in 2026, so we are shaped for "
        "it rather than retrofitting.",
        {"size": 14.5, "bold": True, "color": INK})]], ls=1.32)
source(s, "Implemented in the live product, including a working calculator. Overage $0.12 "
          "per credit. Source: SaaS and AI agent pricing analyses, 2026.")

# =====================================================================================
# ACT III — THE FUNDING
# =====================================================================================
divider("Act three", "How we should be funded",
        "What is built, what is not, and exactly what the next eighteen months buy.")

# 20 — Where we are
s, y = slide("Where we are", "Built and deployed. No revenue, no customers, no team yet.",
             "Stated first, so diligence finds nothing we did not tell you.")
cw = (CW - Inches(0.6)) / 2
rect(s, ML, y, cw, Inches(3.05), WHITE, BORDER)
rect(s, ML, y, cw, Inches(0.04), SUCCESS, None)
text(s, ML + Inches(0.3), y + Inches(0.26), cw - Inches(0.6), Inches(0.3),
     [[("DONE", {"size": 10.5, "bold": True, "color": SUCCESS})]])
bullets(s, ML + Inches(0.3), y + Inches(0.76), cw - Inches(0.6), [
    "The full commercial platform, live and public",
    "Twelve agents specified end to end",
    "Real-time operations layer, verified in production",
    "Stripe billing scaffold and security posture",
], size=13, gap=Inches(0.18), dot=SUCCESS)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(3.05), WHITE, BORDER)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(0.04), DANGER, None)
text(s, ML + cw + Inches(0.9), y + Inches(0.26), cw - Inches(0.6), Inches(0.3),
     [[("NOT DONE — THIS IS THE RAISE", {"size": 10.5, "bold": True, "color": DANGER})]])
bullets(s, ML + cw + Inches(0.9), y + Inches(0.76), cw - Inches(0.6), [
    "The agent execution layer. The dashboard is a simulation and says so",
    "No database, no SSO. The Registry is specified, not stored",
    "Zero revenue, zero customers, zero pilots",
    "Design partners in the product are illustrative, not real companies",
], size=13, gap=Inches(0.18), dot=DANGER)
text(s, ML, y + Inches(3.28), CW, Inches(0.6),
     [[("We would rather argue these gaps with you now than have you find them in month "
        "nine.", {"size": 15, "color": MUTED})]], ls=1.35)

# 21 — What is already proven
s, y = slide("What is already proven",
             "At pre-seed the question is whether the founder ships.")
y = stats(s, y, [
    ("~2 days", "empty repository to deployed platform"),
    ("26", "commits, one engineer"),
    ("372", "blind design judgements"),
    ("44 / 51", "final-round wins vs production sites"),
], vsize=36, h=Inches(1.5))
rect(s, ML, y + Inches(0.35), CW, Inches(1.55), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.34), y + Inches(0.58), CW - Inches(0.68), Inches(1.15),
     [[("Quality was not self-assessed. ", {"size": 14.5, "bold": True, "color": INK}),
       ("A script screenshots every page from the production build, composites it beside "
        "a page from Stripe, Attio, Ramp, Brex, Mercury, Anthropic or Harvey in random "
        "order, and hands it to a reviewer who cannot tell which is ours. Final round: 44 "
        "of 51. Asked which set to ship, the reviewer chose ours without knowing which it "
        "was.", {"size": 14.5, "color": MUTED})]], ls=1.32)

# 22 — The plan
s, y = slide("The plan", "Eighteen months, three gates.",
             "Each phase ends in a number, including a gate that says stop.")
ph = [("Months 0–6", "Make one agent real",
       ["Execution runtime and Postgres Registry", "SSO, SCIM, immutable audit log",
        "Controls Agent on real customer data"], "Gate: 3 paid pilots live", ACCENT),
      ("Months 6–12", "Prove the number",
       ["Audit and Close agents to GA", "Evaluation sets gating promotion",
        "Metered billing switched on"], "Gate: verified saving at 3 customers", INK),
      ("Months 12–18", "Open the Registry",
       ["Third-party agents via the Gateway", "SOC 2 Type II evidence pipeline",
        "First non-founder sales hire"], "Gate: Series A metrics, or stop", SUCCESS)]
cw = (CW - Inches(0.6)) / 3
for i, (per, t, items, gate, tone) in enumerate(ph):
    x = ML + (cw + Inches(0.3)) * i
    rect(s, x, y, cw, Inches(2.95), WHITE, BORDER)
    rect(s, x, y, cw, Inches(0.04), tone, None)
    text(s, x + Inches(0.26), y + Inches(0.26), cw - Inches(0.5), Inches(0.25),
         [[(per.upper(), {"size": 10, "bold": True, "color": SUBTLE})]])
    text(s, x + Inches(0.26), y + Inches(0.56), cw - Inches(0.5), Inches(0.32),
         [[(t, {"size": 16, "bold": True, "color": INK})]])
    cy = y + Inches(1.02)
    for it in items:
        n = lines(it, 12, cw - Inches(0.78), 0.50)
        rect(s, x + Inches(0.26), cy + Inches(0.08), Emu(int(Inches(0.08))),
             Emu(int(Inches(0.08))), BORDER_STRONG, None)
        text(s, x + Inches(0.5), cy, cw - Inches(0.78), Inches(0.28) * n,
             [[(it, {"size": 12, "color": MUTED})]], ls=1.3)
        cy += Inches(0.26) * n + Inches(0.12)
    rect(s, x + Inches(0.26), y + Inches(2.34), cw - Inches(0.52), Inches(0.44),
         BG_SUBTLE, None)
    text(s, x + Inches(0.42), y + Inches(2.45), cw - Inches(0.74), Inches(0.3),
         [[(gate, {"size": 11.5, "bold": True, "color": INK})]])

# 23 — The ask
s, y = slide("The ask", "$1.5M pre-seed. Eighteen months of runway.",
             "Sized to reach the only metric that matters next: three paying customers "
             "with a saving their own finance team calculates.")
y = stats(s, y, [("$1.5M", "pre-seed"), ("18 months", "runway to the gate"),
                 ("3", "engineering hires"), ("3", "paying customers, verified")],
          vsize=36, h=Inches(1.2))
table(s, ML, y + Inches(0.25), Inches(6.5), ["Use of funds", "Share"],
      [("Engineering — runtime, data, security", ("62%", {"color": INK})),
       ("Founder-led sales and pilot delivery", ("16%", {"color": INK})),
       ("SOC 2 Type II, pen testing, legal", ("12%", {"color": INK})),
       ("Infrastructure and inference", ("10%", {"color": INK}))],
      widths=[Inches(5.0), Inches(1.5)], rh=Inches(0.38), size=12.5)
rect(s, ML + Inches(6.9), y + Inches(0.25), Inches(4.43), Inches(2.45), BG_SUBTLE, BORDER)
text(s, ML + Inches(7.2), y + Inches(0.48), Inches(3.8), Inches(0.3),
     [[("BEYOND THE MONEY", {"size": 10, "bold": True, "color": SUBTLE})]])
bullets(s, ML + Inches(7.2), y + Inches(0.86), Inches(3.8), [
    "An introduction to a CFO who will run a paid pilot",
    "An operator who has sold governance into finance",
    "Pressure on the measurement plan first",
], size=12, gap=Inches(0.16))

# 24 — Close
s = prs.slides.add_slide(BLANK)
_bg(s, INK)
_no += 1
rect(s, 0, 0, Inches(0.06), H, ACCENT, None)
text(s, ML, Inches(2.45), Inches(11.2), Inches(2.0),
     [[("Agents will do the work.\nSomebody still has to be accountable.",
        {"font": SERIF, "size": 42, "color": BG})]], ls=1.16)
text(s, ML, Inches(4.35), Inches(10.2), Inches(0.9),
     [[("Meridian is the record of who that is — for every agent an enterprise "
        "runs, including the ones we did not build.",
        {"size": 17, "color": BORDER_STRONG})]], ls=1.35)
hline(s, ML, Inches(5.5), CW, DARK_RULE)
text(s, ML, Inches(5.8), Inches(11), Inches(1.0),
     [[("enterprise-hr-finance.vercel.app", {"size": 14, "bold": True, "color": BG})],
      [("Peter Alesso  ·  Founder", {"size": 13, "color": BORDER_STRONG})]],
     after=Pt(8))
chrome(s)

# --- speaker notes -------------------------------------------------------------------
NOTES = {
 1: "Say the line, then invite them to open the URL during the call. Do not start "
    "presenting the product; the next slide starts the story.",
 2: "Act break. Pause. You are about to describe their world, not your company.",
 3: "The shift is external and undeniable: their own portfolio companies are already "
    "being told to deploy agents. Land the closing line.",
 4: "79 versus 11 is the whole opportunity in two numbers. Let the slide sit.",
 5: "The emotional centre of the deck. Slow right down. She knows she is losing money, "
    "finds out sixty days late, and pays a firm a share to tell her. Do not name a "
    "company: this is the role, not a customer we have.",
 6: "Ask which of the four a chat-based vendor answers well. The answer is none.",
 7: "Pre-empt the three alternatives before they raise them. Remember the closing line: "
    "fully in the loop, or fully out. Neither ships in finance.",
 8: "The promised land. This is what they are funding. Read the blue box and stop.",
 9: "Act break. Now, and only now, you talk about what you built.",
 10: "One mechanic, two boxes. If they remember one slide, make it this one.",
 11: "Below the model, not in the prompt. Say it twice.",
 12: "Do not read twelve names. One job, one number each, then make the narrow-scope "
     "argument: nobody says yes to a general agent with payroll access.",
 13: "The strongest commercial slide. Recovery audits prove the budget already exists; "
     "we act before the money leaves rather than after.",
 14: "Answers model risk and defensibility at once. Customers can swap models without "
     "renegotiating governance.",
 15: "The compounding argument. A suite will never govern a rival's agent.",
 16: "Offer to share your screen. A live streaming dashboard beats every slide here. Say "
     "plainly that the feed is simulated and the platform is not.",
 17: "Do not claim incumbents cannot move. Claim what they would have to give up.",
 18: "Two-layer pricing is the market convention, not our invention.",
 19: "Act break. Everything from here is the money and the plan.",
 20: "Read the red column aloud, including that design partners are illustrative. "
     "Volunteering this is what makes the rest of the deck credible.",
 21: "Answers 'can he ship' with a number rather than an adjective. Offer the blind "
     "comparison composites.",
 22: "Every phase ends in a gate, including one that says stop.",
 23: "State the number and stop talking. The CFO introduction matters most.",
 24: "End here. No thank-you slide.",
}
for i, sl in enumerate(prs.slides, start=1):
    if i in NOTES:
        sl.notes_slide.notes_text_frame.text = NOTES[i]

prs.save("Meridian-Investor-Deck.pptx")
print(f"saved {len(prs.slides._sldIdLst)} slides")
