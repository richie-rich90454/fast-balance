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

describe("basic state symbol stripping", () => {
  it("strips (s) from balanced equation", () => {
    const result = balance("H2(g) + O2(g) -> H2O(l)");
    expect(result.reactants[0].formula).toBe("H2");
    expect(result.reactants[1].formula).toBe("O2");
    expect(result.products[0].formula).toBe("H2O");
  });

  it("strips (aq) from balanced equation", () => {
    const result = balance("NaOH(aq) + HCl(aq) -> NaCl(aq) + H2O(l)");
    expect(result.reactants[0].formula).toBe("NaOH");
    expect(result.products[0].formula).toBe("NaCl");
  });

  it("strips (g) and (l) from balanced equation", () => {
    const result = balance("N2(g) + H2(g) -> NH3(g)");
    expect(result.reactants[0].formula).toBe("N2");
    expect(result.products[0].formula).toBe("NH3");
  });
});

describe("full-word state symbols", () => {
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

  it("strips (gas) from balanced equation", () => {
    const result = balance("CH4(gas) + O2(gas) -> CO2(gas) + H2O(liquid)");
    expect(result.reactants[0].formula).toBe("CH4");
    expect(result.products[0].formula).toBe("CO2");
  });
});

describe("state symbol edge cases", () => {
  it("strips (cr) crystalline state symbol", () => {
    const result = balance("NaCl(cr) -> Na+ + Cl-");
    expect(result.reactants[0].formula).toBe("NaCl");
  });

  it("strips (am) amorphous state symbol", () => {
    const result = balance("SiO2(am) + NaOH -> Na2SiO3 + H2O");
    expect(result.reactants[0].formula).toBe("SiO2");
  });

  it("strips multiple state symbols from same term", () => {
    const result = balance("H2O(s)(l) -> H2O");
    expect(result.reactants[0].formula).toBe("H2O");
  });
});

describe("ASCII arrow styles", () => {
  it("balances with -> arrow", () => {
    const result = balance("H2 + O2 -> H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });

  it("balances with --> arrow", () => {
    const result = balance("H2 + O2 --> H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });

  it("balances with = arrow", () => {
    const result = balance("H2 + O2 = H2O");
    expect(result.reactants).toHaveLength(2);
    expect(result.products).toHaveLength(1);
  });
});
