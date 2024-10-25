// pnpm test -- addLiquidityNestedV3.integration.test.ts
import dotenv from 'dotenv';
dotenv.config();

import {
    createTestClient,
    http,
    parseUnits,
    publicActions,
    TestActions,
    walletActions,
} from 'viem';
import {
    Address,
    BALANCER_COMPOSITE_LIQUIDITY_ROUTER,
    CHAINS,
    ChainId,
    NestedPoolState,
    PERMIT2,
    PublicWalletClient,
    Slippage,
    Token,
    TokenAmount,
    AddLiquidityNested,
    AddLiquidityNestedInput,
    AddLiquidityNestedQueryOutputV3,
} from '@/index';
import { ANVIL_NETWORKS, startFork } from 'test/anvil/anvil-global-setup';
import {
    approveSpenderOnPermit2,
    approveSpenderOnToken,
    POOLS,
    sendTransactionGetBalances,
    setTokenBalances,
    TOKENS,
} from 'test/lib/utils';

const chainId = ChainId.SEPOLIA;
const NESTED_WITH_BOOSTED_POOL = POOLS[chainId].NESTED_WITH_BOOSTED_POOL;
const BOOSTED_POOL = POOLS[chainId].MOCK_BOOSTED_POOL;
const DAI = TOKENS[chainId].DAI_AAVE;
const USDC = TOKENS[chainId].USDC_AAVE;
const WETH = TOKENS[chainId].WETH;

const parentBptToken = new Token(
    chainId,
    NESTED_WITH_BOOSTED_POOL.address,
    NESTED_WITH_BOOSTED_POOL.decimals,
);
// These are the underlying tokens
const daiToken = new Token(chainId, DAI.address, DAI.decimals);
const usdcToken = new Token(chainId, USDC.address, USDC.decimals);
const wethToken = new Token(chainId, WETH.address, WETH.decimals);
const mainTokens = [wethToken, daiToken, usdcToken];

describe.skip('V3 add liquidity nested test, with Permit2 direct approval', () => {
    let rpcUrl: string;
    let client: PublicWalletClient & TestActions;
    let testAddress: Address;
    const addLiquidityNested = new AddLiquidityNested();

    beforeAll(async () => {
        // setup chain and test client
        ({ rpcUrl } = await startFork(ANVIL_NETWORKS.SEPOLIA));

        client = createTestClient({
            mode: 'anvil',
            chain: CHAINS[chainId],
            transport: http(rpcUrl),
        })
            .extend(publicActions)
            .extend(walletActions);

        testAddress = (await client.getAddresses())[0];

        await setTokenBalances(
            client,
            testAddress,
            mainTokens.map((t) => t.address),
            [WETH.slot, DAI.slot, USDC.slot] as number[],
            mainTokens.map((t) => parseUnits('1000', t.decimals)),
        );
    });

    test('query with underlying', async () => {
        const addLiquidityInput: AddLiquidityNestedInput = {
            amountsIn: [
                {
                    address: WETH.address,
                    rawAmount: parseUnits('0.1', WETH.decimals),
                    decimals: WETH.decimals,
                },
                {
                    address: USDC.address,
                    rawAmount: parseUnits('20', USDC.decimals),
                    decimals: USDC.decimals,
                },
            ],
            chainId,
            rpcUrl,
        };
        const queryOutput = await addLiquidityNested.query(
            addLiquidityInput,
            nestedPoolState,
        );
        const expectedAmountsIn = [
            TokenAmount.fromHumanAmount(wethToken, '0.1'),
            TokenAmount.fromHumanAmount(daiToken, '0'),
            TokenAmount.fromHumanAmount(usdcToken, '20'),
        ];
        expect(queryOutput.protocolVersion).toEqual(3);
        expect(queryOutput.bptOut.token).to.deep.eq(parentBptToken);
        expect(queryOutput.bptOut.amount > 0n).to.be.true;
        expect(queryOutput.amountsIn).to.deep.eq(expectedAmountsIn);
    });

    test('add liquidity transaction', async () => {
        const addLiquidityInput: AddLiquidityNestedInput = {
            amountsIn: [
                {
                    address: WETH.address,
                    rawAmount: parseUnits('0.1', WETH.decimals),
                    decimals: WETH.decimals,
                },
                {
                    address: USDC.address,
                    rawAmount: parseUnits('20', USDC.decimals),
                    decimals: USDC.decimals,
                },
            ],
            chainId,
            rpcUrl,
        };

        for (const amount of addLiquidityInput.amountsIn) {
            // Approve Permit2 to spend account tokens
            await approveSpenderOnToken(
                client,
                testAddress,
                amount.address,
                PERMIT2[chainId],
            );
            // Approve Router to spend account tokens using Permit2
            await approveSpenderOnPermit2(
                client,
                testAddress,
                amount.address,
                BALANCER_COMPOSITE_LIQUIDITY_ROUTER[chainId],
            );
        }

        const queryOutput = (await addLiquidityNested.query(
            addLiquidityInput,
            nestedPoolState,
        )) as AddLiquidityNestedQueryOutputV3;

        const addLiquidityBuildInput = {
            ...queryOutput,
            slippage: Slippage.fromPercentage('1'), // 1%,
        };

        const addLiquidityBuildCallOutput = addLiquidityNested.buildCall(
            addLiquidityBuildInput,
        );

        // send add liquidity transaction and check balance changes
        const { transactionReceipt, balanceDeltas } =
            await sendTransactionGetBalances(
                [
                    ...mainTokens.map((t) => t.address),
                    queryOutput.bptOut.token.address,
                ],
                client,
                testAddress,
                addLiquidityBuildCallOutput.to,
                addLiquidityBuildCallOutput.callData,
                addLiquidityBuildCallOutput.value,
            );
        // think about using assertResults helper here
        expect(transactionReceipt.status).to.eq('success');
        const expectedAmountsIn = [
            TokenAmount.fromHumanAmount(wethToken, '0.1'),
            TokenAmount.fromHumanAmount(daiToken, '0'),
            TokenAmount.fromHumanAmount(usdcToken, '20'),
        ];
        const expectedDeltas = [
            ...expectedAmountsIn.map((a) => a.amount),
            queryOutput.bptOut.amount,
        ];
        expect(expectedDeltas).to.deep.eq(balanceDeltas);
    });
});

const nestedPoolState: NestedPoolState = {
    protocolVersion: 3,
    pools: [
        {
            id: NESTED_WITH_BOOSTED_POOL.id,
            address: NESTED_WITH_BOOSTED_POOL.address,
            type: NESTED_WITH_BOOSTED_POOL.type,
            level: 1,
            tokens: [
                {
                    address: BOOSTED_POOL.address,
                    decimals: BOOSTED_POOL.decimals,
                    index: 0,
                },
                {
                    address: WETH.address,
                    decimals: WETH.decimals,
                    index: 1,
                },
            ],
        },
        {
            id: BOOSTED_POOL.id,
            address: BOOSTED_POOL.address,
            type: BOOSTED_POOL.type,
            level: 0,
            tokens: [
                {
                    address: USDC.address,
                    decimals: USDC.decimals,
                    index: 0,
                },
                {
                    address: DAI.address,
                    decimals: DAI.decimals,
                    index: 1,
                },
            ],
        },
    ],
    mainTokens: [
        {
            address: WETH.address,
            decimals: WETH.decimals,
        },
        {
            address: DAI.address,
            decimals: DAI.decimals,
        },
        {
            address: USDC.address,
            decimals: USDC.decimals,
        },
    ],
};