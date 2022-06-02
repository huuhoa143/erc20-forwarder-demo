import { Text,Button,Input } from "@chakra-ui/core";
import QRCode from "react-qr-code";
import { useForm, Controller } from "react-hook-form";
import { ethers } from "ethers";
import useInterval from '@use-it/interval';



function TokenSend({store,dispatch}){

    const { register, handleSubmit } = useForm();

    const updateBalance = async() => {
        if (store.tokenWallet!==undefined){
            const newBalance = (parseFloat((await store.tokenWallet.token.balanceOf(store.address)).toString())/(Math.pow(10,18))).toFixed(2);
            dispatch({type:'UPDATE_BALANCE',tokenBalance:newBalance});
        }
    }

    useInterval(updateBalance,4000);

    const onSubmit = async(data) => {
        console.log("submitted");
        dispatch({type:'PROPOSE_TX',amount:data.amount});
    }

    const approvePurchaseGiftCard = async() => {
        dispatch({type:'LOADING'});
        try{
            await store.tokenWallet.permitPurchaseGiftCard();
            dispatch({type:'PURCHASE_GIFT_CARD_APPROVED'});
        }
        catch(error){
            console.log(error);
        }
        dispatch({type:'NOT_LOADING'});
    }

    const approveTransferHandler = async() => {
        dispatch({type:'LOADING'});
        try{
            await store.tokenWallet.permitTransferHandler();
            dispatch({type:'TRANSFER_HANDLER_APPROVED'});
        }
        catch(error){
            console.log(error);
        }
        dispatch({type:'NOT_LOADING'});
    }

    if(!store.loggedIn){
        return(
            <div>
            </div>
            )
    }
    if((!store.transferHandlerApproved)||(!store.purchaseGiftCardApproved)){
        return(
            <div>
                <QRCode value={"ethereum:"+store.address} bgColor="#FEEBC8" fgColor="#1D4044"/>
                <Text fontSize="96px" fontWeight="600" color="teal.900">◈ {store.tokenBalance} </Text>
                <Text fontSize="3xl" color="red.900" fontWeight="600"> Approval Needed to Proceed </Text>
                <Button onClick={approvePurchaseGiftCard} isDisabled={store.purchaseGiftCardApproved} leftIcon="lock" bg="red.700" color="orange.200">Approve Purchase Gift Card</Button><br></br><br></br>
                <Button onClick={approveTransferHandler} isDisabled={store.transferHandlerApproved} leftIcon="lock" bg="red.700" color="orange.200">Approve ERC20 Forwarder</Button><br></br><br></br>
            </div>
        )
    }
    return(
    <div>
        <QRCode value={"ethereum:"+store.address} bgColor="#FEEBC8" fgColor="#1D4044"/>
        <Text fontSize="72px" fontWeight="600" color="teal.900">◈ {store.tokenBalance} </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl" color="teal.900" fontWeight="600"> Amount To Send</Text>
        <Input type="number" name="amount" ref={register({min:0})} placeholder="e.g 420.69" size="lg"/><br></br>
        <Button type="submit" w="100%" leftIcon="arrow-right" bg="teal.700" color="orange.200">Send</Button>
        </form>
    </div>
    )
}

export default TokenSend;
