# 🎮 Sistema de Juego

Este documento describe los sistemas centrales de Monsters World: el **sistema
de monstruos** (tipos, rarezas, evolución y habilidades) y el **sistema de
gacha** (captura de monstruos y monedas).

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
