const { Web3 } = require("web3");

async function listenForPairCreatedEvents() {
  const NODE_URL =
    "wss://ethereum-mainnet.core.chainstack.com/ws/673e14e04acb090649b2f13d15a74b34";
  const web3 = new Web3(NODE_URL);

  const UNISWAP_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const PairAbi = [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getReserves",
      outputs: [
        {
          internalType: "uint112",
          name: "reserve0",
          type: "uint112",
        },
        {
          internalType: "uint112",
          name: "reserve1",
          type: "uint112",
        },
        {
          internalType: "uint32",
          name: "blockTimestampLast",
          type: "uint32",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
      },
  ];

  const ERC20Abi = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
        {
            "name": "",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},];

  const factoryContract = new web3.eth.Contract(
    [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token1",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "pair",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "PairCreated",
        type: "event",
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
        ],
        name: "getPair",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    UNISWAP_FACTORY_ADDRESS
  );

  factoryContract.events.PairCreated({}).on("data", async (event) => {
    console.log("New Pair Detected");
    console.log("------------------------------------");
    console.log("New Pair Detected");
    console.log("Token 0:", event.returnValues.token0);
    console.log("Token 1:", event.returnValues.token1);
    console.log("Pair Address:", event.returnValues.pair);

    const Token0 = event.returnValues.token0;
    const Token1 = event.returnValues.token1;

    factoryContract.methods
      .getPair(Token0, Token1)
      .call()
      .then((pair) => {
        console.log("Pair Address from getPair:", pair);

        if (pair) {
          var pairContract = new web3.eth.Contract(PairAbi, pair);

          pairContract.methods
            .getReserves()
            .call()
            .then((reserves) => {
              console.log("Pair Reserves: ", reserves);

              pairContract.methods.name().call().then((name) => {
                console.log("Pair Name: ", name);
              })
              .catch((error) => {
                console.error("Error fetching name:", error);
              });
            })
            .catch((error) => {
              console.error("Error fetching reserves:", error);
            });
        }

        if(Token0) {
          var token0Contract = new web3.eth.Contract(ERC20Abi, Token0);

          token0Contract.methods
            .name()
            .call()
            .then((name) => {
              console.log("Token 0 Name: ", name);
            })
            .catch((error) => {
              console.error("Error fetching token0 name:", error);
            });
        }

        if(Token1) {
          var token0Contract = new web3.eth.Contract(ERC20Abi, Token1);

          token0Contract.methods
            .name()
            .call()
            .then((name) => {
              console.log("Token 1 Name: ", name);
            })
            .catch((error) => {
              console.error("Error fetching token1 name:", error);
            });
        }
      });
  });
}

listenForPairCreatedEvents();
