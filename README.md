# 🎮 Monsters World

Juego web de **pinball + colección de monstruos** estilo Pokémon. Captura monstruos en batallas de pinball, colecciona, evoluciona y compite.

---

## 📋 Estado del Proyecto

| Fase | Estado |
|------|--------|
| 1. Menú principal completo | ✅ Completada |
| 2. Colección + Sistema de monstruos | ✅ Completada |
| 3. Tienda + Monetización | ⏳ Pendiente |
| 4. Core Gameplay (Pinball) | ⏳ Pendiente |
| 5. Modo Online (PvP) | ⏳ Pendiente |
| 6. Deploy + Polish | ⏳ Pendiente |

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Game Engine | Phaser 3 |
| Lenguaje | TypeScript |
| UI | HTML/CSS + Tailwind CSS |
| Build Tool | Vite |
| Plataforma | Web (Mobile-first, portrait 9:16) |

---

## 🚀 Instalación

```bash
git clone https://github.com/MajinTechnologies/monsters-world-web.git
cd monsters-world-web
npm install
npm run dev
```

El servidor de desarrollo arranca en `http://localhost:3000`.

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm test` | Ejecuta la suite de tests (`vitest run`) |

---

## 🤝 Contribuir

¿Querés sumar código o documentación? Mirá la guía de contribución
**[CONTRIBUTING.md](./CONTRIBUTING.md)**: setup local, comandos, tests
(Vitest) y convenciones de commits, ramas y pull requests.

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Fondo | `#1e1e2e` | Background principal |
| Naranja | `#f59e0b` | Acento principal, botones, rareza Legendario |
| Púrpura | `#8b5cf6` | Monedas, rareza Épico |
| Azul | `#4a9eed` | Botón Online, rareza Raro |
| Verde | `#22c55e` | Stamina |
| Gris | `#a0a0a0` | Texto secundario, rareza Común |

### Colores por tipo de monstruo

| Tipo | Color |
|------|-------|
| 🔥 Fuego | `#ef4444` |
| 💧 Agua | `#3b82f6` |
| 🔮 Psíquico | `#a855f7` |
| 🌿 Planta | `#22c55e` |
| 🐉 Dragón | `#f59e0b` |
| ⚡ Eléctrico | `#eab308` |

---

## 🐲 Sistema de Monstruos

### Tipos
6 tipos con ventajas y desventajas:
- **Fuego** 🔥 — Alto ataque, defensa media
- **Agua** 💧 — Equilibrado, buena defensa
- **Psíquico** 🔮 — Velocidad alta, HP bajo
- **Planta** 🌿 — Alta defensa, ataque bajo
- **Dragón** 🐉 — Stats altos en general
- **Eléctrico** ⚡ — Velocidad máxima, HP medio

### Rarezas

| Rareza | Probabilidad | Color |
|--------|--------------|-------|
| Común | 60% | Gris |
| Raro | 25% | Azul |
| Épico | 12% | Púrpura |
| Legendario | 3% | Naranja |

### Evolución
Cada monstruo puede evolucionar cierto número de hits en batalla:
- **Común** → Evolución a 50 hits
- **Raro** → Evolución a 75 hits
- **Épico** → Evolución a 100 hits
- **Legendario** → Forma final (no evoluciona)

### Habilidades
Cada monstruo tiene entre 2 y 4 habilidades con:
- **Nombre** — Identificador de la habilidad
- **Tipo** — Tipo de daño que inflige
- **Daño** — Cantidad base de daño
- **Precisión** — Probabilidad de acierto (0-100%)

---

## 🐲 Monstruos (42 total)

### 🔥 Fuego
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Ignisaurio | Común | 80 | 60 | 40 | 50 |
| Cinderion | Común | 75 | 55 | 35 | 45 |
| Emberion | Raro | 90 | 70 | 45 | 55 |
| Blazodon | Raro | 95 | 75 | 50 | 50 |
| Pyraxion | Épico | 100 | 80 | 50 | 60 |
| Ignaroth | Épico | 105 | 85 | 55 | 55 |
| Volcanos | Legendario | 120 | 90 | 60 | 55 |

### 💧 Agua
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Tidalon | Común | 85 | 55 | 50 | 45 |
| Coralion | Común | 80 | 50 | 45 | 40 |
| Aquarion | Raro | 95 | 60 | 55 | 50 |
| Wavecrest | Raro | 100 | 65 | 60 | 45 |
| Neptunix | Épico | 105 | 70 | 60 | 55 |
| Abyssalos | Épico | 110 | 75 | 65 | 50 |
| Leviathan | Legendario | 130 | 75 | 65 | 50 |

### 🔮 Psíquico
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Menthix | Común | 70 | 50 | 45 | 60 |
| Phrenix | Común | 65 | 45 | 40 | 55 |
| Cerebrix | Raro | 80 | 60 | 50 | 65 |
| Mindarius | Raro | 85 | 65 | 55 | 60 |
| Zenithos | Épico | 90 | 70 | 55 | 70 |
| Psylordon | Épico | 95 | 75 | 60 | 65 |
| Oraculos | Legendario | 110 | 80 | 60 | 65 |

### 🌿 Planta
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Floravex | Común | 85 | 50 | 55 | 40 |
| Leafion | Común | 80 | 45 | 50 | 35 |
| Thornix | Raro | 95 | 55 | 60 | 45 |
| Thornador | Raro | 100 | 60 | 65 | 40 |
| Sylvanex | Épico | 105 | 65 | 65 | 50 |
| Verdanox | Épico | 110 | 70 | 70 | 45 |
| Dryadon | Legendario | 125 | 70 | 70 | 45 |

### 🐉 Dragón
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Drakorex | Común | 90 | 65 | 40 | 50 |
| Scaleon | Común | 85 | 60 | 35 | 45 |
| Wyvernix | Raro | 100 | 75 | 45 | 55 |
| Drakestorm | Raro | 105 | 80 | 50 | 50 |
| Draconis | Épico | 110 | 85 | 50 | 60 |
| Dragonaut | Épico | 115 | 90 | 55 | 55 |
| Bahamut | Legendario | 140 | 95 | 55 | 55 |

### ⚡ Eléctrico
| Nombre | Rareza | HP | ATK | DEF | SPD |
|--------|--------|-----|-----|-----|-----|
| Voltaris | Común | 75 | 60 | 40 | 65 |
| Sparkodon | Común | 70 | 55 | 35 | 60 |
| Sparkion | Raro | 85 | 70 | 45 | 70 |
| Voltex | Raro | 90 | 75 | 50 | 65 |
| Electroduke | Épico | 95 | 80 | 50 | 75 |
| Plasmarion | Épico | 100 | 85 | 55 | 70 |
| Zeusion | Legendario | 115 | 90 | 55 | 70 |

---

## 🎰 Sistema de Gacha

### Mecánica
- **Costo**: 100 monedas por intento
- **Probabilidades**:
  - Común: 60%
  - Raro: 25%
  - Épico: 12%
  - Legendario: 3%
- **Sin duplicados**: Si tienes todos los de una rareza, se redistribuye la probabilidad

### Monedas
- **Inicio**: 1,250 monedas
- **Regeneración**: pendiente (Fase 3)
- **Compra**: pendiente (Fase 3)

---

## 📱 Pantallas

### 1. Loading Screen
- Logo "MONSTERS WORLD" naranja
- Barra de carga animada (~3 segundos)
- Transición automática a Home

### 2. Home / Jugar
- StatusBar (monedas + stamina)
- Avatar placeholder
- Botones: Campaña, Online, Mundial

### 3. Colección
- Tabs por tipo (solo tipos capturados)
- Grid 3 columnas de cartas verticales
- Click en carta → Modal de detalle:
  - Stats con barras (HP, ATK, DEF, SPD)
  - Habilidades con daño y precisión
  - Información de evolución

### 4. Tienda
- Paquetes: Monedas, Stamina, Skin Avatar, Mega Pack

### 5. Configuración
- Audio: Sonido, Música (toggles)
- Controles: Vibración (toggle)
- Cuenta: Jugador, Nivel
- Créditos: Versión

### 6. Captura (Gacha)
- Card boca abajo con animación de volteo
- Modal de resultado con efectos glow
- Contador de monstruos capturados

---

## 🏗️ Estructura del Proyecto

```
Monsters World Web/
├── index.html                    # Entry point HTML
├── package.json                  # Dependencias
├── tsconfig.json                 # Config TypeScript
├── vite.config.ts                # Config Vite
├── tailwind.config.js            # Config Tailwind + colores del juego
├── postcss.config.js             # Config PostCSS
└── src/
    ├── main.ts                   # Bootstrap Phaser.Game
    ├── styles.css                # Estilos globales + animaciones
    ├── config/
    │   └── game.config.ts        # Constantes del juego
    ├── data/
    │   ├── monsters.ts           # 42 monstruos definidos
    │   └── PlayerCollection.ts   # Gestión de colección + monedas
    ├── scenes/
    │   ├── BootScene.ts          # Escena de arranque
    │   ├── PreloadScene.ts       # Escena de carga
    │   ├── MainMenuScene.ts      # Escena principal (inicializa MenuUI)
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
            └── SettingsUI.ts     # Pantalla de configuración
```

---

## 📋 Próximos Pasos

### Fase 3: Tienda + Monetización
- Sistema de compras reales
- Paquetes de monedas con precios
- Regeneración de stamina con tiempo
- Skins de avatar

### Fase 4: Core Gameplay
- Mecánica de pinball (bola, flippers, bumpers)
- Combate monstruo vs monstruo (turnos)
- Sistema de habilidades en batalla
- Captura de monstruos desde pinball

### Fase 5: Modo Online
- Matchmaking PvP
- Batallas en tiempo real
- Leaderboard global

### Fase 6: Deploy + Polish
- Deploy en itch.io o dominio propio
- Optimización de performance
- Sound effects y música
- Tutorial interactivo

---

## 📄 Licencia

© 2026 Majin Games. Todos los derechos reservados.
