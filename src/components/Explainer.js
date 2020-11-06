import { Text } from "@chakra-ui/core";

function Explainer({loggedIn}){
    if(loggedIn==false){
    return(
        <div>
            <Text fontSize="3xl">This demo showcases our new ERC20Forwarder system</Text>
            <Text fontSize="xl"><br></br>It allows you to make dApps which charge users for gas in ERC20 tokens, instead of Ether</Text>
            <Text fontSize="3xl">Please login (connect wallet) to proceed :)</Text>
        </div>
    )}
    else{
       return(<div></div>)
    }
}


export default Explainer;