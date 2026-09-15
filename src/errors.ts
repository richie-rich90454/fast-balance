/**
 * Typed errors with stable machine-readable codes.
 *
 * This is additive: `BalanceError` extends `Error`, so existing `catch` code
 * and `expect(() => ...).toThrow()` keep working unchanged.
 */
export type BalanceErrorCode =
    | "PARSE_ERROR"
    | "UNKNOWN_ELEMENT"
    | "AMBIGUOUS_CHARGE"
    | "UNBALANCEABLE"
    | "UNDERDETERMINED"
    | "INVALID_ARGUMENT"
    | "OVERFLOW";

export class BalanceError extends Error {
    public readonly code: BalanceErrorCode;

    constructor(code: BalanceErrorCode, message: string) {
        super(message);
        this.name = "BalanceError";
        this.code = code;
    }
}

export function parseError(message: string): BalanceError {
    return new BalanceError("PARSE_ERROR", message);
}

export function unknownElement(symbol: string): BalanceError {
    return new BalanceError(
        "UNKNOWN_ELEMENT",
        'Expected element symbol, got unknown "' + symbol + '"',
    );
}

export function ambiguousCharge(message: string): BalanceError {
    return new BalanceError("AMBIGUOUS_CHARGE", message);
}

export function unbalanceable(message = "Unbalanceable equation"): BalanceError {
    return new BalanceError("UNBALANCEABLE", message);
}
