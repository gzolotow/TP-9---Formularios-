# Torneo Inscripción — Formulario React Native

Formulario de inscripción a un torneo de e-sports (Valorant), hecho con Expo.

## Cómo correrlo en VS Code

### 1. Requisitos previos
- Tener [Node.js](https://nodejs.org/) instalado (v18 o superior).
- Instalar la extensión de VS Code que quieras para JS/React (no es obligatoria, con la de "ESLint" o nada alcanza).
- Tener la app **Expo Go** instalada en tu celular (Android/iOS) — es la forma más rápida de probarlo sin emulador.

### 2. Abrir el proyecto
1. Abrí esta carpeta (`torneo-inscripcion`) en VS Code: `File > Open Folder...`
2. Abrí una terminal integrada: `Terminal > New Terminal` (o `Ctrl + ñ` / `Ctrl + backtick`).

### 3. Instalar dependencias
En la terminal de VS Code:
```bash
npm install
```

### 4. Levantar el proyecto
```bash
npx expo start
```
Esto abre el **Metro Bundler** en la terminal y te muestra un código QR.

### 5. Probarlo
- **En tu celular (recomendado):** abrí la app Expo Go y escaneá el QR que aparece en la terminal/navegador.
- **En emulador Android:** con el emulador abierto, apretá `a` en la terminal donde corre `expo start`.
- **En simulador iOS (solo Mac):** apretá `i`.
- **En el navegador:** apretá `w` (sirve para ver el layout general, pero **el comportamiento del teclado hay que probarlo en celular o emulador**, tal como pide la consigna).

### 6. Recargar cambios
Con Expo, al guardar el archivo (`Ctrl + S`) la app se recarga sola (Fast Refresh). Si algo queda raro, en la terminal apretá `r` para recargar manual.

## Estructura
```
torneo-inscripcion/
├── App.js          <- Todo el formulario está acá
├── app.json        <- Configuración de Expo
├── package.json    <- Dependencias
└── README.md
```

## Qué hace el formulario
- Un solo `useState` para los 5 campos (`nombreEquipo`, `nombreCapitan`, `email`, `telefono`, `categoria`).
- Componente `CampoFormulario` reutilizado en los 4 inputs de texto.
- `categoria` se elige con dos botones toggle ("Sub-16" / "Libre").
- `KeyboardAvoidingView` con `behavior` distinto para iOS (`padding`) y Android (`height`), envuelto en `ScrollView` para que el teclado nunca tape el botón de confirmar.
- Cada input usa el `keyboardType` correspondiente (`default`, `email-address`, `phone-pad`).
- Validaciones: los 5 campos son obligatorios (`.trim()`), `nombreEquipo` entre 3 y 20 caracteres, `email` con formato válido, `telefono` solo números. El botón "Confirmar inscripción" queda deshabilitado mientras haya errores, y cada error se muestra debajo de su campo (después de tocar Confirmar por primera vez).
