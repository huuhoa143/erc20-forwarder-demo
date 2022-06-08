import {ethers} from "ethers";
import {sendSignTransaction} from "./blockchain-utils";
import dotenv from "dotenv";
dotenv.config();

const tokenAddress = "0x10FD2AebA77543C3039689fd5CDc1a16e984e115";
const biconomyAddress = "0x65b2FD38e7107511FbFf85ea3473FD7660A88d1A"
const erc20ForwarderAddress = "0x91c97699B649CB6669E981979D7096827b1F74c4";
const purchaseGiftcardAddress = "0xF4C4B3Be333CDF4b1B2021623ab3D94b68D1Ab41";

const publicKey = process.env.RELAYER_PUBLIC_KEY
const privateKey = process.env.RELAYER_PRIVATE_KEY

const permitAPIId = "629edc2d820eb4029e2b7f47";
const executeAPIId = "629edc51820eb4029e2b7f48";
const fizenDapp = "629db181cce8e20220bfb3d3"

const tokenAbi = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const erc20ForwarderAddressAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "newBaseGas",
                "type": "uint128"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            }
        ],
        "name": "BaseGasChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "charge",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "FeeCharged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "newGasRefund",
                "type": "uint128"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            }
        ],
        "name": "GasRefundChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "newGasTokenForwarderBaseGas",
                "type": "uint128"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            }
        ],
        "name": "GasTokenForwarderBaseGasChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOracleAggregatorAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            }
        ],
        "name": "OracleAggregatorChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "newGas",
                "type": "uint256"
            }
        ],
        "name": "TransferHandlerGasChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newForwarderAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            }
        ],
        "name": "TrustedForwarderChanged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "baseGas",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            }
        ],
        "name": "executeEIP712",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "gasTokensBurned",
                "type": "uint256"
            }
        ],
        "name": "executeEIP712WithGasTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            }
        ],
        "name": "executePersonalSign",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "gasTokensBurned",
                "type": "uint256"
            }
        ],
        "name": "executePersonalSignWithGasTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeManager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeReceiver",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "forwarder",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gasRefund",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gasTokenForwarderBaseGas",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "batchId",
                "type": "uint256"
            }
        ],
        "name": "getNonce",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_feeReceiver",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_feeManager",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_forwarder",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oracleAggregator",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "holder",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "allowed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.PermitRequest",
                "name": "permitOptions",
                "type": "tuple"
            }
        ],
        "name": "permitAndExecuteEIP712",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "holder",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "allowed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.PermitRequest",
                "name": "permitOptions",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "gasTokensBurned",
                "type": "uint256"
            }
        ],
        "name": "permitAndExecuteEIP712WithGasTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "holder",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "allowed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.PermitRequest",
                "name": "permitOptions",
                "type": "tuple"
            }
        ],
        "name": "permitEIP2612AndExecuteEIP712",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "txGas",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenGasPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "batchNonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.ERC20ForwardRequest",
                "name": "req",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "domainSeparator",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "sig",
                "type": "bytes"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "holder",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "allowed",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint8",
                        "name": "v",
                        "type": "uint8"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "r",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "s",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct ERC20ForwardRequestTypes.PermitRequest",
                "name": "permitOptions",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "gasTokensBurned",
                "type": "uint256"
            }
        ],
        "name": "permitEIP2612AndExecuteEIP712WithGasTokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "safeTransferRequired",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "gas",
                "type": "uint128"
            }
        ],
        "name": "setBaseGas",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_feeManager",
                "type": "address"
            }
        ],
        "name": "setFeeManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_feeReceiver",
                "type": "address"
            }
        ],
        "name": "setFeeReceiver",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "refund",
                "type": "uint128"
            }
        ],
        "name": "setGasRefund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "gas",
                "type": "uint128"
            }
        ],
        "name": "setGasTokenForwarderBaseGas",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "oa",
                "type": "address"
            }
        ],
        "name": "setOracleAggregator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_safeTransferRequired",
                "type": "bool"
            }
        ],
        "name": "setSafeTransferRequired",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_transferHandlerGas",
                "type": "uint256"
            }
        ],
        "name": "setTransferHandlerGas",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_forwarder",
                "type": "address"
            }
        ],
        "name": "setTrustedForwarder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "transferHandlerGas",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const purchaseGiftCardAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_trustedForwarder",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "voucherID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fromFiatID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "toCryptoID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fiatDenomination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cryptoAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "purchaseTime",
                "type": "uint256"
            }
        ],
        "name": "PurchaseByCurrency",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "voucherID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fromFiatID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "toCryptoID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fiatDenomination",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cryptoAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "purchaseTime",
                "type": "uint256"
            }
        ],
        "name": "PurchaseByToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            }
        ],
        "name": "RefundCurrency",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            }
        ],
        "name": "RefundToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "adminAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "currencyAmount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawCurrency",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "adminAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "name": "WithdrawToken",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "adminAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "forwarder",
                "type": "address"
            }
        ],
        "name": "isTrustedForwarder",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "operators",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_voucherID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fromFiatID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_toCryptoID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_fiatDenomination",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_orderID",
                "type": "string"
            }
        ],
        "name": "purchaseByCurrency",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_voucherID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fromFiatID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_toCryptoID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_fiatDenomination",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_cryptoAmount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_orderID",
                "type": "string"
            }
        ],
        "name": "purchaseByToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "purchaseHistory",
        "outputs": [
            {
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "cryptoAmount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "cryptoContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "purchaseTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "refundHistory",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "orderID",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            }
        ],
        "name": "refundOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operatorAddress",
                "type": "address"
            }
        ],
        "name": "removeOperator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "removeToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_adminAddress",
                "type": "address"
            }
        ],
        "name": "setAdminAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operatorAddress",
                "type": "address"
            }
        ],
        "name": "setupOperator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "setupToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokens",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "currencyAmount",
                "type": "uint256"
            }
        ],
        "name": "withdrawCurrency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "name": "withdrawToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const RPC_URL = 'https://speedy-nodes-nyc.moralis.io/fc0baadcd4ee3e82966cacde/bsc/testnet'
const Web3 = require('web3')
const web3 = new Web3(RPC_URL);
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

const purchaseGiftcard = new ethers.Contract(purchaseGiftcardAddress,purchaseGiftCardAbi, provider);

const erc20Forwarder = new web3.eth.Contract(erc20ForwarderAddressAbi, erc20ForwarderAddress);
const tokenHandler = new web3.eth.Contract(tokenAbi, tokenAddress);

const chainId = 97
let permitOptions = {}
let daiDomainData = {
    name: "FiFood",
    version: "1",
    chainId,
    verifyingContract: tokenAddress,
  };

const salt = ethers.BigNumber.from(chainId);
let domainData = {
    name : "PurchaseGiftcard",
    version : "1",
    verifyingContract : biconomyAddress,
    salt: ethers.utils.hexZeroPad(salt.toHexString(), 32),
};

  const erc20ForwardRequestType = [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "token", type: "address" },
      { name: "txGas", type: "uint256" },
      { name: "tokenGasPrice", type: "uint256" },
      { name: "batchId", type: "uint256" },
      { name: "batchNonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "data", type: "bytes" },
];

  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

const daiDomainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
];

  const permitType = [
    { name: "holder", type: "address" },
    { name: "spender", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "expiry", type: "uint256" },
    { name: "allowed", type: "bool" }
  ];

const getGasPrice = async() => {
    const response = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=P7JFS2YI6MNZFVY95FDMV45EGIX6F1BPAV");
    const responseJson = await response.json();
    console.log("Response JSON "+ JSON.stringify(responseJson));
    return (ethers.utils.parseUnits(responseJson.result.FastGasPrice,"gwei")).toString();
}

class TokenWallet{

    constructor(wallet){
        this.token = new ethers.Contract(tokenAddress,tokenAbi,provider);
        this.wallet = wallet;
    }

    async transferHandlerApproved(){
        const allowance = await this.token.allowance(await (await this.wallet.getSigner()).getAddress(),erc20ForwarderAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async purchaseGiftCardApproved(){
        const allowance = await this.token.allowance(await (await this.wallet.getSigner()).getAddress(),purchaseGiftcardAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async permitPurchaseGiftCard(){
        await this.forwardPermit(purchaseGiftcardAddress);
    }

    async permitTransferHandler(){
        await this.forwardPermit(erc20ForwarderAddress);
    }

    async forwardPermit(toPermit){
        const userAddress = await (await this.wallet.getSigner()).getAddress();
        const nonce = await this.token.nonces(userAddress);
        const expiry = Math.floor(Date.now() / 1000) + 3600
        const permitDataToSign = {
            types: {
                EIP712Domain: daiDomainType,
                Permit: permitType
            },
            domain: daiDomainData,
            primaryType: "Permit",
            message: {
                holder :userAddress,
                spender : toPermit,
                nonce: nonce.toString(),
                expiry: Math.floor(Date.now() / 1000 + 3600),
                allowed: true
            }
            };
        const result = await this.wallet.send("eth_signTypedData_v4",[userAddress,JSON.stringify(permitDataToSign)]);
        console.log("success",result);
        const signature = result.substring(2);
        const r = "0x" + signature.substring(0, 64);
        const s = "0x" + signature.substring(64, 128);
        const v = parseInt(signature.substring(128, 130), 16);
        console.log("v r s",v," ",r," ",s);

        const metaTxBody = {
            from: userAddress,
            to: tokenAddress,
            apiId: permitAPIId,
            params: [
                userAddress,
                toPermit,
                nonce.toString(),
                expiry,
                true,
                v,
                r,
                s
            ]
        }

        const fizenRelayer = await fetch("http://localhost:3003/meta-tx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-FP-API-KEY": fizenDapp
            },
            body: JSON.stringify(metaTxBody)
        })
        console.log({fizenRelayer});
    }

    async estimateTransferGas(to,amount){
        return (ethers.BigNumber.from(75000));
    }

    //(await transferHandler.estimateGas.transfer(tokenAddress,to,amount)

    async forwardTransfer(amount){
        console.log({amount})
        const userAddress = await (await this.wallet.getSigner()).getAddress();
        const price = ethers.utils.parseUnits("1", "gwei").toString();

        console.log("price",price);
        const req = await purchaseGiftcard.populateTransaction.purchaseByToken(
            "1", "1", "1", "1", ethers.utils.parseUnits(amount, "gwei"), tokenAddress, "2"
        )

        const batchId = 0;
        console.log({batchId})
        const batchNonce = await erc20Forwarder.methods.getNonce(userAddress,batchId).call()

        console.log({batchNonce})
        const deadline = Math.floor((Date.now()/1000)+3600)
        console.log({req})
        req.from = userAddress;
        req.batchNonce = Number(batchNonce);
        req.batchId = 0;
        req.txGas = (ethers.BigNumber.from(200000)).toNumber();
        req.tokenGasPrice = price;
        req.deadline = deadline;
        delete req.gasPrice;
        delete req.gasLimit;
        delete req.chainId;
        req.token = tokenAddress;
        const dataToSign = {
          types: {
              EIP712Domain: domainType,
              ERC20ForwardRequest: erc20ForwardRequestType
            },
            domain: domainData,
            primaryType: "ERC20ForwardRequest",
            message: req
          };
        const sig = await this.wallet.send("eth_signTypedData_v4",[req.from,JSON.stringify(dataToSign)]);
        console.log({permitOptions, sig})

        const domainSeparator = ethers.utils.keccak256((ethers.utils.defaultAbiCoder).
        encode(["bytes32", "bytes32", "bytes32", "address", "bytes32"],
            [
                ethers.utils.id(
                    "EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)"
                ),
                ethers.utils.id(domainData.name),
                ethers.utils.id(domainData.version),
                domainData.verifyingContract,
                domainData.salt,
            ]));

        console.log({
            req, domainSeparator, sig, permitOptions
        })

        const metaTxBody = {
            from: userAddress,
            to: erc20ForwarderAddress,
            apiId: executeAPIId,
            params: [
                req,
                domainSeparator,
                sig,
            ]
        }

        console.log({metaTxBody})
        const fizenRelayer = await fetch("http://localhost:3003/meta-tx", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-FP-API-KEY": fizenDapp
            },
            body: JSON.stringify(metaTxBody)
        })

        const responseJson = await fizenRelayer.json();
        console.log({responseJson});
    }

}

export default TokenWallet;
