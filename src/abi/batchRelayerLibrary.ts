export const batchRelayerLibraryAbi = [
    {
        inputs: [
            {
                internalType: 'contract IVault',
                name: 'vault',
                type: 'address',
            },
            {
                internalType: 'contract IERC20',
                name: 'wstETH',
                type: 'address',
            },
            {
                internalType: 'contract IBalancerMinter',
                name: 'minter',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'approveVault',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'enum IVault.SwapKind',
                name: 'kind',
                type: 'uint8',
            },
            {
                components: [
                    {
                        internalType: 'bytes32',
                        name: 'poolId',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint256',
                        name: 'assetInIndex',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'assetOutIndex',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'userData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IVault.BatchSwapStep[]',
                name: 'swaps',
                type: 'tuple[]',
            },
            {
                internalType: 'contract IAsset[]',
                name: 'assets',
                type: 'address[]',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'fromInternalBalance',
                        type: 'bool',
                    },
                    {
                        internalType: 'address payable',
                        name: 'recipient',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'toInternalBalance',
                        type: 'bool',
                    },
                ],
                internalType: 'struct IVault.FundManagement',
                name: 'funds',
                type: 'tuple',
            },
            {
                internalType: 'int256[]',
                name: 'limits',
                type: 'int256[]',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'index',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'key',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct VaultActions.OutputReference[]',
                name: 'outputReferences',
                type: 'tuple[]',
            },
        ],
        name: 'batchSwap',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'poolId',
                type: 'bytes32',
            },
            {
                internalType: 'enum VaultActions.PoolKind',
                name: 'kind',
                type: 'uint8',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'contract IAsset[]',
                        name: 'assets',
                        type: 'address[]',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'minAmountsOut',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'userData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'bool',
                        name: 'toInternalBalance',
                        type: 'bool',
                    },
                ],
                internalType: 'struct IVault.ExitPoolRequest',
                name: 'request',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'index',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'key',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct VaultActions.OutputReference[]',
                name: 'outputReferences',
                type: 'tuple[]',
            },
        ],
        name: 'exitPool',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IStakingLiquidityGauge[]',
                name: 'gauges',
                type: 'address[]',
            },
        ],
        name: 'gaugeClaimRewards',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IStakingLiquidityGauge',
                name: 'gauge',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'gaugeDeposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'gauges',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'gaugeMint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bool',
                name: 'approval',
                type: 'bool',
            },
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'gaugeSetMinterApproval',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IStakingLiquidityGauge',
                name: 'gauge',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'gaugeWithdraw',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getEntrypoint',
        outputs: [
            {
                internalType: 'contract IBalancerRelayer',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getVault',
        outputs: [
            {
                internalType: 'contract IVault',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'poolId',
                type: 'bytes32',
            },
            {
                internalType: 'enum VaultActions.PoolKind',
                name: 'kind',
                type: 'uint8',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'contract IAsset[]',
                        name: 'assets',
                        type: 'address[]',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'maxAmountsIn',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'bytes',
                        name: 'userData',
                        type: 'bytes',
                    },
                    {
                        internalType: 'bool',
                        name: 'fromInternalBalance',
                        type: 'bool',
                    },
                ],
                internalType: 'struct IVault.JoinPoolRequest',
                name: 'request',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'joinPool',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'enum IVault.UserBalanceOpKind',
                        name: 'kind',
                        type: 'uint8',
                    },
                    {
                        internalType: 'contract IAsset',
                        name: 'asset',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                    {
                        internalType: 'address payable',
                        name: 'recipient',
                        type: 'address',
                    },
                ],
                internalType: 'struct IVault.UserBalanceOp[]',
                name: 'ops',
                type: 'tuple[]',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'manageUserBalance',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'ref',
                type: 'uint256',
            },
        ],
        name: 'peekChainedReferenceValue',
        outputs: [
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'relayer',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'approved',
                type: 'bool',
            },
            {
                internalType: 'bytes',
                name: 'authorisation',
                type: 'bytes',
            },
        ],
        name: 'setRelayerApproval',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'stakeETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'stakeETHAndWrap',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'bytes32',
                        name: 'poolId',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'enum IVault.SwapKind',
                        name: 'kind',
                        type: 'uint8',
                    },
                    {
                        internalType: 'contract IAsset',
                        name: 'assetIn',
                        type: 'address',
                    },
                    {
                        internalType: 'contract IAsset',
                        name: 'assetOut',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'userData',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IVault.SingleSwap',
                name: 'singleSwap',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'sender',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'fromInternalBalance',
                        type: 'bool',
                    },
                    {
                        internalType: 'address payable',
                        name: 'recipient',
                        type: 'address',
                    },
                    {
                        internalType: 'bool',
                        name: 'toInternalBalance',
                        type: 'bool',
                    },
                ],
                internalType: 'struct IVault.FundManagement',
                name: 'funds',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: 'limit',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'swap',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IStaticATokenLM',
                name: 'staticToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'toUnderlying',
                type: 'bool',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapAaveStaticToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ICToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapCompoundV2',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC4626',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapERC4626',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IEulerToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapEuler',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IGearboxDieselToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'dieselAmount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapGearbox',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IReaperTokenVault',
                name: 'vaultToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapReaperVaultToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IShareToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapShareToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ITetuSmartVault',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapTetu',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IUnbuttonToken',
                name: 'wrapperToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapUnbuttonToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapWstETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IYearnTokenVault',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'unwrapYearn',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20Permit',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'vaultPermit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20PermitDAI',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'holder',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'allowed',
                type: 'bool',
            },
            {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
            },
        ],
        name: 'vaultPermitDAI',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IStaticATokenLM',
                name: 'staticToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'fromUnderlying',
                type: 'bool',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapAaveDynamicToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ICToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapCompoundV2',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC4626',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapERC4626',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IEulerToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'eulerProtocol',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapEuler',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IGearboxDieselToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'mainAmount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapGearbox',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IReaperTokenVault',
                name: 'vaultToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapReaperVaultToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IShareToken',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapShareToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapStETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ITetuSmartVault',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapTetu',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IUnbuttonToken',
                name: 'wrapperToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'uAmount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapUnbuttonToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IYearnTokenVault',
                name: 'wrappedToken',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'outputReference',
                type: 'uint256',
            },
        ],
        name: 'wrapYearn',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
] as const;
