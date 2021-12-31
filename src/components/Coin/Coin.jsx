import React, { useState } from 'react';
import styled from 'styled-components';
// imp tab
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import PopUp from './PopUp';
import CoinDetailsPage from '../chart/CoinDetailsPage';
import Progress from './Progress';
//import millify from 'millify';


// table
const Td = styled.td`
  background-color: #222324;
`;
// actions
const TdControls = styled(Td)`

`;

// space for coin names
const TdName = styled(Td)`
  with: 24vw;
`;

// buy / sell refresh button size
const Button = styled.button`
  font-size: 13px;
  width: 75px;
  margin: 3px 5px 0;
`;


const TradeInput = styled.input`
width: 100%;
height: 13%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 2px solid #464646;
border-radius: 4px;
box-sizing: border-box;
background-color: #222;
color: white;
`

const Img = styled.img`
  max-width: 33px
`

// LIFT THE STATE UP

//rcc tab for class-based component
// here we rewrite a component into a functional component

function Coin(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);


  const handleRefresh = (event) => {
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }


  const handleBuyClick = (event) => {
    event.preventDefault();
    props.handleBuy(props.tickerId, props.buyInputValue);

  }

  const handleSellClick = (event) => {
    event.preventDefault();
    props.handleSell(props.tickerId, props.buyInputValue);
  }


  const handleClose = () => {
    setModalIsOpen(false);
    props.setInsufficientUsdBalMessage(false);
    props.setInsufficientTokenBalMessage(false);
    props.setIsBuy(false);
    props.setIsSold(false);
  }



  return (
    <>
      <tr>
        {/* table name, price, percentage change, actions */}
        <Td><Img src={props.image} alt="logo-art" /></Td>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>$&nbsp;{props.price}</Td>
        <Td>{props.percentChange24h < 0 ? (
          <span className="align-middle mr-1 coin-percent red">
            {props.percentChange24h}%
          </span>
        ) : (
          <span className="align-middle mr-1 coin-percent green">
            {props.percentChange24h}%
          </span>
        )}</Td>
        <Td>{props.percentChange7d < 0 ? (
          <span className="align-middle mr-1 coin-percent red">
            {props.percentChange7d}%</span>
        ) : (
          <span className="align-middle mr-1 coin-percent green">
            {props.percentChange7d}%
          </span>
        )}
        </Td>
        <Td>{props.percentChange1y < 0 ? (
          <span className="align-middle mr-1 coin-percent red">
            {props.percentChange1y}%</span>
        ) : (
          <span className="align-middle mr-1 coin-percent green">
            {props.percentChange1y}%
          </span>
        )}
        </Td>
        <Td>{props.showBalance ? props.balance : "****"}</Td>
        {/* actions */}
        <TdControls>
          <form action="#">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button className="btn btn-outline-success btn-lg" onClick={() => setModalIsOpen(true)} >Trade</Button>
              <Button className="btn btn-outline-primary btn-lg" onClick={handleRefresh}>Refresh</Button>
              <Button className='btn btn-outline-info btn-lg' type='button' onClick={() => setButtonPopup(true)}>Chart</Button>
            </div>

          </form>
        </TdControls>
      </tr>
      {/* pop up/modal */}
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className='bg-black rounded p-3'>
          <CoinDetailsPage
            key={props.key}
            name={props.name}
            id={props.tickerId}
          />
        </div>
      </PopUp>
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={handleClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className='modal-box'>
          {/* messages for buy/sell */}
          <div>
            <h4 className="text-muted">trade&nbsp;{props.tickerId}</h4>

            {props.insufficientUsdBalMessage &&
              <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
                <strong>Insufficient USD Balance!</strong> Transaction not Completed.
              </div>
            }
            {props.insufficientTokenBalMessage &&
              <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
                <strong>Insufficient Token Balance!</strong>Transaction not Completed.
              </div>
            }
            {/* buy/sell */}
            {props.isBuy &&
              <div className="alert alert-dismissible alert-success">
                <Progress done="100" />
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
                <strong>Success!&nbsp;</strong>Your transaction of&nbsp;<strong>{props.tickerId}</strong>&nbsp;is now completed</div>
            }
            {(props.isSold) &&
              <div className="alert alert-dismissible alert-primary">
                <Progress done="100" />
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={handleClose}></button>
                <strong>Success!&nbsp;</strong>&nbsp;Your transaction of&nbsp;<strong>{props.tickerId}</strong>&nbsp;is now completed</div>
            }
          </div>
          {/* buy/sell input result */}
          {
            <div className="alert alert-dismissible alert-light">
              <h6>
                <strong className='text-muted'>{props.tickerId}</strong>&nbsp;{props.buyInputValue}&nbsp;&nbsp;<strong className='text-muted'>USD:&nbsp;$&nbsp;</strong>{props.price * props.buyInputValue}
              </h6>

            </div>
          }
          <TradeInput id="buyInput"
            type="number"
            required
            placeholder='Amount'
            onChange={(e) => props.setBuyInputValue(+e.target.value)}>
          </TradeInput>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button className="btn btn-success btn-lg" onClick={handleBuyClick}>Buy</Button>
            <Button className="btn btn-primary btn-lg" onClick={handleSellClick}>Sell</Button>
            <Button className="btn btn-outline-secondary btn-lg" onClick={handleClose}>Close</Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Coin;