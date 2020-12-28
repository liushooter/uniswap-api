const { ethers } = require("ethers");
const abi = require("./abi")

const alchemyUrl = "https://eth-mainnet.alchemyapi.io/v2/<apikey>"; // https://alchemyapi.io/
let utils = ethers.utils;

// let provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
let provider = new ethers.providers.InfuraProvider();

const blkNum = 11542000;

provider.getBlock(blkNum).then((block) => {
  console.log(block.hash);
});

const contractAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

let contract = new ethers.Contract(contractAddr, abi, provider);

let topic = utils.id("Swap(address,uint,uint,uint,uint,address)");
let topic1 = utils.id("Sync(uint112,uint112)");
let topic2 = utils.id("PairCreated(address,address,address,uint256)");

console.log("topic: ", topic);
console.log("topic1: ", topic1);
console.log("topic2: ", topic2);

let filter = {
  address: contractAddr,
  fromBlock: blkNum,
  topics: [topic]
}

let filter1 = {
    address: contractAddr,
    fromBlock: blkNum,
    topics: [topic1]
  }

let filter2 = {
    address: contractAddr,
    fromBlock: blkNum,
    topics: [topic2]
}

provider.on(filter, function(result) {
  console.log(result);
});

provider.on(filter1, function(result) {
  console.log(result);
});

provider.on(filter2, function(result) {
  console.log(result);
});

// https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#code
