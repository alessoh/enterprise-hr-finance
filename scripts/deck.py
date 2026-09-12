"""Generates the Meridian investor deck (12 slides, 16:9).

Structure is a strategic narrative in three acts, per Raskin: name the shift in the
world, show there are winners and losers, describe the promised land, then present
capabilities as the way to reach it. Never open with the product or the founder.

  Act I   (2-4)    The problem
  Act II  (5-8)    How we solve it
  Act III (9-12)   How we should be funded

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

# 3 — The stall
s, y = slide("The stall", "Almost everyone has bought. Almost nobody has shipped.")
rect(s, ML, y, Inches(5.4), Inches(2.5), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.45), y + Inches(0.45), Inches(4.5), Inches(1.1),
     [[("79%", {"size": 68, "color": INK})]])
text(s, ML + Inches(0.45), y + Inches(1.62), Inches(4.5), Inches(0.6),
     [[("have adopted AI agents", {"size": 16, "color": MUTED})]], ls=1.3)
rect(s, ML + Inches(5.9), y, Inches(5.43), Inches(2.5), WHITE, ACCENT, Pt(1.2))
text(s, ML + Inches(6.35), y + Inches(0.45), Inches(4.5), Inches(1.1),
     [[("11%", {"size": 68, "color": ACCENT})]])
text(s, ML + Inches(6.35), y + Inches(1.62), Inches(4.5), Inches(0.6),
     [[("run them in production", {"size": 16, "color": MUTED})]], ls=1.3)
text(s, ML, y + Inches(2.95), CW, Inches(0.7),
     [[("Gartner expects 40% of agentic projects to be cancelled by 2027. The reason it "
        "gives is ", {"size": 16, "color": MUTED}),
       ("weak governance", {"size": 16, "bold": True, "color": INK}),
       (".", {"size": 16, "color": MUTED})]], ls=1.35)
source(s, "Sources: enterprise AI agent adoption surveys, 2026; Gartner, 2026.")

# 4 — The buyer
s, y = slide("The buyer", "The money leaves, and she finds out sixty days later.")
text(s, ML, y, Inches(6.7), Inches(2.6),
     [[("A controller approves ", {"size": 18, "color": MUTED}),
       ("6,000 invoices a month", {"size": 18, "bold": True, "color": INK}),
       (". She already knows some are duplicates.", {"size": 18, "color": MUTED})],
      [("She learns which ones from an outside audit firm that keeps a share of what it "
        "recovers.", {"size": 18, "color": MUTED})]], ls=1.4, after=Pt(18))
rect(s, ML + Inches(7.3), y - Inches(0.05), Inches(4.03), Inches(2.5), BG_SUBTLE, BORDER)
text(s, ML + Inches(7.6), y + Inches(0.26), Inches(3.4), Inches(0.3),
     [[("OFFERED TODAY", {"size": 10, "bold": True, "color": SUBTLE})]])
bullets(s, ML + Inches(7.6), y + Inches(0.76), Inches(3.4), [
    "An assistant she must supervise",
    "A chat box with no record of who decided",
    "A pilot her auditors reject",
], size=13, gap=Inches(0.20), dot=WARNING)
text(s, ML, y + Inches(2.65), CW, Inches(0.7),
     [[("She does not need a smarter model. She needs a name on the decision.",
        {"size": 18, "bold": True, "color": INK})]], ls=1.35)
source(s, "Duplicate payments run 0.1% to 2% of AP spend. Sources: APQC Open Standards "
          "Benchmarking; AP recovery audit benchmarks, 2026.")

# =====================================================================================
# ACT II — HOW WE SOLVE IT
# =====================================================================================
divider("Act two", "How we solve it",
        "Narrow agents that do the work, and a governance layer that makes them "
        "accountable.")

# 6 — The mechanic
s, y = slide("The mechanic", "Agents do the work. A question box stops at a human.")
rect(s, ML, y, Inches(5.3), Inches(2.4), WHITE, BORDER)
rect(s, ML, y, Inches(5.3), Inches(0.04), ACCENT, None)
text(s, ML + Inches(0.4), y + Inches(0.45), Inches(4.5), Inches(0.5),
     [[("Twelve agents work", {"size": 22, "bold": True, "color": INK})]])
text(s, ML + Inches(0.4), y + Inches(1.1), Inches(4.5), Inches(0.9),
     [[("Each scoped to one workflow, running continuously.",
        {"size": 15, "color": MUTED})]], ls=1.34)
text(s, ML + Inches(5.62), y + Inches(0.95), Inches(0.7), Inches(0.5),
     [[("→", {"size": 28, "color": BORDER_STRONG})]])
rect(s, ML + Inches(6.35), y, Inches(4.98), Inches(2.4), WHITE, ACCENT, Pt(1.2))
rect(s, ML + Inches(6.35), y, Inches(4.98), Inches(0.04), WARNING, None)
text(s, ML + Inches(6.75), y + Inches(0.45), Inches(4.2), Inches(0.5),
     [[("A person decides", {"size": 22, "bold": True, "color": INK})]])
text(s, ML + Inches(6.75), y + Inches(1.1), Inches(4.2), Inches(0.9),
     [[("Anything consequential waits, with the decision recorded against a name.",
        {"size": 15, "color": MUTED})]], ls=1.34)
text(s, ML, y + Inches(2.8), CW, Inches(0.7),
     [[("Enforced below the model, not written into a prompt. ",
        {"size": 17, "color": MUTED}),
       ("That distinction is the business.", {"size": 17, "bold": True, "color": INK})]],
     ls=1.35)

# 7 — The workforce
s, y = slide("The workforce", "Twelve agents. Each owns one job and one number.")
ag = [("Help Desk", "HR cases resolved"), ("Recruiting", "Candidates screened"),
      ("Payroll", "Errors caught pre-run"), ("Scheduling", "Open shifts filled"),
      ("Performance", "Reviews drafted"), ("Job Architecture", "Pay bands benchmarked"),
      ("Audit", "Evidence packaged"), ("Planning", "Variances explained"),
      ("Controls", "Transactions tested"), ("Close", "Month-end orchestrated"),
      ("Revenue Contracts", "Revenue risk flagged"), ("Contract Review", "Paper redlined")]
cw = (CW - Inches(0.45)) / 4
for i, (n, d) in enumerate(ag):
    x = ML + (cw + Inches(0.15)) * (i % 4)
    yy = y + Inches(0.82) * (i // 4)
    rect(s, x, yy, cw, Inches(0.72), WHITE, BORDER)
    tone = ACCENT if i < 6 else (INK if i < 11 else WARNING)
    rect(s, x, yy, Inches(0.03), Inches(0.72), tone, None)
    text(s, x + Inches(0.22), yy + Inches(0.13), cw - Inches(0.44), Inches(0.26),
         [[(n, {"size": 13, "bold": True, "color": INK})]])
    text(s, x + Inches(0.22), yy + Inches(0.41), cw - Inches(0.44), Inches(0.26),
         [[(d, {"size": 11, "color": MUTED})]])
text(s, ML, y + Inches(2.72), CW, Inches(0.7),
     [[("Nobody says yes to a general-purpose agent with access to payroll. ",
        {"size": 16, "color": MUTED}),
       ("They say yes to one workflow.", {"size": 16, "bold": True, "color": INK})]],
     ls=1.35)

# 8 — The wedge
s, y = slide("The wedge", "We stop the loss before it happens, not after.")
table(s, ML, y, CW, ["", "Recovery audit today", "Meridian"],
      [("When", "After the money has left", ("Before the payment run", {"color": INK})),
       ("Cycle", "45 to 90 days", ("Continuous", {"color": INK})),
       ("Coverage", "A sample", ("Every transaction", {"color": INK}))],
      widths=[Inches(1.7), Inches(4.7), Inches(4.93)], rh=Inches(0.5), size=14)
rect(s, ML, y + Inches(2.15), CW, Inches(1.05), BG_SUBTLE, BORDER)
text(s, ML + Inches(0.36), y + Inches(2.38), CW - Inches(0.72), Inches(0.7),
     [[("$100M of AP spend carries $100K to $500K of annual leakage. ",
        {"size": 16, "bold": True, "color": INK}),
       ("Firms are already paid a share to find it late. One agent pays for the "
        "platform.", {"size": 16, "color": MUTED})]], ls=1.34)
text(s, ML, y + Inches(3.42), CW, Inches(0.5),
     [[("Priced in credits per completed action, not per seat.",
        {"size": 15, "color": MUTED})]], ls=1.3)
source(s, "Arithmetic on published duplicate-payment rates, not a customer result.")

# =====================================================================================
# ACT III — THE FUNDING
# =====================================================================================
divider("Act three", "How we should be funded",
        "What is built, what is not, and exactly what the next eighteen months buy.")

# 10 — Where we are
s, y = slide("Where we are", "Built and deployed. No revenue, no customers, no team.")
cw = (CW - Inches(0.6)) / 2
rect(s, ML, y, cw, Inches(2.5), WHITE, BORDER)
rect(s, ML, y, cw, Inches(0.04), SUCCESS, None)
text(s, ML + Inches(0.32), y + Inches(0.3), cw - Inches(0.6), Inches(0.3),
     [[("DONE", {"size": 11, "bold": True, "color": SUCCESS})]])
bullets(s, ML + Inches(0.32), y + Inches(0.85), cw - Inches(0.6), [
    "The commercial platform, live and public",
    "Twelve agents specified end to end",
    "Real-time operations layer, in production",
], size=14, gap=Inches(0.22), dot=SUCCESS)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(2.5), WHITE, BORDER)
rect(s, ML + cw + Inches(0.6), y, cw, Inches(0.04), DANGER, None)
text(s, ML + cw + Inches(0.92), y + Inches(0.3), cw - Inches(0.6), Inches(0.3),
     [[("NOT DONE — THIS IS THE RAISE",
        {"size": 11, "bold": True, "color": DANGER})]])
bullets(s, ML + cw + Inches(0.92), y + Inches(0.85), cw - Inches(0.6), [
    "The execution layer. The dashboard is a simulation",
    "No database, no SSO, no stored Registry",
    "Zero revenue, zero customers, zero pilots",
], size=14, gap=Inches(0.22), dot=DANGER)
text(s, ML, y + Inches(2.78), CW, Inches(0.7),
     [[("Design partners shown in the product are illustrative, not real companies. ",
        {"size": 15, "color": MUTED}),
       ("We will not present them as traction.",
        {"size": 15, "bold": True, "color": INK})]], ls=1.35)

# 11 — The ask
s, y = slide("The ask", "$1.5M pre-seed. Eighteen months of runway.")
y = stats(s, y, [("$1.5M", "pre-seed round"), ("18", "months of runway"),
                 ("3", "engineering hires"), ("3", "paying customers, verified")],
          vsize=40, h=Inches(1.35))
gates = [("Months 0–6", "3 paid pilots live", ACCENT),
         ("Months 6–12", "Verified saving at 3 customers", INK),
         ("Months 12–18", "Series A metrics, or stop", SUCCESS)]
cw = (CW - Inches(0.6)) / 3
for i, (per, gate, tone) in enumerate(gates):
    x = ML + (cw + Inches(0.3)) * i
    yy = y + Inches(0.35)
    rect(s, x, yy, cw, Inches(1.15), WHITE, BORDER)
    rect(s, x, yy, cw, Inches(0.04), tone, None)
    text(s, x + Inches(0.28), yy + Inches(0.3), cw - Inches(0.56), Inches(0.25),
         [[(per.upper(), {"size": 10, "bold": True, "color": SUBTLE})]])
    text(s, x + Inches(0.28), yy + Inches(0.62), cw - Inches(0.56), Inches(0.4),
         [[(gate, {"size": 14.5, "bold": True, "color": INK})]], ls=1.25)
text(s, ML, y + Inches(1.78), CW, Inches(0.7),
     [[("62% to engineering. ", {"size": 15, "bold": True, "color": INK}),
       ("The rest to pilot delivery, SOC 2 Type II and infrastructure. What we want "
        "besides money: one introduction to a CFO who will run a paid pilot.",
        {"size": 15, "color": MUTED})]], ls=1.35)

# =====================================================================================
# 12 — Close
# =====================================================================================
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
 1: "Say the line, then invite them to open the URL during the call. Do not start on the "
    "product; the next slide starts the story.",
 2: "Act break. Pause. You are describing their world, not your company.",
 3: "79 versus 11 is the whole opportunity in two numbers. Say the governance line and "
    "stop talking.",
 4: "The emotional centre of the deck. Slow down. She knows she is losing money, finds "
    "out sixty days late, and pays a firm a share to tell her. This is the role, not a "
    "customer we have.",
 5: "Act break. Now, and only now, you talk about what you built.",
 6: "One mechanic, two boxes. If they remember one slide, make it this one. Below the "
    "model, not in the prompt — say it twice.",
 7: "Do not read twelve names. One job, one number each, then make the narrow-scope "
    "argument.",
 8: "The commercial slide. Recovery audit firms prove the budget already exists; we act "
    "before the money leaves. Credits pricing is the one-line close.",
 9: "Act break. Everything from here is the money and the plan.",
 10: "Read the red column aloud, including that design partners are illustrative. "
     "Volunteering this is what makes everything else credible.",
 11: "State the number and stop. The CFO introduction is the ask that matters most. If "
     "they push on the plan, the three gates are on the slide, including the one that "
     "says stop.",
 12: "End here. No thank-you slide.",
}
for i, sl in enumerate(prs.slides, start=1):
    if i in NOTES:
        sl.notes_slide.notes_text_frame.text = NOTES[i]

prs.save("Meridian-Investor-Deck.pptx")
print(f"saved {len(prs.slides._sldIdLst)} slides")
