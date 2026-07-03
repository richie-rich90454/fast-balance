---
title: Examples
---

# Examples

This page contains chemical equation examples from the fast-balance test suite. Each example shows the input equation, the balanced output, and a code snippet demonstrating the `balance()` function.

## Redox reactions

Redox reactions involve electron transfer between species. The library handles simple metal oxidation, ionic half-reactions, and displacement reactions.

### Metal oxidation

Basic oxidation of metals by oxygen to form oxides.

| Input | Balanced Output |
|-------|-----------------|
| `Fe + O2 -> Fe2O3` | `4 Fe + 3 O2 -> 2 Fe2O3` |
| `Al + O2 -> Al2O3` | `4 Al + 3 O2 -> 2 Al2O3` |
| `Mg + O2 -> MgO` | `2 Mg + O2 -> 2 MgO` |
| `Cu + O2 -> CuO` | `2 Cu + O2 -> 2 CuO` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Fe + O2 -> Fe2O3');
console.log(result.equation);
// Output: "4 Fe + 3 O2 -> 2 Fe2O3"
```

[Try in Demo](/demo.md)

### Ionic redox half-reactions

Half-reactions in acidic medium, commonly used in electrochemistry and titration calculations.

| Input | Balanced Output |
|-------|-----------------|
| `MnO4- + H+ + e- -> Mn2+ + H2O` | `1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O` |
| `Cr2O7^2- + H+ + e- -> Cr3+ + H2O` | `1 Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O` |
| `NO3- + H+ + e- -> NO + H2O` | `1 NO3- + 4 H+ + 3 e- -> 1 NO + 2 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('MnO4- + H+ + e- -> Mn2+ + H2O');
console.log(result.equation);
// Output: "1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O"
```

[Try in Demo](/demo.md)

### Displacement reactions

A more reactive metal displaces a less reactive metal from its compound.

| Input | Balanced Output |
|-------|-----------------|
| `Zn + CuSO4 -> ZnSO4 + Cu` | `1 Zn + 1 CuSO4 -> 1 ZnSO4 + 1 Cu` |
| `Cu + AgNO3 -> Cu(NO3)2 + Ag` | `1 Cu + 2 AgNO3 -> 1 Cu(NO3)2 + 2 Ag` |
| `Fe + CuSO4 -> FeSO4 + Cu` | `1 Fe + 1 CuSO4 -> 1 FeSO4 + 1 Cu` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Zn + CuSO4 -> ZnSO4 + Cu');
console.log(result.equation);
// Output: "1 Zn + 1 CuSO4 -> 1 ZnSO4 + 1 Cu"
```

[Try in Demo](/demo.md)

---

## Organic reactions

Reactions including combustion, esterification, and named organic reactions.

### Combustion reactions

Complete combustion of hydrocarbons and oxygenated organic compounds.

| Input | Balanced Output |
|-------|-----------------|
| `CH4 + O2 -> CO2 + H2O` | `1 CH4 + 2 O2 -> 1 CO2 + 2 H2O` |
| `C2H6 + O2 -> CO2 + H2O` | `2 C2H6 + 7 O2 -> 4 CO2 + 6 H2O` |
| `C3H8 + O2 -> CO2 + H2O` | `1 C3H8 + 5 O2 -> 3 CO2 + 4 H2O` |
| `C6H12O6 + O2 -> CO2 + H2O` | `1 C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O` |
| `C2H5OH + O2 -> CO2 + H2O` | `1 C2H5OH + 3 O2 -> 2 CO2 + 3 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('CH4 + O2 -> CO2 + H2O');
console.log(result.equation);
// Output: "1 CH4 + 2 O2 -> 1 CO2 + 2 H2O"
```

[Try in Demo](/demo.md)

### Esterification reactions

Formation of esters from carboxylic acids and alcohols.

| Input | Balanced Output |
|-------|-----------------|
| `CH3COOH + C2H5OH -> CH3COOC2H5 + H2O` | `1 CH3COOH + 1 C2H5OH -> 1 CH3COOC2H5 + 1 H2O` |
| `CH3COOH + NaOH -> CH3COONa + H2O` | `1 CH3COOH + 1 NaOH -> 1 CH3COONa + 1 H2O` |
| `HCOOH + NaOH -> HCOONa + H2O` | `1 HCOOH + 1 NaOH -> 1 HCOONa + 1 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('CH3COOH + C2H5OH -> CH3COOC2H5 + H2O');
console.log(result.equation);
// Output: "1 CH3COOH + 1 C2H5OH -> 1 CH3COOC2H5 + 1 H2O"
```

[Try in Demo](/demo.md)

### Named organic reactions

Classic named reactions from organic synthesis.

| Reaction Type | Input | Balanced Output |
|---------------|-------|-----------------|
| Friedel-Crafts Alkylation | `C6H6 + CH3Cl -> C6H5CH3 + HCl` | `1 C6H6 + 1 CH3Cl -> 1 C7H8 + 1 HCl` |
| Hydroformylation | `C2H4 + CO + H2 -> CH3CH2CHO` | `1 C2H4 + 1 CO + 1 H2 -> 1 C3H6O` |
| Benzoin Condensation | `C6H5CHO + C6H5CHO -> C14H12O2` | `1 C6H5CHO + 1 C6H5CHO -> 1 C14H12O2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('C6H6 + CH3Cl -> C7H8 + HCl');
console.log(result.equation);
// Output: "1 C6H6 + 1 CH3Cl -> 1 C7H8 + 1 HCl"
```

[Try in Demo](/demo.md)

---

## Inorganic reactions

Inorganic reactions including alkali and alkaline earth metals, halogen chemistry, and acid-base neutralization.

### Metal reactions

Reactions of metals with water, acids, and halogens.

| Input | Balanced Output |
|-------|-----------------|
| `2Na + Cl2 -> 2NaCl` | `2 Na + 1 Cl2 -> 2 NaCl` |
| `Na + H2O -> NaOH + H2` | `2 Na + 2 H2O -> 2 NaOH + 1 H2` |
| `Mg + HCl -> MgCl2 + H2` | `1 Mg + 2 HCl -> 1 MgCl2 + 1 H2` |
| `Ca + H2O -> Ca(OH)2 + H2` | `1 Ca + 2 H2O -> 1 Ca(OH)2 + 1 H2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Na + H2O -> NaOH + H2');
console.log(result.equation);
// Output: "2 Na + 2 H2O -> 2 NaOH + 1 H2"
```

[Try in Demo](/demo.md)

### Acid-base neutralization

Neutralization reactions between acids and bases.

| Input | Balanced Output |
|-------|-----------------|
| `HCl + NaOH -> NaCl + H2O` | `1 HCl + 1 NaOH -> 1 NaCl + 1 H2O` |
| `H2SO4 + NaOH -> Na2SO4 + H2O` | `1 H2SO4 + 2 NaOH -> 1 Na2SO4 + 2 H2O` |
| `HCl + Ca(OH)2 -> CaCl2 + H2O` | `2 HCl + 1 Ca(OH)2 -> 1 CaCl2 + 2 H2O` |
| `H3PO4 + NaOH -> Na3PO4 + H2O` | `1 H3PO4 + 3 NaOH -> 1 Na3PO4 + 3 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('HCl + NaOH -> NaCl + H2O');
console.log(result.equation);
// Output: "1 HCl + 1 NaOH -> 1 NaCl + 1 H2O"
```

[Try in Demo](/demo.md)

### Precipitation reactions

Formation of insoluble precipitates from ionic solutions.

| Input | Balanced Output |
|-------|-----------------|
| `AgNO3 + NaCl -> AgCl + NaNO3` | `1 AgNO3 + 1 NaCl -> 1 AgCl + 1 NaNO3` |
| `BaCl2 + Na2SO4 -> BaSO4 + NaCl` | `1 BaCl2 + 1 Na2SO4 -> 1 BaSO4 + 2 NaCl` |
| `Pb(NO3)2 + KI -> PbI2 + KNO3` | `1 Pb(NO3)2 + 2 KI -> 1 PbI2 + 2 KNO3` |

```typescript
import { balance } from 'fast-balance';

const result = balance('AgNO3 + NaCl -> AgCl + NaNO3');
console.log(result.equation);
// Output: "1 AgNO3 + 1 NaCl -> 1 AgCl + 1 NaNO3"
```

[Try in Demo](/demo.md)

---

## Industrial reactions

Major industrial processes used in chemical manufacturing.

### Haber process

Industrial synthesis of ammonia from nitrogen and hydrogen.

| Input | Balanced Output |
|-------|-----------------|
| `N2 + H2 -> NH3` | `1 N2 + 3 H2 -> 2 NH3` |
| `NH3 -> N2 + H2` | `2 NH3 -> 1 N2 + 3 H2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('N2 + H2 -> NH3');
console.log(result.equation);
// Output: "1 N2 + 3 H2 -> 2 NH3"
```

[Try in Demo](/demo.md)

### Contact process

Industrial production of sulfuric acid from sulfur.

| Input | Balanced Output |
|-------|-----------------|
| `S + O2 -> SO2` | `1 S + 1 O2 -> 1 SO2` |
| `SO2 + O2 -> SO3` | `2 SO2 + 1 O2 -> 2 SO3` |
| `SO3 + H2O -> H2SO4` | `1 SO3 + 1 H2O -> 1 H2SO4` |

```typescript
import { balance } from 'fast-balance';

const result = balance('S + O2 -> SO2');
console.log(result.equation);
// Output: "1 S + 1 O2 -> 1 SO2"
```

[Try in Demo](/demo.md)

### Ostwald process

Industrial production of nitric acid from ammonia.

| Input | Balanced Output |
|-------|-----------------|
| `NH3 + O2 -> NO + H2O` | `4 NH3 + 5 O2 -> 4 NO + 6 H2O` |
| `NO + O2 -> NO2` | `2 NO + 1 O2 -> 2 NO2` |
| `NO2 + H2O -> HNO3 + NO` | `3 NO2 + 1 H2O -> 2 HNO3 + 1 NO` |

```typescript
import { balance } from 'fast-balance';

const result = balance('NH3 + O2 -> NO + H2O');
console.log(result.equation);
// Output: "4 NH3 + 5 O2 -> 4 NO + 6 H2O"
```

[Try in Demo](/demo.md)

### Blast furnace

Reduction of iron ore to metallic iron.

| Input | Balanced Output |
|-------|-----------------|
| `Fe2O3 + CO -> Fe + CO2` | `1 Fe2O3 + 3 CO -> 2 Fe + 3 CO2` |
| `FeO + CO -> Fe + CO2` | `1 FeO + 1 CO -> 1 Fe + 1 CO2` |
| `C + O2 -> CO2` | `1 C + 1 O2 -> 1 CO2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Fe2O3 + CO -> Fe + CO2');
console.log(result.equation);
// Output: "1 Fe2O3 + 3 CO -> 2 Fe + 3 CO2"
```

[Try in Demo](/demo.md)

---

## Electrochemical reactions

Electrochemistry including galvanic cells, batteries, electrolysis, and electroplating.

### Galvanic cells

Spontaneous redox reactions in electrochemical cells.

| Input | Balanced Output |
|-------|-----------------|
| `Zn + Cu2+ -> Zn2+ + Cu` | `1 Zn + 1 Cu2+ -> 1 Zn2+ + 1 Cu` |
| `Zn + Ag+ -> Zn2+ + Ag` | `1 Zn + 2 Ag+ -> 1 Zn2+ + 2 Ag` |
| `Al + Cu2+ -> Al3+ + Cu` | `2 Al + 3 Cu2+ -> 2 Al3+ + 3 Cu` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Zn + Cu2+ -> Zn2+ + Cu');
console.log(result.equation);
// Output: "1 Zn + 1 Cu2+ -> 1 Zn2+ + 1 Cu"
```

[Try in Demo](/demo.md)

### Battery chemistry

Reactions in common battery systems.

| Battery Type | Input | Balanced Output |
|--------------|-------|-----------------|
| Lead-Acid | `Pb + PbO2 + H2SO4 -> PbSO4 + H2O` | `1 Pb + 1 PbO2 + 2 H2SO4 -> 2 PbSO4 + 2 H2O` |
| Lithium-Ion | `Li + CoO2 -> LiCoO2` | `1 Li + 1 CoO2 -> 1 LiCoO2` |
| NiCd | `Cd + NiO2 + H2O -> Cd(OH)2 + Ni(OH)2` | `1 Cd + 1 NiO2 + 2 H2O -> 1 Cd(OH)2 + 1 Ni(OH)2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Pb + PbO2 + H2SO4 -> PbSO4 + H2O');
console.log(result.equation);
// Output: "1 Pb + 1 PbO2 + 2 H2SO4 -> 2 PbSO4 + 2 H2O"
```

[Try in Demo](/demo.md)

### Electrolysis

Electrolytic decomposition reactions.

| Input | Balanced Output |
|-------|-----------------|
| `H2O -> H2 + O2` | `2 H2O -> 2 H2 + 1 O2` |
| `NaCl -> Na + Cl2` | `2 NaCl -> 2 Na + 1 Cl2` |
| `Al2O3 -> Al + O2` | `2 Al2O3 -> 4 Al + 3 O2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('H2O -> H2 + O2');
console.log(result.equation);
// Output: "2 H2O -> 2 H2 + 1 O2"
```

[Try in Demo](/demo.md)

---

## Biochemical and pharmaceutical reactions

Reactions relevant to biochemistry and pharmaceutical synthesis.

### Fermentation and respiration

Biological oxidation and fermentation reactions.

| Input | Balanced Output |
|-------|-----------------|
| `C6H12O6 -> C2H5OH + CO2` | `1 C6H12O6 -> 2 C2H5OH + 2 CO2` |
| `C6H12O6 + O2 -> CO2 + H2O` | `1 C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('C6H12O6 -> C2H5OH + CO2');
console.log(result.equation);
// Output: "1 C6H12O6 -> 2 C2H5OH + 2 CO2"
```

[Try in Demo](/demo.md)

### Drug synthesis

Key reactions in pharmaceutical manufacturing.

| Reaction | Input | Balanced Output |
|----------|-------|-----------------|
| Aspirin Synthesis | `C7H6O3 + C4H6O3 -> C9H8O4 + C2H4O2` | `1 C7H6O3 + 1 C4H6O3 -> 1 C9H8O4 + 1 C2H4O2` |
| Paracetamol | `C6H7NO + C4H6O3 -> C8H9NO2 + C2H4O2` | `1 C6H7NO + 1 C4H6O3 -> 1 C8H9NO2 + 1 C2H4O2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('C7H6O3 + C4H6O3 -> C9H8O4 + C2H4O2');
console.log(result.equation);
// Output: "1 C7H6O3 + 1 C4H6O3 -> 1 C9H8O4 + 1 C2H4O2"
```

[Try in Demo](/demo.md)

---

## Environmental and geochemistry reactions

Reactions relevant to environmental science, atmospheric chemistry, and geological processes.

### Atmospheric chemistry

Ozone depletion, smog formation, and greenhouse gas reactions.

| Input | Balanced Output |
|-------|-----------------|
| `O3 + NO -> NO2 + O2` | `1 O3 + 1 NO -> 1 NO2 + 1 O2` |
| `SO2 + O2 -> SO3` | `2 SO2 + 1 O2 -> 2 SO3` |
| `SO3 + H2O -> H2SO4` | `1 SO3 + 1 H2O -> 1 H2SO4` |

```typescript
import { balance } from 'fast-balance';

const result = balance('O3 + NO -> NO2 + O2');
console.log(result.equation);
// Output: "1 O3 + 1 NO -> 1 NO2 + 1 O2"
```

[Try in Demo](/demo.md)

### Carbon and nitrogen cycles

Key reactions in biogeochemical cycles.

| Input | Balanced Output |
|-------|-----------------|
| `CO2 + H2O -> C6H12O6 + O2` | `6 CO2 + 6 H2O -> 1 C6H12O6 + 6 O2` |
| `N2 + H2 -> NH3` | `1 N2 + 3 H2 -> 2 NH3` |
| `CaCO3 + CO2 + H2O -> Ca(HCO3)2` | `1 CaCO3 + 1 CO2 + 1 H2O -> 1 Ca(HCO3)2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('CO2 + H2O -> C6H12O6 + O2');
console.log(result.equation);
// Output: "6 CO2 + 6 H2O -> 1 C6H12O6 + 6 O2"
```

[Try in Demo](/demo.md)

### Mineral weathering

Geological weathering and dissolution reactions.

| Input | Balanced Output |
|-------|-----------------|
| `CaCO3 + H2SO4 -> CaSO4 + CO2 + H2O` | `1 CaCO3 + 1 H2SO4 -> 1 CaSO4 + 1 CO2 + 1 H2O` |
| `Fe2O3 + H+ -> Fe3+ + H2O` | `1 Fe2O3 + 6 H+ -> 2 Fe3+ + 3 H2O` |
| `SiO2 + H2O -> H2SiO3` | `1 SiO2 + 1 H2O -> 1 H2SiO3` |

```typescript
import { balance } from 'fast-balance';

const result = balance('CaCO3 + H2SO4 -> CaSO4 + CO2 + H2O');
console.log(result.equation);
// Output: "1 CaCO3 + 1 H2SO4 -> 1 CaSO4 + 1 CO2 + 1 H2O"
```

[Try in Demo](/demo.md)

---

## Nuclear and specialized reactions

Nuclear fuel processing, actinide chemistry, and specialized compound reactions.

### Nuclear fuel processing

Chemical processing reactions for nuclear materials.

| Input | Balanced Output |
|-------|-----------------|
| `UO2 + H2 -> U + H2O` | `1 UO2 + 2 H2 -> 1 U + 2 H2O` |
| `UO2 + HF -> UF4 + H2O` | `1 UO2 + 4 HF -> 1 UF4 + 2 H2O` |
| `UF4 + F2 -> UF6` | `1 UF4 + 1 F2 -> 1 UF6` |
| `ThO2 + HNO3 -> Th(NO3)4 + H2O` | `1 ThO2 + 4 HNO3 -> 1 Th(NO3)4 + 2 H2O` |

```typescript
import { balance } from 'fast-balance';

const result = balance('UO2 + H2 -> U + H2O');
console.log(result.equation);
// Output: "1 UO2 + 2 H2 -> 1 U + 2 H2O"
```

[Try in Demo](/demo.md)

### Coordination chemistry

Formation of coordination complexes.

| Input | Balanced Output |
|-------|-----------------|
| `CuSO4 + NH3 -> [Cu(NH3)4]SO4` | `1 CuSO4 + 4 NH3 -> 1 [Cu(NH3)4]SO4` |
| `FeCl3 + KCN -> K3[Fe(CN)6] + KCl` | `1 FeCl3 + 6 KCN -> 1 K3[Fe(CN)6] + 3 KCl` |
| `AgCl + NH3 -> [Ag(NH3)2]Cl` | `1 AgCl + 2 NH3 -> 1 [Ag(NH3)2]Cl` |

```typescript
import { balance } from 'fast-balance';

const result = balance('CuSO4 + NH3 -> [Cu(NH3)4]SO4');
console.log(result.reactants[1].coefficient); // 4 (NH3)
```

[Try in Demo](/demo.md)

### Superoxide and peroxide reactions

Reactions involving superoxide and peroxide species.

| Input | Balanced Output |
|-------|-----------------|
| `Na + O2 -> Na2O2` | `2 Na + 1 O2 -> 1 Na2O2` |
| `Na2O2 + H2O -> NaOH + O2` | `2 Na2O2 + 2 H2O -> 4 NaOH + 1 O2` |
| `H2O2 -> H2O + O2` | `2 H2O2 -> 2 H2O + 1 O2` |

```typescript
import { balance } from 'fast-balance';

const result = balance('Na + O2 -> Na2O2');
console.log(result.equation);
// Output: "2 Na + 1 O2 -> 1 Na2O2"
```

[Try in Demo](/demo.md)

---

## Summary

The fast-balance library handles a wide range of chemical equations:

- Simple and complex stoichiometry
- Redox, ionic, and electrochemical reactions
- Organic combustion and named reactions
- Industrial processes
- Coordination compounds and hydrates
- Environmental and nuclear chemistry

For complete input syntax details, see the [Notation Guide](/notation.md). For API details, see the [API Reference](/api-reference.md).
