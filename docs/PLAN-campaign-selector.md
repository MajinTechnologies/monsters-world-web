# Plan: Selector de Campañas ("Eventos de la historia")

**Estado:** En progreso (paso a paso, con luz verde por paso).  
**Contexto:** Monsters World Web (Phaser 3 + TS + Vite). El campo de batalla actual pasa a ser el nivel "Nivel Vacío" de la campaña "Demo".

## Objetivo
Agregar un selector de campañas llamado **"Eventos de la historia"** con:
- **Demo** (desbloqueada)
  - **Nivel Vacío** (campo actual)
  - **Nivel con Obstáculos** (nuevo)
- **Historia principal** (bloqueada, con candado; reutilizar patrón de Online/Mundial)

## Decisiones (confirmadas)
- [x] **Predicción de rebote en obstáculos:** **Fase 2** (la línea predice rebote también en obstáculos).
- [x] **Layout de "Nivel con Obstáculos":** **arena tipo tablero de pinball**.
- [x] **Navegación al salir/victoria:** **volver al selector de niveles**.

## Pasos a seguir

### Paso 1 — Modelo de datos de campañas/niveles
- [x] Crear `src/data/campaigns.ts` con tipos y config estática:
  - Campañas: `id`, `name`, `locked`, `levels[]`
  - Niveles: `id`, `name`, `obstacles[]` (config para `BattleScene`)
- [x] Definir campañas: `demo` ("Demo") y `historia-principal` ("Historia principal", locked).
- [x] Definir niveles de Demo: `nivel-vacio` ("Nivel Vacío") y `nivel-obstaculos` ("Nivel con Obstáculos").
- [x] Definir layout inicial tipo pinball (`DEMO_PINBALL_OBSTACLES`) para "Nivel con Obstáculos".

**Criterio de done:** Config tipada y exportada; sin hardcodear nombres en la UI. **Cumplido (pendiente integración en pasos siguientes).**

### Paso 2 — UI: "Eventos de la historia" (selector de campañas)
- [x] Agregar markup en `src/ui/menuHtml.ts` para la pantalla `screen-campaigns` ("Eventos de la historia") y base de `screen-levels`.
- [x] Mostrar lista de campañas desde `campaigns.ts`: "Demo" y "Historia principal" (esta última con 🔒 y estado bloqueado).
- [x] Conectar botón **Campaña** en `MenuUI` para abrir el selector (en vez de iniciar batalla directo).
- [x] Al tocar campaña bloqueada: mostrar feedback de candado reutilizando `#construction-modal`.
- [x] Navegación básica: back de campañas → Home.

**Criterio de done:** Desde Home → Campaña se ve el selector; Historia principal bloqueada. **Cumplido.**

### Paso 3 — UI: selector de niveles (Demo)
- [x] Vista/lista de niveles para campaña seleccionada (Demo) en `#screen-levels`.
- [x] Mostrar "Nivel Vacío" y "Nivel con Obstáculos".
- [x] Navegación atrás: niveles → campañas → Home.
- [x] Al elegir nivel, se captura selección (inicio real de batalla se cablea en Paso 4 con `levelConfig`).

**Criterio de done:** Se puede elegir cualquiera de los dos niveles de Demo. **Cumplido (UI/navegación).**

### Paso 4 — Flujo de escenas con `levelConfig`
- [ ] Cambiar callback en `MenuUI`/`MainMenuScene` para recibir `levelConfig` (o `levelId`).
- [ ] `MainMenuScene.startBattle(...)` → `scene.start('VersusScene', data)`.
- [ ] `VersusScene.init(data)` guarda config y pasa a `BattleScene` al completar.
- [ ] `BattleScene.init(data)`/`create()` consume config del nivel.

**Criterio de done:** La batalla arranca con contexto del nivel seleccionado.

### Paso 5 — "Nivel con Obstáculos" en `BattleScene`
- [x] Según `level.obstacles`, instanciar obstáculos estáticos Matter dentro del arena (`60,110,960,1700`).
- [x] Layout **tipo tablero de pinball** implementado (`DEMO_PINBALL_OBSTACLES`: bumpers circulares, guías, guards angulados tipo flipper, kicker central).
- [x] Colisiones físicas con la pelota (Matter, `restitution` alta).
- [x] **Fase 2 aprobada:** predicción de puntería contempla rebotes en **paredes y obstáculos** (raycast círculo/rect rotado + reflexión por normal; hasta 2 rebotes de predicción).

**Criterio de done:** Nivel con obstáculos jugable; rebotes físicos y predicción funcionan. **Cumplido (pendiente QA manual en Paso 6).**

### Paso 6 — QA manual y polish
- [x] Verificación estática de flujo completo (código): Home → Campaña → Eventos → Demo → Nivel Vacío / Nivel con Obstáculos → Versus → Batalla.
- [x] Verificación estática de bloqueo de "Historia principal" (candado + `construction-modal`).
- [x] Navegación al salir/victoria: **volver al selector de niveles** (confirmado). `Repetir` reinicia nivel.
- [x] `npx tsc --noEmit --skipLibCheck` OK (solo errores preexistentes de `vitest`).
- [x] `npm run build` OK (build de producción generado).
- [ ] **QA manual pendiente (Lucas):** smoke test en navegador/local o Vercel para validar feel, rebotes Fase 2 y UX.

**Criterio de done (técnico):** flujo implementado y build limpio. **QA manual queda para Lucas.**

## Notas de implementación
- Mantener UI del menú dentro de `#ui-inner` (max-width 480px) cuando sea posible.
- Reutilizar estilos/patrones existentes (cards, modales, candado) para consistencia.
- Evitar hardcodear nombres/ids en múltiples lugares; centralizar en `campaigns.ts`.
- No commitear/pushear sin permiso explícito.

## Registro de progreso
- [x] Luz verde recibida (decisiones confirmadas)
- [x] Paso 1 completado
- [x] Paso 2 completado
- [x] Paso 3 completado
- [x] Paso 4 completado
- [x] Paso 5 completado
- [x] Paso 6 completado (técnico; QA manual pendiente)
