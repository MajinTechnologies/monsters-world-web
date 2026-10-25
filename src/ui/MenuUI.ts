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
  private onCampaign?: () => void;

  constructor(containerId: string = 'ui-inner', onCampaign?: () => void) {
    this.container = document.getElementById(containerId)!;
    this.onCampaign = onCampaign;
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

    // Campaign button
    const btnCampaign = document.getElementById('btn-campaign');
    btnCampaign?.addEventListener('click', () => {
      if (this.onCampaign) this.onCampaign();
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

    if (screens[screenId]) {
      screens[screenId].show();
      this.currentScreen = screenId;
    }

    // Refresh data when switching screens
    if (screenId === 'gacha') {
      this.gachaUI.refresh();
    } else if (screenId === 'collection') {
      this.collectionUI.refresh();
    }
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
}
