import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { ignores: ['node_modules/**', 'reports/**', '.auth/**', 'playwright-report/**', 'test-results/**'] },
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error', // no fixed sleeps
      'playwright/no-force-option': 'error',
      // Tags come from the typed tags()/TAG helpers in src/config/tags.ts, which TypeScript already checks;
      // the rule only accepts string literals, so it would reject every test.
      'playwright/valid-test-tags': 'off',
      // Style-only; the setup file skips on purpose when a role has no credentials.
      'playwright/consistent-spacing-between-blocks': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
);
