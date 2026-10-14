# 🏗️ Estructura del Proyecto

Árbol de archivos del repositorio. La raíz del proyecto es el propio repo
(`monsters-world-web`).

```
monsters-world-web/
├── index.html                    # Entry point HTML
├── package.json                  # Dependencias
├── tsconfig.json                 # Config TypeScript
├── vite.config.ts                # Config Vite
├── vitest.config.ts              # Config Vitest (tests unitarios)
├── tailwind.config.js            # Config Tailwind + colores del juego
├── postcss.config.js             # Config PostCSS
├── documentation/                # Documentación de referencia (ver README)
└── src/
    ├── main.ts                   # Bootstrap Phaser.Game
    ├── styles.css                # Estilos globales + animaciones
    ├── config/
    │   └── game.config.ts        # Constantes del juego
    ├── data/
    │   ├── monsters.ts           # 42 monstruos definidos
    │   ├── PlayerCollection.ts   # Gestión de colección + monedas
    │   ├── SettingsStore.ts      # Persistencia de ajustes (localStorage)
    │   └── SettingsStore.test.ts # Tests de SettingsStore
    ├── scenes/
    │   ├── BootScene.ts          # Escena de arranque
    │   ├── PreloadScene.ts       # Escena de carga
    │   ├── MainMenuScene.ts      # Escena principal (inicializa MenuUI)
    │   ├── BattleScene.ts        # Escena de batalla
    │   └── GameScene.ts          # Escena de gameplay (placeholder)
    └── ui/
        ├── menuHtml.ts           # Template HTML de todas las pantallas
        ├── MenuUI.ts             # Orquestador de pantallas
        ├── TabBar.ts             # Navegación por tabs
        ├── StatusBar.ts          # Barra de monedas/stamina
        └── screens/
            ├── LoadingUI.ts      # Pantalla de carga
            ├── HomeUI.ts         # Pantalla principal
            ├── CollectionUI.ts   # Pantalla de colección
            ├── MonsterDetailUI.ts # Modal de detalle de monstruo
            ├── GachaUI.ts        # Pantalla de captura
            ├── ShopUI.ts         # Pantalla de tienda
            ├── SettingsUI.ts     # Pantalla de configuración
            └── SettingsUI.test.ts # Tests de SettingsUI
```
