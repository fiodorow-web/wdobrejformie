import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Design-system adherence rules.
 *
 * Ported from the export's _adherence.oxlintrc.json, which cannot be run as-is:
 * it carries an `x-omelette` metadata key oxlint rejects, and its substantive
 * rules all live under `no-restricted-syntax`, which oxlint does not implement.
 * ESLint does, so they run here instead.
 *
 * Only the three token rules are carried over. The config's other half is a set
 * of per-component prop allowlists generated from the prototype's .d.ts files —
 * those are both stale (this port deliberately widened several component APIs)
 * and redundant, since TypeScript checks props far more precisely than an AST
 * selector can.
 */
const designSystemAdherence = {
  files: ['src/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]',
        message: 'Raw hex color — use a design-system color token via var().',
      },
      {
        selector: 'Literal[value=/\\b\\d+px\\b/]',
        message: 'Raw px value — use a design-system spacing token via var().',
      },
      {
        selector: "Literal[value=/font-family\\s*:\\s*(?!['\"]?(?:Manrope))/i]",
        message: 'Font not provided by the design system. Available: Manrope.',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/components/ds/*', '!@/components/ds/index'],
            message: "Import design-system components from '@/components/ds', not component internals.",
          },
        ],
      },
    ],
  },
};

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      // The design-system bundle is a read-only reference export, not our source.
      'w-dobrej-formie-design-system/**',
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,
  designSystemAdherence,
  {
    // Inside the library, siblings import each other directly by design.
    files: ['src/components/ds/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
];

export default eslintConfig;
