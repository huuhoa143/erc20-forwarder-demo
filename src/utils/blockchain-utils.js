const maxUInt =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const createDetail = async (web3, data, address, contractAddress, value = "0") => {
    const nonce = await web3.eth.getTransactionCount(address, 'pending');
    let detail = {
        from: address,
        to: contractAddress,
        value: value !== "0" ? value : 0,
        data,
        nonce,
        gas: 0,
        gasPrice: 0,
    };
    let gasLimit = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        value: value !== "0" ? value : 0,
        data
    });
    let gasPrice = await web3.eth.getGasPrice()
    detail.gas = gasLimit;
    detail.gasPrice = gasPrice;
    return detail;
}

const signTransaction  = async (web3, detail, privateKey) => {
    const signedTransaction = await web3.eth.accounts.signTransaction(
        detail,
        privateKey
    );
    console.log("Sign transaction thành công")
    return web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(error, hash) {
        if (!error) {
            console.log("Transaction sent!", hash);
            const startTime = new Date().getTime()
            console.log('Start time: ', new Date());
            const interval = setInterval(function() {
                web3.eth.getTransactionReceipt(hash, function(err, rec) {
                    if (rec) {
                        const endTime = new Date().getTime()
                        console.log("Time: ", endTime - startTime);
                        // const effectiveGasPrice = web3.utils.fromWei(web3.utils.hexToNumber(rec.effectiveGasPrice).toString(), "gwei")
                        // console.log("effectiveGasPrice: ", web3.utils.fromWei(web3.utils.hexToNumber(rec.effectiveGasPrice).toString(), "gwei"));
                        clearInterval(interval);
                    }
                });
            }, 1000);
        } else {
            console.log("Something went wrong while submitting your transaction:", error);
        }
    });
}

const sendSignTransaction = async (web3, data, adminAddress, privateKey, contractAddress, value = "0") => {
    const detail = await createDetail(web3, data, adminAddress, contractAddress, value);
    console.log("Tạo detail transaction thành công")
    return signTransaction(web3, detail, privateKey)
}

const approve = async (web3, contractAddress, abi, address, approvedAddress, privateKey) => {

    const contractInstance = new web3.eth.Contract(abi, contractAddress);
    const allowance = await contractInstance.methods
        .allowance(address, approvedAddress)
        .call();
    if (allowance > 0) return;
    let nonce = await web3.eth.getTransactionCount(address);
    let data = contractInstance.methods
        .approve(approvedAddress, maxUInt)
        .encodeABI();

    let details = {
        from: address,
        to: contractAddress,
        value: 0,
        data: data,
        nonce: nonce,
    };
    let gasLimit = await web3.eth.estimateGas({
        from: address,
        to: contractAddress,
        data
    });
    let gasPrice = await web3.eth.getGasPrice();
    details.gas = gasLimit;
    details.gasPrice = gasPrice;

    const signedTransaction = await web3.eth.accounts.signTransaction(
        details,
        privateKey
    );

    await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
    );
    console.log(
        "Finish approve %s token of contract %s from address %s with tx_id = %s",
        contractAddress,
        address
    );
}

module.exports = {
    sendSignTransaction,
    approve
}
