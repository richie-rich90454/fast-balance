import { describe, it, expect } from "vitest";
import { Fraction } from "../index";

describe("large number arithmetic", () => {
  it("997/991 stays as-is (both prime)", () => {
    const f = new Fraction(997, 991);
    expect(f.num).toBe(997);
    expect(f.den).toBe(991);
  });
  it("999999/999997 reduces by GCD=1 (near-million primes)", () => {
    const f = new Fraction(999999, 999997);
    expect(f.den).toBeGreaterThan(0);
  });
  it("intermediate: (1000/3) + (2000/7) = 13000/21", () => {
    const a = new Fraction(1000, 3);
    const b = new Fraction(2000, 7);
    const r = a.add(b);
    expect(r.num).toBe(13000);
    expect(r.den).toBe(21);
  });
  it("intermediate: (10000/13) - (5000/17) = 105000/221", () => {
    const a = new Fraction(10000, 13);
    const b = new Fraction(5000, 17);
    const r = a.sub(b);
    expect(r.num).toBe(105000);
    expect(r.den).toBe(221);
  });
  it("intermediate: (1000/7) * (999/11) = 999000/77", () => {
    const a = new Fraction(1000, 7);
    const b = new Fraction(999, 11);
    const r = a.mul(b);
    expect(r.num).toBe(999000);
    expect(r.den).toBe(77);
  });
  it("intermediate: (10000/3) / (2000/9) = 15", () => {
    const a = new Fraction(10000, 3);
    const b = new Fraction(2000, 9);
    const r = a.div(b);
    expect(r.num).toBe(15);
    expect(r.den).toBe(1);
  });
  it("large add: (999999/1) + (1/999999) = (999998000002)/999999", () => {
    const a = new Fraction(999999, 1);
    const b = new Fraction(1, 999999);
    const r = a.add(b);
    expect(r.den).toBe(999999);
  });
  it("large sub: (1000000/1) - (1/1000000) = (999999999999)/1000000", () => {
    const a = new Fraction(1000000, 1);
    const b = new Fraction(1, 1000000);
    const r = a.sub(b);
    expect(r.num).toBe(999999999999);
    expect(r.den).toBe(1000000);
  });
});

describe("prime denominator behavior", () => {
  it("1/97 + 1/101 = 198/9797", () => {
    const a = new Fraction(1, 97);
    const b = new Fraction(1, 101);
    const r = a.add(b);
    expect(r.num).toBe(198);
    expect(r.den).toBe(9797);
  });
  it("1/2 + 1/3 + 1/5 + 1/7 + 1/11 = (1155+770+462+330+210)/2310 = 2927/2310", () => {
    const r = new Fraction(1, 2).add(new Fraction(1, 3)).add(new Fraction(1, 5)).add(new Fraction(1, 7)).add(new Fraction(1, 11));
    expect(r.num).toBe(2927);
    expect(r.den).toBe(2310);
  });
  it("1/13 - 1/17 = 4/221", () => {
    const a = new Fraction(1, 13);
    const b = new Fraction(1, 17);
    const r = a.sub(b);
    expect(r.num).toBe(4);
    expect(r.den).toBe(221);
  });
  it("product of primes in denominators: (1/2)*(1/3)*(1/5)*(1/7) = 1/210", () => {
    const r = new Fraction(1, 2).mul(new Fraction(1, 3)).mul(new Fraction(1, 5)).mul(new Fraction(1, 7));
    expect(r.num).toBe(1);
    expect(r.den).toBe(210);
  });
  it("1/89 * 89 = 1", () => {
    const a = new Fraction(1, 89);
    const b = new Fraction(89, 1);
    const r = a.mul(b);
    expect(r.num).toBe(1);
    expect(r.den).toBe(1);
  });
  it("prime 97 stays: 97/1 * 1/97 = 1", () => {
    const r = new Fraction(97, 1).mul(new Fraction(1, 97));
    expect(r.num).toBe(1);
    expect(r.den).toBe(1);
  });
});

describe("chained operations (5+ fractions)", () => {
  it("1+1/2+1/3+1/4+1/5+1/6 = 147/60 = 49/20", () => {
    const r = Fraction.one().add(new Fraction(1, 2)).add(new Fraction(1, 3)).add(new Fraction(1, 4)).add(new Fraction(1, 5)).add(new Fraction(1, 6));
    expect(r.num).toBe(49);
    expect(r.den).toBe(20);
  });
  it("(1/2)*(2/3)*(3/4)*(4/5)*(5/6) = 1/6", () => {
    const r = new Fraction(1, 2).mul(new Fraction(2, 3)).mul(new Fraction(3, 4)).mul(new Fraction(4, 5)).mul(new Fraction(5, 6));
    expect(r.num).toBe(1);
    expect(r.den).toBe(6);
  });
  it("alternating: 1 - 1/2 + 1/3 - 1/4 + 1/5 - 1/6 = 37/60", () => {
    const r = Fraction.one().sub(new Fraction(1, 2)).add(new Fraction(1, 3)).sub(new Fraction(1, 4)).add(new Fraction(1, 5)).sub(new Fraction(1, 6));
    expect(r.num).toBe(37);
    expect(r.den).toBe(60);
  });
  it("nested: ((1/2+1/3)*(1/4+1/5))/(1/6+1/7) = (5/6*9/20)/(13/42) = (3/8)/(13/42) = 63/52", () => {
    const num = new Fraction(1, 2).add(new Fraction(1, 3)).mul(new Fraction(1, 4).add(new Fraction(1, 5)));
    const den = new Fraction(1, 6).add(new Fraction(1, 7));
    const r = num.div(den);
    expect(r.num).toBe(63);
    expect(r.den).toBe(52);
  });
  it("6-fraction sum: 1/2+1/4+1/8+1/16+1/32+1/64 = 63/64", () => {
    const r = new Fraction(1, 2).add(new Fraction(1, 4)).add(new Fraction(1, 8)).add(new Fraction(1, 16)).add(new Fraction(1, 32)).add(new Fraction(1, 64));
    expect(r.num).toBe(63);
    expect(r.den).toBe(64);
  });
  it("7-fraction product with negatives: (-1/2)*(1/3)*(-1/4)*(1/5)*(-1/6)*(1/7)*(-1/8) = 1/40320", () => {
    const r = new Fraction(-1, 2).mul(new Fraction(1, 3)).mul(new Fraction(-1, 4)).mul(new Fraction(1, 5)).mul(new Fraction(-1, 6)).mul(new Fraction(1, 7)).mul(new Fraction(-1, 8));
    expect(r.num).toBe(1);
    expect(r.den).toBe(40320);
  });
  it("cumulative: 1*2*3*4*5/(2*3*4*5*6) = 1/6", () => {
    const num = Fraction.one().mul(new Fraction(2)).mul(new Fraction(3)).mul(new Fraction(4)).mul(new Fraction(5));
    const den = new Fraction(2).mul(new Fraction(3)).mul(new Fraction(4)).mul(new Fraction(5)).mul(new Fraction(6));
    const r = num.div(den);
    expect(r.num).toBe(1);
    expect(r.den).toBe(6);
  });
  it("chain: 3/4+5/6+7/8+9/10+11/12 = 513/120 = 171/40", () => {
    const r = new Fraction(3, 4).add(new Fraction(5, 6)).add(new Fraction(7, 8)).add(new Fraction(9, 10)).add(new Fraction(11, 12));
    expect(r.num).toBe(171);
    expect(r.den).toBe(40);
  });
});

describe("associativity with large numbers", () => {
  it("(a+b)+c == a+(b+c): 100/7, 200/11, 300/13", () => {
    const a = new Fraction(100, 7);
    const b = new Fraction(200, 11);
    const c = new Fraction(300, 13);
    const left = a.add(b).add(c);
    const right = a.add(b.add(c));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
  it("(a*b)*c == a*(b*c): 17/19, 23/29, 31/37", () => {
    const a = new Fraction(17, 19);
    const b = new Fraction(23, 29);
    const c = new Fraction(31, 37);
    const left = a.mul(b).mul(c);
    const right = a.mul(b.mul(c));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
  it("(a+b)+c+d == a+(b+(c+d)): 5/6, 7/8, 9/10, 11/12", () => {
    const a = new Fraction(5, 6);
    const b = new Fraction(7, 8);
    const c = new Fraction(9, 10);
    const d = new Fraction(11, 12);
    const left = a.add(b).add(c).add(d);
    const right = a.add(b.add(c.add(d)));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
  it("(a-b)-c vs a-(b+c): 100/3, 50/7, 25/11", () => {
    const a = new Fraction(100, 3);
    const b = new Fraction(50, 7);
    const c = new Fraction(25, 11);
    const left = a.sub(b).sub(c);
    const right = a.sub(b.add(c));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
});

describe("negative fraction chains", () => {
  it("-1/2 + -1/3 + -1/4 = -13/12", () => {
    const r = new Fraction(-1, 2).add(new Fraction(-1, 3)).add(new Fraction(-1, 4));
    expect(r.num).toBe(-13);
    expect(r.den).toBe(12);
  });
  it("negation chain: -(-(-1/2)) = -1/2", () => {
    const r = new Fraction(1, 2).neg().neg().neg();
    expect(r.num).toBe(-1);
    expect(r.den).toBe(2);
  });
  it("(-2/3) * (-3/4) * (-4/5) = -2/5", () => {
    const r = new Fraction(-2, 3).mul(new Fraction(-3, 4)).mul(new Fraction(-4, 5));
    expect(r.num).toBe(-2);
    expect(r.den).toBe(5);
  });
  it("(-1/2) / (-1/3) / (-1/4) = -6", () => {
    const r = new Fraction(-1, 2).div(new Fraction(-1, 3)).div(new Fraction(-1, 4));
    expect(r.num).toBe(-6);
    expect(r.den).toBe(1);
  });
  it("(-5/6) + (7/8) + (-9/10) = -103/120", () => {
    const r = new Fraction(-5, 6).add(new Fraction(7, 8)).add(new Fraction(-9, 10));
    expect(r.num).toBe(-103);
    expect(r.den).toBe(120);
  });
  it("(-100/3) * (3/100) = -1", () => {
    const r = new Fraction(-100, 3).mul(new Fraction(3, 100));
    expect(r.num).toBe(-1);
    expect(r.den).toBe(1);
  });
  it("(-a).neg() == a", () => {
    const a = new Fraction(47, 53);
    const b = a.neg().neg();
    expect(b.num).toBe(a.num);
    expect(b.den).toBe(a.den);
  });
  it("chain: 1 - 2 + 3 - 4 + 5 - 6 + 7 - 8 + 9 = 5", () => {
    const r = Fraction.one().sub(new Fraction(2)).add(new Fraction(3)).sub(new Fraction(4)).add(new Fraction(5)).sub(new Fraction(6)).add(new Fraction(7)).sub(new Fraction(8)).add(new Fraction(9));
    expect(r.num).toBe(5);
    expect(r.den).toBe(1);
  });
});

describe("identity and inverse edge cases", () => {
  it("x + (-x) = 0: 123/456", () => {
    const a = new Fraction(123, 456);
    const r = a.add(a.neg());
    expect(r.isZero()).toBe(true);
  });
  it("x * (1/x) = 1: 789/1011", () => {
    const a = new Fraction(789, 1011);
    const r = a.mul(new Fraction(a.den, a.num));
    expect(r.num).toBe(1);
    expect(r.den).toBe(1);
  });
  it("0 + x = x: large fraction", () => {
    const a = new Fraction(99999, 100001);
    const r = Fraction.zero().add(a);
    expect(r.num).toBe(a.num);
    expect(r.den).toBe(a.den);
  });
  it("0 * x = 0: any fraction", () => {
    const a = new Fraction(12345, 67890);
    const r = Fraction.zero().mul(a);
    expect(r.isZero()).toBe(true);
  });
  it("x * 0 = 0", () => {
    const a = new Fraction(54321, 98765);
    const r = a.mul(Fraction.zero());
    expect(r.isZero()).toBe(true);
  });
  it("1 * x = x", () => {
    const a = new Fraction(333, 444);
    const r = Fraction.one().mul(a);
    expect(r.num).toBe(a.num);
    expect(r.den).toBe(a.den);
  });
  it("x / 1 = x", () => {
    const a = new Fraction(555, 666);
    const r = a.div(Fraction.one());
    expect(r.num).toBe(a.num);
    expect(r.den).toBe(a.den);
  });
  it("x - x = 0", () => {
    const a = new Fraction(7777, 8888);
    const r = a.sub(a);
    expect(r.isZero()).toBe(true);
  });
  it("x / x = 1", () => {
    const a = new Fraction(999, 1111);
    const r = a.div(a);
    expect(r.num).toBe(1);
    expect(r.den).toBe(1);
  });
});

describe("distribution and commutativity", () => {
  it("a*(b+c) = a*b + a*c: 7/11, 3/5, 2/7", () => {
    const a = new Fraction(7, 11);
    const b = new Fraction(3, 5);
    const c = new Fraction(2, 7);
    const left = a.mul(b.add(c));
    const right = a.mul(b).add(a.mul(c));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
  it("a+b = b+a: 123/456, 789/1011", () => {
    const a = new Fraction(123, 456);
    const b = new Fraction(789, 1011);
    expect(a.add(b).num).toBe(b.add(a).num);
    expect(a.add(b).den).toBe(b.add(a).den);
  });
  it("a*b = b*a: 17/23, 31/37", () => {
    const a = new Fraction(17, 23);
    const b = new Fraction(31, 37);
    expect(a.mul(b).num).toBe(b.mul(a).num);
    expect(a.mul(b).den).toBe(b.mul(a).den);
  });
  it("a*(b-c) = a*b - a*c: 5/7, 3/11, 2/13", () => {
    const a = new Fraction(5, 7);
    const b = new Fraction(3, 11);
    const c = new Fraction(2, 13);
    const left = a.mul(b.sub(c));
    const right = a.mul(b).sub(a.mul(c));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
  it("(a+b)*(c+d) = ac+ad+bc+bd", () => {
    const a = new Fraction(1, 2);
    const b = new Fraction(1, 3);
    const c = new Fraction(1, 5);
    const d = new Fraction(1, 7);
    const left = a.add(b).mul(c.add(d));
    const right = a.mul(c).add(a.mul(d)).add(b.mul(c)).add(b.mul(d));
    expect(left.num).toBe(right.num);
    expect(left.den).toBe(right.den);
  });
});
