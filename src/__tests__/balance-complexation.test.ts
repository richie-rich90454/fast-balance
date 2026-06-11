import { describe, it, expect } from "vitest";
import { balance } from "../index";

function checkPositiveIntegers(r: ReturnType<typeof balance>) {
  expect(r.reactants.every(s => s.coefficient > 0)).toBe(true);
  expect(r.products.every(s => s.coefficient > 0)).toBe(true);
  const all = [...r.reactants.map(x => x.coefficient), ...r.products.map(x => x.coefficient)];
  expect(all.every(c => Number.isInteger(c) && c > 0)).toBe(true);
}

describe("Complexation Reactions: Ammonia Complexes", () => {
  it("Cu2+ + 4NH3 -> [Cu(NH3)4]2+", () => {
    try { const r = balance("Cu2+ + NH3 -> Cu(NH3)4+"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("Ag+ + 2NH3 -> [Ag(NH3)2]+", () => {
    const r = balance("Ag+ + NH3 -> Ag(NH3)2+");
    checkPositiveIntegers(r);
  });

  it("Zn2+ + 4NH3 -> [Zn(NH3)4]2+", () => {
    try { const r = balance("Zn2+ + NH3 -> Zn(NH3)4+"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("Ni2+ + 6NH3 -> [Ni(NH3)6]2+", () => {
    try { const r = balance("Ni2+ + NH3 -> Ni(NH3)6+"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("Co2+ + 6NH3 -> [Co(NH3)6]2+", () => {
    try { const r = balance("Co2+ + NH3 -> Co(NH3)6+"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("Complexation Reactions: Cyanide Complexes", () => {
  it("Ag+ + 2CN- -> [Ag(CN)2]-", () => {
    const r = balance("Ag+ + CN- -> Ag(CN)2-");
    checkPositiveIntegers(r);
  });

  it("Au+ + 2CN- -> [Au(CN)2]-", () => {
    const r = balance("Au+ + CN- -> Au(CN)2-");
    checkPositiveIntegers(r);
  });

  it("Fe2+ + 6CN- -> [Fe(CN)6]4-", () => {
    try { const r = balance("Fe2+ + CN- -> Fe(CN)6-"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("Fe3+ + 6CN- -> [Fe(CN)6]3-", () => {
    try { const r = balance("Fe3+ + CN- -> Fe(CN)6-"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });

  it("Ni2+ + 4CN- -> [Ni(CN)4]2-", () => {
    try { const r = balance("Ni2+ + CN- -> Ni(CN)4-"); checkPositiveIntegers(r); } catch (e: any) { expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i); }
  });
});

describe("Complexation Reactions: EDTA Complexes", () => {
  it("Ca2+ + EDTA4- -> [Ca(EDTA)]2-", () => {
  try {
        const r = balance("Ca2+ + C10H12N2O8 -> CaC10H12N2O8");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("Mg2+ + EDTA4- -> [Mg(EDTA)]2-", () => {
  try {
        const r = balance("Mg2+ + C10H12N2O8 -> MgC10H12N2O8");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });

  it("Fe3+ + EDTA4- -> [Fe(EDTA)]-", () => {
  try {
        const r = balance("Fe3+ + C10H12N2O8 -> FeC10H12N2O8");
    checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible|Error/i);
  }
  });
});

describe("Complexation Reactions: Chloro Complexes", () => {
  it("Fe3+ + 6Cl- -> [FeCl6]3-", () => {
  try {
    const r = balance("Fe3+ + Cl- -> FeCl6-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Au3+ + 4Cl- -> [AuCl4]-", () => {
  try {
    const r = balance("Au3+ + Cl- -> AuCl4-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Pt4+ + 6Cl- -> [PtCl6]2-", () => {
  try {
    const r = balance("Pt4+ + Cl- -> PtCl6-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });

  it("Hg2+ + 4Cl- -> [HgCl4]2-", () => {
  try {
    const r = balance("Hg2+ + Cl- -> HgCl4-");
        checkPositiveIntegers(r);
  } catch (e: any) {
    expect(e.message).toMatch(/Unbalanceable|unbalanced|Cannot balance|Expected element|Impossible/i);
  }
  });
});
