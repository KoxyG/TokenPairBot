const { Web3 } = require('web3');

const NODE_URL = 'wss://ethereum-mainnet.core.chainstack.com/ws/673e14e04acb090649b2f13d15a74b34';
const web3 = new Web3(NODE_URL);

const UNISWAP_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

const factoryContract = new web3.eth.Contract([
     {
       "anonymous": false,
       "inputs": [
         {
           "indexed": true,
           "internalType": "address",
           "name": "token0",
           "type": "address"
         },
         {
           "indexed": true,
           "internalType": "address",
           "name": "token1",
           "type": "address"
         },
         {
           "indexed": false,
           "internalType": "address",
           "name": "pair",
           "type": "address"
         },
         {
           "indexed": false,
           "internalType": "uint256",
           "name": "",
           "type": "uint256"
         }
       ],
       "name": "PairCreated",
       "type": "event"
     }
   ], UNISWAP_FACTORY_ADDRESS);

async function fetchPastEvents() {
  try {
    // Get the latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    
    // Fetch past events up to the latest block
    const events = await factoryContract.getPastEvents('PairCreated', {
      fromBlock: 19540202 ,
      toBlock: latestBlockNumber
    });
    
    console.log("Past events", events);
  } catch (error) {
    console.error("Error fetching events", error);
  }
}

fetchPastEvents();
