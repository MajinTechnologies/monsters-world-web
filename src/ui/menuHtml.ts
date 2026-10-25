/**
 * menuHtml â€” raw HTML template for all menu screens.
 * Exported as a string constant for use by MenuUI.
 */

export const MENU_HTML = `
<!-- ===== LOADING SCREEN ===== -->
<div id="screen-loading" class="screen">
  <div class="flex flex-col items-center justify-center h-full gap-8 px-6">
    <h1 class="text-4xl font-extrabold tracking-wider text-game-orange select-none">
      MONSTERS WORLD
    </h1>
    <div class="w-3/4 max-w-xs">
      <div class="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
        <div id="loading-bar" class="loading-bar-fill h-full rounded-full bg-game-orange"></div>
      </div>
    </div>
  </div>
</div>

<!-- ===== HOME / JUGAR SCREEN ===== -->
<div id="screen-home" class="screen hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-1.5 bg-game-purple/20 rounded-full px-3 py-1">
      <span>&#x1FA99;</span>
      <span id="coin-count" class="text-sm font-bold text-game-purple">1,250</span>
    </div>
    <div class="flex items-center gap-1.5 bg-game-green/20 rounded-full px-3 py-1">
      <span>&#x26A1;</span>
      <span id="stamina-count" class="text-sm font-bold text-game-green">5/5</span>
    </div>
  </div>
  <div class="flex-1 flex items-center justify-center -mt-20">
    <div class="w-40 h-48 border-4 border-game-orange rounded-2xl bg-game-orange/10 flex items-center justify-center">
      <span class="text-5xl">&#x1F47E;</span>
    </div>
  </div>
  <div class="flex flex-col gap-3 px-6 pb-28">
    <button id="btn-campaign" class="card-hover w-full py-4 rounded-xl bg-game-orange text-white text-lg font-bold shadow-lg shadow-game-orange/30">&#x1F3F0; Campa&ntilde;a</button>
    <button id="btn-online" class="card-hover w-full py-4 rounded-xl bg-game-blue/70 text-white text-lg font-bold shadow-lg shadow-game-blue/20 relative"><span class="absolute left-4">&#x1F512;</span><span class="inline-block ml-6">&#x1F310; Online</span></button>
    <button id="btn-world" class="card-hover w-full py-4 rounded-xl bg-game-purple/70 text-white text-lg font-bold shadow-lg shadow-game-purple/20 relative"><span class="absolute left-4">&#x1F512;</span><span class="inline-block ml-6">&#x1F30D; Mundial</span></button>
  </div>
</div>

<!-- ===== COLLECTION SCREEN ===== -->
<div id="screen-collection" class="screen hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-1.5 bg-game-purple/20 rounded-full px-3 py-1">
      <span>&#x1FA99;</span>
      <span id="coin-count-col" class="text-sm font-bold text-game-purple">1,250</span>
    </div>
    <div class="flex items-center gap-1.5 bg-game-green/20 rounded-full px-3 py-1">
      <span>&#x26A1;</span>
      <span id="stamina-count-col" class="text-sm font-bold text-game-green">5/5</span>
    </div>
  </div>
  <h2 class="text-xl font-bold text-center text-game-orange mb-4">Colecci&oacute;n</h2>
  <div id="collection-content" class="flex-1 overflow-y-auto px-4">
    <!-- Dynamic content rendered by CollectionUI -->
  </div>
</div>

<!-- ===== GACHA / CAPTURA SCREEN ===== -->
<div id="screen-gacha" class="screen hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-1.5 bg-game-purple/20 rounded-full px-3 py-1">
      <span>&#x1FA99;</span>
      <span id="coin-count-gacha" class="text-sm font-bold text-game-purple">1,250</span>
    </div>
    <div class="flex items-center gap-1.5 bg-game-green/20 rounded-full px-3 py-1">
      <span>&#x26A1;</span>
      <span id="stamina-count-gacha" class="text-sm font-bold text-game-green">5/5</span>
    </div>
  </div>
  <h2 class="text-xl font-bold text-center text-game-orange mb-2">Captura de Monstruos</h2>
  <p id="gacha-counter" class="text-xs text-game-gray text-center mb-4">0 / 42 capturados</p>

  <!-- Card container -->
  <div class="flex-1 flex items-center justify-center">
    <div id="gacha-card-container" class="gacha-card-container">
      <div id="gacha-card-back" class="gacha-card">
        <div class="gacha-card-inner">
          <span class="text-6xl">&#x1FA99;</span>
          <span class="text-xs font-bold text-game-gray mt-2">???</span>
        </div>
      </div>
      <div id="gacha-card-front" class="gacha-card" style="display:none;">
        <div class="gacha-card-inner">
          <span class="text-6xl gacha-card-emoji"></span>
          <span class="text-sm font-bold mt-2 gacha-card-name"></span>
        </div>
      </div>
    </div>
  </div>

  <!-- Price + Button -->
  <div class="flex flex-col items-center gap-3 px-6 pb-28">
    <div class="flex items-center gap-2 text-game-gray text-sm">
      <span>Precio:</span>
      <span class="font-bold text-game-purple">&#x1FA99; 100</span>
    </div>
    <button id="gacha-btn-pull" class="card-hover w-full py-4 rounded-xl bg-game-orange text-white text-lg font-bold shadow-lg shadow-game-orange/30 disabled:opacity-50 disabled:cursor-not-allowed">
      &#x1F3F0; &iexcl;Capturar!
    </button>
  </div>
</div>

<!-- ===== MONSTER DETAIL OVERLAY (modal) ===== -->
<div id="monster-detail-overlay" class="hidden fixed inset-0 z-50"></div>

<!-- ===== SHOP / TIENDA SCREEN ===== -->
<div id="screen-shop" class="screen hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-1.5 bg-game-purple/20 rounded-full px-3 py-1">
      <span>&#x1FA99;</span>
      <span id="coin-count-shop" class="text-sm font-bold text-game-purple">1,250</span>
    </div>
    <div class="flex items-center gap-1.5 bg-game-green/20 rounded-full px-3 py-1">
      <span>&#x26A1;</span>
      <span id="stamina-count-shop" class="text-sm font-bold text-game-green">5/5</span>
    </div>
  </div>
  <h2 class="text-xl font-bold text-center text-game-orange mb-4">Tienda</h2>
  <div class="flex flex-col gap-3 px-4">
    <div class="card-hover flex items-center gap-4 rounded-xl p-4 border-l-4 border-game-purple bg-game-purple/10">
      <div class="w-12 h-12 rounded-lg bg-game-purple/30 flex items-center justify-center text-xl">&#x1FA99;</div>
      <div class="flex-1"><p class="font-bold text-white">Monedas</p><p class="text-xs text-game-gray">Paquete de 500 monedas</p></div>
      <span class="font-bold text-game-purple">$0.99</span>
    </div>
    <div class="card-hover flex items-center gap-4 rounded-xl p-4 border-l-4 border-game-green bg-game-green/10">
      <div class="w-12 h-12 rounded-lg bg-game-green/30 flex items-center justify-center text-xl">&#x26A1;</div>
      <div class="flex-1"><p class="font-bold text-white">Stamina</p><p class="text-xs text-game-gray">Recarga completa</p></div>
      <span class="font-bold text-game-green">$0.49</span>
    </div>
    <div class="card-hover flex items-center gap-4 rounded-xl p-4 border-l-4 border-game-orange bg-game-orange/10">
      <div class="w-12 h-12 rounded-lg bg-game-orange/30 flex items-center justify-center text-xl">&#x1F47E;</div>
      <div class="flex-1"><p class="font-bold text-white">Skin Avatar</p><p class="text-xs text-game-gray">Skin exclusiva</p></div>
      <span class="font-bold text-game-orange">$1.99</span>
    </div>
    <div class="card-hover flex items-center gap-4 rounded-xl p-4 border-l-4 border-game-blue bg-game-blue/10">
      <div class="w-12 h-12 rounded-lg bg-game-blue/30 flex items-center justify-center text-xl">&#x1F4E6;</div>
      <div class="flex-1"><p class="font-bold text-white">Mega Pack</p><p class="text-xs text-game-gray">Monedas + Stamina + Skin</p></div>
      <span class="font-bold text-game-blue">$2.99</span>
    </div>
  </div>
</div>

<!-- ===== SETTINGS / CONFIG SCREEN ===== -->
<div id="screen-settings" class="screen hidden">
  <div class="flex items-center justify-between px-4 py-3">
    <div class="flex items-center gap-1.5 bg-game-purple/20 rounded-full px-3 py-1">
      <span>&#x1FA99;</span>
      <span id="coin-count-cfg" class="text-sm font-bold text-game-purple">1,250</span>
    </div>
    <div class="flex items-center gap-1.5 bg-game-green/20 rounded-full px-3 py-1">
      <span>&#x26A1;</span>
      <span id="stamina-count-cfg" class="text-sm font-bold text-game-green">5/5</span>
    </div>
  </div>
  <h2 class="text-xl font-bold text-center text-game-orange mb-4">Configuraci&oacute;n</h2>
  <div class="flex flex-col gap-4 px-4">
<div class="rounded-xl bg-white/5 p-4">
        <h3 class="text-sm font-bold text-game-orange mb-3 uppercase tracking-wider">Audio</h3>
        <div class="flex flex-col gap-2 mb-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-white">Sonido</span>
            <span id="slider-sound-value" class="text-sm font-bold text-game-orange">100</span>
          </div>
          <input type="range" id="slider-sound" min="0" max="100" value="100" aria-label="Volumen de sonido" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-sm text-white">M&uacute;sica</span>
            <span id="slider-music-value" class="text-sm font-bold text-game-orange">100</span>
          </div>
          <input type="range" id="slider-music" min="0" max="100" value="100" aria-label="Volumen de m&uacute;sica" />
        </div>
      </div>
    <div class="rounded-xl bg-white/5 p-4">
      <h3 class="text-sm font-bold text-game-orange mb-3 uppercase tracking-wider">Controles</h3>
      <div class="flex items-center justify-between">
        <span class="text-sm text-white">Vibraci&oacute;n</span>
        <div id="toggle-vibration" class="toggle-track active" data-key="vibration"><div class="toggle-thumb"></div></div>
      </div>
    </div>
    <div class="rounded-xl bg-white/5 p-4">
      <h3 class="text-sm font-bold text-game-orange mb-3 uppercase tracking-wider">Cuenta</h3>
      <div class="flex items-center justify-between">
        <span class="text-sm text-white">Jugador</span>
        <span class="text-sm font-bold text-game-purple">#1234</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <span class="text-sm text-white">Nivel</span>
        <span class="text-sm font-bold text-game-orange">Lv.1</span>
      </div>
    </div>
    <div class="rounded-xl bg-white/5 p-4">
      <h3 class="text-sm font-bold text-game-orange mb-3 uppercase tracking-wider">Cr&eacute;ditos</h3>
      <p class="text-xs text-game-gray">Monsters World v0.1.0</p>
      <p class="text-xs text-game-gray mt-1">&copy; 2026 Majin Games</p>
    </div>
  </div>
</div>

<!-- ===== CONSTRUCTION MODAL ===== -->
<div id="construction-modal" class="hidden fixed inset-0 z-[150] flex items-center justify-center" style="background:rgba(0,0,0,0.7);">
  <div class="modal-glow absolute inset-0 pointer-events-none"></div>
  <div class="relative z-10 bg-[#1e1e2e] border-2 border-white/10 rounded-2xl p-6 mx-6 flex flex-col items-center gap-4 max-w-sm w-full">
    <span class="text-5xl">&#x1F6A7;</span>
    <p class="text-center text-white text-sm leading-relaxed">¡Cuidado con el pasto recién cortado! Todavía estamos en obras, pero te avisamos cuando el estadio esté listo para la inauguración.</p>
    <button id="construction-modal-close" class="mt-2 w-full py-3 rounded-xl bg-game-orange text-white font-bold text-lg card-hover shadow-lg shadow-game-orange/30">Cerrar</button>
  </div>
</div>

<!-- ===== GACHA RESULT MODAL ===== -->
<div id="gacha-modal" class="hidden fixed inset-0 z-[150] flex items-center justify-center" style="background:rgba(0,0,0,0.7);">
  <div class="modal-glow absolute inset-0 pointer-events-none"></div>
  <div class="relative z-10 bg-[#1e1e2e] border-2 border-white/10 rounded-2xl p-8 mx-6 flex flex-col items-center gap-4 max-w-xs w-full gacha-modal-card">
    <span id="modal-new-badge" class="text-sm font-bold text-game-orange"></span>
    <div id="modal-emoji" class="text-7xl"></div>
    <h3 id="modal-name" class="text-xl font-extrabold text-white"></h3>
    <span id="modal-rarity" class="text-xs font-bold px-3 py-1 rounded-full border"></span>
    <span id="modal-type" class="text-xs font-bold px-3 py-1 rounded-full border"></span>
    <button id="modal-btn-close" class="mt-2 w-full py-3 rounded-xl bg-game-orange text-white font-bold text-lg card-hover shadow-lg shadow-game-orange/30">
      &iexcl;Genial!
    </button>
  </div>
</div>

<!-- ===== TAB BAR ===== -->
<div id="tab-bar" class="hidden fixed bottom-0 left-0 right-0 z-50">
  <div class="max-w-[480px] mx-auto flex items-center justify-around bg-[#16161e] border-t border-white/10 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
    <button id="tab-coleccion" class="tab-btn flex flex-col items-center gap-0.5 text-game-gray" data-tab="collection">
      <span class="text-xl">&#x1F0CF;</span><span class="text-[10px] font-bold">Colecci&oacute;n</span>
    </button>
    <button id="tab-gacha" class="tab-btn flex flex-col items-center gap-0.5 text-game-gray" data-tab="gacha">
      <span class="text-xl">&#x1FA99;</span><span class="text-[10px] font-bold">Captura</span>
    </button>
    <button id="tab-jugar" class="tab-btn flex flex-col items-center gap-0.5 text-game-orange" data-tab="home">
      <span class="text-xl">&#x2694;&#xFE0F;</span><span class="text-[10px] font-bold">Jugar</span>
    </button>
    <button id="tab-tienda" class="tab-btn flex flex-col items-center gap-0.5 text-game-gray" data-tab="shop">
      <span class="text-xl">&#x1F6D2;</span><span class="text-[10px] font-bold">Tienda</span>
    </button>
    <button id="tab-config" class="tab-btn flex flex-col items-center gap-0.5 text-game-gray" data-tab="settings">
      <span class="text-xl">&#x2699;&#xFE0F;</span><span class="text-[10px] font-bold">Config</span>
    </button>
  </div>
</div>
`;
;