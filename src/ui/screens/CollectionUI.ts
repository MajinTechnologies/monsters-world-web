/**
 * CollectionUI — Dynamic collection display.
 * Shows only captured monsters with dynamic type tabs.
 * If no monsters captured, shows a "capture your first monster" message.
 */

import { playerCollection } from '../../data/PlayerCollection';
import {
  Monster, MonsterType, TYPE_LABELS, TYPE_EMOJIS, TYPE_COLORS,
  RARITY_COLORS, RARITY_LABELS, getMonsterById,
} from '../../data/monsters';
import { MonsterDetailUI } from './MonsterDetailUI';

export class CollectionUI {
  private screen: HTMLElement;
  private contentEl: HTMLElement;
  private activeType: MonsterType | 'all' = 'all';
  private detailUI: MonsterDetailUI;

  constructor() {
    this.screen = document.getElementById('screen-collection')!;
    this.contentEl = document.getElementById('collection-content')!;
    this.detailUI = new MonsterDetailUI();
  }

  show(): void {
    this.screen.classList.remove('hidden');
    this.refresh();
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }

  /** Re-render collection based on captured monsters. */
  refresh(): void {
    const captured = playerCollection.getCapturedMonsters();

    if (captured.length === 0) {
      this.contentEl.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full gap-4 py-12">
          <span class="text-5xl">?</span>
          <p class="text-game-gray text-sm text-center">&iexcl;Captura tu primer monstruo!</p>
          <p class="text-game-gray text-xs text-center">Ve a la pesta&ntilde;a <strong class="text-game-orange">Captura</strong> para empezar</p>
        </div>
      `;
      return;
    }

    // Get unique types from captured monsters
    const capturedTypes = new Set<MonsterType>(captured.map(m => m.type));

    // Build HTML
    let html = '';

    // Type tabs (only types that have captured monsters)
    html += '<div class="flex gap-2 mb-4 overflow-x-auto pb-1">';
    html += this.renderTypeTab('all', 'Todos', '&#x1F0CF;', captured.length);
    for (const type of capturedTypes) {
      const count = captured.filter(m => m.type === type).length;
      html += this.renderTypeTab(type, TYPE_LABELS[type], TYPE_EMOJIS[type], count);
    }
    html += '</div>';

    // Monster grid
    const filtered = this.activeType === 'all'
      ? captured
      : captured.filter(m => m.type === this.activeType);

    if (filtered.length === 0) {
      html += `<p class="text-game-gray text-xs text-center py-4">No hay monstruos de este tipo</p>`;
    } else {
      html += '<div class="grid grid-cols-3 gap-3">';
      for (const monster of filtered) {
        html += this.renderMonsterCard(monster);
      }
      html += '</div>';
    }

    this.contentEl.innerHTML = html;

    // Attach tab event listeners
    this.contentEl.querySelectorAll('.collection-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeType = (tab as HTMLElement).dataset.type as MonsterType | 'all';
        this.refresh();
      });
    });

    // Attach monster card click listeners
    this.contentEl.querySelectorAll('.monster-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = (card as HTMLElement).dataset.monsterId;
        if (id) {
          const monster = getMonsterById(id);
          if (monster) this.detailUI.show(monster);
        }
      });
    });
  }

  private renderTypeTab(type: MonsterType | 'all', label: string, emoji: string, count: number): string {
    const isActive = this.activeType === type;
    const color = type === 'all' ? '#f59e0b' : TYPE_COLORS[type];
    const activeBg = isActive ? `background:${color}22; border-color:${color};` : 'border-color:transparent;';
    const activeText = isActive ? `color:${color};` : 'color:#a0a0a0;';

    return `
      <button class="collection-tab flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all"
              data-type="${type}" style="${activeBg} ${activeText}">
        <span>${emoji}</span>
        <span>${label} (${count})</span>
      </button>
    `;
  }

  private renderMonsterCard(monster: Monster): string {
    const rarityColor = RARITY_COLORS[monster.rarity];
    const typeColor = TYPE_COLORS[monster.type];

    return `
      <div class="card-hover rounded-xl p-2 flex flex-col items-center gap-1 border-2 cursor-pointer monster-card"
           data-monster-id="${monster.id}"
           style="border-color: ${typeColor}; background: ${typeColor}10;">
        <div class="w-full aspect-square rounded-lg flex items-center justify-center text-3xl"
             style="background: ${typeColor}30;">
          ${monster.emoji}
        </div>
        <span class="text-[10px] font-bold text-white truncate w-full text-center">${monster.name}</span>
        <span class="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
              style="background: ${rarityColor}30; color: ${rarityColor};">
          ${RARITY_LABELS[monster.rarity]}
        </span>
        <div class="flex items-center gap-1 text-[8px] font-bold text-game-gray">
          <span>❤️${monster.stats.hp}</span>
          <span>⚔️${monster.stats.attack}</span>
          <span>🛡️${monster.stats.defense}</span>
        </div>
      </div>
    `;
  }
}
