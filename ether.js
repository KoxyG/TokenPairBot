// const {ethers} = require("ethers");

// async function listenForPairCreatedEvents() {
//     const NODE_URL = 'wss://ethereum-mainnet.core.chainstack.com/ws/673e14e04acb090649b2f13d15a74b34';
//     const web3 = new ethers(NODE_URL);

//     const UNISWAP_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

//     const factoryContract = new ethers.Contract( UNISWAP_FACTORY_ADDRESS, [
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "token0",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "token1",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "pair",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "PairCreated",
//             "type": "event"
//         }
//     ],web3);

//     factoryContract.on('PairCreated', async(token0, token1, pair) => {
//      console.log(
//           `
//           ..............
//           New pair detected
//           ..............
//           token0: ${token0}
//           token1: ${token1}
//           pair: ${pair}
//           ...............
//           `
//      )
//     })

    
// }

// listenForPairCreatedEvents();