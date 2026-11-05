/**
 * AI Lab content. Every fact here comes from a source noted beside it; link labels and the
 * award count are derived from this data so the page can't drift from it.
 */

export type LabStatus = 'live' | 'writeup' | 'case-study';

export interface LabProject {
  id: string;
  title: string;
  tool: string;
  /** What it does, in one line, taken from the project's own page or app. */
  summary: string;
  status: LabStatus;
  url: string;
  award?: string;
  image: string;
}

export const linkLabel: Record<LabStatus, string> = {
  live: 'Try it',
  writeup: 'Read writeup',
  'case-study': 'Case study',
};

export const labProjects: LabProject[] = [
  {
    id: 'pixelcheck',
    title: 'PixelCheck',
    tool: 'Claude Code',
    summary: 'Tests AI-built UI against the designer’s phone, tablet and desktop frames at every screen size, and writes a fix brief that a rule-based verifier checks line by line.',
    status: 'case-study',
    url: '/work/pixelcheck',
    image: '/images/og/pixelcheck.jpg',
  },
  {
    id: 'equaltales',
    title: 'EqualTales',
    tool: 'Claude',
    summary: 'Illustrated children’s stories that counter the stereotype a child has voiced, featuring a real woman who proved it wrong.',
    status: 'case-study',
    url: '/work/equaltales',
    award: 'Best AI/ML, #75HER Hackathon', // equaltales.astro `outcome.award`
    image: '/images/equaltales/hero.png',
  },
  {
    id: 'carbonlint',
    title: 'CarbonLint',
    tool: 'GitLab Duo',
    summary: 'An AI agent that lints GitLab CI/CD pipelines for carbon waste and flags inefficient jobs.', // Devpost tagline
    status: 'writeup',
    url: 'https://devpost.com/software/carbonlint',
    award: 'Sustainable Design Bonus, GitLab AI Hackathon', // Devpost: "Winner"
    image: '/images/ai-lab/carbonlint.webp',
  },
  {
    id: 'climatehaven',
    title: 'ClimateHaven',
    tool: 'Zerve',
    summary: 'Predicts which Florida neighborhoods will gentrify as climate change makes safe areas unaffordable.', // Devpost tagline
    status: 'writeup',
    url: 'https://devpost.com/software/climatehaven',
    image: '/images/ai-lab/climatehaven.webp',
  },
  {
    id: 'interview-sage',
    title: 'Interview Sage',
    tool: 'Replit Agent',
    summary: 'Turns a job description into tailored interview questions with model answers.', // live app
    status: 'live',
    url: 'https://interview-sage--hafsausmani.replit.app/',
    image: '/images/ai-lab/interview-sage.webp',
  },
  {
    id: 'headshot-ai',
    title: 'HeadshotAI',
    tool: 'Lovable',
    summary: 'Turns a casual selfie into a professional headshot in one of four styles.', // live app
    status: 'live',
    url: 'https://heatshot-ai.lovable.app/',
    image: '/images/ai-lab/headshot-ai.webp',
  },
];

export const awards = labProjects.filter((p) => p.award);

/**
 * A real council session, 2026-10-27: three AI reviewers on the homepage hero photo.
 * Quotes are from their written reviews; the decision is what Hafsa chose.
 */
export const councilReplay = {
  date: 'October 2026',
  question: 'Feedback on my homepage: the photo is too big, and it splits my first name from my last. Where should it go?',
  prompt: 'claude: Council, review my hero photo. Hiring manager, art director, engineer.',
  lenses: [
    {
      role: 'Hiring manager',
      pick: 'Inline pill',
      said: 'Her face is the loudest thing on the page and her work is the quietest.',
      reason: 'A small photo inside the name keeps it on one line and lifts the tagline and buttons above the fold.',
    },
    {
      role: 'Art director',
      pick: 'Selected frame',
      said: 'The pill is clever, but the name loses its poster scale.',
      reason: 'Keep the huge name and tuck a framed photo into the space beside it, like a selection in a design tool.',
    },
    {
      role: 'Engineer',
      pick: 'Pill or frame, both medium effort',
      said: 'Parallax has to go, or the photo slides out of the text line.',
      reason: 'Either layout is buildable. The magnet effect would drag the photo across the letters.',
    },
  ],
  decision: {
    choice: 'Inline pill.',
    because: 'Readable beat dramatic: the name reads as one line and the buttons sit above the fold. I took the engineer’s warning and removed the parallax and magnet.',
    overruled: {
      who: 'Hiring manager',
      suggestion: 'Product Designer',
      note: 'The hiring manager wanted the job title in my tagline. I kept my own line: “From first sketch to production code: product design, built end to end.”',
    },
  },
  before: { src: '/images/ai-lab/council-hero-before.webp', alt: 'The homepage hero before: a large square photo sits between HAFSA and USMANI, pushing the last name below the fold.' },
  after: { src: '/images/ai-lab/council-hero-after.webp', alt: 'The homepage hero after: a small pill-shaped photo sits inside the name on one line, with the tagline and two buttons visible below it.' },
};

/** Real answers from the live assistant (hafsausmani.com/api/ask), captured 2026-11-04. */
export const askAiExchange = {
  model: 'Claude Haiku 5.5',
  turns: [
    {
      question: 'What did Hafsa do on the Philly Truce project?',
      answer: 'Hafsa was the Product Designer on a manager-led team for Philly Truce, a community-safety nonprofit. She owned the typography, color and pairings, voice and vocabulary, and the Wix build. Her work produced a nine-style type system mapped to Wix and six AAA text color pairings, and an audit caught two contrast failures in her own system before launch.',
      link: { label: 'Philly Truce case study', href: '/work/philly-truce' },
      note: 'Answers only from text on this site, and links the page it came from.',
      // What the panel's showFollowUps() picks after this answer (AskAI.astro FOLLOW_UPS order)
      followUps: ['How did she fit the Philly Truce system into Wix?', 'How does PixelCheck check a build?', 'What research went into MedRec?'],
      followUpNote: 'Follow-ups come from a fixed list of questions the site can answer. The page the answer linked goes first.',
    },
    {
      question: 'What salary is Hafsa looking for?',
      answer: 'I’m not able to discuss salary or compensation expectations. For that, please email Hafsa directly at hafsa.usmani2@gmail.com.',
      note: 'Salary, visa and personal questions go to email. It never guesses a number.',
    },
  ],
  stored: 'Nothing is stored. The conversation lives only in the visitor’s browser tab.',
};

/** Accessibility audit of this site, 2026-10-27 (hand checks) and 2026-11-04 (script re-run on live). */
export const auditSnapshot = {
  pages: 12,
  scanner: { found: 0, scope: 'axe-core, WCAG 2.0 to 2.2, levels A and AA, at 1440px and 390px, plus reflow at 320px' },
  command: 'npm run audit:a11y',
  byHand: [
    {
      issue: 'Hero text contrast',
      before: 'Grey tagline over the coloured gradient fell to 2.8:1',
      after: 'Darkened to 5.0:1 or better at every size',
    },
    {
      issue: 'Reflow at 320px',
      before: '“HafsaUsmani.com” is one long word and pushed the page sideways',
      after: 'It now wraps as “HafsaUsmani” over “.com”',
    },
  ],
};

/** Drafts for Hafsa to edit, based on what happened above. */
export const lessons = [
  'AI gives me more options than I could sketch in an afternoon. Choosing between them is still the job.',
  'The scanner said zero. Two real failures were waiting for a person to look. I automate the checks so I have time for that look.',
];
