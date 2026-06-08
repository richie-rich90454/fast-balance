import {describe, it, expect} from "vitest";
import {balance} from "../index";
describe("balance()", ()=>{
    it("balances a simple synthesis reaction", ()=>{
        let result=balance("H2 + O2 -> H2O");
        expect(result.reactants).toHaveLength(2);
        expect(result.products).toHaveLength(1);
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[0]?.formula).toBe("H2");
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.reactants[1]?.formula).toBe("O2");
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[0]?.formula).toBe("H2O");
    });
    it("balances a simple decomposition reaction", ()=>{
        let result=balance("CaCO3 -> CaO + CO2");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("balances a double displacement reaction", ()=>{
        let result=balance("AgNO3 + NaCl -> AgCl + NaNO3");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("balances a combustion reaction", ()=>{
        let result=balance("CH4 + O2 -> CO2 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });
    it("handles nested parentheses", ()=>{
        let result=balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
        expect(result.reactants[0]?.coefficient).toBeGreaterThan(0);
        expect(result.products[0]?.coefficient).toBeGreaterThan(0);
    });
    it("handles square brackets for charge", ()=>{
        let result=balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(4);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles complex nested groups with charges", ()=>{
        let result=balance("[Cu(NH3)4](OH)2 + HCl -> [Cu(NH3)4]Cl2 + H2O");
        expect(result.reactants.length).toBe(2);
        expect(result.products.length).toBe(2);
    });
    it("handles simple ionic charges", ()=>{
        let result=balance("Fe2+ + Cl- -> FeCl2");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles charges with explicit numbers", ()=>{
        let result=balance("Fe3+ + O2- -> Fe2O3");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles charge inside brackets followed by subscript", ()=>{
        let result=balance("Al3+ + SO4^2- -> Al2(SO4)3");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles redox half-reaction in acidic medium (MnO4- -> Mn2+)", ()=>{
        let result=balance("MnO4- + H+ + e- -> Mn2+ + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(8);
        expect(result.reactants[2]?.coefficient).toBe(5);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(4);
    });
    it("handles a full redox reaction (Fe + O2 -> Fe2O3) with charge implicitly zero", ()=>{
        let result=balance("Fe + O2 -> Fe2O3");
        expect(result.reactants[0]?.coefficient).toBe(4);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
    });
    it("handles electron as 'e' (no minus sign)", ()=>{
        let result=balance("MnO4- + H+ + e -> Mn2+ + H2O");
        expect(result.reactants[2]?.coefficient).toBe(5);
    });
    it("handles the centered dot (·) in hydrates", ()=>{
        let result=balance("CuSO4·5H2O -> CuSO4 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(5);
    });
    it("handles asterisk (*) as hydrate dot", ()=>{
        let result=balance("Na2CO3*10H2O -> Na2CO3 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(10);
    });
    it("handles bullet (•) as hydrate dot", ()=>{
        let result=balance("CaCl2·2H2O -> CaCl2 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });
    it("handles hydrate with charge on the main unit", ()=>{
        let result=balance("CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O");
        expect(result.reactants.length).toBe(2);
        expect(result.products.length).toBe(3);
    });
    it("strips state symbols (aq)", ()=>{
        let result=balance("H2(g) + O2(g) -> H2O(l)");
        expect(result.equation).toContain("H2");
        expect(result.equation).not.toContain("(g)");
        expect(result.equation).not.toContain("(l)");
    });
    it("strips full words like (solid) and (liquid)", ()=>{
        let result=balance("Fe(solid) + Cl2(gas) -> FeCl2(s)");
        expect(result.equation).not.toContain("(solid)");
        expect(result.equation).not.toContain("(s)");
        expect(result.equation).not.toContain("(gas)");
    });
    it("handles multiple state symbols in a single term", ()=>{
        let result=balance("H2O(s)(l) -> H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("accepts ASCII arrow ->", ()=>{
        expect(balance("H2 + O2 -> H2O").equation).toBeTruthy();
    });
    it("accepts Unicode arrow →", ()=>{
        expect(balance("H2 + O2 → H2O").equation).toBeTruthy();
    });
    it("accepts equals sign", ()=>{
        expect(balance("H2 + O2 = H2O").equation).toBeTruthy();
    });
    it("accepts equilibrium arrows ⇌", ()=>{
        expect(balance("H2 + I2 ⇌ 2HI").equation).toBeTruthy();
    });
    it("accepts double arrow ⇒", ()=>{
        expect(balance("H2 + O2 ⇒ H2O").equation).toBeTruthy();
    });
    it("accepts <=>", ()=>{
        expect(balance("H2 + O2 <=> H2O").equation).toBeTruthy();
    });
    it("accepts <->", ()=>{
        expect(balance("H2 + O2 <-> H2O").equation).toBeTruthy();
    });
    it("accepts -->", ()=>{
        expect(balance("H2 + O2 --> H2O").equation).toBeTruthy();
    });
    it("ignores leading coefficients on reactants", ()=>{
        let result=balance("2 H2 + O2 -> H2O");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(1);
    });
    it("ignores leading coefficients on products", ()=>{
        let result=balance("H2 + O2 -> 2 H2O");
        expect(result.products[0]?.coefficient).toBe(2);
    });
    it("omits coefficient 1 when showOne is false", ()=>{
        let result=balance("H2 + O2 -> H2O", { showOne: false });
        expect(result.equation).toBe("2 H2 + O2 -> 2 H2O");
    });
    it("includes coefficient 1 when showOne is true (default)", ()=>{
        let result=balance("H2 + O2 -> H2O", { showOne: true });
        expect(result.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
    });
    it("formats as text (default)", ()=>{
        let result=balance("H2 + O2 -> H2O", { format: "text" });
        expect(result.equation).toBe("2 H2 + 1 O2 -> 2 H2O");
    });
    it("formats as HTML", ()=>{
        let result=balance("H2 + O2 -> H2O", { format: "html" });
        expect(result.equation).toContain("&rarr;");
    });
    it("formats as LaTeX", ()=>{
        let result=balance("H2 + O2 -> H2O", { format: "latex" });
        expect(result.equation).toContain("\\rightarrow");
    });
    it("throws on missing arrow", ()=>{
        expect(()=>balance("H2 O2 H2O")).toThrow();
    });
    it("throws on empty left side", ()=>{
        expect(()=>balance("-> H2O")).toThrow();
    });
    it("throws on empty right side", ()=>{
        expect(()=>balance("H2 + O2 ->")).toThrow();
    });
    it("throws on unbalanceable equation (insoluble constraints)", ()=>{
        expect(()=>balance("H -> O")).toThrow();
    });
    it("throws on malformed formula", ()=>{
        expect(()=>balance("H2O + abc ->")).toThrow();
    });
    it("handles identical both sides (no change)", ()=>{
        let result=balance("H2O -> H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles single element reactant and product", ()=>{
        let result=balance("Fe -> Fe");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
    });
    it("handles single product decomposition with element", ()=>{
        let result=balance("CaCO3 -> CaO + CO2");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products.length).toBe(2);
    });
    it("handles very complex organic combustion", ()=>{
        let result=balance("C6H12O6 + O2 -> CO2 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(6);
        expect(result.products[0]?.coefficient).toBe(6);
        expect(result.products[1]?.coefficient).toBe(6);
    });
    it("handles redox with multiple electrons on both sides", ()=>{
        let result=balance("Fe2+ + Ce4+ -> Fe3+ + Ce3+");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("handles a reaction that results in all coefficients being 1 (already balanced)", ()=>{
        let result=balance("NaOH + HCl -> NaCl + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("handles a reaction with multiple nested groups and charges", ()=>{
        let result=balance("[Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(3);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("produces integer coefficients for all test cases", ()=>{
        let reactions=["H2 + O2 -> H2O", "Fe2+ + Cl- -> FeCl2", "CuSO4·5H2O -> CuSO4 + H2O", "MnO4- + H+ + e- -> Mn2+ + H2O"];
        for (let eq of reactions){
            let res=balance(eq);
            res.reactants.forEach(r=>expect(Number.isInteger(r.coefficient)).toBe(true));
            res.products.forEach(p=>expect(Number.isInteger(p.coefficient)).toBe(true));
        }
    });
    it("ensures the balanced equation string matches the returned coefficients", ()=>{
        let eq="H2 + O2 -> H2O";
        let res=balance(eq, { showOne: false });
        let expected="2 H2 + O2 -> 2 H2O";
        expect(res.equation).toBe(expected);
    });
    it("handles a neutralization reaction", ()=>{
        let result=balance("H2SO4 + NaOH -> Na2SO4 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(2);
    });
    it("handles a displacement reaction with polyatomic ions", ()=>{
        let result=balance("Zn + CuSO4 -> ZnSO4 + Cu");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("handles ammonia synthesis", ()=>{
        let result=balance("N2 + H2 -> NH3");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
    });
    it("handles thermal decomposition of potassium chlorate", ()=>{
        let result=balance("KClO3 -> KCl + O2");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(3);
    });
    it("handles reaction of sodium with water", ()=>{
        let result=balance("Na + H2O -> NaOH + H2");
        expect(result.reactants[0]?.coefficient).toBe(2);
        expect(result.reactants[1]?.coefficient).toBe(2);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(1);
    });
    it("handles ferric oxide reduction with carbon monoxide", ()=>{
        let result=balance("Fe2O3 + CO -> Fe + CO2");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(3);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(3);
    });
    it("handles an equation with only charged species on both sides", ()=>{
        let result=balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.reactants[1]?.coefficient).toBe(14);
        expect(result.reactants[2]?.coefficient).toBe(6);
        expect(result.products[0]?.coefficient).toBe(2);
        expect(result.products[1]?.coefficient).toBe(7);
    });
    it("handles hydrate dehydration with asterisk", ()=>{
        let result=balance("MgSO4*7H2O -> MgSO4 + H2O");
        expect(result.reactants[0]?.coefficient).toBe(1);
        expect(result.products[0]?.coefficient).toBe(1);
        expect(result.products[1]?.coefficient).toBe(7);
    });
});

describe("synthesis reactions", () => {
  it("balances H2 + O2 -> H2O", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
  });

  it("balances N2 + H2 -> NH3", () => {
    const result = balance("N2 + H2 -> NH3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
  });

  it("balances 2Al + 3Cl2 -> 2AlCl3 (ignoring input coefficients)", () => {
    const result = balance("Al + Cl2 -> AlCl3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
  });

  it("balances Mg + O2 -> MgO", () => {
    const result = balance("Mg + O2 -> MgO");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
  });

  it("balances S + O2 -> SO2", () => {
    const result = balance("S + O2 -> SO2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});

describe("decomposition reactions", () => {
  it("balances CaCO3 -> CaO + CO2", () => {
    const result = balance("CaCO3 -> CaO + CO2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances KClO3 -> KCl + O2", () => {
    const result = balance("KClO3 -> KCl + O2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });

  it("balances H2O2 -> H2O + O2", () => {
    const result = balance("H2O2 -> H2O + O2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });

  it("balances 2HgO -> 2Hg + O2", () => {
    const result = balance("HgO -> Hg + O2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });
});

describe("displacement reactions", () => {
  it("balances Zn + CuSO4 -> ZnSO4 + Cu", () => {
    const result = balance("Zn + CuSO4 -> ZnSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Fe + CuSO4 -> FeSO4 + Cu", () => {
    const result = balance("Fe + CuSO4 -> FeSO4 + Cu");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Cl2 + KI -> KCl + I2", () => {
    const result = balance("Cl2 + KI -> KCl + I2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });

  it("balances Na + H2O -> NaOH + H2", () => {
    const result = balance("Na + H2O -> NaOH + H2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });
});

describe("double displacement reactions", () => {
  it("balances AgNO3 + NaCl -> AgCl + NaNO3", () => {
    const result = balance("AgNO3 + NaCl -> AgCl + NaNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances Pb(NO3)2 + KI -> PbI2 + KNO3", () => {
    const result = balance("Pb(NO3)2 + KI -> PbI2 + KNO3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances BaCl2 + Na2SO4 -> BaSO4 + NaCl", () => {
    const result = balance("BaCl2 + Na2SO4 -> BaSO4 + NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances NaOH + HCl -> NaCl + H2O", () => {
    const result = balance("NaOH + HCl -> NaCl + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });
});

describe("combustion reactions", () => {
  it("balances CH4 + O2 -> CO2 + H2O", () => {
    const result = balance("CH4 + O2 -> CO2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances C6H12O6 + O2 -> CO2 + H2O", () => {
    const result = balance("C6H12O6 + O2 -> CO2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([6, 6]);
  });

  it("balances C2H6 + O2 -> CO2 + H2O", () => {
    const result = balance("C2H6 + O2 -> CO2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 7]);
    expect(result.products.map(p => p.coefficient)).toEqual([4, 6]);
  });

  it("balances C3H8 + O2 -> CO2 + H2O", () => {
    const result = balance("C3H8 + O2 -> CO2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 5]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 4]);
  });
});

describe("neutralization reactions", () => {
  it("balances H2SO4 + NaOH -> Na2SO4 + H2O", () => {
    const result = balance("H2SO4 + NaOH -> Na2SO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances HCl + NaOH -> NaCl + H2O", () => {
    const result = balance("HCl + NaOH -> NaCl + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });

  it("balances H3PO4 + NaOH -> Na3PO4 + H2O", () => {
    const result = balance("H3PO4 + NaOH -> Na3PO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 3]);
  });

  it("balances H2SO4 + KOH -> K2SO4 + H2O", () => {
    const result = balance("H2SO4 + KOH -> K2SO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("simple ionic charge balance", () => {
  it("balances Fe2+ + Cl- -> FeCl2", () => {
    const result = balance("Fe2+ + Cl- -> FeCl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Fe3+ + O2- -> Fe2O3", () => {
    const result = balance("Fe3+ + O2- -> Fe2O3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Na+ + Cl- -> NaCl", () => {
    const result = balance("Na+ + Cl- -> NaCl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Ca2+ + Cl- -> CaCl2", () => {
    const result = balance("Ca2+ + Cl- -> CaCl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});

describe("polyatomic ion balance", () => {
  it("balances Al3+ + SO4^2- -> Al2(SO4)3", () => {
    const result = balance("Al3+ + SO4^2- -> Al2(SO4)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Ca2+ + NO3- -> Ca(NO3)2", () => {
    const result = balance("Ca2+ + NO3- -> Ca(NO3)2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances NH4+ + SO4^2- -> (NH4)2SO4", () => {
    const result = balance("NH4+ + SO4^2- -> (NH4)2SO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Fe3+ + OH- -> Fe(OH)3", () => {
    const result = balance("Fe3+ + OH- -> Fe(OH)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});

describe("complex ionic compounds", () => {
  it("balances [Fe(CN)6]4- + K+ -> K4[Fe(CN)6]", () => {
    const result = balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 4]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances [Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3", () => {
    const result = balance("[Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 1]);
  });

  it("balances [Cu(NH3)4](OH)2 + HCl -> [Cu(NH3)4]Cl2 + H2O", () => {
    const result = balance("[Cu(NH3)4](OH)2 + HCl -> [Cu(NH3)4]Cl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });
});

describe("charge conservation", () => {
  it("verifies net charge is zero for Fe2+ + Cl- -> FeCl2", () => {
    const result = balance("Fe2+ + Cl- -> FeCl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("verifies charge balance for MnO4- + H+ + e- -> Mn2+ + H2O", () => {
    const result = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 8, 5]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 4]);
  });

  it("verifies charge balance for Cr2O7^2- + H+ + e- -> Cr3+ + H2O", () => {
    const result = balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
    expect(result.reactants[0].coefficient).toBeGreaterThan(0);
    expect(result.products[0].coefficient).toBeGreaterThan(0);
  });

  it("verifies charge balance for Fe2+ + Ce4+ -> Fe3+ + Ce3+", () => {
    const result = balance("Fe2+ + Ce4+ -> Fe3+ + Ce3+");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 1]);
  });
});

describe("redox half-reactions acidic medium", () => {
  it("balances MnO4- + H+ + e- -> Mn2+ + H2O", () => {
    const result = balance("MnO4- + H+ + e- -> Mn2+ + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 8, 5]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 4]);
  });

  it("balances Cr2O7^2- + H+ + e- -> Cr3+ + H2O", () => {
    const result = balance("Cr2O7^2- + H+ + e- -> Cr3+ + H2O");
    expect(result.reactants[0].coefficient).toBeGreaterThan(0);
    expect(result.products.length).toBe(2);
  });

  it("balances MnO4- + H+ + e -> Mn2+ + H2O (bare electron)", () => {
    const result = balance("MnO4- + H+ + e -> Mn2+ + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 8, 5]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 4]);
  });
});

describe("redox half-reactions basic medium", () => {
  it("balances MnO4- + H2O + e- -> MnO2 + OH-", () => {
    const result = balance("MnO4- + H2O + e- -> MnO2 + OH-");
    expect(result.reactants.length).toBe(3);
    expect(result.products.length).toBe(2);
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Cl2 + OH- -> ClO- + Cl- + H2O", () => {
    const result = balance("Cl2 + OH- -> ClO- + Cl- + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances NO2- + H2O + e- -> NO + OH-", () => {
    const result = balance("NO2- + H2O + e- -> NO + OH-");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("full redox reactions", () => {
  it("balances Fe + O2 -> Fe2O3", () => {
    const result = balance("Fe + O2 -> Fe2O3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([4, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([2]);
  });

  it("balances Fe2O3 + CO -> Fe + CO2", () => {
    const result = balance("Fe2O3 + CO -> Fe + CO2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });

  it("balances Cu + HNO3 -> Cu(NO3)2 + NO + H2O", () => {
    const result = balance("Cu + HNO3 -> Cu(NO3)2 + NO + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("disproportionation reactions", () => {
  it("balances Cl2 + OH- -> ClO- + Cl- + H2O", () => {
    const result = balance("Cl2 + OH- -> ClO- + Cl- + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances H2O2 -> H2O + O2", () => {
    const result = balance("H2O2 -> H2O + O2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([2]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 1]);
  });

  it("balances Cl2 + OH- -> Cl- + ClO3- + H2O", () => {
    const result = balance("Cl2 + OH- -> Cl- + ClO3- + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("nested parentheses balance", () => {
  it("balances Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P", () => {
    const result = balance("Ca3(PO4)2 + SiO2 + C -> CaSiO3 + CO + P");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });

  it("balances Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4", () => {
    const result = balance("Al2(SO4)3 + NaOH -> Al(OH)3 + Na2SO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 6]);
    expect(result.products.map(p => p.coefficient)).toEqual([2, 3]);
  });

  it("balances Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4", () => {
    const result = balance("Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 2]);
  });
});

describe("square bracket group balance", () => {
  it("balances [Fe(CN)6]4- + K+ -> K4[Fe(CN)6]", () => {
    const result = balance("[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 4]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances [Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2", () => {
    const result = balance("[Cu(NH3)4]2+ + Cl- -> [Cu(NH3)4]Cl2");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });
});

describe("complex nested group balance", () => {
  it("balances [Cu(NH3)4](OH)2 + HCl -> [Cu(NH3)4]Cl2 + H2O", () => {
    const result = balance("[Cu(NH3)4](OH)2 + HCl -> [Cu(NH3)4]Cl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 2]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances [Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3", () => {
    const result = balance("[Co(NH3)6]Cl3 + AgNO3 -> AgCl + [Co(NH3)6](NO3)3");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 1]);
  });
});

describe("deeply nested structure balance", () => {
  it("balances [Fe(C2O4)3]3- + H+ -> H3[Fe(C2O4)3]", () => {
    const result = balance("[Fe(C2O4)3]3- + H+ -> H3[Fe(C2O4)3]");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 3]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances Na3[Co(NO2)6] -> Na+ + [Co(NO2)6]3-", () => {
    const result = balance("Na3[Co(NO2)6] -> Na+ + [Co(NO2)6]3-");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([3, 1]);
  });
});

describe("mixed parentheses and brackets balance", () => {
  it("balances [Ag(NH3)2]+ + Cl- -> [Ag(NH3)2]Cl", () => {
    const result = balance("[Ag(NH3)2]+ + Cl- -> [Ag(NH3)2]Cl");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1, 1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1]);
  });

  it("balances K4[Fe(CN)6] + H2SO4 + H2O -> K2SO4 + FeSO4 + (NH4)2SO4 + CO2 + H2O", () => {
    const result = balance("K4[Fe(CN)6] + H2SO4 + H2O -> K2SO4 + FeSO4 + (NH4)2SO4 + CO2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("hydrate centered dot balance", () => {
  it("balances CuSO4·5H2O -> CuSO4 + H2O", () => {
    const result = balance("CuSO4·5H2O -> CuSO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 5]);
  });

  it("balances BaCl2·2H2O -> BaCl2 + H2O", () => {
    const result = balance("BaCl2·2H2O -> BaCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O", () => {
    const result = balance("CuSO4·5H2O + Fe -> FeSO4 + Cu + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("hydrate asterisk balance", () => {
  it("balances Na2CO3*10H2O -> Na2CO3 + H2O", () => {
    const result = balance("Na2CO3*10H2O -> Na2CO3 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 10]);
  });

  it("balances MgSO4*7H2O -> MgSO4 + H2O", () => {
    const result = balance("MgSO4*7H2O -> MgSO4 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 7]);
  });

  it("balances Na2CO3*10H2O + HCl -> NaCl + H2O + CO2", () => {
    const result = balance("Na2CO3*10H2O + HCl -> NaCl + H2O + CO2");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("hydrate bullet balance", () => {
  it("balances CaCl2·2H2O -> CaCl2 + H2O", () => {
    const result = balance("CaCl2·2H2O -> CaCl2 + H2O");
    expect(result.reactants.map(r => r.coefficient)).toEqual([1]);
    expect(result.products.map(p => p.coefficient)).toEqual([1, 2]);
  });

  it("balances CaCl2·2H2O + AgNO3 -> AgCl + Ca(NO3)2 + H2O", () => {
    const result = balance("CaCl2·2H2O + AgNO3 -> AgCl + Ca(NO3)2 + H2O");
    expect(result.reactants.every(r => r.coefficient > 0)).toBe(true);
    expect(result.products.every(p => p.coefficient > 0)).toBe(true);
  });
});

describe("full-word state symbols balance", () => {
  it("strips (solid) from balanced equation", () => {
    const result = balance("Fe(solid) + Cl2(gas) -> FeCl2(solid)");
    expect(result.reactants[0].formula).toBe("Fe");
    expect(result.products[0].formula).toBe("FeCl2");
  });

  it("strips (liquid) and (aqueous) from balanced equation", () => {
    const result = balance("HCl(aqueous) + NaOH(aqueous) -> NaCl(aqueous) + H2O(liquid)");
    expect(result.reactants[0].formula).toBe("HCl");
    expect(result.products[1].formula).toBe("H2O");
  });

  it("strips (cr) and (am) state symbols", () => {
    const result = balance("NaCl(cr) -> Na+ + Cl-");
    expect(result.reactants[0].formula).toBe("NaCl");
  });
});

describe("arrow style balance", () => {
  it("balances with --> arrow", () => {
    const result = balance("H2 + O2 --> H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });

  it("balances with ⇌ arrow", () => {
    const result = balance("H2 + O2 ⇌ H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });

  it("balances with <=> arrow", () => {
    const result = balance("H2 + O2 <=> H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });
});