/**
 * TabBar — barra inferior con 5 tabs.
 * Highlight: naranja para activo, gris para inactivo.
 */

export type TabId = 'home' | 'collection' | 'gacha' | 'shop' | 'settings';

export interface TabBarCallbacks {
  onTabChange: (tab: TabId) => void;
}

export class TabBar {
  private container: HTMLElement;
  private buttons: HTMLButtonElement[] = [];
  private activeTab: TabId = 'home';
  private callbacks: TabBarCallbacks;
  private tabMap: Map<TabId, HTMLButtonElement> = new Map();

  constructor(callbacks: TabBarCallbacks) {
    this.callbacks = callbacks;
    this.container = document.getElementById('tab-bar')!;
    this.buttons = Array.from(this.container.querySelectorAll('.tab-btn')) as HTMLButtonElement[];

    this.buttons.forEach(btn => {
      const tab = btn.dataset.tab as TabId;
      this.tabMap.set(tab, btn);
      btn.addEventListener('click', () => this.selectTab(tab));
    });
  }

  show(): void {
    this.container.classList.remove('hidden');
  }

  hide(): void {
    this.container.classList.add('hidden');
  }

  selectTab(tab: TabId): void {
    this.activeTab = tab;

    this.buttons.forEach(btn => {
      const btnTab = btn.dataset.tab as TabId;
      if (btnTab === tab) {
        btn.classList.remove('text-game-gray');
        btn.classList.add('text-game-orange');
      } else {
        btn.classList.remove('text-game-orange');
        btn.classList.add('text-game-gray');
      }
    });

    this.callbacks.onTabChange(tab);
  }

  getActiveTab(): TabId {
    return this.activeTab;
  }
}
