// pnpm test -- v3/permit2.integration.test.ts
import { config } from 'dotenv';
config();

import {
    createTestClient,
    http,
    parseUnits,
    publicActions,
    walletActions,
} from 'viem';

import {
    AddLiquidity,
    AddLiquidityKind,
    AddLiquidityUnbalancedInput,
    BALANCER_ROUTER,
    CHAINS,
    ChainId,
    Hex,
    InputAmount,
    PoolState,
    PoolType,
    Slippage,
} from 'src';

import { ANVIL_NETWORKS, startFork } from 'test/anvil/anvil-global-setup';
import {
    AddLiquidityTxInput,
    assertAddLiquidityUnbalanced,
    doAddLiquidityWithSignature,
    forkSetup,
    POOLS,
    RemoveLiquidityTxInput,
    TOKENS,
} from 'test/lib/utils';
import { Permit2Details, getDetails, signPermit2 } from '@/entities/permit2';

const vaultVersion = 3;

const chainId = ChainId.SEPOLIA;
const { rpcUrl } = await startFork(ANVIL_NETWORKS.SEPOLIA);
const poolId = POOLS[chainId].MOCK_WETH_BAL_POOL.address;

const WETH = TOKENS[chainId].WETH;
const BAL = TOKENS[chainId].BAL;

describe('remove liquidity test', () => {
    let prepTxInput: AddLiquidityTxInput;
    let txInput: RemoveLiquidityTxInput;
    let poolState: PoolState;
    beforeAll(async () => {
        // setup mock api
        const api = new MockApi();

        // get pool state from api
        poolState = await api.getPool(poolId);

        const client = createTestClient({
            mode: 'anvil',
            chain: CHAINS[chainId],
            transport: http(rpcUrl),
        })
            .extend(publicActions)
            .extend(walletActions);

        const testAddress = (await client.getAddresses())[0];

        const addLiquidityInput: AddLiquidityUnbalancedInput = {
            chainId,
            rpcUrl,
            kind: AddLiquidityKind.Unbalanced,
            amountsIn: poolState.tokens.map((t) => {
                return {
                    rawAmount: parseUnits('10', t.decimals),
                    decimals: t.decimals,
                    address: t.address,
                };
            }),
        };

        prepTxInput = {
            client,
            addLiquidity: new AddLiquidity(),
            slippage: Slippage.fromPercentage('1'), // 1%
            poolState,
            testAddress,
            addLiquidityInput,
        };

        // setup by performing an add liquidity so it's possible to remove after that
        await forkSetup(
            txInput.client,
            txInput.testAddress,
            [...txInput.poolState.tokens.map((t) => t.address)],
            [WETH.slot, BAL.slot] as number[],
            [
                ...txInput.poolState.tokens.map((t) =>
                    parseUnits('100', t.decimals),
                ),
            ],
            undefined,
            vaultVersion,
            false,
        );
    });

    describe('add liquidity unbalanced, then remove liquidity proportional', () => {
        let addLiquidityInput: AddLiquidityUnbalancedInput;
        let amountsIn: InputAmount[];

        beforeAll(() => {
            amountsIn = prepTxInput.poolState.tokens.map((t) => ({
                rawAmount: parseUnits('10', t.decimals),
                decimals: t.decimals,
                address: t.address,
            }));
            addLiquidityInput = {
                chainId,
                rpcUrl,
                kind: AddLiquidityKind.Unbalanced,
                amountsIn,
            };
        });
        test('token inputs', async () => {
            const details: Permit2Details[] = [];
            for (const amountIn of amountsIn) {
                details.push(
                    await getDetails(
                        prepTxInput.client,
                        amountIn.address,
                        prepTxInput.testAddress,
                        BALANCER_ROUTER[chainId],
                        amountIn.rawAmount,
                    ),
                );
            }
            const { permit2Batch, permit2Signature } = await signPermit2(
                prepTxInput.client,
                prepTxInput.testAddress,
                BALANCER_ROUTER[chainId],
                details,
            );

            const addLiquidityOutput = await doAddLiquidityWithSignature({
                ...prepTxInput,
                addLiquidityInput,
                permit2Batch,
                permit2Signature,
            });

            assertAddLiquidityUnbalanced(
                prepTxInput.poolState,
                addLiquidityInput,
                addLiquidityOutput,
                prepTxInput.slippage,
                vaultVersion,
            );
        });
    });
});

/*********************** Mock To Represent API Requirements **********************/

class MockApi {
    public async getPool(id: Hex): Promise<PoolState> {
        const tokens = [
            {
                address: WETH.address,
                decimals: WETH.decimals,
                index: 0,
            },
            {
                address: BAL.address,
                decimals: BAL.decimals,
                index: 1,
            },
        ];

        return {
            id,
            address: id,
            type: PoolType.Weighted,
            tokens,
            vaultVersion,
        };
    }
}

/******************************************************************************/
