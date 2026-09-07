/**
 * GachaUI — Monster capture screen (gacha).
 * Shows a capture button, card flip animation, and result modal.
 */

import { playerCollection, GachaResult } from '../../data/PlayerCollection';
import { RARITY_COLORS, TYPE_LABELS, TYPE_COLORS, TYPE_EMOJIS, RARITY_LABELS } from '../../data/monsters';

export class GachaUI {
  private screen: HTMLElement;
  private btnPull: HTMLButtonElement;
  private counterEl: HTMLElement;
  private coinsEl: HTMLElement;

  // Modal elements
  private modal: HTMLElement;
  private modalEmoji: HTMLElement;
  private modalName: HTMLElement;
  private modalRarity: HTMLElement;
  private modalType: HTMLElement;
  private modalBtnClose: HTMLButtonElement;
  private modalGlow: HTMLElement;

  // Card elements
  private cardContainer: HTMLElement;
  private cardBack: HTMLElement;
  private cardFront: HTMLElement;

  private isAnimating = false;

  constructor() {
    this.screen = document.getElementById('screen-gacha')!;

    // Gacha screen elements
    this.btnPull = document.getElementById('gacha-btn-pull') as HTMLButtonElement;
    this.counterEl = document.getElementById('gacha-counter')!;
    this.coinsEl = document.getElementById('coin-count-gacha')!;
    this.cardContainer = document.getElementById('gacha-card-container')!;
    this.cardBack = document.getElementById('gacha-card-back')!;
    this.cardFront = document.getElementById('gacha-card-front')!;

    // Modal elements
    this.modal = document.getElementById('gacha-modal')!;
    this.modalEmoji = document.getElementById('modal-emoji')!;
    this.modalName = document.getElementById('modal-name')!;
    this.modalRarity = document.getElementById('modal-rarity')!;
    this.modalType = document.getElementById('modal-type')!;
    this.modalBtnClose = document.getElementById('modal-btn-close') as HTMLButtonElement;
    this.modalGlow = document.getElementById('modal-glow')!;

    this.initEvents();
  }

  private initEvents(): void {
    this.btnPull.addEventListener('click', () => this.onPull());
    this.modalBtnClose.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
  }

  show(): void {
    this.screen.classList.remove('hidden');
    this.refresh();
  }

  hide(): void {
    this.screen.classList.add('hidden');
  }

  /** Refresh counter and button state. */
  refresh(): void {
    const count = playerCollection.getCapturedCount();
    const total = playerCollection.getTotalCount();
    this.counterEl.textContent = `${count} / ${total} capturados`;

    const coins = playerCollection.getCoins();
    const canPull = playerCollection.canPull();
    this.btnPull.disabled = !canPull || this.isAnimating;
    this.btnPull.textContent = canPull ? '\u{1F3F0} \u00A1Capturar!' : '\u{1FA99} Monedas insuficientes';

    // Update coin display in this screen
    this.coinsEl.textContent = coins.toLocaleString('es-ES');
  }

  private async onPull(): Promise<void> {
    if (this.isAnimating || !playerCollection.canPull()) return;

    this.isAnimating = true;
    this.btnPull.disabled = true;

    // Reset card state
    this.resetCard();

    // Perform the pull
    const result = playerCollection.pull();
    if (!result) {
      this.isAnimating = false;
      this.refresh();
      this.showToast('\u00A1No tienes suficientes monedas!');
      return;
    }

    // Play card flip animation
    await this.playCardFlip(result);

    // Show result modal after animation
    this.showModal(result);

    this.isAnimating = false;
    this.refresh();
  }

  private resetCard(): void {
    this.cardContainer.className = 'gacha-card-container';
    this.cardBack.style.display = '';
    this.cardFront.style.display = 'none';
    this.cardContainer.innerHTML = '';
    // Rebuild card-back and card-front
    this.cardContainer.innerHTML = `
      <div id="gacha-card-back" class="gacha-card">
        <div class="gacha-card-inner">
          <span class="text-6xl">\u{1FA99}</span>
          <span class="text-xs font-bold text-game-gray mt-2">???</span>
        </div>
      </div>
      <div id="gacha-card-front" class="gacha-card" style="display:none;">
        <div class="gacha-card-inner">
          <span class="text-6xl gacha-card-emoji"></span>
          <span class="text-sm font-bold mt-2 gacha-card-name"></span>
        </div>
      </div>
    `;
    // Re-fetch references after rebuild
    this.cardBack = document.getElementById('gacha-card-back')!;
    this.cardFront = document.getElementById('gacha-card-front')!;
  }

  private playCardFlip(result: GachaResult): Promise<void> {
    return new Promise(resolve => {
      // Phase 1: Card back shows, pause
      setTimeout(() => {
        // Phase 2: Flip animation starts
        this.cardContainer.classList.add('gacha-flip');
      }, 300);

      setTimeout(() => {
        // Phase 3: Switch to front face at midpoint
        this.cardBack.style.display = 'none';
        this.cardFront.style.display = 'flex';

        // Set monster data on front
        const emojiEl = this.cardFront.querySelector('.gacha-card-emoji') as HTMLElement;
        const nameEl = this.cardFront.querySelector('.gacha-card-name') as HTMLElement;
        if (emojiEl) emojiEl.textContent = result.monster.emoji;
        if (nameEl) nameEl.textContent = result.monster.name;

        // Color front card border by rarity
        this.cardFront.style.borderColor = RARITY_COLORS[result.monster.rarity];
      }, 700);

      setTimeout(() => {
        // Phase 4: Reveal animation
        this.cardContainer.classList.add('gacha-reveal');
        resolve();
      }, 1000);
    });
  }

  private showModal(result: GachaResult): void {
    const { monster, isNew } = result;

    this.modalEmoji.textContent = monster.emoji;
    this.modalName.textContent = monster.name;

    // Rarity badge
    this.modalRarity.textContent = RARITY_LABELS[monster.rarity];
    this.modalRarity.style.backgroundColor = RARITY_COLORS[monster.rarity] + '33';
    this.modalRarity.style.color = RARITY_COLORS[monster.rarity];
    this.modalRarity.style.borderColor = RARITY_COLORS[monster.rarity];

    // Type badge
    this.modalType.textContent = `${TYPE_EMOJIS[monster.type]} ${TYPE_LABELS[monster.type]}`;
    this.modalType.style.backgroundColor = TYPE_COLORS[monster.type] + '33';
    this.modalType.style.color = TYPE_COLORS[monster.type];
    this.modalType.style.borderColor = TYPE_COLORS[monster.type];

    // Glow effect for epic/legendary
    this.modalGlow.className = 'modal-glow';
    if (monster.rarity === 'legendary') {
      this.modalGlow.classList.add('glow-legendary');
    } else if (monster.rarity === 'epic') {
      this.modalGlow.classList.add('glow-epic');
    }

    // New badge (if not new, remove emphasis)
    const newBadge = document.getElementById('modal-new-badge')!;
    if (isNew) {
      newBadge.textContent = '\u2728 \u00A1NUEVO!';
      newBadge.style.display = '';
    } else {
      newBadge.textContent = '\u{1F501} Ya lo ten\u00EDas';
      newBadge.style.display = '';
    }

    // Show modal
    this.modal.classList.remove('hidden');
    this.modal.classList.add('gacha-modal-appear');
  }

  private closeModal(): void {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('gacha-modal-appear');
    this.modalGlow.className = 'modal-glow';
  }

  private showToast(message: string): void {
    // Create a simple toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-red-500/90 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}
