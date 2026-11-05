/**
 * MenuUI — orquestador principal del menú.
 * Inyecta el HTML, controla transiciones entre pantallas,
 * y gestiona el TabBar + StatusBar + PlayerCollection.
 */

import { StatusBar } from './StatusBar';
import { TabBar, TabId } from './TabBar';
import { LoadingUI } from './screens/LoadingUI';
import { HomeUI } from './screens/HomeUI';
import { CollectionUI } from './screens/CollectionUI';
import { GachaUI } from './screens/GachaUI';
import { ShopUI } from './screens/ShopUI';
import { SettingsUI } from './screens/SettingsUI';
import { MENU_HTML } from './menuHtml';
import { playerCollection } from '../data/PlayerCollection';
import { CAMPAIGNS, getCampaignById, type CampaignConfig, type LevelConfig } from '../data/campaigns';

export type StartLevelHandler = (campaign: CampaignConfig, level: LevelConfig) => void;

export class MenuUI {
  private container: HTMLElement;
  private statusBar!: StatusBar;
  private tabBar!: TabBar;
  private loadingUI!: LoadingUI;
  private homeUI!: HomeUI;
  private collectionUI!: CollectionUI;
  private gachaUI!: GachaUI;
  private shopUI!: ShopUI;
  private settingsUI!: SettingsUI;

  private currentScreen: string = '';
  private onStartLevel?: StartLevelHandler;
  private selectedCampaignId: string | null = null;

  constructor(containerId: string = 'ui-inner', onStartLevel?: StartLevelHandler) {
    this.container = document.getElementById(containerId)!;
    this.onStartLevel = onStartLevel;
  }

  init(onReady?: () => void): void {
    this.container.innerHTML = MENU_HTML;

    this.statusBar = new StatusBar();
    this.tabBar = new TabBar({ onTabChange: (tab) => this.onTabChange(tab) });
    this.loadingUI = new LoadingUI(() => this.onLoadingComplete());
    this.homeUI = new HomeUI();
    this.collectionUI = new CollectionUI();
    this.gachaUI = new GachaUI();
    this.shopUI = new ShopUI();
    this.settingsUI = new SettingsUI();

    // Sync coins from playerCollection
    this.syncCoins();

    // Listen for coin changes
    playerCollection.onCoinsUpdated(() => this.syncCoins());
    playerCollection.onCollectionUpdated(() => {
      if (this.currentScreen === 'collection') {
        this.collectionUI.refresh();
      }
    });

    // Campaign button -> open "Eventos de la historia" selector
    const btnCampaign = document.getElementById('btn-campaign');
    btnCampaign?.addEventListener('click', () => {
      this.showCampaigns();
    });

    // Campaigns / levels back buttons
    document.getElementById('btn-campaigns-back')?.addEventListener('click', () => {
      this.showScreen('home');
    });
    document.getElementById('btn-levels-back')?.addEventListener('click', () => {
      this.showCampaigns();
    });

    // Online / Mundial blocked
    const btnOnline = document.getElementById('btn-online');
    const btnWorld = document.getElementById('btn-world');
    const constructionModal = document.getElementById('construction-modal');
    const constructionModalClose = document.getElementById('construction-modal-close');

    const showConstruction = () => {
      constructionModal?.classList.remove('hidden');
    };
    const hideConstruction = () => {
      constructionModal?.classList.add('hidden');
    };

    btnOnline?.addEventListener('click', showConstruction);
    btnWorld?.addEventListener('click', showConstruction);
    constructionModalClose?.addEventListener('click', hideConstruction);
    constructionModal?.addEventListener('click', (e) => {
      if (e.target === constructionModal) hideConstruction();
    });

    if (onReady) onReady();
  }

  startLoading(): void {
    this.tabBar.hide();
    this.loadingUI.start();
  }

  private onLoadingComplete(): void {
    this.showScreen('home');
    this.tabBar.show();
    this.tabBar.selectTab('home');
  }

  showScreen(screenId: string): void {
    const screens: Record<string, { show(): void; hide(): void }> = {
      home: this.homeUI,
      collection: this.collectionUI,
      gacha: this.gachaUI,
      shop: this.shopUI,
      settings: this.settingsUI,
    };

    if (this.currentScreen && screens[this.currentScreen]) {
      screens[this.currentScreen].hide();
    }
    // Hide custom DOM screens if leaving them
    if (this.currentScreen === 'campaigns' || this.currentScreen === 'levels') {
      document.getElementById(`screen-${this.currentScreen}`)?.classList.add('hidden');
    }

    if (screens[screenId]) {
      screens[screenId].show();
      this.currentScreen = screenId;
    } else if (screenId === 'campaigns' || screenId === 'levels') {
      document.getElementById(`screen-${screenId}`)?.classList.remove('hidden');
      this.currentScreen = screenId;
    }

    // Refresh data when switching screens
    if (screenId === 'gacha') {
      this.gachaUI.refresh();
    } else if (screenId === 'collection') {
      this.collectionUI.refresh();
    }
  }

  private showCampaigns(): void {
    this.renderCampaigns();
    this.showScreen('campaigns');
  }

  private renderCampaigns(): void {
    const list = document.getElementById('campaigns-list');
    if (!list) return;
    list.innerHTML = CAMPAIGNS.map((campaign) => {
      const locked = campaign.locked;
      const lock = locked ? '<span class="absolute left-4">&#x1F512;</span>' : '';
      const labelClass = locked ? 'inline-block ml-6' : '';
      const bg = locked ? 'bg-game-purple/50 text-white/90' : 'bg-game-orange text-white';
      const shadow = locked ? 'shadow-lg shadow-game-purple/20' : 'shadow-lg shadow-game-orange/30';
      return `
        <button
          class="campaign-btn card-hover w-full py-4 rounded-xl ${bg} text-lg font-bold ${shadow} relative"
          data-campaign-id="${campaign.id}"
          data-locked="${locked ? '1' : '0'}"
        >${lock}<span class="${labelClass}">${campaign.name}</span></button>
      `;
    }).join('');

    list.querySelectorAll<HTMLButtonElement>('.campaign-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.campaignId || '';
        const locked = btn.dataset.locked === '1';
        if (locked) {
          document.getElementById('construction-modal')?.classList.remove('hidden');
          return;
        }
        const campaign = getCampaignById(id);
        if (campaign) this.showLevels(campaign);
      });
    });
  }

  private showLevels(campaign: CampaignConfig): void {
    this.selectedCampaignId = campaign.id;
    void this.selectedCampaignId; // retained for Step 4 flow
    const title = document.getElementById('levels-title');
    if (title) title.textContent = campaign.name;
    this.renderLevels(campaign);
    this.showScreen('levels');
  }

  private renderLevels(campaign: CampaignConfig): void {
    const list = document.getElementById('levels-list');
    if (!list) return;
    list.innerHTML = campaign.levels.map((level) => `
      <button
        class="level-btn card-hover w-full py-4 rounded-xl bg-game-blue text-white text-lg font-bold shadow-lg shadow-game-blue/20"
        data-level-id="${level.id}"
      >${level.name}</button>
    `).join('');

    // Level selection will start battle in Step 4 (needs levelConfig flow)
    list.querySelectorAll<HTMLButtonElement>('.level-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const levelId = btn.dataset.levelId || '';
        const level = campaign.levels.find((l) => l.id === levelId);
        if (level) this.onLevelSelected(campaign, level);
      });
    });
  }

  private onLevelSelected(campaign: CampaignConfig, level: LevelConfig): void {
    // Pass levelConfig and start battle via MainMenuScene/VersusScene/BattleScene
    this.onStartLevel?.(campaign, level);
  }

  private onTabChange(tab: TabId): void {
    this.showScreen(tab);
  }

  /** Sync coins from playerCollection to StatusBar. */
  syncCoins(): void {
    const coins = playerCollection.getCoins();
    this.statusBar.updateCoins(coins);
  }

  updateStatusBar(coins: number, staminaCurrent: number, staminaMax: number): void {
    this.statusBar.updateCoins(coins);
    this.statusBar.updateStamina(staminaCurrent, staminaMax);
  }

  showTabBar(): void {
    this.tabBar.show();
  }

  hideTabBar(): void {
    this.tabBar.hide();
  }

  hideUI(): void {
    this.container.classList.add('hidden');
    this.tabBar.hide();
  }

  showUI(): void {
    this.container.classList.remove('hidden');
    this.tabBar.show();
  }

  /** Show UI and return to the level selector for the given campaign (post-battle). */
  showLevelSelect(campaignId: string): void {
    this.container.classList.remove('hidden');
    this.tabBar.show();
    const campaign = getCampaignById(campaignId) ?? getCampaignById('demo');
    if (campaign) {
      this.showLevels(campaign);
    } else {
      this.showScreen('home');
    }
  }
}
