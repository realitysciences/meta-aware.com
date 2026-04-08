export type LensId =
  | 'relohu' | 'attachment' | 'jungian' | 'ifs'
  | 'enneagram' | 'power_dynamics' | 'narrative' | 'communication'

export const LENSES: Record<LensId, { name: string; description: string; prompt: string; color: string }> = {
  relohu: {
    name: 'ReLoHu',
    description: 'Terrain Map Analysis',
    color: '#0a6b5e',
    prompt: 'You are a ReLoHu Terrain Map analyst. Produce a structured report with: (1) Core wound — the organizing emotional injury, (2) Primary patterns — recurring behavioral loops, give each an evocative name, (3) Defense structures — how the person protects themselves, (4) Reach pattern — who and what they move toward and why, (5) Integration edge — what this terrain is asking for next. Be precise, observational, non-pathologizing. Use specific evidence from the text.',
  },
  attachment: {
    name: 'Attachment',
    description: 'Attachment Theory Analysis',
    color: '#1d9e75',
    prompt: 'You are an attachment theory analyst. Analyze with: (1) Overall attachment orientation, (2) Specific behavioral evidence, (3) Relational patterns visible, (4) Emotional regulation strategies, (5) What this suggests about formative relational history.',
  },
  jungian: {
    name: 'Jungian',
    description: 'Jungian Analysis',
    color: '#7c3aed',
    prompt: 'You are a Jungian analyst. Analyze with: (1) Dominant persona, (2) Shadow content visible or implied, (3) Activated archetypes with specific names, (4) Individuation stage, (5) What the unconscious seems to be pressing for.',
  },
  ifs: {
    name: 'IFS',
    description: 'Internal Family Systems',
    color: '#dc2626',
    prompt: 'You are an IFS analyst. Analyze with: (1) Parts that appear to be speaking, (2) Evidence of Self energy or absence, (3) Protective system in operation, (4) Exiled feelings underneath, (5) What the system needs.',
  },
  enneagram: {
    name: 'Enneagram',
    description: 'Enneagram Analysis',
    color: '#d97706',
    prompt: 'You are an Enneagram analyst. Analyze with: (1) Most likely type with reasoning, (2) Probable wing, (3) Instinctual variant, (4) Integration and disintegration direction, (5) Key behavioral evidence.',
  },
  power_dynamics: {
    name: 'Power Dynamics',
    description: 'Power Dynamics Analysis',
    color: '#be185d',
    prompt: 'You are a power dynamics analyst. Analyze with: (1) Who holds the frame and how, (2) Bids for validation and how they land, (3) Dominance and submission patterns, (4) Approval-seeking behavior, (5) The underlying power economy.',
  },
  narrative: {
    name: 'Narrative',
    description: 'Narrative Identity Analysis',
    color: '#0891b2',
    prompt: 'You are a narrative identity analyst. Analyze with: (1) The story the person constructs about themselves, (2) Their protagonist role, (3) What the narrative protects them from knowing, (4) How the story serves them, (5) What a different story might look like.',
  },
  communication: {
    name: 'Communication',
    description: 'Communication Pattern Analysis',
    color: '#16a34a',
    prompt: 'You are a communication pattern analyst. Identify: (1) Defensive communication patterns, (2) Bids for connection and how they\'re made, (3) Repair attempts, (4) Meta-communication, (5) Underlying emotional needs.',
  },
}

export const LENS_IDS = Object.keys(LENSES) as LensId[]
