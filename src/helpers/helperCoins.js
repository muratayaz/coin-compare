import coinsData from "../models/Coins.json";
import coinsDataBinance from "../models/BinanceCoins.json";

let coinsParibu = [];
let coinsBinance = [];
let coinsBinanceUSD = [];
let trade = [];
let USDT = 0;

const handleBinanceCoins = (coins) => {
  coinsBinance = [];
  coinsBinanceUSD = [];

  USDT = 0;
  coins.find((coin) => {
    if (coin.symbol === "USDTTRY") {
      USDT = parseFloat(coin.lastPrice);
    }
  });
  convertCoinsPriceToTl(coins);

  coins.map((coin) => {
    if (coin.symbol.includes("TRY")) {
      let coinName = coin.symbol.split("TRY");
      if (!coinsBinance[coinName[0]]) {
        if (coinsData.some((x) => x.name === coinName[0])) {
          coinsBinance.push({
            coinName: coinName[0],
            sellPrice: parseFloat(coin.askPrice),
            buyPrice: parseFloat(coin.bidPrice),
          });
        }
      }
    }
  });
  coinsBinance.splice(2, 0, ...coinsBinanceUSD);
  coinsBinance.sort((a, b) => parseFloat(b.buyPrice) - parseFloat(a.buyPrice));
};

const handleParibuCoins = (coins) => {
  coinsParibu = [];

  for (let coin in coins) {
    if (coin.includes("TL")) {
      let coinName = coin.split("_TL");
      if (!coinsParibu[coinName[0]]) {
        if (coinsData.some((x) => x.name === coinName[0])) {
          const lowestAsk = parseFloat(coins[coin]["lowestAsk"]);
          const highestBid = parseFloat(coins[coin]["highestBid"]);
          coinsParibu.push({
            coinName: coinName[0],
            sellPrice: parseFloat(lowestAsk),
            buyPrice: parseFloat(highestBid),
          });
        }
      }
    }
  }
  coinsParibu.sort((a, b) => parseFloat(b.buyPrice) - parseFloat(a.buyPrice));
};

const convertCoinsPriceToTl = (coins) => {
  coins.map((coin) => {
    if (coin.symbol.includes("USDT")) {
      let coinName = coin.symbol.split("USDT");
      if (coinsDataBinance.some((x) => x.name === coinName[0])) {
        coinsBinanceUSD.push({
          coinName: coinName[0],
          sellPrice: parseFloat(coin.askPrice * USDT),
          buyPrice: parseFloat(coin.bidPrice * USDT),
        });
      }
    }
  });
};

const compareCoins = (paribu, binance) => {
  trade = [];

  binance.map((binanceCoin) => {
    let puan = "";
    let buy = "";
    let sell = "";
    let buyPrice = "";
    let sellPrice = "";
    let betterBinance = "";
    let betterParibu = "";
    const paribuCoin = paribu.find((x) => x.coinName === binanceCoin.coinName);

    betterBinance =
      ((paribuCoin.buyPrice - binanceCoin.sellPrice) * 100) /
      binanceCoin.sellPrice;
    betterParibu =
      ((binanceCoin.buyPrice - paribuCoin.sellPrice) * 100) /
      paribuCoin.sellPrice;

    if (betterBinance > betterParibu) {
      puan = betterBinance;
      buy = "BINANCE";
      sell = "PARIBU";
      buyPrice = binanceCoin.sellPrice;
      sellPrice = paribuCoin.buyPrice;
    } else {
      puan = betterParibu;
      buy = "PARIBU";
      sell = "BINANCE";
      buyPrice = paribuCoin.sellPrice;
      sellPrice = binanceCoin.buyPrice;
    }
    trade.push({
      key: Math.random().toString(6).substr(2, 9),
      coinName: binanceCoin.coinName,
      puan: parseFloat(puan).toFixed(4),
      buy: buy,
      sell: sell,
      buyPrice: parseFloat(buyPrice).toFixed(4),
      sellPrice: parseFloat(sellPrice).toFixed(4),
    });
  });
  trade.sort((a, b) => parseFloat(b.puan) - parseFloat(a.puan));
};
export const compare = (binance, paribu) => {
  handleBinanceCoins(binance);
  handleParibuCoins(paribu);
  compareCoins(coinsParibu, coinsBinance);
  return trade;
};
