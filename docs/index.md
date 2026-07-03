---
layout: home
hero:
  name: "fast-balance"
  text: "Chemical Equation Balancer"
  tagline: "Precision stoichiometry for modern chemistry"
  actions:
    - theme: brand
      text: "Get Started"
      link: /api-reference
    - theme: alt
      text: "View on GitHub"
      link: https://github.com/richie-rich90454/fast-balance
features:
  - title: "Universal Stoichiometry"
    details: "Handles any chemical equation from simple to complex redox reactions, ionic equations, and hydrates"
  - title: "Complex Syntax Support"
    details: "Supports all arrow styles, ionic charges, hydrates, and complex organic formulas with intuitive syntax"
  - title: "Exact Arithmetic"
    details: "Uses integer-based rational arithmetic to avoid floating-point errors and ensure mathematically correct results"
  - title: "Zero Dependencies"
    details: "Lightweight library with no external dependencies, perfect for educational and production use"
---

<style>
/* Hero Section Molecular Animation */
.hero-molecular-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.hero-molecular-bg::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image:
    radial-gradient(circle at 30% 20%, rgba(10, 77, 104, 0.12) 0%, transparent 25%),
    radial-gradient(circle at 70% 60%, rgba(157, 78, 221, 0.1) 0%, transparent 30%),
    radial-gradient(circle at 20% 80%, rgba(0, 200, 150, 0.08) 0%, transparent 25%),
    radial-gradient(circle at 80% 30%, rgba(255, 209, 102, 0.06) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(17, 138, 178, 0.08) 0%, transparent 35%);
  animation: molecularFloat 20s ease-in-out infinite;
}

.dark .hero-molecular-bg::before {
  background-image:
    radial-gradient(circle at 30% 20%, rgba(8, 131, 155, 0.2) 0%, transparent 25%),
    radial-gradient(circle at 70% 60%, rgba(181, 126, 236, 0.15) 0%, transparent 30%),
    radial-gradient(circle at 20% 80%, rgba(0, 230, 172, 0.12) 0%, transparent 25%),
    radial-gradient(circle at 80% 30%, rgba(255, 209, 102, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(17, 138, 178, 0.12) 0%, transparent 35%);
}

@keyframes molecularFloat {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2%, 1%) rotate(1deg); }
  50% { transform: translate(0, 2%) rotate(0deg); }
  75% { transform: translate(-2%, 1%) rotate(-1deg); }
}

/* Chemistry Section Dividers */
.chem-divider {
  position: relative;
  height: 60px;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chem-divider::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--chem-primary) 20%,
    var(--chem-accent) 50%,
    var(--chem-secondary) 80%,
    transparent 100%
  );
  opacity: 0.5;
}

.chem-divider .molecule {
  position: relative;
  z-index: 1;
  background: var(--vp-c-bg);
  padding: 0 1.5rem;
  color: var(--chem-accent);
  font-size: 1.5rem;
  animation: moleculePulse 3s ease-in-out infinite;
}

@keyframes moleculePulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* Reaction Arrow Divider */
.reaction-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2.5rem 0;
  padding: 1rem 0;
}

.reaction-divider .arrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--chem-primary);
  font-weight: 600;
  font-size: 1.25rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.reaction-divider .arrow:hover {
  opacity: 1;
  color: var(--chem-accent);
  transform: scale(1.1);
}

.reaction-divider .line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--chem-primary), transparent);
  max-width: 150px;
}

/* Molecular Structure Decorations */
.molecular-decoration {
  position: relative;
  padding: 2rem;
  margin: 2rem 0;
}

.molecular-decoration::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px dashed var(--chem-primary);
  border-radius: 12px;
  opacity: 0.2;
  pointer-events: none;
}

.molecular-decoration::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 20px;
  width: 10px;
  height: 10px;
  background: var(--chem-secondary);
  border-radius: 50%;
  opacity: 0.4;
}

/* Chemistry-themed Code Blocks */
.chem-equation {
  background: linear-gradient(135deg,
    rgba(10, 77, 104, 0.05) 0%,
    rgba(157, 78, 221, 0.05) 100%
  );
  border: 1px solid var(--chem-primary);
  border-radius: 12px;
  padding: 1.5rem;
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  overflow: hidden;
}

.chem-equation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--chem-gradient-reaction);
}

.dark .chem-equation {
  background: linear-gradient(135deg,
    rgba(8, 131, 155, 0.1) 0%,
    rgba(181, 126, 236, 0.1) 100%
  );
}

/* Periodic Table Styled Feature Cards */
.chem-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.chem-feature-card {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.chem-feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--chem-gradient-reaction);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
}

.chem-feature-card:hover {
  border-color: var(--chem-primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(10, 77, 104, 0.12);
}

.chem-feature-card:hover::before {
  transform: scaleY(1);
}

.chem-feature-card .card-number {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.chem-feature-card .card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--chem-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chem-feature-card .card-content {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.dark .chem-feature-card:hover {
  box-shadow: 0 8px 24px rgba(8, 131, 155, 0.2);
}

.dark .chem-feature-card .card-title {
  color: var(--chem-primary-light);
}

/* Element Badge Styling */
.element-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.element-badge-mini {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.element-badge-mini:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.element-badge-mini .symbol {
  font-size: 1.1rem;
  line-height: 1;
}

.element-badge-mini .number {
  font-size: 0.6rem;
  opacity: 0.8;
  line-height: 1;
}

/* Lab Equipment Icons */
.lab-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--chem-gradient-primary);
  border-radius: 50%;
  color: white;
  font-size: 1.25rem;
  margin-right: 0.75rem;
  box-shadow: 0 2px 8px rgba(10, 77, 104, 0.2);
}

/* Animated Gradient Text */
.gradient-text-animated {
  background: linear-gradient(270deg,
    var(--chem-primary),
    var(--chem-accent),
    var(--chem-secondary),
    var(--chem-primary)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 8s ease infinite;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Solution Gradient Background */
.solution-bg {
  background:
    radial-gradient(ellipse at 20% 30%, rgba(0, 200, 150, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(157, 78, 221, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(10, 77, 104, 0.05) 0%, transparent 70%);
  border-radius: 16px;
  padding: 2rem;
  margin: 1.5rem 0;
}

.dark .solution-bg {
  background:
    radial-gradient(ellipse at 20% 30%, rgba(0, 230, 172, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(181, 126, 236, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(8, 131, 155, 0.08) 0%, transparent 70%);
}

/* Hexagonal Pattern Background */
.hex-pattern {
  position: relative;
}

.hex-pattern::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0z' fill='none' stroke='%230A4D68' stroke-width='0.5' stroke-opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.dark .hex-pattern::after {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0z' fill='none' stroke='%2308839B' stroke-width='0.5' stroke-opacity='0.05'/%3E%3C/svg%3E");
}

/* Flask Decoration */
.flask-decoration {
  position: relative;
  display: inline-block;
}

.flask-decoration::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  background: var(--chem-gradient-secondary);
  border-radius: 0 0 50% 50%;
  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);
}
</style>

<div class="hero-molecular-bg"></div>

<div class="solution-bg hex-pattern">

## Quick Start

<div class="element-badges">
  <div class="element-badge-mini" style="background: linear-gradient(135deg, #8D99AE, #6B7A8C); color: white;">
    <span class="number">1</span>
    <span class="symbol">H</span>
  </div>
  <div class="element-badge-mini" style="background: linear-gradient(135deg, #2DC653, #1FA846); color: white;">
    <span class="number">8</span>
    <span class="symbol">O</span>
  </div>
  <div class="element-badge-mini" style="background: linear-gradient(135deg, #C77DFF, #A456E6); color: white;">
    <span class="number">2</span>
    <span class="symbol">He</span>
  </div>
  <div class="element-badge-mini" style="background: linear-gradient(135deg, #FF6B35, #E55A2B); color: white;">
    <span class="number">7</span>
    <span class="symbol">N</span>
  </div>
  <div class="element-badge-mini" style="background: linear-gradient(135deg, #FFD166, #E6B800); color: white;">
    <span class="number">6</span>
    <span class="symbol">C</span>
  </div>
</div>

Install fast-balance using npm:

```bash
npm install fast-balance
```

<div class="chem-equation">
  2H<sub>2</sub> + O<sub>2</sub> <span style="color: var(--chem-accent);">→</span> 2H<sub>2</sub>O
</div>

</div>

<div class="reaction-divider">
  <div class="line"></div>
  <div class="arrow">⚛ →</div>
  <div class="line"></div>
</div>

<div class="molecular-decoration">

## Simple API

Balance any chemical equation with a single function call:

```javascript
import { balance } from 'fast-balance';

// Balance a simple equation
const result = balance('H2 + O2 -> H2O');
console.log(result.equation);
// Output: 2H2 + O2 -> 2H2O

// Handle complex redox reactions
const redox = balance('Fe + CuSO4 -> FeSO4 + Cu');
console.log(redox.equation);
// Output: Fe + CuSO4 -> FeSO4 + Cu

// Support for ionic equations
const ionic = balance('Ag+ + Cl- -> AgCl');
console.log(ionic.equation);
// Output: Ag+ + Cl- -> AgCl
```

The library automatically finds the smallest integer coefficients that balance the equation while conserving mass and charge.

</div>

<div class="chem-divider">
  <div class="molecule">⚗</div>
</div>

## Why fast-balance?

<div class="chem-feature-grid">
  <div class="chem-feature-card">
    <span class="card-number">01</span>
    <div class="card-title">
      <span class="lab-icon">🔬</span>
      Precision
    </div>
    <div class="card-content">
      Integer-based rational arithmetic ensures mathematically exact results with no floating-point errors.
    </div>
  </div>
  <div class="chem-feature-card">
    <span class="card-number">02</span>
    <div class="card-title">
      <span class="lab-icon">⚗️</span>
      Universal
    </div>
    <div class="card-content">
      Handles any valid chemical equation including redox reactions, ionic equations, and hydrates.
    </div>
  </div>
  <div class="chem-feature-card">
    <span class="card-number">03</span>
    <div class="card-title">
      <span class="lab-icon">🧪</span>
      Flexible Syntax
    </div>
    <div class="card-content">
      Supports all arrow styles (<code>→</code>, <code>→</code>, <code>=</code>), ionic charges, and complex organic formulas.
    </div>
  </div>
  <div class="chem-feature-card">
    <span class="card-number">04</span>
    <div class="card-title">
      <span class="lab-icon">⚛️</span>
      Zero Dependencies
    </div>
    <div class="card-content">
      Lightweight and self-contained. Perfect for educational tools, production apps, and embedded systems.
    </div>
  </div>
</div>

<div class="reaction-divider">
  <div class="line"></div>
  <div class="arrow">→ ⚗ →</div>
  <div class="line"></div>
</div>

<div class="solution-bg">

## Supported Syntax

The library supports a wide range of chemical notation:

| Feature | Example | Description |
|---------|---------|-------------|
| Standard equations | `H2 + O2 -> H2O` | Basic chemical equations |
| Redox reactions | `Fe + CuSO4 -> FeSO4 + Cu` | Oxidation-reduction |
| Ionic equations | `Ag+ + Cl- -> AgCl` | With ionic charges |
| Hydrates | `CuSO4·5H2O` | Hydrate notation |
| Multiple arrows | `A <=> B`, `A <- B` | Different reaction types |
| Organic compounds | `CH3CH2OH` | Complex formulas |

</div>

<div class="chem-divider">
  <div class="molecule">🧬</div>
</div>

## Explore More

Ready to dive deeper? Check out the full API documentation and examples.

<div class="chem-feature-grid">
  <a href="/api-reference" class="chem-feature-card" style="text-decoration: none;">
    <span class="card-number">API</span>
    <div class="card-title">
      <span class="lab-icon">📚</span>
      API Reference
    </div>
    <div class="card-content">
      Complete documentation of all functions and types.
    </div>
  </a>
  <a href="/examples" class="chem-feature-card" style="text-decoration: none;">
    <span class="card-number">EX</span>
    <div class="card-title">
      <span class="lab-icon">💡</span>
      Examples
    </div>
    <div class="card-content">
      Real-world examples and use cases for the library.
    </div>
  </a>
  <a href="/demo" class="chem-feature-card" style="text-decoration: none;">
    <span class="card-number">DEMO</span>
    <div class="card-title">
      <span class="lab-icon">🎮</span>
      Interactive Demo
    </div>
    <div class="card-content">
      Try the balancer live in your browser.
    </div>
  </a>
  <a href="https://github.com/richie-rich90454/fast-balance" class="chem-feature-card" style="text-decoration: none;">
    <span class="card-number">SRC</span>
    <div class="card-title">
      <span class="lab-icon">⚡</span>
      Source Code
    </div>
    <div class="card-content">
      View the source on GitHub, report issues, or contribute.
    </div>
  </a>
</div>