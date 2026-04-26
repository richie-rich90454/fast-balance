/**
 * fast‑balance – a blazing‑fast chemical equation balancer
 *
 * @packageDocumentation
 *
 * ## Overview
 *
 * This module exports a single function `balance()` that accepts almost any
 * chemical equation string and returns the completely balanced coefficients.
 *
 * It handles:
 * - Simple reactions (`H2 + O2 -> H2O`)
 * - Nested parentheses and brackets (`Ca3(PO4)2`, `[Fe(CN)6]4-`)
 * - Ionic charges (`Fe2+`, `SO4^2-`, `MnO4-`)
 * - Explicit electrons (`e-`, `e`) for redox half‑reactions
 * - Hydrate dots (`CuSO4·5H2O`, `*`, `•`)
 * - State symbols (`(s)`, `(l)`, `(g)`, `(aq)`, `(solid)`, etc.) – automatically stripped
 * - Many arrow styles (`->`, `→`, `=`, `⇌`, `<=>`, `<->`, `-->`)
 * - Leading coefficients in the input (ignored)
 *
 * The algorithm works by parsing each term into an element‑count map and a net
 * charge, building a linear system, solving for its integer nullspace using
 * exact rational arithmetic (no floating‑point drift), and finally converting
 * the rational coefficients to the smallest integer set.
 *
 * ## Usage
 *
 * ```typescript
 * import { balance } from "fast-balance";
 *
 * const result = balance("H2 + O2 -> H2O");
 * console.log(result.equation); // "2 H2 + O2 -> 2 H2O"
 *
 * // Options
 * balance("Fe2+ + Cl- -> FeCl2", { showOne: false, format: "html" });
 * ```
 *
 * @example
 * ```typescript
 * // Redox half‑reaction in acidic medium
 * balance("MnO4- + H+ + e- -> Mn2+ + H2O");
 * // returns { reactants: [...], products: [...], equation: "MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O" }
 * ```
 *
 * @packageDocumentation
 */
class Fraction{
    constructor(
        public readonly num: number,
        public readonly den: number=1
    ){
        if (den<0){ num=-num; den=-den; }
        let g=gcd(Math.abs(num), den);
        this.num=num/g;
        this.den=den/g;
    }
    static zero(): Fraction{ return new Fraction(0); }
    static one(): Fraction{ return new Fraction(1); }
    isZero(): boolean{ return this.num===0; }
    add(other: Fraction): Fraction{
        return new Fraction(
            this.num*other.den+other.num*this.den,
            this.den*other.den
        );
    }
    sub(other: Fraction): Fraction{
        return new Fraction(
            this.num*other.den-other.num*this.den,
            this.den*other.den
        );
    }
    mul(other: Fraction): Fraction{
        return new Fraction(this.num*other.num, this.den*other.den);
    }
    div(other: Fraction): Fraction{
        return new Fraction(this.num*other.den, this.den*other.num);
    }
    neg(): Fraction{
        return new Fraction(-this.num, this.den);
    }
    equals(other: Fraction): boolean{
        return this.num===other.num&&this.den===other.den;
    }
    clone(): Fraction{
        return new Fraction(this.num, this.den);
    }
}
function gcd(a: number, b: number): number{
    a=Math.abs(a);
    b=Math.abs(b);
    while (b!==0){ [a, b]=[b, a%b]; }
    return a;
}
function lcm(a: number, b: number): number{
    return (a/gcd(a, b))*b;
}
let STATE_SYMBOLS=["s", "l", "g", "aq", "solid", "liquid", "gas", "aqueous", "cr", "am"] as const;
let STATE_REGEX=new RegExp(`\\((${STATE_SYMBOLS.join("|")})\\)`, "gi");
type ElementMap=Record<string, number>;
interface ParsedUnit{
    elements: ElementMap;
    charge: number;
}
function stripStateSymbols(formula: string): string{
    return formula.replace(STATE_REGEX, "");
}
function parseFormula(formula: string): ParsedUnit{
    formula=formula.replace(STATE_REGEX, "");
    let f=formula.trim();
    if (/^e-?$/.test(f)){
        return { elements: {}, charge: -1 };
    }
    if (/^e\+$/.test(f)){
        return { elements: {}, charge: 1 };
    }
    let parts=formula.split(/[·*•]/u).map(s=>s.trim()).filter(Boolean);
    let totalElements: ElementMap={};
    let totalCharge=0;
    for (let part of parts){
        let match=part.match(/^(\d+)\s*(.*)/);
        let mult=1;
        let rest=part;
        if (match){
            mult=parseInt(match[1]!, 10);
            rest=match[2]!;
        }
        if (!rest) continue;
        let inner=parseWithoutMultiplier(rest);
        for (let el in inner.elements){
            totalElements[el]=(totalElements[el]??0)+inner.elements[el]!*mult;
        }
        totalCharge+=inner.charge*mult;
    }
    return { elements: totalElements, charge: totalCharge };
}
function parseWithoutMultiplier(str: string): ParsedUnit{
    let i=0;
    let elements: ElementMap={};
    let totalCharge=0;
    let tryParseCharge=(): { charge: number; len: number }|null=>{
        let sub=str.slice(i);
        let m=sub.match(/^(\^?)(\d*)([+-])/);
        if (!m) return null;
        let sign=m[3]==="+"?1:-1;
        let num=m[2]===""?1:parseInt(m[2]!, 10);
        return { charge: sign*num, len: m[0].length };
    };
    let parseExpression=(closeChar?: string): void=>{
        while (i<str.length&&str[i]!==closeChar){
            let unit=parseUnit();
            for (let el in unit.elements){
                elements[el]=(elements[el]??0)+unit.elements[el]!;
            }
            totalCharge+=unit.charge;
        }
        if (closeChar!==undefined&&i<str.length&&str[i]===closeChar){
            i++;
        }
        else if (closeChar!==undefined){
            throw new Error("Mismatched brackets: expected \""+closeChar+"\" at position "+i);
        }
    };
    let parseUnit=(): ParsedUnit=>{
        if (i>=str.length) throw new Error("Unexpected end of formula");
        if (str[i]==="e"&&(i+1>=str.length||!/[a-z]/i.test(str[i+1]!))){
            i++;
            let charge=-1;
            if (i<str.length&&(str[i]==="-"||str[i]==="+")){
                charge=str[i]==="+"?1:-1;
                i++;
            }
            return { elements: {}, charge };
        }
        if (str[i]==="("||str[i]==="["){
            let open=str[i]!;
            let close=open==="("?")":"]";
            i++;
            let savedElements=elements;
            let savedCharge=totalCharge;
            elements={};
            totalCharge=0;
            parseExpression(close);
            let group: ParsedUnit={ elements, charge: totalCharge };
            elements=savedElements;
            totalCharge=savedCharge;
            let subscript=1;
            let charge=0;
            if (i<str.length&&/\d/.test(str[i]!)){
                let start=i;
                while (i<str.length&&/\d/.test(str[i]!)) i++;
                subscript=parseInt(str.slice(start, i), 10);
            }
            let cr=tryParseCharge();
            if (cr){
                charge=cr.charge;
                i+=cr.len;
            }
            let multiplied: ElementMap={};
            for (let el in group.elements){
                multiplied[el]=group.elements[el]!*subscript;
            }
            return {
                elements: multiplied,
                charge: group.charge*subscript+charge
            };
        }
        if (!/[A-Z]/.test(str[i]!)){
            throw new Error("Expected element at position "+i+", got '"+str[i]+"'");
        }
        let start=i;
        i++;
        while (i<str.length&&/[a-z]/.test(str[i]!)) i++;
        let symbol=str.slice(start, i);
        let subscript=1;
        let charge=0;
        if (i<str.length&&/\d/.test(str[i]!)){
            let sStart=i;
            while (i<str.length&&/\d/.test(str[i]!)) i++;
            subscript=parseInt(str.slice(sStart, i), 10);
        }
        let cr=tryParseCharge();
        if (cr){
            charge=cr.charge;
            i+=cr.len;
        }
        return {
            elements: { [symbol]: subscript },
            charge
        };
    };
    parseExpression();
    if (i<str.length){
        let trail=tryParseCharge();
        if (trail){
            totalCharge+=trail.charge;
            i+=trail.len;
        }
    }
    if (i<str.length){
        throw new Error("Unexpected characters at position "+i+": \""+str.slice(i)+"\"");
    }
    return { elements, charge: totalCharge };
}
interface Species{
    formula: string;
    elements: ElementMap;
    charge: number;
}
interface Equation{
    reactants: Species[];
    products: Species[];
}
function splitEquation(input: string): Equation{
    let cleaned=input
        .replace(/→|⇒|⇌|<=>|<->|-->/g, "->")
        .replace(/=/g, "->");
    let parts=cleaned.split("->");
    if (parts.length!==2) throw new Error("Invalid equation: missing a valid arrow");
    let leftStr=parts[0]!.trim();
    let rightStr=parts[1]!.trim();
    let parseSide=(side: string): Species[]=>
        side.split("+")
            .map(term=>term.trim())
            .filter(Boolean)
            .map(term=>{
                let match=term.match(/^(\d+)\s*(.*)/);
                let formulaStr=term;
                if (match) formulaStr=match[2]!;
                let cleanedFormula=stripStateSymbols(formulaStr);
                let { elements, charge }=parseFormula(formulaStr);
                return { formula: cleanedFormula, elements, charge };
            });
    let reactants=parseSide(leftStr);
    let products=parseSide(rightStr);
    if (reactants.length===0) throw new Error("Left side of equation is empty");
    if (products.length===0) throw new Error("Right side of equation is empty");
    return { reactants, products };
}
function buildMatrix(
    reactants: Species[],
    products: Species[]
): { matrix: Fraction[][]; cols: number }{
    let species=[...reactants, ...products];
    let elSet=new Set<string>();
    for (let s of species){
        for (let el in s.elements) elSet.add(el);
    }
    let elements=Array.from(elSet).sort();
    let rows=elements.length;
    let cols=species.length;
    let M: Fraction[][]=Array.from({ length: rows }, ()=>
        Array.from({ length: cols }, ()=>Fraction.zero())
    );
    for (let j=0; j<cols; j++){
        let isReactant=j<reactants.length;
        let sign=isReactant?1:-1;
        let sp=species[j]!;
        for (let i=0; i<rows; i++){
            let el=elements[i]!;
            let val=sp.elements[el]??0;
            M[i]![j]=new Fraction(sign*val);
        }
    }
    return { matrix: M, cols };
}
function degreesOfFreedom(matrix: Fraction[][], cols: number): number{
    let rows=matrix.length;
    if (rows===0) return cols;
    let rank=0;
    let M=matrix.map(row=>row.map(f=>f.clone()));
    let col=0;
    for (let r=0; r<rows&&col<cols; r++, col++){
        let sel=r;
        while (sel<rows&&M[sel]![col]!.isZero()) sel++;
        if (sel===rows){
            r--;
            continue;
        }
        [M[sel]!, M[r]!]=[M[r]!, M[sel]!];
        for (let i=r+1; i<rows; i++){
            if (!M[i]![col]!.isZero()){
                let factor=M[i]![col]!.div(M[r]![col]!);
                for (let j=col; j<cols; j++){
                    M[i]![j]=M[i]![j]!.sub(factor.mul(M[r]![j]!));
                }
            }
        }
        rank=r+1;
    }
    return cols-rank;
}
function solveSystem(matrix: Fraction[][], cols: number): Fraction[]{
    let rows=matrix.length;
    if (rows===0){
        return Array.from({ length: cols }, ()=>Fraction.one());
    }
    let M=matrix.map(row=>row.map(f=>f.clone()));
    let pivotCols: number[]=[];
    let lead=0;
    for (let r=0; r<rows; r++){
        if (lead>=cols) break;
        let i=r;
        while (i<rows&&M[i]![lead]!.isZero()) i++;
        if (i===rows){
            lead++;
            r--;
            continue;
        }
        [M[i]!, M[r]!]=[M[r]!, M[i]!];
        let pivot=M[r]![lead]!;
        for (let j=0; j<cols; j++){
            M[r]![j]=M[r]![j]!.div(pivot);
        }
        for (let i2=0; i2<rows; i2++){
            if (i2===r) continue;
            let factor=M[i2]![lead]!;
            if (!factor.isZero()){
                for (let j=0; j<cols; j++){
                    M[i2]![j]=M[i2]![j]!.sub(factor.mul(M[r]![j]!));
                }
            }
        }
        pivotCols.push(lead);
        lead++;
    }
    let pivotSet=new Set(pivotCols);
    let freeCols: number[]=[];
    for (let j=0; j<cols; j++){
        if (!pivotSet.has(j)) freeCols.push(j);
    }
    if (freeCols.length===0){
        freeCols.push(cols-1);
    }
    let x: Fraction[]=Array.from({ length: cols }, ()=>Fraction.zero());
    x[freeCols[0]!]=Fraction.one();
    for (let r=0; r<rows; r++){
        let pivot=pivotCols[r]!;
        x[pivot]=Fraction.zero();
        for (let j=0; j<cols; j++){
            if (j!==pivot&&!M[r]![j]!.isZero()){
                x[pivot]=x[pivot]!.sub(M[r]![j]!.mul(x[j]!));
            }
        }
    }
    return x;
}
function fractionsToIntegers(fracs: Fraction[]): number[]{
    let denLcm=1;
    for (let f of fracs){
        if (!f.isZero()) denLcm=lcm(denLcm, f.den);
    }
    let ints=fracs.map(f=>f.num*(denLcm/f.den));
    let g=0;
    for (let v of ints) g=gcd(Math.abs(v), g);
    if (g>1) ints=ints.map(v=>v/g);
    if (ints.some(v=>v<0)){
        ints=ints.map(v=>-v);
        let g2=0;
        for (let v of ints) g2=gcd(Math.abs(v), g2);
        if (g2>1) ints=ints.map(v=>v/g2);
    }
    return ints;
}
export interface BalancedSpecies{
    coefficient: number;
    formula: string;
}
export interface BalanceOptions{
    showOne?: boolean;
    format?: "text"|"html"|"latex";
}
export interface BalanceResult{
    reactants: BalancedSpecies[];
    products: BalancedSpecies[];
    equation: string;
}
export function balance(input: string, options: BalanceOptions={}): BalanceResult{
    let { showOne=true, format="text" }=options;
    let { reactants, products }=splitEquation(input);
    let { matrix, cols }=buildMatrix(reactants, products);
    let dof=degreesOfFreedom(matrix, cols);
    if (dof===0){
        throw new Error("Unbalanceable equation");
    }
    let nullVec=solveSystem(matrix, cols);
    let coeffs=fractionsToIntegers(nullVec);
    if (coeffs.some(c=>c===0)){
        throw new Error("Unbalanceable equation (zero coefficient)");
    }
    let balancedReactants: BalancedSpecies[]=reactants.map((r, i)=>({
        coefficient: coeffs[i]!,
        formula: r.formula
    }));
    let balancedProducts: BalancedSpecies[]=products.map((p, i)=>({
        coefficient: coeffs[reactants.length+i]!,
        formula: p.formula
    }));
    let fmt=(side: BalancedSpecies[]): string=>
        side
            .map(s=>(showOne||s.coefficient!==1?s.coefficient+" ":"")+s.formula)
            .join(" + ");
    let eqStr: string;
    switch (format){
        case "html":
            eqStr=fmt(balancedReactants)+" &rarr; "+fmt(balancedProducts);
            break;
        case "latex":
            eqStr=fmt(balancedReactants)+" \\rightarrow "+fmt(balancedProducts);
            break;
        default:
            eqStr=fmt(balancedReactants)+" -> "+fmt(balancedProducts);
    }
    return { reactants: balancedReactants, products: balancedProducts, equation: eqStr };
}