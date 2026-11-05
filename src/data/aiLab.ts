/**
 * AI Lab content. Facts for CarbonLint and ClimateHaven come from their Devpost writeups;
 * Interview Sage and HeadshotAI from the live apps and the earlier AI Lab page.
 */

export interface Fix {
  /** What went wrong. */
  problem: string;
  /** How it was solved. */
  fix: string;
}

export interface LabBuild {
  id: string;
  title: string;
  tool: string;
  event?: string;
  award?: string;
  /** The question the build set out to answer. */
  question: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number };
  link: { href: string; label: string };
  learned: string;
}

export interface DeepBuild extends LabBuild {
  built: string;
  fixes?: Fix[];
  /** Challenges the writeup names without a recorded fix. */
  hardParts?: string[];
  headline?: { value: string; label: string; note: string };
  findings?: string[];
}

export const terminalPrompts = [
  'duo: Lint this pipeline for carbon waste',
  'zerve: Which Florida ZIP codes will gentrify?',
  'replit: Interview questions from a job description',
  'lovable: Turn a selfie into a headshot',
];

export const deepBuilds: DeepBuild[] = [
  {
    id: 'carbonlint',
    title: 'CarbonLint',
    tool: 'GitLab Duo',
    event: 'GitLab AI Hackathon',
    award: 'Sustainable Design Bonus', // Devpost: "Winner"
    question: 'What if a pipeline had a linter for carbon, not code?',
    summary: 'An AI agent inside GitLab Duo Chat that audits a project’s CI/CD pipeline for wasted compute: redundant jobs, oversized Docker images, missing caches, artifact bloat and pipeline structure. It scores the pipeline from 1 to 10 and recommends fixes.',
    image: { src: '/images/ai-lab/carbonlint.webp', alt: 'CarbonLint: a green terminal-style dashboard showing a Green CI Score of 8.4 out of 10, with compute time and CO2 savings.', width: 2000, height: 1359 },
    link: { href: 'https://devpost.com/software/carbonlint', label: 'Read the writeup' },
    built: 'Two agents chained in a GitLab Duo flow. A Scanner with 16 tools reads files, searches the repo and analyses job logs. A Reporter with 9 tools lints the YAML, posts comments and opens merge requests with the fixes. The prompts carry a scoring rubric and a carbon formula (one compute-minute is about 0.5g of CO2), so every recommendation comes with its impact.',
    fixes: [
      {
        problem: 'Long, free-form prompts made the analysis smarter but sent the agent off-script.',
        fix: 'Numbered steps and a fixed output format the Reporter agent could parse every time.',
      },
      {
        problem: 'The flow’s YAML schema wasn’t fully documented, and each failed check took about 30 seconds.',
        fix: 'A tight commit, check, fix loop until the valid fields were clear.',
      },
      {
        problem: 'The test project had no CI config, so the agent had nothing to audit.',
        fix: 'Turned it into a feature: with no config, CarbonLint now proposes an optimised pipeline from scratch.',
      },
    ],
    learned: 'Prompting a multi-agent flow is different from prompting one agent. One agent’s output is the next one’s input, so the format matters as much as the instructions.',
  },
  {
    id: 'climatehaven',
    title: 'ClimateHaven',
    tool: 'Zerve',
    event: 'ZerveHack',
    question: 'Who gets displaced when safety becomes unaffordable?',
    summary: 'A model that predicts which Florida neighbourhoods will gentrify as climate change pushes buyers toward safer ground. It scores each ZIP code on low flood risk, current affordability and fast-rising prices.',
    image: { src: '/images/ai-lab/climatehaven.webp', alt: 'ClimateHaven: “Who gets displaced when safety becomes expensive?” beside a map of Florida with risk markers, and figures for 2.3x appreciation, 15M Floridians at high risk, 47 affordable havens and 963 ZIP codes.', width: 2000, height: 1329 },
    link: { href: 'https://devpost.com/software/climatehaven', label: 'Read the writeup' },
    built: 'Four public datasets joined in Zerve: FEMA flood risk for 963 ZIP codes, 9.6 million Redfin sales, US Census demographics and NOAA sea-level projections. Cleaning, feature engineering, the risk score and a Streamlit dashboard all happened in one environment.',
    hardParts: [
      'Merging FEMA, Redfin and Census data that didn’t line up, which took heavy cleaning and ZIP code normalisation.',
      'Keeping the analysis deep while telling the story clearly to people who don’t read data.',
    ],
    headline: { value: '47', label: 'affordable climate havens left in Florida', note: 'Down 40% from 2020, in the model’s analysis' },
    findings: [
      'Low-risk areas appreciated 2.3x faster than flood-prone zones since 2017.',
      '15.2 million Floridians live in high flood-risk ZIP codes.',
      'Hispanic communities are twice as likely to live in gentrification hotspots.',
    ],
    learned: 'Climate change doesn’t only create physical risk. It creates economic displacement, and the people least responsible face both.',
  },
];

export const quickBuilds: LabBuild[] = [
  {
    id: 'interview-sage',
    title: 'Interview Sage',
    tool: 'Replit Agent',
    question: 'Can a job description become interview prep in one step?',
    summary: 'Paste a job description and get 10 to 15 tailored interview questions with model answers, sorted by type and difficulty.',
    image: { src: '/images/ai-lab/interview-sage.webp', alt: 'Interview Sage: a job description pasted into the generator, with 12 generated questions grouped as technical, behavioural, situational and company fit.', width: 2000, height: 1922 },
    link: { href: 'https://interview-sage--hafsausmani.replit.app/', label: 'Try it' },
    learned: 'Speed lowers the barrier to shipping. Ideas don’t have to stay ideas; they can become working tools.',
  },
  {
    id: 'headshot-ai',
    title: 'HeadshotAI',
    tool: 'Lovable',
    question: 'Can a no-code AI builder make a real image app?',
    summary: 'Upload a casual selfie, pick one of four styles, and get a professional headshot back.',
    image: { src: '/images/ai-lab/headshot-ai.webp', alt: 'HeadshotAI: upload a selfie, choose a style from Corporate Grey, Modern Tech, Natural Light or Creative Studio, and see the headshot.', width: 2000, height: 1912 },
    link: { href: 'https://heatshot-ai.lovable.app/', label: 'Try it' },
    learned: 'Visual builders force clearer thinking about the user flow. Their constraints are design decisions made for you.',
  },
];

/** AI work with its own case study, linked at the end. */
export const moreWork = [
  { title: 'EqualTales', tool: 'Claude', note: 'Best AI/ML, #75HER Hackathon', href: '/work/equaltales' },
  { title: 'PixelCheck', tool: 'Claude Code', note: 'Checks AI-built UI against the designer’s frames', href: '/work/pixelcheck' },
];

/** Hackathon awards across the AI work on this page. */
export const awards = [
  { project: 'CarbonLint', award: 'Sustainable Design Bonus, GitLab AI Hackathon' },
  { project: 'EqualTales', award: 'Best AI/ML, #75HER Hackathon' },
];
