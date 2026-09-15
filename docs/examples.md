# Examples

Every example below is the exact output of the current library.

## Basic synthesis

```ts
balance("H2 + O2 -> H2O").equation;
// "2 H2 + 1 O2 -> 2 H2O"
```

## Combustion with a spectator gas

`N2` appears on both sides; it is balanced rather than rejected.

```ts
balance("C3H8 + O2 + N2 -> CO2 + H2O + N2").equation;
// "1 C3H8 + 5 O2 + 1 N2 -> 3 CO2 + 4 H2O + 1 N2"
```

## Redox half-reaction (acidic)

```ts
balance("MnO4- + H+ + e- -> Mn2+ + H2O").equation;
// "1 MnO4- + 8 H+ + 5 e- -> 1 Mn2+ + 4 H2O"
```

## Ionic charge accounting

```ts
balance("Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O").equation;
// "1 Cr2O7^2- + 6 Fe2+ + 14 H+ -> 2 Cr3+ + 6 Fe3+ + 7 H2O"
```

## Complex ions and brackets

```ts
balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]").equation;
// "1 [Fe(CN)6]4- + 4 K+ -> 1 K4[Fe(CN)6]"
```

## A large industrial system

```ts
balance("K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O").equation;
// "10 K4Fe(CN)6 + 122 KMnO4 + 299 H2SO4 -> 162 KHSO4 + 5 Fe2(SO4)3
//  + 122 MnSO4 + 60 HNO3 + 60 CO2 + 188 H2O"
```

## Unicode input

```ts
balance("H₂ + O₂ -> H₂O").equation; // "2 H2 + 1 O2 -> 2 H2O"
balance("Fe²⁺ + Cl⁻ -> FeCl₂").equation; // "1 Fe^2+ + 2 Cl- -> 1 FeCl2"
```

## Underdetermined systems

```ts
const r = balance("C + O2 -> CO + CO2");
r.underdetermined; // true
r.equation; // "3 C + 2 O2 -> 2 CO + 1 CO2"

balanceAll("C + O2 -> CO + CO2").map((x) => x.equation);
// ["3 C + 2 O2 -> 2 CO + 1 CO2", "4 C + 3 O2 -> 2 CO + 2 CO2"]
```

## Nuclear mode

```ts
balance("^238U -> ^234Th + ^4He", { mode: "nuclear" }).equation;
// "^238U -> ^234Th + ^4He"
```

## Opt-in redox completion

```ts
balance("Fe2+ -> Fe3+", { autoComplete: true, showOne: false }).equation;
// "Fe2+ -> Fe3+ + e-"
```

## Diagnostics

```ts
isBalanced("H2 + O2 -> H2O"); // true
audit("H2 + O2 -> H2O"); // per-side element and charge totals
```
