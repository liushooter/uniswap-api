// import { ChainId, Token, WETH, Fetcher } from '@uniswap/sdk'

// const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// // note that you may want/need to handle this async code differently,
// // for example if top-level await is not an option
// const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])


"use strict";

var _sdk = require("@uniswap/sdk");

const DAI = new _sdk.Token(_sdk.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18); // note that you may want/need to handle this async code differently,

async function getPrice() {
  const pair = await _sdk.Fetcher.fetchPairData(DAI, _sdk.WETH[DAI.chainId]);
  const route = new _sdk.Route([pair], _sdk.WETH[DAI.chainId]);

  console.log(route.midPrice.toSignificant(6));
  console.log(route.midPrice.invert().toSignificant(6));
}

// getPrice()


async function getExecutionPrice(){ // 执行价
    const pair = await _sdk.Fetcher.fetchPairData(DAI, _sdk.WETH[DAI.chainId]);
    const route = new _sdk.Route([pair], _sdk.WETH[DAI.chainId]);
    const trade = new _sdk.Trade(route, new _sdk.TokenAmount(_sdk.WETH[DAI.chainId], '1000000000000000000'), _sdk.TradeType.EXACT_INPUT);

    console.log(trade.executionPrice.toSignificant(6)); // 641.896
    console.log(trade.nextMidPrice.toSignificant(6)); // 643.821
}

// getExecutionPrice()

async function getOWLPrice(){
    const OWL = new _sdk.Token(_sdk.ChainId.MAINNET, '0x1a5f9352af8af974bfc03399e3767df6370d82e4', 18); // note that you may want/need to handle this async code differently,
    const pair = await _sdk.Fetcher.fetchPairData(OWL, _sdk.WETH[DAI.chainId]);
    const route = new _sdk.Route([pair], _sdk.WETH[DAI.chainId]);

    console.log(route.midPrice.toSignificant(6));
    console.log(route.midPrice.invert().toSignificant(6));
}


getOWLPrice()