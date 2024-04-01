const { Web3 } = require('web3');

async function listenForPairCreatedEvents() {
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

    factoryContract.events.PairCreated({})
        .on('data', event => {
            // console.log("New Pair Detected");
            console.log("event created", event)
            // console.log("------------------------------------");
            console.log("Transaction tx", event.transactionHash)
         
            console.log("------------------------------------");
            console.log("New Pair Detected");
            console.log("Token 0:", event.returnValues.token0);
            console.log("Token 1:", event.returnValues.token1);
            console.log("Pair Address:", event.returnValues.pair);
            console.log("------------------------------------");
        })      
}

listenForPairCreatedEvents();