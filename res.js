const request = require('request');

// https://uniswap.org/docs/v2/API/queries/#all-pairs-in-uniswap
const query1 = `
{
  pairs(first: 3, skip: 0) {
    id
    token0 {
      id
      symbol
      name
      derivedETH
     }

     token1 {
      id
      symbol
      name
      derivedETH
     }

    reserve0
    reserve1
    reserveUSD
    trackedReserveETH
    token0Price
    token1Price
    volumeUSD
    txCount
  }
}
`

const query2 = `
{
  pairs(first: 3, skip: 0) {
    id
    token0 {
       id
       symbol
       name
     }
     token1 {
       id
       symbol
       name
     }
  }
}
`

const query = `
{
  tokens(first: 3, skip: 0) {
    id
    name
    symbol
  }
}
`
const options = {
  'method': 'POST',
  'url': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  'headers': {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: {}
  })
};

request(options, function(error, response) {
  if (error) {
    throw new Error(error)
  };

  const body = response.body;
  const obj = JSON.parse(body);
  const data = obj['data']
  console.log(data);
});