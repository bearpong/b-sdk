import { AddLiquidityAmounts } from '../types';
import { AddLiquidityBaseCall, AddLiquidityKind } from './types';

export const getAmountsCall = (
    input: AddLiquidityBaseCall,
): AddLiquidityAmounts => {
    switch (input.addLiquidityKind) {
        case AddLiquidityKind.Unbalanced: {
            const minimumBpt = input.slippage.removeFrom(input.bptOut.amount);
            return {
                minimumBpt,
                maxAmountsIn: input.amountsIn.map((a) => a.amount),
                tokenInIndex: input.tokenInIndex,
            };
        }
        case AddLiquidityKind.SingleToken:
        case AddLiquidityKind.Proportional: {
            return {
                minimumBpt: input.bptOut.amount,
                maxAmountsIn: input.amountsIn.map((a) =>
                    input.slippage.applyTo(a.amount),
                ),
                tokenInIndex: input.tokenInIndex,
            };
        }
    }
};
