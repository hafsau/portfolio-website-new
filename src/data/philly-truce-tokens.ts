/**
 * Philly Truce brand system: the single source for every demo on /work/philly-truce.
 * Values come from Hafsa's July 2026 typography PDF (final) and the earlier
 * "Typography & Brand Voice" doc (draft palette, tone and vocabulary).
 */

export const finalColors = {
  navy: '#002768',
  gold: '#F4B942',
  teal: '#0F4C5C', // dark teal surface; also link hover
  link: '#1E7A8C', // link teal 500
  rust: '#7A3F00', // visited links, warm notes
  cream: '#FFF4DA',
  pale: '#E8EDF7',
  body: '#3A3A40',
  white: '#FFFFFF',
};

export const draftColors = {
  navy: '#1B3A5F',
  orange: '#D35400',
  cream: '#FDF6E3',
  offWhite: '#FAFAFA',
  charcoal: '#2D3436',
  gray: '#636E72',
  lightGray: '#B2BEC3',
};

// The six approved text-on-background pairings (PDF page 07)
export const pairings = [
  { name: 'Navy on White', fg: '#002768', bg: '#FFFFFF', use: 'Default surface. Titles navy, body #3A3A40.' },
  { name: 'White on Navy', fg: '#FFFFFF', bg: '#002768', use: 'Dark hero surface.' },
  { name: 'Navy on Gold', fg: '#002768', bg: '#F4B942', use: 'Accent blocks. Text is always navy, never white.' },
  { name: 'Navy on Pale', fg: '#002768', bg: '#E8EDF7', use: 'Soft callout panels and info boxes.' },
  { name: 'White on Teal', fg: '#FFFFFF', bg: '#0F4C5C', use: 'Secondary dark surface and buttons.' },
  { name: 'Rust on Cream', fg: '#7A3F00', bg: '#FFF4DA', use: 'Warm notes and highlight tips.' },
];

// Nine fixed steps, mapped 1:1 to Wix text themes, with the guide's rules (PDF pages 03-04)
export const typeScale = [
  { step: 'H1', wix: 'Heading 1', size: 88, family: 'serif', weight: 'Bold', sample: 'Peace Patrol', use: 'The single most important headline on a page.', avoid: 'More than one per page, or using it for section titles or narrow columns.' },
  { step: 'H2', wix: 'Heading 2', size: 64, family: 'serif', weight: 'Bold', sample: 'Brotherly Action', use: 'Major section titles that divide a long page into scannable bands.', avoid: 'More than a handful per page, or using it for card titles.' },
  { step: 'H3', wix: 'Heading 3', size: 56, family: 'serif', weight: 'Bold', sample: 'Safety is a basic right', use: 'Headlines inside a section and the lead title on interior pages.', avoid: 'Placing it right beside an H2 where the two compete.' },
  { step: 'H4', wix: 'Heading 4', size: 48, family: 'serif', weight: 'Regular', sample: 'Community-led deterrence', use: 'Subsection headings and card titles that repeat across a grid.', avoid: 'Full sentences; keep it to a few words.' },
  { step: 'H5', wix: 'Heading 5', size: 32, family: 'serif', weight: 'Regular', sample: 'Help us scale Peace Patrol', use: 'Small block titles, callouts, and short pull quotes.', avoid: 'Body-length text or stacking several in a row.' },
  { step: 'H6', wix: 'Heading 6', size: 24, family: 'serif', weight: 'Regular / Italic', sample: 'About Philly Truce', use: 'Eyebrows and category labels that tag the title below.', avoid: 'Sentences, links, or anything users must read in full.' },
  { step: 'P1', wix: 'Paragraph 1', size: 20, family: 'sans', weight: 'Regular 400', sample: 'Peace Patrol enhances community safety.', use: 'The standfirst: a short, confident intro under a hero or section title.', avoid: 'Using it for long-form running text.' },
  { step: 'P2', wix: 'Paragraph 2', size: 16, family: 'sans', weight: 'Regular 400', sample: 'Peace Patrol enhances community safety.', use: 'Default body copy. The size readers spend the most time in.', avoid: 'Going smaller than this for primary reading text.' },
  { step: 'P3', wix: 'Paragraph 3', size: 14, family: 'sans', weight: 'Regular 400', sample: 'Peace Patrol enhances community safety.', use: 'Captions, labels, metadata, form hints, and legal text.', avoid: 'Long paragraphs; support detail only.' },
];

export const spacing = [
  { name: 'XS', px: 8, use: 'Icon-to-label, chip padding' },
  { name: 'S', px: 16, use: 'Between related text, list gaps' },
  { name: 'M', px: 24, use: 'Card padding, heading-to-body' },
  { name: 'L', px: 40, use: 'Between components in a section' },
  { name: 'XL', px: 80, use: 'Section-to-section rhythm' },
];

// Contrast gaps found in the audit, and the fixes (confirmed approach: "found and fixed")
export const fixes = {
  focusRing: {
    before: 'A single gold ring (#F4B942) disappears on white, cream and pale backgrounds.',
    after: 'A navy inner ring with a gold outer ring: navy carries the contrast on light surfaces, gold on navy.',
  },
  linkOnPale: {
    before: 'Link teal #1E7A8C on the pale panel #E8EDF7.',
    after: 'On pale panels, links use teal 700 (#0F4C5C).',
  },
};
