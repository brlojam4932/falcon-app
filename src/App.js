import React, { useState, useEffect } from 'react';
import CoinList from "./components/CoinList/CoinList";
import AccountBalance from './components/AccountBalance/AccountBalance';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "fontawesome-free/js/all.js";
import Navbar from './components/ExchangeHeader/Navbar';
import Exchanges from './components/Exchanges/Exchanges';
import NewsPage from './components/News/NewsPage';
import Footer from './components/Exchanges/Footer';
//instructor: zsolt-nagy

// bkg area for table
const Div = styled.div`
text-align: center;
background-color: #000000;
color: #ccc;`;

// UTILITY FUNCTIONS 
const TOTAL_COINS = 100;
const formatPrice = price => parseFloat(Number(price).toFixed(4));
const formatPercentage24h = percentChange24h => parseFloat(Number(percentChange24h).toFixed(2));
const formatPercentage7d = percentChange7d => parseFloat(Number(percentChange7d).toFixed(2));
const formatPercentage1y = percentChange1y => parseFloat(Number(percentChange1y).toFixed(2));

function App() {
  const [accountBalance, setAccountBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [buyInputValue, setBuyInputValue] = useState(1);
  const [insufficientUsdBalMessage, setInsufficientUsdBalMessage] = useState(false);
  const [insufficientTokenBalMessage, setInsufficientTokenBalMessage] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [isSold, setIsSold] = useState(false);
  //const [visible, setVisible] = useState(10);

  // read about Temporal Deadzone
  const componentDidMount = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets/', {
        params: {
          vs_currency: 'usd',
          ids: '',
          price_change_percentage: "24h,7d,1y"
        }
      })
      const coinData = response.data.slice(0, TOTAL_COINS).map((coin) => {
        return {
          key: coin.id,
          image: coin.image,
          name: coin.name,
          ticker: coin.symbol,
          balance: 0,
          price: formatPrice(coin.current_price),
          rank: coin.market_cap_rank,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          maxSupply: coin.max_supply,
          volume: coin.total_volume,
          marketCap: coin.market_cap,
          priceChange24h: coin.price_change_24h,
          percentChange24h: formatPercentage24h(coin.price_change_percentage_24h),
          percentChange7d: formatPercentage7d(coin.price_change_percentage_7d_in_currency),
          percentChange1y: formatPercentage1y(coin.price_change_percentage_1y_in_currency)
        }
      });
      setCoinData(coinData);

    } catch (error) {
      console.log(error);
    }
  }

   // for clean-up code from https://youtu.be/0ZJgIjIuY7U
   useEffect(() => {
    if (coinData.length === 0) {
      componentDidMount();
    }
  });

  

  const handleBrrr = () => {
    setAccountBalance(prevBalance => prevBalance + 1200);
  }



  const handleToggleChange = () => {
    setShowBalance(prevValue => !prevValue);
  }



  // create isBuy and valueChangId args
  const handleBuy = async (valueChangeId, amountValue) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    //console.log("Response: ", response);
    const newPrice = response?.data?.[0]?.current_price;
    //console.log("New Price: ", newPrice);
    const newCoinData = coinData.map((values) => { // copy coinData values into newCoinData, newValues
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue);
        let newAccountBalance = accountBalance - (newPrice * amountOfCoin);
        if (newAccountBalance > 0 && amountValue > 0) {
          setAccountBalance(newAccountBalance);
          newValues.balance += amountOfCoin; // if account bal conditions are met, newValues.balance = newValues.balance + amountOfCoin
          setIsBuy(true);
          setInsufficientUsdBalMessage(false);

        }
        else {
          setIsBuy(false);
          setInsufficientUsdBalMessage(true);

        }
      };
      return newValues;
    });
    setCoinData(newCoinData);
  }


  const handleSell = async (valueChangeId, amountValue) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    const newPrice = response?.data?.[0].current_price; // get current price from api
    const newCoinData = coinData.map((values) => { // newCoinData will equal coinData copied as new values into an Object
      //copy values into newValues using spread operator
      let newValues = { ...values }; // we have our Object: newValues = {id: name, price: current_price}
      // if clicked "id" - matches the values.key, then let amountOfCoin equal; amountValue (amount of coins to sell), parseFloat...converterd from JSON string to integers
      if (valueChangeId === values.key) {
        let amountOfCoin = parseFloat(amountValue); //ex. {id: bitcoin, price: 44000}
        // update newAccountBalance: we are selling so we mult the newPrice * the amount of coins and add that to our newAccountBalance. Then return newValues
        let newAccountBalance = accountBalance + (newPrice * amountOfCoin);
        // but also add a condition: amount of coin must be less than the newValues.balance...cannot sell what you don't have
        if (amountOfCoin <= newValues.balance) {
          // update the state: setNewAccountBalance -> to newAccountBalance
          setAccountBalance(newAccountBalance);
          // set the newValues.balance equal newValues.balance - the amount Of Coin sold.
          newValues.balance -= amountOfCoin; // if these conditions met, make the sell: setIsSold = true and amount of coins will be deducted while value will be added to newAccountBalance
          // also set insufficient token bal to false if newValues.balance is positive
          setIsSold(true);
          setInsufficientTokenBalMessage(false);
        } else {
          // ...set sold to false and setInsuffient token bal to true
          setIsSold(false);
          setInsufficientTokenBalMessage(true);
        }
      };
      return newValues; // newValues returned
    }); // finally, setCoinData to newCoinData. (newCoinData is the current price from the api)
    setCoinData(newCoinData);
  }


  const handleRefresh = async (valueChangeId) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=${valueChangeId}`);
    const newPrice = response?.data?.[0].current_price; // get current price from api
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values }; // shallow cloning / deep copy
      if (valueChangeId === values.key) {
        //manipulate price here
        newValues.price = newPrice;
      }
      return newValues;
    });
    // this.setState(prevState => {}) one way to write the new state
    setCoinData(newCoinData);
  }



  return (
    <>
      <Router>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Div className="App">
                <ExchangeHeader />
                <AccountBalance
                  amount={accountBalance}
                  showBalance={showBalance}
                  handleBrrr={handleBrrr}
                  handleToggleChange={handleToggleChange}
                />
                 <div className='show-amount'>
                  <h5 className="text-muted" >Top&nbsp;{coinData.length}&nbsp;coins</h5>
                </div>
                <CoinList
                  coinData={coinData}
                  showBalance={showBalance}
                  handleBuy={handleBuy}
                  handleSell={handleSell}
                  handleRefresh={handleRefresh}
                  buyInputValue={buyInputValue}
                  setBuyInputValue={setBuyInputValue}
                  insufficientUsdBalMessage={insufficientUsdBalMessage}
                  setInsufficientUsdBalMessage={setInsufficientUsdBalMessage}
                  insufficientTokenBalMessage={insufficientTokenBalMessage}
                  setInsufficientTokenBalMessage={setInsufficientTokenBalMessage}
                  isBuy={isBuy}
                  setIsBuy={setIsBuy}
                  isSold={isSold}
                  setIsSold={setIsSold}
                />
                <Footer />

              </Div>
            </Route>
            <Route path="/newsPage">
              <NewsPage />
            </Route>
            <Route path="/exchanges">
              <Exchanges />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}


export default App;