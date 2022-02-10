import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { FiPlus, FiMinus } from 'react-icons/fi';

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

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    headers: {
      
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': '285158cd27msh0fe6544cba309c6p1fdc93jsnd10abf312a45'
    }
  };

  useEffect(() => {
    axios.request(options).then((response) => {
      setExchangeData(response.data);
      //console.log(response.data);
    })
    .catch((err) => {
        setError(err);
      })

  });


  const exchangeList = exchangeData?.data?.exchanges;


  if (error) return <h4 style={{ color: "darkorange" }}>Error...</h4>

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
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
        <div className='col text-primary'>22h Vol</div>
        <div className='col text-primary'>Markets</div>
        <div className='col text-primary'>Change</div>
      </div>
      {exchangeList && exchangeList.map((exchange, index) => (
        <div className='col table table-hover' key={index}>
          <span>
            <div className="row row-cols-5">
              <div className='col'>
                <h6><strong>{exchange.rank}</strong></h6>
                <Img className='exchange-image' src={exchange.iconUrl} />
                <p><strong>{exchange.name}</strong></p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.volume)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.numberOfMarkets)}</p>
              </div>
              <div className='col'>
                <p>$&nbsp;{millify(exchange.marketShare)}</p>
              </div>
              <div className="Col minusPlus" onClick={() => toggle(index)} key={index}>
                <span>{clicked === index ? (<FiMinus />) : (<FiPlus />)}</span>
              </div>
            </div>
            {clicked === index ? (
              HTMLReactParser(exchange.description || '')
            ) : (null)}
          </span>
        </div>
      ))};
    </div>
  )
}

export default Exchanges;
