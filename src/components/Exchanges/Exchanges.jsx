import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import styled from 'styled-components';
import millify from 'millify';
//import HTMLReactParser from 'html-react-parser';
import { FiPlus, FiMinus } from 'react-icons/fi';
import coinGecko from '../Utility/coinGecko';

const Img = styled.img`
max-width: 33px
`;

const StyledHeader = styled.header`  
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;


function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]);

  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  const componentDidMount2 = async () => {
    try {
      const response = await coinGecko.get('exchanges')
      const exchangeData = response.data.slice(0, 20).map((exchange) => {
        return {
          key: exchange.id,
          image: exchange.image,
          name: exchange.name,
          url: exchange.url,
          description: exchange.description,
          rank: exchange.trust_score_rank,
          volume: millify(exchange.trade_volume_24h_btc),
          year: exchange.year_established,
          country: exchange.country
        }
      });
      setExchangeData(exchangeData);

    } catch (error) {
      //console.log(error);
      setError(error);
    }
  }

  // for clean-up code from https://youtu.be/0ZJgIjIuY7U
  useEffect(() => {
    if (exchangeData.length === 0) {
      componentDidMount2();
    }
  });


  if (error) return <h4 style={{ color: "darkorange" }}>Error...</h4>


  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
    //console.log("clicked", index);
  }



  return (
    <div className="container">
      <StyledHeader>
        <h2>Cryptocurrency Exchanges Stats</h2>
        <h5 className="text-primary">Find out more about major exchanges here.</h5>
      </StyledHeader>
      <br />
      <br />
      <div className="row row-cols-5">
        <div className="col"></div>
        <div className='col text-primary'>24h Vol in BTC</div>
        <div className='col text-primary'>Year Established</div>
        <div className='col text-primary'>Country</div>
      </div>
      {exchangeData && exchangeData.map((exchange, index) => (
        <div className='col table table-hover' key={index}>
          <span>
            <div className="row row-cols-5">
              <div className='col'>
                <h6><strong>{exchange.rank}</strong></h6>
                <Img className='exchange-image' src={exchange.image} />
                <p><strong>{exchange.name}</strong></p>
              </div>
              <div className='col'>
                <p>$&nbsp;{exchange.volume}</p>
              </div>
              <div className='col'>
                <p>{exchange.year}</p>
              </div>
              <div className='col'>
                <p>{exchange.country}</p>
              </div>
              <div className="Col minusPlus" onClick={() => toggle(index)} key={index}>
                <span>{clicked === index ? (<FiMinus />) : (<FiPlus />)}</span>
              </div>
            </div>
            <div className='text-muted'>
              {clicked === index ? (
                exchange.description || <a href={exchange.url}>Link to {exchange.name}</a>
              ) : (null)}
            </div>
          </span>
        </div>
      ))}
    </div>
  )
}

export default Exchanges;
