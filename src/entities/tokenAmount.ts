import { Token } from './token';
import { parseUnits } from '@ethersproject/units';
import _Decimal from 'decimal.js-light';
import { WAD } from '../utils';
import { HumanAmount } from '../types';

export type BigintIsh = bigint | string | number;

export class TokenAmount {
    public readonly token: Token;
    public readonly amount: bigint;
    public readonly scalar: bigint;
    public readonly decimalScale: bigint;
    public readonly scale18: bigint;

    public static fromRawAmount(token: Token, rawAmount: BigintIsh) {
        return new TokenAmount(token, rawAmount);
    }

    public static fromHumanAmount(token: Token, humanAmount: HumanAmount) {
        const rawAmount = parseUnits(humanAmount, token.decimals).toString();
        return new TokenAmount(token, rawAmount);
    }

    public static fromScale18Amount(token: Token, scale18Amount: BigintIsh, divUp?: boolean) {
        const scalar = BigInt(10) ** BigInt(18 - token.decimals);
        const rawAmount = divUp
            ? 1n + (BigInt(scale18Amount) - 1n) / scalar
            : BigInt(scale18Amount) / scalar;
        return new TokenAmount(token, rawAmount);
    }

    protected constructor(token: Token, amount: BigintIsh) {
        this.decimalScale = BigInt(10) ** BigInt(token.decimals);
        this.token = token;
        this.amount = BigInt(amount);
        this.scalar = BigInt(10) ** BigInt(18 - token.decimals);
        this.scale18 = this.amount * this.scalar;
    }

    public add(other: TokenAmount): TokenAmount {
        return new TokenAmount(this.token, this.amount + other.amount);
    }

    public sub(other: TokenAmount): TokenAmount {
        return new TokenAmount(this.token, this.amount - other.amount);
    }

    public mulFixed(other: bigint): TokenAmount {
        const multiplied = (this.amount * other) / WAD;
        return new TokenAmount(this.token, multiplied);
    }

    public divUpFixed(other: bigint): TokenAmount {
        const divided = (this.amount * WAD + other - 1n) / other;
        return new TokenAmount(this.token, divided);
    }

    public divDownFixed(other: bigint): TokenAmount {
        const divided = (this.amount * WAD) / other;
        return new TokenAmount(this.token, divided);
    }

    public toSignificant(significantDigits: number = 6): string {
        return new _Decimal(this.amount.toString())
            .div(new _Decimal(this.decimalScale.toString()))
            .toDecimalPlaces(significantDigits)
            .toString();
    }
}
