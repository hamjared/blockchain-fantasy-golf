import CryptoZombiesContract from "../contract_ABI/League.json";
import store from "../redux/store";

//import blockchainInitialized from "../redux/modules/czAppDuck";  // for some unknown reason, the duck doesn't work!
// so use this action type and creator instead

export const BLOCKCHAIN_INITIALIZED = "BLOCKCHAIN_INITIALIZED"; // action type

// action creator (dispatch sends this to redux reducer)
function blockchainInitialized(data) {
  return {
    type: BLOCKCHAIN_INITIALIZED,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user zombie count.  Put into redux store.
//

async function initBlockchain(web3) {
  // Use web3 to get the user's accounts.
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];
  web3.eth.gas=100000
  // Get contract instance
  const networkId = 5777;
  //const networkId = await web3.eth.net.getId();
  const deployedNetwork = CryptoZombiesContract.networks[networkId];
  const instance = new web3.eth.Contract(
    CryptoZombiesContract.abi,
    '0x7f1C5B2E5049a430eeC5bc1433A8Bf67333B2454',
  );
  console.log(instance)
  // put state data into the REDUX store for easy access from other pages and components
//deployedNetwork && ''deployedNetwork.address''
  let data = {
    CZ: instance,
    userAddress,    // shorthand
  };

  store.dispatch(blockchainInitialized(data));

  return data;
}

export default initBlockchain;
