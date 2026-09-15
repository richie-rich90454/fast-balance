/** Greatest common divisor (absolute value). `gcd(0,0)` is 0. */
export function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

/** Least common multiple. `lcm(x,0)` is 0. */
export function lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return (a / gcd(a, b)) * b;
}

/**
 * Exact rational number backed by two plain, writable own properties.
 *
 * `num` and `den` are intentionally public and mutable: callers may construct
 * a fraction and then assign to the fields (this is part of the public
 * contract). The constructor always stores the reduced form with a positive
 * denominator.
 */
export class Fraction {
    public num: number;
    public den: number;

    constructor(num: number, den: number = 1) {
        if (den < 0) {
            num = -num;
            den = -den;
        }
        const g = gcd(Math.abs(num), den);
        if (g > 1) {
            this.num = num / g;
            this.den = den / g;
        } else {
            this.num = num;
            this.den = den;
        }
    }

    static zero(): Fraction {
        return new Fraction(0);
    }

    static one(): Fraction {
        return new Fraction(1);
    }

    isZero(): boolean {
        return this.num === 0;
    }

    add(other: Fraction): Fraction {
        return new Fraction(this.num * other.den + other.num * this.den, this.den * other.den);
    }

    sub(other: Fraction): Fraction {
        return new Fraction(this.num * other.den - other.num * this.den, this.den * other.den);
    }

    mul(other: Fraction): Fraction {
        return new Fraction(this.num * other.num, this.den * other.den);
    }

    div(other: Fraction): Fraction {
        return new Fraction(this.num * other.den, this.den * other.num);
    }

    neg(): Fraction {
        return new Fraction(-this.num, this.den);
    }

    equals(other: Fraction): boolean {
        return this.num === other.num && this.den === other.den;
    }

    clone(): Fraction {
        return new Fraction(this.num, this.den);
    }
}
