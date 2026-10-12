import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Repo root = parent of this file's directory (`src/`).
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

describe('documentation', () => {
  it('CONTRIBUTING.md exists at the repository root', () => {
    expect(existsSync(resolve(repoRoot, 'CONTRIBUTING.md'))).toBe(true);
  });

  it('README references CONTRIBUTING.md with a relative link', () => {
    const readme = readFileSync(resolve(repoRoot, 'README.md'), 'utf-8');
    // Relative markdown link, e.g. `[CONTRIBUTING.md](./CONTRIBUTING.md)`.
    expect(readme).toMatch(/\]\(\.\/CONTRIBUTING\.md\)/);
  });
});
