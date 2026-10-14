import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { MONSTERS } from './data/monsters';

// Repo root = parent of this file's directory (`src/`).
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Documentation files expected after the README split (issue #5). */
const DOC_FILES = [
  'monsters.md',
  'game-system.md',
  'visual-identity.md',
  'screens.md',
  'architecture.md',
  'roadmap.md',
];

/** Section headings that must move OUT of the README (moved to `documentation/`). */
const EXTRACTED_HEADINGS = [
  '## 🎨 Paleta de Colores',
  '## 🐲 Sistema de Monstruos',
  '## 🐲 Monstruos (42 total)',
  '## 🎰 Sistema de Gacha',
  '## 📱 Pantallas',
  '## 🏗️ Estructura del Proyecto',
  '## 📋 Próximos Pasos',
];

/** Sections the README keeps (vitrina + índice). */
const RETAINED_HEADINGS = [
  '# 🎮 Monsters World',
  '## 📋 Estado del Proyecto',
  '## 🛠️ Stack Tecnológico',
  '## 🚀 Instalación',
  '## 📄 Licencia',
];

function readme(): string {
  return readFileSync(resolve(repoRoot, 'README.md'), 'utf-8');
}

describe('documentation split', () => {
  it('documentation/ directory exists at the repository root', () => {
    expect(existsSync(resolve(repoRoot, 'documentation'))).toBe(true);
  });

  it.each(DOC_FILES)('documentation/%s exists', (file) => {
    expect(existsSync(resolve(repoRoot, 'documentation', file))).toBe(true);
  });

  it('README has a "📚 Documentación" index section', () => {
    expect(readme()).toMatch(/^##\s*📚\s*Documentación\s*$/m);
  });

  it('README links (relative) to every documentation file, and they resolve', () => {
    const body = readme();
    for (const file of DOC_FILES) {
      expect(body).toContain(`./documentation/${file}`);
      expect(existsSync(resolve(repoRoot, 'documentation', file))).toBe(true);
    }
  });

  it('README does not duplicate the extracted sections', () => {
    const body = readme();
    for (const heading of EXTRACTED_HEADINGS) {
      expect(body).not.toContain(heading);
    }
  });

  it('README keeps the retained sections', () => {
    const body = readme();
    for (const heading of RETAINED_HEADINGS) {
      expect(body).toContain(heading);
    }
  });

  it('monsters.md lists all 42 monsters (no data loss)', () => {
    const doc = readFileSync(resolve(repoRoot, 'documentation', 'monsters.md'), 'utf-8');
    expect(MONSTERS).toHaveLength(42);
    for (const monster of MONSTERS) {
      expect(doc).toContain(monster.name);
    }
  });

  it('architecture.md reflects the real src modules (no data loss + updated)', () => {
    const doc = readFileSync(resolve(repoRoot, 'documentation', 'architecture.md'), 'utf-8');
    for (const entry of ['SettingsStore.ts', 'BattleScene.ts', 'vitest.config.ts']) {
      expect(doc).toContain(entry);
    }
  });
});
