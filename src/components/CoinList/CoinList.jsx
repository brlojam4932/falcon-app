//rccp
import React, { useState } from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';

const Table = styled.table`
font-size: 1rem;
background-color: #000000;
`;


// rewrite coinlist component into functional component

function CoinList(props) {

  const [search, setSearch] = useState("");


  const filteredCoins = props.coinData.filter(coin => (
    coin.name.toLowerCase().includes(search.toLowerCase())
  ));


  const handleCoinsChange = (e) => {
    setSearch(e.target.value);
  };


  return (
    <>
      <div className="container-fluid">
        <br />
        <br />
        <form className="d-flex">
          <input className="form-control me-sm-2"
            type="text"
            placeholder="Search Coins"
            onChange={handleCoinsChange}
          />
        </form>
        <br />
        <br />
        <Table className="table table-hover">
          <thead>
            <tr className="table-active">
              <th></th>
              <th>Name</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Change 24h</th>
              <th>Change 7d</th>
              <th>Change 1y</th>
              {props.showBalance ? <th>Balance</th> : null}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map(({key, name, ticker, image, price, balance, rank, circulatingSupply,
              totalSupply, maxSupply, volume, marketCap, priceChange24h, percentChange24h,
              percentChange7d, percentChange1y, description}) =>
              <Coin key={key}
                handleRefresh={props.handleRefresh}
                handleBuy={props.handleBuy}
                handleSell={props.handleSell}
                buyInputValue={props.buyInputValue}
                setBuyInputValue={props.setBuyInputValue}
                name={name}
                ticker={ticker}
                image={image}
                showBalance={props.showBalance}
                balance={balance}
                price={price}
                tickerId={key}
                rank={rank}
                circulatingSupply={circulatingSupply}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                volume={volume}
                marketCap={marketCap}
                priceChange24h={priceChange24h}
                percentChange24h={percentChange24h}
                percentChange7d={percentChange7d}
                percentChange1y={percentChange1y}
                description={description}
                insufficientUsdBalMessage={props.insufficientUsdBalMessage}
                setInsufficientUsdBalMessage={props.setInsufficientUsdBalMessage}
                insufficientTokenBalMessage={props.insufficientTokenBalMessage}
                setInsufficientTokenBalMessage={props.setInsufficientTokenBalMessage}
                isBuy={props.isBuy}
                setIsBuy={props.setIsBuy}
                isSold={props.isSold}
                setIsSold={props.setIsSold}
              />
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CoinList;