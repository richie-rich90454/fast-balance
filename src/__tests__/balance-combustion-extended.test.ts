import { describe, it, expect } from "vitest";
import { balance } from "../index";

// ─── 1. Complete combustion of alkanes (methane through decane) ───

describe("complete combustion of alkanes", () => {
  it("balances CH4 + 2O2 -> CO2 + 2H2O", () => {
    const r = balance("CH4 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 2]);
  });

  it("balances 2C2H6 + 7O2 -> 4CO2 + 6H2O", () => {
    const r = balance("C2H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 7]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });

  it("balances C3H8 + 5O2 -> 3CO2 + 4H2O", () => {
    const r = balance("C3H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([3, 4]);
  });

  it("balances 2C4H10 + 13O2 -> 8CO2 + 10H2O", () => {
    const r = balance("C4H10 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 13]);
    expect(r.products.map((x) => x.coefficient)).toEqual([8, 10]);
  });

  it("balances C5H12 + 8O2 -> 5CO2 + 6H2O", () => {
    const r = balance("C5H12 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 8]);
    expect(r.products.map((x) => x.coefficient)).toEqual([5, 6]);
  });

  it("balances 2C6H14 + 19O2 -> 12CO2 + 14H2O", () => {
    const r = balance("C6H14 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 19]);
    expect(r.products.map((x) => x.coefficient)).toEqual([12, 14]);
  });

  it("balances C7H16 + 11O2 -> 7CO2 + 8H2O", () => {
    const r = balance("C7H16 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 11]);
    expect(r.products.map((x) => x.coefficient)).toEqual([7, 8]);
  });

  it("balances 2C8H18 + 25O2 -> 16CO2 + 18H2O", () => {
    const r = balance("C8H18 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 25]);
    expect(r.products.map((x) => x.coefficient)).toEqual([16, 18]);
  });

  it("balances C9H20 + 14O2 -> 9CO2 + 10H2O", () => {
    const r = balance("C9H20 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 14]);
    expect(r.products.map((x) => x.coefficient)).toEqual([9, 10]);
  });

  it("balances 2C10H22 + 31O2 -> 20CO2 + 22H2O", () => {
    const r = balance("C10H22 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 31]);
    expect(r.products.map((x) => x.coefficient)).toEqual([20, 22]);
  });
});

// ─── 2. Complete combustion of alkenes and alkynes ───

describe("complete combustion of alkenes and alkynes", () => {
  it("balances C2H4 + 3O2 -> 2CO2 + 2H2O", () => {
    const r = balance("C2H4 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 2]);
  });

  it("balances 2C2H2 + 5O2 -> 4CO2 + 2H2O", () => {
    const r = balance("C2H2 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 2]);
  });

  it("balances 2C3H6 + 9O2 -> 6CO2 + 6H2O", () => {
    const r = balance("C3H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map((x) => x.coefficient)).toEqual([6, 6]);
  });

  it("balances C4H8 + 6O2 -> 4CO2 + 4H2O", () => {
    const r = balance("C4H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 4]);
  });

  it("balances C3H4 + 4O2 -> 3CO2 + 2H2O (propyne)", () => {
    const r = balance("C3H4 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map((x) => x.coefficient)).toEqual([3, 2]);
  });

  it("balances 2C4H6 + 11O2 -> 8CO2 + 6H2O (butadiyne)", () => {
    const r = balance("C4H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 11]);
    expect(r.products.map((x) => x.coefficient)).toEqual([8, 6]);
  });
});

// ─── 3. Complete combustion of aromatic compounds ───

describe("complete combustion of aromatic compounds", () => {
  it("balances 2C6H6 + 15O2 -> 12CO2 + 6H2O (benzene)", () => {
    const r = balance("C6H6 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 15]);
    expect(r.products.map((x) => x.coefficient)).toEqual([12, 6]);
  });

  it("balances C7H8 + 9O2 -> 7CO2 + 4H2O (toluene)", () => {
    const r = balance("C7H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 9]);
    expect(r.products.map((x) => x.coefficient)).toEqual([7, 4]);
  });

  it("balances 2C8H10 + 21O2 -> 16CO2 + 10H2O (ethylbenzene/xylene)", () => {
    const r = balance("C8H10 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 21]);
    expect(r.products.map((x) => x.coefficient)).toEqual([16, 10]);
  });

  it("balances C10H8 + 12O2 -> 10CO2 + 4H2O (naphthalene)", () => {
    const r = balance("C10H8 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 12]);
    expect(r.products.map((x) => x.coefficient)).toEqual([10, 4]);
  });

  it("balances C9H12 + 12O2 -> 9CO2 + 6H2O (cumene)", () => {
    const r = balance("C9H12 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 12]);
    expect(r.products.map((x) => x.coefficient)).toEqual([9, 6]);
  });
});

// ─── 4. Complete combustion of alcohols ───

describe("complete combustion of alcohols", () => {
  it("balances 2CH3OH + 3O2 -> 2CO2 + 4H2O (methanol)", () => {
    const r = balance("CH3OH + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 4]);
  });

  it("balances C2H5OH + 3O2 -> 2CO2 + 3H2O (ethanol)", () => {
    const r = balance("C2H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 3]);
  });

  it("balances 2C3H7OH + 9O2 -> 6CO2 + 8H2O (propanol)", () => {
    const r = balance("C3H7OH + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map((x) => x.coefficient)).toEqual([6, 8]);
  });

  it("balances C4H9OH + 6O2 -> 4CO2 + 5H2O (butanol)", () => {
    const r = balance("C4H9OH + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 5]);
  });

  it("balances C2H4(OH)2 + 5/2O2 -> 2CO2 + 3H2O (ethylene glycol)", () => {
    const r = balance("C2H4(OH)2 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });

  it("balances C3H5(OH)3 + 7/2O2 -> 3CO2 + 4H2O (glycerol)", () => {
    const r = balance("C3H5(OH)3 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 7]);
    expect(r.products.map((x) => x.coefficient)).toEqual([6, 8]);
  });
});

// ─── 5. Combustion of ethers, aldehydes, ketones, esters ───

describe("combustion of ethers, aldehydes, ketones, esters", () => {
  it("balances CH3OCH3 + 3O2 -> 2CO2 + 3H2O (dimethyl ether)", () => {
    const r = balance("CH3OCH3 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 3]);
  });

  it("balances HCHO + O2 -> CO2 + H2O (formaldehyde)", () => {
    const r = balance("HCHO + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 1]);
  });

  it("balances 2CH3CHO + 5O2 -> 4CO2 + 4H2O (acetaldehyde)", () => {
    const r = balance("CH3CHO + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 4]);
  });

  it("balances CH3COCH3 + 4O2 -> 3CO2 + 3H2O (acetone)", () => {
    const r = balance("CH3COCH3 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map((x) => x.coefficient)).toEqual([3, 3]);
  });

  it("balances CH3COOC2H5 + 5O2 -> 4CO2 + 4H2O (ethyl acetate)", () => {
    const r = balance("CH3COOC2H5 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 4]);
  });

  it("balances C6H12O6 + 6O2 -> 6CO2 + 6H2O (glucose)", () => {
    const r = balance("C6H12O6 + O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map((x) => x.coefficient)).toEqual([6, 6]);
  });
});

// ─── 6. Incomplete combustion (CO formation, soot) ───

describe("incomplete combustion - CO formation", () => {
  it("balances 2CH4 + 3O2 -> 2CO + 4H2O", () => {
    const r = balance("CH4 + O2 -> CO + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 4]);
  });

  it("balances 2C2H6 + 5O2 -> 4CO + 6H2O", () => {
    const r = balance("C2H6 + O2 -> CO + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });

  it("balances 2C3H8 + 7O2 -> 6CO + 8H2O", () => {
    const r = balance("C3H8 + O2 -> CO + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 7]);
    expect(r.products.map((x) => x.coefficient)).toEqual([6, 8]);
  });

  it("balances 2C2H2 + O2 -> 4C + 2H2O (soot formation)", () => {
    const r = balance("C2H2 + O2 -> C + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 2]);
  });

  it("balances CH4 + O2 -> C + 2H2O (soot formation)", () => {
    const r = balance("CH4 + O2 -> C + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 2]);
  });

  it("balances 2C2H6 + 3O2 -> 4C + 6H2O (soot formation)", () => {
    const r = balance("C2H6 + O2 -> C + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });
});

// ─── 7. Combustion of sulfur-containing compounds ───

describe("combustion of sulfur-containing compounds", () => {
  it("balances 2H2S + 3O2 -> 2SO2 + 2H2O", () => {
    const r = balance("H2S + O2 -> SO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 2]);
  });

  it("balances CS2 + 3O2 -> CO2 + 2SO2", () => {
    const r = balance("CS2 + O2 -> CO2 + SO2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 2]);
  });

  it("balances CH3SH + 3O2 -> CO2 + 2H2O + SO2 (methanethiol)", () => {
    const r = balance("CH3SH + O2 -> CO2 + H2O + SO2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 2, 1]);
  });

  it("balances 2C2H5SH + 9O2 -> 4CO2 + 6H2O + 2SO2 (ethanethiol)", () => {
    const r = balance("C2H5SH + O2 -> CO2 + H2O + SO2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 9]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6, 2]);
  });

  it("balances 2SO2 + O2 -> 2SO3", () => {
    const r = balance("SO2 + O2 -> SO3");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 2H2S + O2 -> 2S + 2H2O (partial oxidation)", () => {
    const r = balance("H2S + O2 -> S + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 2]);
  });
});

// ─── 8. Combustion of nitrogen-containing compounds (NOx) ───

describe("combustion of nitrogen-containing compounds", () => {
  it("balances 4NH3 + 5O2 -> 4NO + 6H2O (Ostwald process)", () => {
    const r = balance("NH3 + O2 -> NO + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });

  it("balances 4NH3 + 3O2 -> 2N2 + 6H2O", () => {
    const r = balance("NH3 + O2 -> N2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 6]);
  });

  it("balances 4NH3 + 7O2 -> 4NO2 + 6H2O", () => {
    const r = balance("NH3 + O2 -> NO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 7]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 6]);
  });

  it("balances 2NO + O2 -> 2NO2", () => {
    const r = balance("NO + O2 -> NO2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 4CH3NH2 + 9O2 -> 4CO2 + 2N2 + 10H2O (methylamine)", () => {
    const r = balance("CH3NH2 + O2 -> CO2 + N2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 9]);
    expect(r.products.map((x) => x.coefficient)).toEqual([4, 2, 10]);
  });

  it("balances 2(NO2)2CO -> 4CO2 + 2N2 + O2 is wrong; testing (NH2)2CO", () => {
    const r = balance("(NH2)2CO + O2 -> CO2 + N2 + H2O");
    expect(r.reactants.every((s) => s.coefficient > 0)).toBe(true);
    expect(r.products.every((s) => s.coefficient > 0)).toBe(true);
    const all = [
      ...r.reactants.map((x) => x.coefficient),
      ...r.products.map((x) => x.coefficient),
    ];
    expect(all.every((c) => Number.isInteger(c) && c > 0)).toBe(true);
  });
});

// ─── 9. Explosive reactions ───

describe("explosive reactions", () => {
  it("balances 4C3H5N3O9 -> 12CO2 + 10H2O + 6N2 + O2 (nitroglycerin decomposition)", () => {
    const r = balance("C3H5N3O9 -> CO2 + H2O + N2 + O2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4]);
    expect(r.products.map((x) => x.coefficient)).toEqual([12, 10, 6, 1]);
  });

  it("balances 4C7H5N3O6 + 21O2 -> 28CO2 + 10H2O + 6N2 (TNT combustion)", () => {
    const r = balance("C7H5N3O6 + O2 -> CO2 + H2O + N2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 21]);
    expect(r.products.map((x) => x.coefficient)).toEqual([28, 10, 6]);
  });

  it("balances 2NH4NO3 -> 2N2 + O2 + 4H2O (ammonium nitrate decomposition)", () => {
    const r = balance("NH4NO3 -> N2 + O2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 1, 4]);
  });

  it("balances 2KNO3 + S + 3C -> K2S + N2 + 3CO2 (gunpowder)", () => {
    const r = balance("KNO3 + S + C -> K2S + N2 + CO2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 1, 3]);
  });

  it("balances 2NaN3 -> 2Na + 3N2 (airbag decomposition)", () => {
    const r = balance("NaN3 -> Na + N2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 3]);
  });
});

// ─── 10. Rocket propellant combustion ───

describe("rocket propellant combustion", () => {
  it("balances 2H2 + O2 -> 2H2O (liquid hydrogen/oxygen)", () => {
    const r = balance("H2 + O2 -> H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances N2H4 + O2 -> N2 + 2H2O (hydrazine)", () => {
    const r = balance("N2H4 + O2 -> N2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 2]);
  });

  it("balances 2N2H4 + N2O4 -> 3N2 + 4H2O (hypergolic)", () => {
    const r = balance("N2H4 + N2O4 -> N2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([3, 4]);
  });

  it("balances 2CH3NHNH2 + 5O2 -> 2CO2 + 2N2 + 6H2O (MMH)", () => {
    const r = balance("CH3NHNH2 + O2 -> CO2 + N2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 5]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 2, 6]);
  });

  it("balances CH4 + 4H2O2 -> CO2 + 6H2O (methane + H2O2)", () => {
    const r = balance("CH4 + H2O2 -> CO2 + H2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 6]);
  });
});

// ─── 11. Combustion in fluorine atmosphere ───

describe("combustion in fluorine atmosphere", () => {
  it("balances H2 + F2 -> 2HF", () => {
    const r = balance("H2 + F2 -> HF");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances CH4 + 4F2 -> CF4 + 4HF", () => {
    const r = balance("CH4 + F2 -> CF4 + HF");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 4]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1, 4]);
  });

  it("balances C2H4 + 6F2 -> 2CF4 + 4HF", () => {
    const r = balance("C2H4 + F2 -> CF4 + HF");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 6]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2, 4]);
  });

  it("balances 2Na + F2 -> 2NaF", () => {
    const r = balance("Na + F2 -> NaF");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances Mg + F2 -> MgF2", () => {
    const r = balance("Mg + F2 -> MgF2");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1]);
  });

  it("balances Si + 2F2 -> SiF4", () => {
    const r = balance("Si + F2 -> SiF4");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([1, 2]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1]);
  });
});

// ─── 12. Metal combustion (Mg, Al, Fe in O2) ───

describe("metal combustion in oxygen", () => {
  it("balances 2Mg + O2 -> 2MgO", () => {
    const r = balance("Mg + O2 -> MgO");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 4Al + 3O2 -> 2Al2O3", () => {
    const r = balance("Al + O2 -> Al2O3");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 3Fe + 2O2 -> Fe3O4", () => {
    const r = balance("Fe + O2 -> Fe3O4");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([3, 2]);
    expect(r.products.map((x) => x.coefficient)).toEqual([1]);
  });

  it("balances 4Fe + 3O2 -> 2Fe2O3", () => {
    const r = balance("Fe + O2 -> Fe2O3");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 3]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 2Zn + O2 -> 2ZnO", () => {
    const r = balance("Zn + O2 -> ZnO");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 2Cu + O2 -> 2CuO", () => {
    const r = balance("Cu + O2 -> CuO");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 4Na + O2 -> 2Na2O", () => {
    const r = balance("Na + O2 -> Na2O");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([4, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });

  it("balances 2Ca + O2 -> 2CaO", () => {
    const r = balance("Ca + O2 -> CaO");
    expect(r.reactants.map((x) => x.coefficient)).toEqual([2, 1]);
    expect(r.products.map((x) => x.coefficient)).toEqual([2]);
  });
});

// ─── Edge cases: unbalanceable reactions wrapped in try-catch ───

describe("edge cases - unbalanceable reactions", () => {
  it("throws for impossible reaction", () => {
    expect(() => balance("H2O -> Fe")).toThrow();
  });

  it("throws for trivially unbalanceable", () => {
    expect(() => balance("NaCl -> Fe + Cl2")).toThrow();
  });

  it("handles C6H5OH + O2 -> CO2 + H2O (phenol combustion)", () => {
    const r = balance("C6H5OH + O2 -> CO2 + H2O");
    expect(r.reactants.every((s) => s.coefficient > 0)).toBe(true);
    expect(r.products.every((s) => s.coefficient > 0)).toBe(true);
    const all = [
      ...r.reactants.map((x) => x.coefficient),
      ...r.products.map((x) => x.coefficient),
    ];
    expect(all.every((c) => Number.isInteger(c) && c > 0)).toBe(true);
  });

  it("handles C4H4S + O2 -> CO2 + H2O + SO2 (thiophene combustion)", () => {
    const r = balance("C4H4S + O2 -> CO2 + H2O + SO2");
    expect(r.reactants.every((s) => s.coefficient > 0)).toBe(true);
    expect(r.products.every((s) => s.coefficient > 0)).toBe(true);
    const all = [
      ...r.reactants.map((x) => x.coefficient),
      ...r.products.map((x) => x.coefficient),
    ];
    expect(all.every((c) => Number.isInteger(c) && c > 0)).toBe(true);
  });
});
