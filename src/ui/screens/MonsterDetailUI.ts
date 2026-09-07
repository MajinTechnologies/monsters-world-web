/**
 * MonsterDetailUI — modal that displays full monster info.
 * Shows stats bars, abilities, and evolution data.
 */

import {
  Monster,
  TYPE_COLORS,
  TYPE_LABELS,
  RARITY_COLORS,
  RARITY_LABELS,
} from '../../data/monsters';

export class MonsterDetailUI {
  private overlay: HTMLElement;

  constructor() {
    this.overlay = document.getElementById('monster-detail-overlay')!;
  }

  /** Render the modal content for a specific monster and show it. */
  show(monster: Monster): void {
    const typeColor = TYPE_COLORS[monster.type];
    const rarityColor = RARITY_COLORS[monster.rarity];

    const maxStat = Math.max(monster.stats.hp, monster.stats.attack, monster.stats.defense, monster.stats.speed);

    const statsHtml = [
      { label: 'HP', value: monster.stats.hp },
      { label: 'ATK', value: monster.stats.attack },
      { label: 'DEF', value: monster.stats.defense },
      { label: 'SPD', value: monster.stats.speed },
    ].map(s => `
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-game-gray w-8">${s.label}</span>
        <div class="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div class="h-full rounded-full transition-all" style="width: ${(s.value / maxStat) * 100}%; background: ${typeColor};"></div>
        </div>
        <span class="text-xs font-bold w-8 text-right" style="color: ${typeColor};">${s.value}</span>
      </div>
    `).join('');

    const abilitiesHtml = monster.abilities.map(a => `
      <div class="flex items-center justify-between rounded-lg px-3 py-2" style="background: ${TYPE_COLORS[a.type]}15; border-left: 3px solid ${TYPE_COLORS[a.type]};">
        <div>
          <span class="text-sm font-bold text-white">${a.name}</span>
          <span class="text-[10px] ml-2 px-1.5 py-0.5 rounded-full font-bold" style="background: ${TYPE_COLORS[a.type]}30; color: ${TYPE_COLORS[a.type]};">${TYPE_LABELS[a.type]}</span>
        </div>
        <div class="flex items-center gap-3 text-xs">
          <span class="text-game-gray">DMG <span class="font-bold text-white">${a.damage}</span></span>
          <span class="text-game-gray">PREC <span class="font-bold text-white">${a.accuracy}%</span></span>
        </div>
      </div>
    `).join('');

    const evoHtml = monster.evolution
      ? `<div class="rounded-xl bg-game-orange/10 border border-game-orange/30 p-3 text-center">
           <span class="text-xs text-game-gray">Evolución</span>
           <p class="text-sm font-bold text-game-orange mt-1">${monster.evolution.name}</p>
           <p class="text-xs text-game-gray mt-0.5">${monster.evolution.requiredHits} hits requeridos</p>
         </div>`
      : `<div class="rounded-xl bg-game-purple/10 border border-game-purple/30 p-3 text-center">
           <span class="text-xs text-game-purple font-bold">★ Forma Final ★</span>
         </div>`;

    this.overlay.innerHTML = `
      <div class="absolute inset-0 bg-black/70 z-40 flex items-center justify-center p-4" id="monster-detail-backdrop">
        <div class="bg-[#1e1e2e] rounded-2xl border-2 w-full max-w-sm max-h-[85vh] overflow-y-auto" style="border-color: ${typeColor};">
          <!-- Header -->
          <div class="relative p-4 text-center" style="background: linear-gradient(180deg, ${typeColor}20 0%, transparent 100%);">
            <button id="monster-detail-close" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold hover:bg-white/20">✕</button>
            <span class="text-5xl block mb-2">${monster.emoji}</span>
            <h3 class="text-lg font-extrabold text-white">${monster.name}</h3>
            <div class="flex items-center justify-center gap-2 mt-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background: ${typeColor}30; color: ${typeColor};">${TYPE_LABELS[monster.type]}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background: ${rarityColor}30; color: ${rarityColor};">${RARITY_LABELS[monster.rarity]}</span>
            </div>
          </div>

          <!-- Stats -->
          <div class="px-4 pb-3">
            <h4 class="text-xs font-bold text-game-orange uppercase tracking-wider mb-2">Estadísticas</h4>
            <div class="flex flex-col gap-1.5">
              ${statsHtml}
            </div>
          </div>

          <!-- Abilities -->
          <div class="px-4 pb-3">
            <h4 class="text-xs font-bold text-game-orange uppercase tracking-wider mb-2">Habilidades (${monster.abilities.length})</h4>
            <div class="flex flex-col gap-1.5">
              ${abilitiesHtml}
            </div>
          </div>

          <!-- Evolution -->
          <div class="px-4 pb-4">
            <h4 class="text-xs font-bold text-game-orange uppercase tracking-wider mb-2">Evolución</h4>
            ${evoHtml}
          </div>
        </div>
      </div>
    `;

    this.overlay.classList.remove('hidden');

    // Bind close
    const closeBtn = document.getElementById('monster-detail-close');
    const backdrop = document.getElementById('monster-detail-backdrop');
    closeBtn?.addEventListener('click', () => this.hide());
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) this.hide();
    });
  }

  hide(): void {
    this.overlay.classList.add('hidden');
    this.overlay.innerHTML = '';
  }
}
