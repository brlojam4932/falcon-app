import React from 'react';
import falconLogo from './falconLogoCol.png';
import styled from 'styled-components';


const LogoImg = styled.img`
  height: 8rem;
  pointer-events: none;
 
  padding: 8px;
  margin: 5px;

`;
// TO MOVE FILES USE GIT MV
// we create a const variable and import the values from the CSS sytling file

const H1 = styled.h1`
  font-size: 3rem;
  line-height: 1rem;
  min-width: 300px;
  padding: 8px;
`;

const H5 = styled.h5`
  font-size: 1.5rem;
  line-height: 1rem;
  min-width: 300px;
  padding: 30px;
`


export default function ExchangeHeader() {

  return (
    <div className='Header'>
      <div className='logo-name'>
        <LogoImg src={falconLogo} alt='React Logo' />
        <H1>Falcon Trades Exchange</H1>
      </div>
      <H5 className="text-primary">Crypto trading, exchanges and news station.</H5>
    </div>
  )

}
