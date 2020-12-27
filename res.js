var request = require('request');

// https://uniswap.org/docs/v2/API/queries/#all-pairs-in-uniswap
var query1 = `
{
   pairs(first: 1, skip: 3) {
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

var query = `
{
   pairs(first: 10, skip: 10) {
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

var options = {
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
request(options, function (error, response) {
  if (error) {throw new Error(error)};

  var body = response.body;
//   var obj = JSON.parse(body)
//   console.log(obj['data']);

console.log(body);
});
