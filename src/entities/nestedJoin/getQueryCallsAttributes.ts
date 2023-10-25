import { Token } from '../token';
import { getPoolAddress } from '../../utils';
import { NestedJoinInput, NestedJoinCallAttributes } from './types';
import { NestedPool, PoolKind } from '../types';
import { Address } from '../../types';
import { Relayer } from '../relayer';

export const getQueryCallsAttributes = (
    {
        amountsIn,
        chainId,
        accountAddress,
        useNativeAssetAsWrappedAmountIn,
        fromInternalBalance,
    }: NestedJoinInput,
    pools: NestedPool[],
): NestedJoinCallAttributes[] => {
    /**
     * Overall logic to build sequence of join calls:
     * 1. Go from bottom pool to up filling out input amounts and output refs
     * 2. Inputs will be amountsIn provided, output of the previous level or 0n
     * 3. Output at max level is the bptOut
     */

    const poolsSortedByLevel = pools.sort((a, b) => a.level - b.level);

    const calls: NestedJoinCallAttributes[] = [];
    for (const pool of poolsSortedByLevel) {
        const sortedTokens = pool.tokens
            .sort((a, b) => a.index - b.index)
            .map((t) => new Token(chainId, t.address, t.decimals));
        calls.push({
            chainId: chainId,
            useNativeAssetAsWrappedAmountIn:
                useNativeAssetAsWrappedAmountIn ?? false,
            sortedTokens,
            poolId: pool.id,
            poolAddress: pool.address,
            poolType: pool.type,
            kind:
                pool.type === 'ComposableStable'
                    ? PoolKind.COMPOSABLE_STABLE_V2
                    : PoolKind.WEIGHTED,
            sender: accountAddress,
            recipient: accountAddress,
            maxAmountsIn: getMaxAmountsIn(sortedTokens, amountsIn, calls),
            minBptOut: 0n, // limits set to zero for query calls
            fromInternalBalance: fromInternalBalance ?? false,
            outputReference: Relayer.toChainedReference(
                BigInt(poolsSortedByLevel.indexOf(pool)),
            ),
        });
    }
    return calls;
};

const getMaxAmountsIn = (
    sortedTokens: Token[],
    amountsIn: { address: Address; rawAmount: bigint }[],
    calls: NestedJoinCallAttributes[],
): { amount: bigint; isRef: boolean }[] => {
    return sortedTokens.map((token) => {
        /**
         * There are 3 possible scenarios:
         * 1. token has amountIn provided by the user -> return amount
         * 2. token is the output of a previous join call -> return outputRef
         * 3. otherwise -> return zero
         */

        // 1. token has amountIn provided by the user -> return amount
        const amountIn = amountsIn.find((a) => token.isSameAddress(a.address));
        if (amountIn !== undefined) {
            return {
                amount: amountIn.rawAmount,
                isRef: false,
            };
        }

        // 2. token is the output of a previous join call -> return outputRef
        const previousCall = calls.find(
            (call) => getPoolAddress(call.poolId) === token.address,
        );
        if (previousCall !== undefined) {
            return {
                amount: previousCall.outputReference,
                isRef: true,
            };
        }

        // 3. otherwise -> return zero
        return {
            amount: 0n,
            isRef: false,
        };
    });
};
