# Meridian — 3:00 demo video script

**Live site:** https://enterprise-hr-finance.vercel.app · **Repo:** https://github.com/alessoh/enterprise-hr-finance

## The story this script tells

**Work that stopped itself, and the person who had to decide.**

A payroll run halts because three employees are missing I-9s. A duplicate invoice is caught before it
goes out twice. Both land in front of a human. That is the entire pitch, and the video follows that one
thread from the hero, into the agent that caught it, into the live workspace where a person clicks
Approve, then down into the governance that proves who decided and the meter that bills for it.

Every page in this video answers the same question a CFO asks: **if software is doing the work, who is
accountable?** Do not tour features. Follow the decision.

---

## Before you record

| Setting | Value |
|---|---|
| Window | 1440 × 900, browser zoom exactly 100% |
| Capture | 1920 × 1080, 30 fps, cursor visible |
| Audio | Voice only, no music under narration |
| Browser | Fresh profile, no extensions, no bookmarks bar |

Dismiss the announcement bar once (the **×** at the far right of the strip at the very top) before the
first take, so the page cannot shift mid-shot.

**Pre-open five tabs in this order**, then come back to tab 1 to start. Switching tabs on camera is
faster than typing URLs and keeps the pace up.

| Tab | URL |
|---|---|
| 1 | `enterprise-hr-finance.vercel.app/` |
| 2 | `enterprise-hr-finance.vercel.app/agents` |
| 3 | `enterprise-hr-finance.vercel.app/agents/controls` |
| 4 | `enterprise-hr-finance.vercel.app/security` |
| 5 | `enterprise-hr-finance.vercel.app/pricing` |

**Do not pre-open the dashboard.** You open it live on camera at 1:25 so the stream is seen connecting.
That is the whole point of that shot.

**How to find each stop.** Every beat names the exact heading to scroll to, and gives the pixel depth as
a cross-check. Aim for the heading, not the number. Scroll smoothly, roughly 800 px per second — fast
scrolling reads as panic on a screencast.

**One thing about the hero card.** The card in the right half of the hero is driven by the live event
engine, so its contents change every few seconds and the dollar amounts differ on every take. Never
read an exact figure from it in narration. The script below is written so it works whatever is on
screen.

---

## 0:00 — 0:30 · The hook: work that stopped itself

**Screen.** Tab 1, home page, top of the page, nothing scrolled.

In the right half of the hero, under the rotating globe, is a card captioned **AT THE GATEWAY** with an
amber **Needs approval** tag and two buttons, **Approve** and **Decline**. On a fresh load it reads
*"Blocked run · pre-flight check failed · 3 missing I-9 verifications · Payroll."* Start talking on that
card.

**Action.** Rest the cursor just beside the card. Do not click.

> "A payroll run just stopped itself. Three people are missing I-9 verifications, so the agent held the
> run and put it in front of a human."

**Action.** Within about three seconds the card changes on its own, as a blue dot on the globe crosses
the blue line. It will usually change to a flagged duplicate invoice. Point at the card as it changes.

> "And there's the next one. Different agent, a duplicate invoice, caught before it paid twice."

**Action.** Move the cursor to the vertical blue line on the globe and hold it there.

> "That's Meridian. Twelve AI agents doing HR and finance work. Each dot is an agent, and the blue line
> is the governed one."

*Proves the thesis on a live screen in thirty seconds. If the card has not changed by the time you
finish the first paragraph, wait for it — the change is the proof.*

---

## 0:30 — 0:55 · How a buyer reads the catalog

**Screen.** Still tab 1. Scroll down to the heading **Six terms every agent runs under.** (about
1,740 px). Stop with all six numbered terms in frame and hold for two seconds before speaking.

> "Buyers here don't have a model problem, they have a governance problem. So every agent ships under the
> same six terms: one workflow, only permitted data, every action logged, human approval, a measurable
> outcome, your choice of model."

**Action.** Switch to tab 2 (`/agents`). Scroll from the top past the group heading **HR agents**, and
stop when **Finance agents** is near the top of the frame (about 1,767 px) with its cards visible.

> "Twelve agents, grouped the way the buying committee is. Each names one job and the number it's
> accountable for. Narrow is what actually gets deployed."

*Proves market fit and innovation. Governance is the organising idea of the whole site, not a compliance
page bolted on at the end.*

---

## 0:55 — 1:25 · The agent that caught the invoice

**Screen.** Switch to tab 3 (`/agents/controls`). Start at the top with the H1 **Controls Agent** and the
outcome figure in the card beside it both visible.

> "Here's the agent that caught that invoice. It tests every transaction for duplicates and policy
> breaches. Two hundred and eighty-three thousand dollars a year in duplicate payments avoided at one
> design partner, footnoted as a modelled outcome."

**Action.** Scroll to the heading **Data, actions, and approvals** (about 2,686 px). Three columns sit
under it: **Data it reads**, **Actions it takes**, **What needs approval**. Frame all three at once, then
move the cursor across them left to right while you say the next line. Hold this frame; it is the
strongest single shot in the video.

> "And this is what procurement reads, on all twelve pages. What it sees. What it can do alone. What it
> can never do without a person."

*Proves governance depth, which is twenty percent of the score.*

---

## 1:25 — 2:00 · The live workspace, and the decision

**Screen.** Open a new tab and type `enterprise-hr-finance.vercel.app/dashboard` on camera. Let it load
while you speak — the fresh connection is the evidence.

> "That workspace, running. This is a live stream, not a recording."

**Action.** Stop talking. Let the feed run in **silence for twelve seconds** while new rows arrive at the
top. Do not move the cursor. This is the most persuasive moment in the video, and narration would waste
it. If a take runs short overall, lengthen this, not the talking.

> "Every row is an action, what it cost, and whether a person still has to decide. Amber means one thing
> here: a human must approve."

**Action.** Scroll to the heading **Awaiting your approval** (about 1,286 px). Five rows sit under it,
each with **Approve** and **Decline**. Pick the row with the largest dollar amount, hover it for one
second so the viewer's eye lands there, then click **Approve** and let the row resolve on camera.

> "The agent found it, held it, and a named person released it. That record is what an auditor asks for."

**Action.** Scroll up to the heading **Credits · Growth plan** (975 px) and rest the cursor on the meter.

> "And every action meters against the plan's allowance."

*Proves architecture, the working-demo requirement, and the billing model in one continuous shot.
Rehearse the click — a misclick here costs a whole retake.*

---

## 2:00 — 2:25 · What holds it up

**Screen.** Switch to tab 4 (`/security`). Scroll to the heading **Four controls, enforced below the
agent.** (about 1,720 px).

> "Underneath: four controls enforced below the agent, not inside its prompt. Scope. Inherited
> permissions. Approval gates. A hash-chained log."

**Action.** Keep scrolling to **Where data goes, and where it does not.** (about 6,180 px) and stop with
the diagram filling the frame.

> "No training on customer data. Reads scoped and logged. Residency per workspace. Everything a security
> reviewer asks, on one page."

*Proves enterprise governance and compliance, the other twenty percent. Two frames, no wandering.*

---

## 2:25 — 2:50 · How it makes money

**Screen.** Switch to tab 5 (`/pricing`), top of page, three plans in frame. Click the **Annual** toggle
so every price visibly changes, then click **Monthly** to put it back.

> "Pricing is consumption, not seats. When software does the work, charging per human charges for the
> wrong thing. You buy credits and spend them per completed action."

**Action.** Scroll to the heading **Size your credit pool** (about 2,816 px). Under **Your volumes** on
the left are five sliders. Drag **HR cases per month** slowly up to about double its starting value and
let the panel on the right recalculate on screen.

> "Put in your volumes and it returns a credit estimate, the plan that fits, and the hours it hands back.
> Stripe is wired end to end."

*Proves monetisation. The live recalculation is the evidence — make sure the right-hand panel is legible
in frame while you drag.*

---

## 2:50 — 3:00 · Close

**Screen.** Back to tab 1, top of the home page.

> "A hundred and sixty-five pages, sub-second load, zero layout shift. The execution layer is next, and
> the dashboard says so. It's live, and the repo is public."

*End on the product. No thank-you card, no logo animation.*

---

## Recording notes

- **The twelve seconds of silence at 1:35 is scripted, not dead air.** If it feels long while recording,
  it is working. Cut anything else first.
- **Never read a dollar figure off the hero card.** Those amounts are generated live and differ every
  take. The $283,000 on the Controls Agent page is static and safe to say.
- **Rehearse the Approve click** on the dashboard once before the real take.
- **Keep the cursor still** unless it is pointing at the thing you are naming in that sentence.
- **The script is 373 spoken words.** At a calm 135 words per minute that is 2:46 of speech plus the 12
  seconds of silence, so 2:58 — with almost nothing spare. Speak at a measured pace and let the scroll
  transitions ride under the narration rather than pausing between them. If you overrun, cut from the
  0:30–0:55 catalog beat. Never cut the dashboard beat.
- **The hackathon allows 2 to 5 minutes**, so landing at 3:10 or 3:20 is safe. Do not rush to hit 3:00
  exactly; rushed narration costs more than twenty seconds of runtime.
- **If the globe does not appear**, you are under 768 px wide, zoomed in, or have reduced motion enabled
  — the site deliberately serves a static poster in those cases. Check the window is 1440 × 900 at 100%.
- **Record the dashboard beat last** if you are short on time; it is the one shot that cannot be faked
  and the one judges will replay.
