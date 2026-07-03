---
title: Installation
---

# Installation

## Package Installation

Install fast-balance using your preferred package manager:

### npm

```bash
npm install fast-balance
```

### yarn

```bash
yarn add fast-balance
```

### pnpm

```bash
pnpm add fast-balance
```

## Quick Start

### ES Modules (ESM)

fast-balance provides native ES module support. Use the `import` syntax in modern JavaScript environments:

```javascript
import { balance } from 'fast-balance';
const result = balance('H2 + O2 -> H2O');
console.log(result.equation); // "2 H2 + 1 O2 -> 2 H2O"
```

### CommonJS

For legacy Node.js environments or CommonJS projects, use `require()`:

```javascript
const { balance } = require('fast-balance');
const result = balance('Fe + O2 -> Fe2O3');
console.log(result.equation); // "4 Fe + 3 O2 -> 2 Fe2O3"
```

### TypeScript

fast-balance includes full TypeScript type definitions. No additional `@types` package is required:

```typescript
import { balance, BalanceOptions, BalanceResult } from 'fast-balance';
const options: BalanceOptions = {
    showOne: false,
    format: 'html'
};
const result: BalanceResult = balance('H2 + O2 -> H2O', options);
console.log(result.equation); // "2 H2 + O2 &rarr; 2 H2O"
```

## Browser Usage

### Bundlers (Webpack, Vite, Rollup, etc.)

fast-balance works seamlessly with modern bundlers. Import it as you would any other module:

```javascript
import { balance } from 'fast-balance';
// Your bundler will handle the rest
const result = balance('CH4 + O2 -> CO2 + H2O');
```

### Direct Browser Script

For direct browser usage without a bundler, use the ESM version:

```html
<script type="module">
    import { balance } from 'https://unpkg.com/fast-balance/dist/index.js';
    const result = balance('H2 + O2 -> H2O');
    console.log(result.equation);
</script>
```

### CDN Usage

fast-balance is available on popular CDN networks:

**unpkg**:
```html
<script type="module">
    import { balance } from 'https://unpkg.com/fast-balance';
</script>
```

**jsDelivr**:
```html
<script type="module">
    import { balance } from 'https://cdn.jsdelivr.net/npm/fast-balance';
</script>
```

## Module Formats

fast-balance is distributed as a **dual ESM/CommonJS package** using Node.js conditional exports. The package automatically provides the appropriate format based on your environment:

### Package Structure

```
fast-balance/
├── dist/
│   ├── index.js       (ESM entry)
│   ├── index.cjs      (CommonJS entry)
│   └── index.d.ts     (TypeScript declarations)
└── package.json
```

### Export Resolution

- **ESM environments** (`import`): Automatically resolves to `dist/index.js`
- **CommonJS environments** (`require`): Automatically resolves to `dist/index.cjs`
- **TypeScript environments**: Type definitions are automatically resolved

## System Requirements

### Node.js

- **Minimum version**: Node.js 12.20 or later
- **Recommended**: Node.js 16.x or later for optimal performance

### Browser Support

fast-balance works in all modern browsers that support:
- ES modules
- ES2017+ features (async/await, object spread, etc.)

**Supported browsers**:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

### TypeScript Support

- **Minimum TypeScript version**: 4.0+
- **Recommended**: TypeScript 4.5+ for optimal type inference

Full type declarations are included in the package (`dist/index.d.ts`). All exported interfaces are available:

```typescript
import type {
    BalanceOptions,
    BalanceResult,
    BalancedSpecies,
    ElementMap,
    ParsedUnit,
    Species,
    Equation
} from 'fast-balance';
```

## Package Size

fast-balance is designed to be lightweight:

- **Minified size**: ~6 kB
- **Gzipped size**: ~2 kB
- **Zero runtime dependencies**

This makes it suitable for:
- Client-side applications
- Serverless functions
- Educational platforms
- Chemistry web applications

## Verification

After installation, verify that fast-balance is working correctly:

```javascript
import { balance } from 'fast-balance';
// Test basic equation
const result1 = balance('H2 + O2 -> H2O');
console.log(result1.equation); // "2 H2 + 1 O2 -> 2 H2O"
// Test with options
const result2 = balance('Fe + O2 -> Fe2O3', { showOne: false });
console.log(result2.equation); // "4 Fe + 3 O2 -> 2 Fe2O3"
// Test ionic equation
const result3 = balance('MnO4- + H+ + e- -> Mn2+ + H2O');
console.log(result3.equation); // "1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O"
```

## Troubleshooting

### CommonJS Import Issues

If you encounter `require() of ES Module` errors in CommonJS environments:

```javascript
// Instead of:
const { balance } = require('fast-balance');
// Try:
const { balance } = require('fast-balance/dist/index.cjs');
```

### TypeScript Module Resolution

Ensure your `tsconfig.json` has proper module resolution settings:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

### Browser Compatibility

If you need to support older browsers, consider using a transpiler (Babel, SWC) or bundler (Webpack, Vite) with appropriate browser targets.

## Next Steps

After installation, explore the documentation:

- **[API Reference](./api-reference.md)**: Complete API documentation with examples
- **[Chemical Notation](./notation.md)**: Supported notation formats and syntax

## Versioning

fast-balance follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking API changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes (backward-compatible)

Check your installed version:

```bash
npm list fast-balance
```

## License

fast-balance is released under the MIT License. See the [LICENSE](https://github.com/richie-rich90454/fast-balance/blob/main/LICENSE) file for full license text.