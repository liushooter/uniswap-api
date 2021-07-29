const _ = require('lodash')
const dayjs = require('dayjs')
const request = require('request')

// https://uniswap.org/docs/v2/API/queries/#all-pairs-in-uniswap

const query = `
{
  pools(first: 10, order: {
    desc: createdAtTimestamp
  }) {
    id
    createdAtTimestamp
    liquidity
    txCount
    token0 {
      id
      name
      symbol
    }
    token1 {
      id
      name
      symbol
    }
  }
}
`

const options = {
  'method': 'POST',
  'url': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
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

  const body = response.body
  const obj = JSON.parse(body)
  const data = obj['data']

  const _pools = data['pools']

  const pools = _.orderBy(_pools, ['createdAtTimestamp'], ['desc']);

  let newpools = []
  for (const pool of pools) {
    const createdAtDatetime = dayjs.unix(pool.createdAtTimestamp).format('YYYY-MM-DD HH:mm:ss')
    let item = pool
    item['createdAtDatetime'] = createdAtDatetime
    newpools.push(item)
  }

  console.log(newpools)

});