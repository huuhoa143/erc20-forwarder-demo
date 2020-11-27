import { ethers } from "ethers";

const tokenAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
const feeProxyAddress = "0x78122426ee7a6D35f15c4095b4Aa72A2A6418202";
const transferHandlerAddress = "0x4AB0652B1049607F9E51E61144767d1C978950d0";
const oracleAggregatorAddress = "0x025d39AA202A552487ac9282dC343773cb60bbB5";

const permitAPIId = "3d944962-5461-4489-ba92-4fbdf5860894";
const executeAPIId = "9ef1709e-385b-4590-9786-890fc086c0c4";
const biconomyX = "xR3-_k6UZ.87776d1b-d23a-4a7c-8ab2-d651a8c92341";

const tokenAbi = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const oracleAggregatorAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"ethGasPrice","type":"uint256"}],"name":"getTokenGasPrice","outputs":[{"internalType":"uint256","name":"tokenGasPriceUnadjusted","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenOracleDecimals","outputs":[{"internalType":"uint8","name":"_tokenOracleDecimals","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"tokenPriceUnadjusted","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"callAddress","type":"address"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bool","name":"signed","type":"bool"}],"name":"setTokenOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const transferHandlerAbi = [{"inputs":[{"internalType":"address","name":"_forwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trustedForwarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"versionRecipient","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const feeProxyAbi = [{"inputs":[{"internalType":"uint256","name":"_transferHandlerGas","type":"uint256"},{"internalType":"address","name":"_feeReceiver","type":"address"},{"internalType":"address","name":"_feeManager","type":"address"},{"internalType":"address payable","name":"_forwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"batchId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"batchNonce","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"charge","type":"uint256"},{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"FeeCharged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct ERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes32","name":"domainSeparator","type":"bytes32"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executeEIP712","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"txGas","type":"uint256"},{"internalType":"uint256","name":"tokenGasPrice","type":"uint256"},{"internalType":"uint256","name":"batchId","type":"uint256"},{"internalType":"uint256","name":"batchNonce","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct ERC20ForwardRequestTypes.ERC20ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"executePersonalSign","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"ret","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"batchId","type":"uint256"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleAggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeManager","type":"address"}],"name":"setFeeManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeReceiver","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oa","type":"address"}],"name":"setOracleAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_transferHandlerGas","type":"uint256"}],"name":"setTransferHandlerGas","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const feeManagerAbi = [{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getFeeMultiplier","outputs":[{"internalType":"uint16","name":"basisPoints","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenAllowed","outputs":[{"internalType":"bool","name":"allowed","type":"bool"}],"stateMutability":"view","type":"function"}];

const provider = new ethers.providers.InfuraProvider("kovan","d126f392798444609246423b06116c77");
const oracleAggregator = new ethers.Contract(oracleAggregatorAddress,oracleAggregatorAbi,provider);
const transferHandler = new ethers.Contract(transferHandlerAddress,transferHandlerAbi,provider);
const feeProxy = new ethers.Contract(feeProxyAddress,feeProxyAbi,provider);


let daiDomainData = {
    name : "Dai Stablecoin",
    version : "1",
    chainId : 42,
    verifyingContract : "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"
  };

let feeProxyDomainData = {
    name : "TEST",
    version : "1",
    chainId : 42,
    verifyingContract : "0xBFA21CD2F21a8E581E77942B2831B378d2378E69"
  };

  const erc20ForwardRequestType = [
    {name:'from',type:'address'},
    {name:'to',type:'address'},
    {name:'token',type:'address'},
    {name:'txGas',type:'uint256'},
    {name:'tokenGasPrice',type:'uint256'},
    {name:'batchId',type:'uint256'},
    {name:'batchNonce',type:'uint256'},
    {name:'deadline',type:'uint256'},
    {name:'dataHash',type:'bytes32'}
];
  
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" }
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
        const allowance = await this.token.allowance(await (await this.wallet.getSigner()).getAddress(),transferHandlerAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async feeProxyApproved(){
        const allowance = await this.token.allowance(await (await this.wallet.getSigner()).getAddress(),feeProxyAddress);
        if (allowance > 0)
            return true;
        else
            return false;
    }

    async getTokenGasPrice(){
        const gasPrice = ethers.BigNumber.from(await getGasPrice());
        const tokenPrice = await oracleAggregator.getTokenPrice(tokenAddress);
        const tokenOracleDecimals = await oracleAggregator.getTokenOracleDecimals(tokenAddress);
        console.log("token oracle decimals "+tokenOracleDecimals.toString());
        console.log("token gas price " + ((gasPrice.mul((ethers.BigNumber.from(10)).pow(tokenOracleDecimals))).div(tokenPrice)).toString());
        return ((gasPrice.mul((ethers.BigNumber.from(10)).pow(tokenOracleDecimals))).div(tokenPrice)).toString();
    }

    async permitFeeProxy(){
        await this.forwardPermit(feeProxyAddress);
    }

    async permitTransferHandler(){
        await this.forwardPermit(transferHandlerAddress);
    }

    async forwardPermit(toPermit){
        const userAddress = await (await this.wallet.getSigner()).getAddress();
        const nonce = await this.token.nonces(userAddress);
        const permitDataToSign = {
            types: {
                EIP712Domain: domainType,
                Permit: permitType
            },
            domain: daiDomainData,
            primaryType: "Permit",
            message: {
                holder :userAddress,
                spender : toPermit,
                nonce: nonce.toString(),
                expiry: "1000000000000000000000000000",
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
        const metaTxBody = {to:tokenAddress,apiId:permitAPIId, params:[userAddress,toPermit,nonce.toString(),"1000000000000000000000000000",true,v,r,s],
    from:userAddress};
        const biconomy = await fetch("https://api.biconomy.io/api/v2/meta-tx/native",
        {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': biconomyX
        },
        body:JSON.stringify(metaTxBody)
        });
        console.log(biconomy);
    }

    async estimateTransferGas(to,amount){
        return (ethers.BigNumber.from(75000));
    }

    //(await transferHandler.estimateGas.transfer(tokenAddress,to,amount)

    async estimateTransferCost(to,amount){
        return (ethers.BigNumber.from(120000)).mul(ethers.BigNumber.from(await this.getTokenGasPrice())).mul(ethers.BigNumber.from(15)).div(ethers.BigNumber.from(10));
    }

    async forwardTransfer(amount,to){
        const userAddress = await (await this.wallet.getSigner()).getAddress();
        const req = {
            from : userAddress,
            to : transferHandlerAddress,
            token : tokenAddress,
            txGas : (await this.estimateTransferGas(to,amount)).toNumber(),
            tokenGasPrice : await this.getTokenGasPrice(),
            batchId : 0,
            batchNonce : (await feeProxy.getNonce(userAddress,0)).toNumber(),
            deadline : Math.floor((Date.now()/1000)+3600),
            data : (await transferHandler.populateTransaction.transfer(tokenAddress,to,amount)).data,
        };
        const domainSeparator = ethers.utils.keccak256((ethers.utils.defaultAbiCoder).
        encode(['bytes32','bytes32','bytes32','uint256','address'],
               [ethers.utils.id("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
               ethers.utils.id(feeProxyDomainData.name),ethers.utils.id(feeProxyDomainData.version),
               feeProxyDomainData.chainId,feeProxyDomainData.verifyingContract]));
        const erc20fr = Object.assign({}, req);
        erc20fr.dataHash = ethers.utils.keccak256(erc20fr.data);
        delete erc20fr.data;
        const dataToSign = {
          types: {
              EIP712Domain: domainType,
              ERC20ForwardRequest: erc20ForwardRequestType
            },
            domain: feeProxyDomainData,
            primaryType: "ERC20ForwardRequest",
            message: erc20fr
          };
        const sig = await this.wallet.send("eth_signTypedData_v4",[req.from,JSON.stringify(dataToSign)]);
        const metaTxBody = {to:feeProxyAddress,apiId:executeAPIId,params:[req,domainSeparator,sig],from:userAddress};
        const biconomy = await fetch("https://api.biconomy.io/api/v2/meta-tx/native",
        {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': biconomyX
        },
        body:JSON.stringify(metaTxBody)
        });
        const responseJson = await biconomy.json();
        return responseJson['txHash'];
    }

}

export default TokenWallet;