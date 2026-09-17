# Brag Plan: ResolveX

## What is this app?
ResolveX is a campus complaint and maintenance system that takes an issue from student submission through AI classification, smart staff assignment, SLA tracking, resolution, and notification.

## The 9-question rubric

1. **What is the app?** Campus complaints become trackable, routed work instead of email chains.
2. **Funniest or most impressive claim:** “Campus issues, resolved before they escalate.” The supporting proof is “No email chains, no confusion.”
3. **Visual hook:** The acid-green `#B9FF66` highlight against the charcoal `#191A23` brand surface, plus the live-looking complaint card with status, priority, assignee, and SLA countdown.
4. **What should be shown from the actual UI?** The student complaint form, the AI suggestion banner, and the dashboard-style complaint/timeline card; these are recreated from `SubmitComplaint.jsx`, `StudentDashboard.jsx`, `ComplaintDetail.jsx`, and the landing-page hero.
5. **Shortest satisfying video:** 20–21 seconds. It needs enough time to show entry → classification → assignment → resolution without rushing the copy.
6. **Tone that fits best:** Preset `app-store`; creative direction: “a clean campus operations demo with a quietly confident startup finish.”
7. **Audio feel:** Warm business bed with sparse, motion-matched UI clicks and one soft success hit. The audio should make the workflow feel dependable, not hyperactive.
8. **Share caption:** ResolveX turns “the lights are broken again” into one trackable ticket — AI-classified, smartly assigned, SLA-aware, and resolved before it becomes another email chain.
9. **User flow worth showing:** Fill in a complaint → AI classifies it as electrical/high priority → assignment lands with the right staff member and SLA timer → status resolves and a notification appears.

## The angle

Treat ResolveX like a real, polished campus-ops product launch: one complaint moves through a visible pipeline in seconds. The specific joke is that the old campus complaint email chain never gets a chance to exist. The video is grounded in the real copy and UI states from the repo, not abstract “AI” graphics.

## Hook (first 2–3 seconds)

Open on the exact hero promise: `Campus issues, resolved before they escalate.` The word `resolved` lands inside the source site's acid-green pill treatment while a compact complaint card locks into the frame with `IN PROGRESS`, `ELECTRICAL`, and `SLA: 4h remaining`.

## Key moments (the middle)

- A student fills the real complaint form pattern with “Lights not working — Block A, 2nd Floor.”
- The `AI Suggestion` banner appears and locks in `ELECTRICAL · HIGH`, echoing the repo's NLP classification flow.
- The complaint routes to `Electrical Dept.` and `Kritika`, with the source hero's `SLA: 4h remaining` detail visible.

## Outro / punchline

The timeline flips to `RESOLVED`, then a notification toast lands: `Complaint resolved — student notified.` Finish on the ResolveX shield lockup and the real tagline: `Where every concern finds a resolution.`

## User flow worth showing

Fill in a complaint → AI classifies category and priority → smart assignment + SLA tracking → resolved and notified.

## Tone

- Preset: `app-store`
- Creative direction: Clean campus operations demo with a quietly confident startup finish
- Interpretation: Feature-card clarity, generous holds for copy, smooth wipes and panel slides, with the acid-green/charcoal brand system doing the personality work.

## Format: landscape — 1920x1080
## Duration: 20.8 seconds

## Visual identity (from the project)

- Background: `#FFFFFF` landing canvas, `#191A23` brand-dark panel
- Accent: `#B9FF66` brand-green; supporting app-shell indigo `#4F46E5`
- Text: `#191A23` on light surfaces, `#FFFFFF` on dark surfaces
- Display font: Space Grotesk (fallback: system sans)
- Body font: Inter (fallback: system sans); JetBrains Mono for IDs and metadata
- Strongest visual element: Acid-green rounded pills and the hero complaint card showing status, tags, assignee, and SLA countdown

## Share copy (draft)

ResolveX turns “the lights are broken again” into one trackable ticket — AI-classified, smartly assigned, SLA-aware, and resolved before it becomes another email chain.

## Audio direction

- Role: warm bed with sparse professional accents
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`, warm and business-y
- Music treatment: Start at 0.0s around 0.32 volume, fade in over the first 0.25s, hold under the workflow, and ease down under the final lockup.
- Music cue guidance: bundled preset `assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json`; tempo ≈114.84 BPM. Major cue targets: 1.60s hook settle, 5.80s AI suggestion, 12.65s assignment lock, 17.91s resolved/outro. Sequential UI accents can use every other beat: 10.54s, 11.60s, 12.65s.
- Audio-reactive treatment: subtle; let the dark panel glow and the green status dot breathe with music RMS. No waveform, equalizer, or strobing visuals.
- SFX posture: sparse to moderate, motion-matched, low/medium high-frequency risk.
- Audio-coupled moments: hook card lock, AI suggestion banner landing, three assignment chips assembling, resolved toast and final shield lockup.
- Restraint rule: audio must never compete with the readable product copy or turn a calm ops workflow into a hype reel.

## Storyboard

### Scene 1 — The promise — 2.6s

Charcoal brand field with a localized green glow. The kicker `AI-POWERED CAMPUS MANAGEMENT` settles first, then the headline reads `Campus issues, resolved before they escalate.` with `resolved` in the source site's green pill style. A compact complaint card slides in on the right with `#RX-A3F2-9K1M`, `IN PROGRESS`, `ELECTRICAL`, and `SLA: 4h remaining`.

Sequential/interaction: yes — kicker, headline, then ticket card lock in that order.
Audio intent: confident opening; one soft card lock accent at the hook settle.
Audio-coupled idea: major hook reveal beat-locked near 1.60s.
Music: warm business bed, low under copy.
Transition mood: clean slide → Scene 2

### Scene 2 — Submit once — 3.8s

Light app surface. A recreated `Submit a complaint` card assembles with the real field labels `Title`, `Description`, `Category`, `Priority`, `Location`. Values type in: `Lights not working` and `Block A, 2nd Floor`; the submit button reads `Submit complaint →`. A small caption says `No email chains, no confusion.`

Sequential/interaction: yes — cursor/tap implication, then title and location fields populate.
Audio intent: precise and dependable; quiet click on the submit action.
Audio-coupled idea: simulated type/click, but keep text holds above the reading-time floor.
Music: same bed, slightly brighter as the form fills.
Transition mood: smooth wipe → Scene 3

### Scene 3 — AI routes the issue — 4.1s

The submitted card lifts into a dashboard-style panel. A blue-indigo `AI Suggestion` banner appears with a Zap mark and the exact UI language `Category: ELECTRICAL · Priority: HIGH`, then the tags lock into place. Supporting copy: `AI Auto-Classifies` and `Urgency + category, automatically.`

Sequential/interaction: yes — banner, category, then priority tag appear one by one and hold together.
Audio intent: a small “this is working” lift; soft reveal hit only on the banner.
Audio-coupled idea: banner landing near the 5.80s cue; category/priority use readable stagger, not every fast beat.
Music: warm bed, no ducking.
Transition mood: crisp panel slide → Scene 4

### Scene 4 — Smart assignment — 4.2s

Dark brand panel with a thin green routing line. The ticket card sits left; three destination chips assemble across the frame: `ELECTRICAL`, `Kritika · least-loaded`, `SLA: 4h remaining`. The section label `Smart Assignment` and source claim `right department, right staff member` land above the route. A subtle pulse travels along the connector.

Sequential/interaction: yes — three destination chips arrive in order at approximately 10.54s, 11.60s, and 12.65s, each then remains visible.
Audio intent: measured forward motion, one accent on the final assignment lock.
Audio-coupled idea: beat-grid at every other beat; final lock aligned near 12.65s.
Music: same bed, the most rhythmic section.
Transition mood: hard clean cut → Scene 5

### Scene 5 — Resolved, notified — 6.1s

Light surface returns. A three-step timeline reads `PENDING → IN PROGRESS → RESOLVED`; a notification toast lands with `Complaint resolved — student notified.` The toast and status dot use the source green accent. The final 2.2 seconds simplify into the ResolveX shield, `ResolveX`, and `Where every concern finds a resolution.` A small proof chip reads `< 2 min average assignment time`.

Sequential/interaction: yes — timeline states step through, then notification arrives, then final lockup settles and holds.
Audio intent: quiet payoff, one warm success hit, then music eases under the logo.
Audio-coupled idea: resolved state lands near 17.91s; final shield gets a restrained logo hit.
Music: fade down gently under the final lockup.
Transition mood: soft crossfade → end

**Music mood for this video:** upbeat / app-store / dependable
**Audio summary:** A warm business pulse carries one complaint through a clean UI workflow, with clicks and soft impacts marking the meaningful state changes before a restrained resolved/logo payoff.

