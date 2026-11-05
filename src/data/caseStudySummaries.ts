/**
 * Case-study summaries (TL;DR card) and key decisions, drafted only from text already on each
 * case-study page and confirmed by Hafsa.
 * `stated: false` marks decisions the page implies (two approaches contrasted) rather than states.
 */
export interface Decision {
  title: string;
  considered: string[];
  chosen: string;
  why: string;
  cost: string | null;
  stated: boolean;
}

export interface CaseStudySummary {
  tldr: { problem: string; role: string; outcome: string; timeline: string };
  decisions: Decision[];
}

export const caseStudySummaries: Record<string, CaseStudySummary> = {
  "philly-truce": {
    "tldr": {
      "problem": "Philly Truce's new site would be kept up by staff and volunteers, not designers, and the current site had no shared rules: two typefaces, all caps and black buttons.",
      "role": "Product Designer on a manager-led team. I owned typography, color and pairings, voice and vocabulary, and the Wix build.",
      "outcome": "The new Wix site is built from the system and launching soon, and the team uses it beyond the website. Auditing my own states caught two contrast failures before launch.",
      "timeline": "Mar – Nov 2026"
    },
    "decisions": [
      {
        "title": "The existing brand navy over my own draft palette",
        "considered": ["My draft: slate navy with burnt orange accents"],
        "chosen": "Philly Truce's existing navy, with gold and teal accents",
        "why": "The new site needed to feel like the organization people already know. It also lifted links from 3.86:1 to 4.97:1.",
        "cost": "Dropping the draft palette I had built.",
        "stated": true
      },
      {
        "title": "Nine fixed styles over flexible size ranges",
        "considered": ["Size ranges (H1 48–56px) with Inter for H2 and H3"],
        "chosen": "One fixed size per Wix text theme, every heading in DM Serif Display",
        "why": "Editors pick a named style instead of choosing a size, so pages stay consistent.",
        "cost": "No room for one-off sizes on special pages.",
        "stated": true
      },
      {
        "title": "An allow-list of pairings over a list of combinations to avoid",
        "considered": ["Draft: a list of color combinations not to use"],
        "chosen": "Six approved text pairings, all WCAG AAA; text sits on nothing else",
        "why": "Six rules are easier for an editor to follow than a list of mistakes to remember.",
        "cost": "Some brand colors never carry text; gold, for one, is too light on white.",
        "stated": true
      }
    ]
  },
  "immunization": {
    "tldr": {
      "problem": "Only 21% of 4,000+ medical officers showed up to routes, and field activity couldn't be tracked.",
      "role": "Assistant Program Manager. Led the redesign and development of eVaccs 2.0.",
      "outcome": "21% → 91% medical officer attendance increase; 4,000+ medical officers monitored; 3M children's records digitized.",
      "timeline": "2014-2015"
    },
    "decisions": [
      {
        "title": "GPS check-in over paper reports",
        "considered": [
          "Paper-based reporting (unreliable, easily falsified, weeks late)"
        ],
        "chosen": "Single-tap GPS check-in, no manual entry",
        "why": "Paper reports were unreliable, falsifiable and late; real-time GPS tracking created accountability paper never could.",
        "cost": null,
        "stated": false
      },
      {
        "title": "Icons and color over text",
        "considered": [
          "Text-based interface"
        ],
        "chosen": "Visual-first interface relying on icons and color",
        "why": "Many medical officers couldn't read, so the interface had to work without text.",
        "cost": null,
        "stated": false
      },
      {
        "title": "Radical simplicity over sophistication",
        "considered": [
          "A more sophisticated, feature-rich solution"
        ],
        "chosen": "Radical simplicity: one tap, GPS, offline-first, no typing",
        "why": "Users had low literacy, basic phones and spotty connectivity; the most sophisticated solution would have failed.",
        "cost": null,
        "stated": false
      }
    ]
  },
  "medrec": {
    "tldr": {
      "problem": "Daily diabetes logging felt burdensome; users were overwhelmed by fragmented tools, not the disease itself.",
      "role": "Product Designer. Led the full design process from research to final UI.",
      "outcome": "35% decrease in error rates; 40% increase in task efficiency by reducing data logging steps.",
      "timeline": "2025"
    },
    "decisions": [
      {
        "title": "Bottom nav over hamburger menu",
        "considered": [
          "Hamburger menu"
        ],
        "chosen": "Bottom navigation",
        "why": "Mid-fidelity testing showed users preferred a bottom nav over a hamburger menu.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Unified daily view over dashboard",
        "considered": [
          "Cluttered dashboard showing 12+ visible metrics"
        ],
        "chosen": "Unified daily view; complexity revealed progressively",
        "why": "Reduced cognitive load; start simple, reveal complexity gradually so beginners get clarity.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Supportive guidance over clinical alerts",
        "considered": [
          "Clinical data dumps, harsh alerts, judgmental metrics"
        ],
        "chosen": "Supportive guidance with celebrations and gentle nudges",
        "why": "Users need to feel supported, not surveilled; designing for motivation rather than clinical reporting.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Device integration over manual logging",
        "considered": [
          "12+ daily manual inputs"
        ],
        "chosen": "CGM and smartwatch integration",
        "why": "Cuts daily manual inputs from 12+ to 3-4; matches persona need for automated logging.",
        "cost": null,
        "stated": true
      }
    ]
  },
  "fitstart": {
    "tldr": {
      "problem": "Fitness apps focus on performance metrics; beginners lose motivation and struggle to stay consistent.",
      "role": "Product Designer. Led the complete design process from research to final prototypes.",
      "outcome": "Designed to WCAG AA; 45% Faster task completion; 40% Higher routine adherence potential.",
      "timeline": "3 weeks"
    },
    "decisions": [
      {
        "title": "Five-step onboarding, not long forms",
        "considered": [
          "Overwhelming users with forms",
          "Skipping personalization entirely"
        ],
        "chosen": "Simplified five-step onboarding (name, level, time, interests, goals)",
        "why": "Gathers just enough information to create a tailored starting point without overwhelming beginners.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Habit-building over performance metrics",
        "considered": [
          "Performance metrics or advanced training focus"
        ],
        "chosen": "Habit-first design; progress measured in consistency",
        "why": "Success isn't pounds lifted, it's days of showing up; consistency beats intensity.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Streaks over competitive leaderboards",
        "considered": [
          "Competitive leaderboards"
        ],
        "chosen": "Gamified progress via streaks, milestones, gentle celebrations",
        "why": "Promotes intrinsic motivation rather than competition.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Browse first, account later",
        "considered": [
          "Asking for commitment (account) up front"
        ],
        "chosen": "No account required to browse",
        "why": "Reduce friction to first value: let users experience value before asking for commitment.",
        "cost": null,
        "stated": false
      }
    ]
  },
  "folio": {
    "tldr": {
      "problem": "Freelancers lose hours to admin across fragmented tools, with no single source of truth.",
      "role": "Product Designer. Led problem definition through high-fidelity prototypes and usability validation.",
      "outcome": "60% Reduction in admin time; 3x Faster invoice payments; 12 Screens designed.",
      "timeline": "2026"
    },
    "decisions": [
      {
        "title": "Organize by client, not document",
        "considered": [
          "Separate tools/sections per document type (invoices, proposals, projects)"
        ],
        "chosen": "Client-centric architecture: one source of truth per client",
        "why": "Freelancers think in clients; 100% of interviewees used 4+ tools and searched across apps.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Reduce decisions, not features",
        "considered": [
          "Cutting features to keep it simple"
        ],
        "chosen": "Advanced features for power users, smart defaults for everyone",
        "why": "Power users need advanced features, but smart defaults mean most users never configure anything.",
        "cost": null,
        "stated": false
      }
    ]
  },
  "equaltales": {
    "tldr": {
      "problem": "Help close the STEM gender gap; most children's books feature male protagonists.",
      "role": "Designer & Developer. Took it from concept to deployed product.",
      "outcome": "1st Place - Best AI/ML at #75HER Hackathon; 200+ Demo attendees.",
      "timeline": "2026 (#75HER Hackathon)"
    },
    "decisions": [
      {
        "title": "Real women over fictional role models",
        "considered": [
          "Generic fictional role models"
        ],
        "chosen": "Real historical women as protagonists",
        "why": "Fictional role models felt hollow; real achievements create deeper emotional impact than fiction.",
        "cost": "Real historical figures limit story variety.",
        "stated": true
      },
      {
        "title": "Watercolor over photorealistic illustration",
        "considered": [
          "Photorealistic image style",
          "Unique generated characters per story"
        ],
        "chosen": "Watercolor illustration style",
        "why": "Photorealism hit uncanny valley and per-story faces were inconsistent; watercolor is forgiving of AI inconsistencies.",
        "cost": null,
        "stated": true
      }
    ]
  },
  "ai-lab": {
    "tldr": {
      "problem": "AI widens the options fast, but someone still has to choose between them and check what it gets wrong.",
      "role": "Product Designer. She runs AI design reviews, makes the calls, and built the checks: an accessibility audit script and a site assistant limited to her own pages.",
      "outcome": "2 Hackathon Awards (CarbonLint and EqualTales). On this site, her hand checks caught 2 accessibility failures that the automated scan missed.",
      "timeline": "2025 - Ongoing"
    },
    "decisions": [
      {
        "title": "Where the homepage photo goes",
        "considered": [
          "A framed photo overlapping the name (the art director's pick)",
          "Two columns",
          "Shrinking the photo in place"
        ],
        "chosen": "A small photo pill inside the name",
        "why": "The name reads as one line and the tagline and buttons sit above the fold.",
        "cost": "The name gives up some of its poster scale."
      },
      {
        "title": "What the site's assistant may answer",
        "considered": [
          "General design questions",
          "Salary, visa or availability"
        ],
        "chosen": "Only facts from this site's pages; everything else goes to email",
        "why": "A recruiter should never read a number or claim she didn't write.",
        "cost": "It says \"I don't know\" more often."
      },
      {
        "title": "How to check accessibility",
        "considered": [
          "Trusting the automated scan alone"
        ],
        "chosen": "An automated scan of every page, then hand checks for contrast over gradients and narrow-screen reflow",
        "why": "The scan found 0 problems; the hand checks found 2.",
        "cost": "Hand checks add time to every release."
      }
    ]
  },
  "pixelcheck": {
    "tldr": {
      "problem": "AI builders turn a design into a page in minutes, but it drifts on phones, and the usual checks only ask whether the page breaks.",
      "role": "Designer & builder, solo, with Claude Code as coding partner.",
      "outcome": "A real AI build of FitStart fit at all 8 widths yet scored 38 on phone; PixelCheck showed why and wrote a fix brief.",
      "timeline": "Sep – Oct 2026"
    },
    "decisions": [
      {
        "title": "The worst size as the headline",
        "considered": [
          "An average across phone, tablet and desktop"
        ],
        "chosen": "The worst size is the headline score",
        "why": "An average of 38, 61 and 65 would hide the phone, which is the whole problem.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Explain the score instead of tuning it",
        "considered": [
          "Changing the scorer after seeing a result"
        ],
        "chosen": "Show points lost per factor and drift band by band beside the score",
        "why": "Spacing that drifts down the page costs points on every row below; explaining that keeps the score honest.",
        "cost": "Drift down the page still costs points on every row below it.",
        "stated": true
      },
      {
        "title": "A verifier outside the model",
        "considered": [
          "Trusting the language model's fix brief as written"
        ],
        "chosen": "Every line cites a measured fact, and a rule-based check drops what the facts don't back",
        "why": "The first briefs looked plausible but weren't safe to paste.",
        "cost": null,
        "stated": true
      },
      {
        "title": "Score where the build can't see the answer",
        "considered": [
          "Scoring in the same environment that captures the build"
        ],
        "chosen": "Score in a disposable sandbox with the network off, the only place the design frames go",
        "why": "The build never sees the design it is graded against, so it can't grade itself.",
        "cost": null,
        "stated": true
      }
    ]
  },
  "portfolio-website": {
    "tldr": {
      "problem": "The old portfolio worked but felt static and generic; it didn't show her attention to detail.",
      "role": "Designer & Developer. Designed and built every interaction, with AI-assisted implementation.",
      "outcome": "2 Weeks build time; 20+ Micro-interactions; 160+ Tests passing.",
      "timeline": "2 Weeks"
    },
    "decisions": [
      {
        "title": "Craft over speed",
        "considered": [
          "A simpler portfolio that ships faster"
        ],
        "chosen": "Craft: polished interactions throughout",
        "why": "The portfolio isn't just showing her work, it is her work; details demonstrate client-level care.",
        "cost": "Slower to ship; time spent on details most visitors won't consciously notice.",
        "stated": true
      },
      {
        "title": "Custom display font over system fonts",
        "considered": [
          "Generic system fonts for headlines"
        ],
        "chosen": "Moche display typeface for hero text",
        "why": "Makes a strong first impression; typography becomes a design element, not just text.",
        "cost": null,
        "stated": true
      },
      {
        "title": "3D tilt cards over flat cards",
        "considered": [
          "Flat cards with basic hover states"
        ],
        "chosen": "Perspective tilt project cards",
        "why": "Cards feel tactile; the 3D effect invites exploration and adds depth.",
        "cost": null,
        "stated": true
      }
    ]
  }
};
