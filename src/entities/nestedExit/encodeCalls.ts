import { Hex } from '../../types';
import { WeightedEncoder } from '../encoders';
import { ComposableStableEncoder } from '../encoders/composableStable';
import { NestedExitCallAttributes } from './types';
import { replaceWrapped } from '../utils/replaceWrapped';
import { bathcRelayerLibraryAbi } from '../../abi';
import { encodeFunctionData } from 'viem';

export const encodeCalls = (
    callsAttributes: NestedExitCallAttributes[],
    isProportional: boolean,
) => {
    const encodedCalls: Hex[] = [];
    for (const callAttributes of callsAttributes) {
        const {
            useNativeAssetAsWrappedAmountOut,
            chainId,
            sortedTokens,
            poolId,
            poolType,
            kind,
            sender,
            recipient,
            bptAmountIn,
            minAmountsOut,
            toInternalBalance,
            outputReferences,
            tokenOutIndex,
        } = callAttributes;

        // replace wrapped token with native asset if needed
        let tokensOut = [...sortedTokens];
        if (useNativeAssetAsWrappedAmountOut) {
            tokensOut = replaceWrapped([...sortedTokens], chainId);
        }

        let userData: Hex;

        if (isProportional) {
            switch (poolType) {
                case 'Weighted':
                    userData = WeightedEncoder.exitProportional(
                        bptAmountIn.amount,
                    );
                    break;
                case 'ComposableStable':
                    userData = ComposableStableEncoder.exitProportional(
                        bptAmountIn.amount,
                    );
                    break;
                default:
                    throw new Error('Unsupported pool type');
            }
        } else {
            if (tokenOutIndex === undefined) {
                throw new Error(
                    "tokenOutIndex can't be undefined for single token exits",
                );
            }
            switch (poolType) {
                case 'Weighted':
                    userData = WeightedEncoder.exitSingleAsset(
                        bptAmountIn.amount,
                        tokenOutIndex,
                    );
                    break;
                case 'ComposableStable':
                    userData = ComposableStableEncoder.exitSingleAsset(
                        bptAmountIn.amount,
                        tokenOutIndex,
                    );
                    break;
                default:
                    throw new Error('Unsupported pool type');
            }
        }

        const exitPoolRequest = {
            assets: tokensOut.map((t) => t.address), // with BPT
            minAmountsOut, // with BPT
            userData, // wihtout BPT
            toInternalBalance,
        };

        const encodedCall = encodeFunctionData({
            abi: bathcRelayerLibraryAbi,
            functionName: 'exitPool',
            args: [
                poolId,
                kind,
                sender,
                recipient,
                exitPoolRequest,
                outputReferences,
            ] as const,
        });

        encodedCalls.push(encodedCall);
    }

    return encodedCalls;
};
