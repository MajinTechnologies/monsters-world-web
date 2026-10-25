# Guía de Contribución

Gracias por tu interés en **Monsters World**. Esta guía describe cómo preparar el
entorno, ejecutar el proyecto y enviar cambios.

> ¿Buscás la descripción del juego, el stack y las pantallas? Ver el
> [README](./README.md).

---

## Requisitos

- **Node.js** 18 o superior (y `npm`).
- Git.

## Setup local

```bash
# 1. Clonar el repositorio
git clone https://github.com/MajinTechnologies/monsters-world-web.git
cd monsters-world-web

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

El servidor de desarrollo arranca en `http://localhost:3000`
(ver `vite.config.ts`).

## Comandos disponibles

Fuente única de verdad: los scripts de [`package.json`](./package.json).

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload (puerto 3000) |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm test` | Ejecuta la suite de tests una vez (`vitest run`) |

## Tests

El proyecto usa **Vitest** con entorno **happy-dom** (ver `vitest.config.ts`).

- Ubicación de los tests: junto al código, patrón `src/**/*.test.ts`.
- Estilo: `describe` / `it` / `expect`, con `beforeEach` para aislar estado.
- Ejemplos existentes:
  - `src/data/SettingsStore.test.ts` — lógica con `localStorage` (se limpia en
    `beforeEach`).
  - `src/ui/screens/SettingsUI.test.ts` — DOM montado con
    `document.body.innerHTML = MENU_HTML`.

```bash
# Correr toda la suite
npm test
```

Antes de abrir un PR, asegurate de que `npm test` y `npm run build` pasan.

## Convenciones de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance opcional>): <descripción en imperativo>
```

Tipos habituales:

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un bug |
| `docs` | Cambios solo en documentación |
| `test` | Añadir o ajustar tests |
| `refactor` | Cambio de código que no altera el comportamiento |
| `chore` | Tareas de mantenimiento (build, config, deps) |

Ejemplo real del repo: `chore(ci): bump worker_ref to kairos/v1.1.0 (multi-stage) (#7)`.

## Convenciones de ramas

Rama corta, con prefijo por tipo y slug en `kebab-case`:

```
<tipo>/<slug>
```

Ejemplos: `feat/gacha-pity`, `fix/stamina-overflow`, `docs/contributing`,
`chore/kairos-ci-public-reusable`.

- No se commitea directo a `main`.
- El worker de CI de Kairos usa además `kairos/<issue>-<slug>`.

## Flujo de pull request

1. Crear una rama desde `main` con la convención de arriba.
2. Implementar el cambio con commits convencionales.
3. Verificar localmente: `npm test` y `npm run build`.
4. Abrir el PR contra `main` y, si cierra un issue, incluir `Closes #<n>` en el
   cuerpo.
5. Un mantenedor revisa y mergea. No se hace *force-push* sobre una rama con PR
   abierto.

### Checklist antes de abrir el PR

- [ ] `npm test` en verde.
- [ ] `npm run build` sin errores.
- [ ] Commits con formato Conventional Commits.
- [ ] Sin secretos ni archivos ignorados (`.env`, `node_modules/`, `dist/`).
- [ ] Documentación actualizada si cambia el comportamiento visible.

## Estilo de código

- **TypeScript estricto** (ver `tsconfig.json`: `strict`, `noUnusedLocals`,
  `noUnusedParameters`).
- Imports relativos dentro de `src/` (o el alias `@/` definido en
  `vite.config.ts`).
- Sin `any` innecesario; tipar los datos que cruzan módulos.

## Estructura del proyecto

Resumen; el árbol completo está en el [README](./README.md).

```
src/
├── config/   # Constantes del juego
├── data/     # Datos y estado (monstruos, colección, settings)
├── scenes/   # Escenas de Phaser
└── ui/       # Componentes y pantallas de la interfaz
```

---

## Licencia

Al contribuir aceptás que tu aporte quede bajo la licencia del proyecto
(ver [README](./README.md#-licencia)).
