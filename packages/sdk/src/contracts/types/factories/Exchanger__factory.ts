/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Exchanger, ExchangerInterface } from "../Exchanger";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_resolver",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "CacheUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "src",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dest",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountReceived",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangeFeeRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundIdForSrc",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundIdForDest",
        type: "uint256",
      },
    ],
    name: "ExchangeEntryAppended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "src",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dest",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reclaim",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rebate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "srcRoundIdAtPeriodEnd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destRoundIdAtPeriodEnd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangeTimestamp",
        type: "uint256",
      },
    ],
    name: "ExchangeEntrySettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerNominated",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "CONTRACT_NAME",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refunded",
        type: "uint256",
      },
    ],
    name: "calculateAmountAfterSettlement",
    outputs: [
      {
        internalType: "uint256",
        name: "amountAfterSettlement",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
    ],
    name: "dynamicFeeRateForExchange",
    outputs: [
      {
        internalType: "uint256",
        name: "feeRate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "tooVolatile",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "exchangeForAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "virtualSynth",
        type: "bool",
      },
      {
        internalType: "address",
        name: "rewardAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "trackingCode",
        type: "bytes32",
      },
    ],
    name: "exchange",
    outputs: [
      {
        internalType: "uint256",
        name: "amountReceived",
        type: "uint256",
      },
      {
        internalType: "contract IVirtualSynth",
        name: "vSynth",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "exchangeAtomically",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
    ],
    name: "feeRateForExchange",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "sourceCurrencyKey",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "destinationCurrencyKey",
        type: "bytes32",
      },
    ],
    name: "getAmountsForExchange",
    outputs: [
      {
        internalType: "uint256",
        name: "amountReceived",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "exchangeFeeRate",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "hasWaitingPeriodOrSettlementOwing",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isResolverCached",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "isSynthRateInvalid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "lastExchangeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "maxSecsLeftInWaitingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "nominateNewOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "nominatedOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "priceDeviationThresholdFactor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "rebuildCache",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "resolver",
    outputs: [
      {
        internalType: "contract AddressResolver",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "resolverAddressesRequired",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "addresses",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "settle",
    outputs: [
      {
        internalType: "uint256",
        name: "reclaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refunded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numEntriesSettled",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "currencyKey",
        type: "bytes32",
      },
    ],
    name: "settlementOwing",
    outputs: [
      {
        internalType: "uint256",
        name: "reclaimAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rebateAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numEntries",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "tradingRewardsEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "waitingPeriodSecs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

export class Exchanger__factory {
  static readonly abi = _abi;
  static createInterface(): ExchangerInterface {
    return new utils.Interface(_abi) as ExchangerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Exchanger {
    return new Contract(address, _abi, signerOrProvider) as Exchanger;
  }
}
