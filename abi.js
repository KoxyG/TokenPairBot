const { Web3 } = require('web3');

async function main() {
  try {
    const NODE_URL = 'wss://ethereum-mainnet.core.chainstack.com/ws/673e14e04acb090649b2f13d15a74b34';
    const web3 = new Web3(NODE_URL);

    const UNISWAP_FACTORY_ADDRESS = '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f';

    const FACTORY_ABI = [{
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "token0", type: "address" },
        { indexed: true, internalType: "address", name: "token1", type: "address" },
        { indexed: false, internalType: "address", name: "pair", type: "address" },
        { indexed: false, internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "PairCreated",
      type: "event",
    }];

    const factoryContract = new web3.eth.Contract(FACTORY_ABI, UNISWAP_FACTORY_ADDRESS);

    if (!factoryContract.events || !factoryContract.PairCreated) {
      throw new Error("PairCreated event not found on the contract");
    }
    console.log("factoryContract.events.PairCreated:", factoryContract.events.PairCreated);

//     factoryContract.events.PairCreated({})
//       .on('data', async (event) => {
//         console.log('Pair created:', event.returnValues.pair);
//       })
//       .on('error', (error) => {
//         console.error("Error while listening to events:", error);
//       });

    console.log("Event listener started.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);
