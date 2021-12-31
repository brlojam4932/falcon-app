import React from "react";
import millify from 'millify';

const CoinData = (props) => {

  const renderData = () => {
    if (props.data) {
      return (
        <>
          <div className="bg-grey mt-3 rounded p-3 row">
            <div className="col-sm">
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">Market</span>
                <span>{millify(props.data.market_cap)}</span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-date-catergory">
                  Total Supply
                </span>
                <span>{millify(props?.data?.total_supply || 0)}</span>
              </div>
            </div>
            <div className="col-sm">
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">Volume 24h</span>
                <span>{millify(props.data.total_volume)}</span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-date-catergory">
                  High 24h
                </span>
                <span>{millify(props.data.high_24h)}</span>
              </div>
            </div>
            <div className="col-sm">
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">Circulating Supply</span>
                <span>{millify(props.data.circulating_supply)}</span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-date-catergory">
                  low 24h
                </span>
                <span>{props.data.low_24h}</span>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return <div>{renderData()}</div>

};

export default CoinData;
