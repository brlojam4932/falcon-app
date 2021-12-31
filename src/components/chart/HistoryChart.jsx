import React, { useRef, useEffect, useState } from 'react';
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";
import HTMLReactParser from 'html-react-parser';

function HistoryChart({ data }) {
  const ChartRef = useRef();
  // we need to create a new chart...we use useEffect
  // we must pass ctx and configs

  const { day, week, year, detail, about } = data;
  const [timeFormat, setTimeFormat] = useState("24h");


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    };
  };
  console.log("timeFormat: ", timeFormat);

  useEffect(() => { //we create a new chart
    if (ChartRef && ChartRef.current && detail && about) {
      new Chartjs(ChartRef.current, {
        type: 'line',
        data: {
          datasets: [
            {
              label: "Prices",
              data: determineTimeFormat(),
              borderColor: "rgb(4, 98, 199)",
              pointRadius: 0,
              borderWidth: 3
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  }); // no need to add an array []...this will prevent timeFormat to return new values


  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">
            {detail.market_cap_rank}&nbsp;
            {detail.name}&nbsp;
            $&nbsp;{detail.current_price.toFixed(2)}</p>
          <p className={
            detail.price_change_24h < 0
              ? "text-danger my-0"
              : "text-success my-0"
          }
          >{detail.price_change_percentage_24h.toFixed(2)}&nbsp;%</p>
        </>
      )
    };
  };

  // info about each coin from api
  const renderInfo = () => {
    if (detail) {
      return (
        <p className="text-muted">{HTMLReactParser(about.description.en.substring(0, 1000))}...</p>
      )
    }
  }


  return (
    <>
      <div className='bg-black rounded p-3'>
        <h4>{renderPrice()}</h4>
        <div>
          <canvas ref={ChartRef} id="myChart" width="400" height="300"></canvas>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end  ">
          <button onClick={() => setTimeFormat("24h")} className="btn btn-outline-warning btn-small">24hr</button>
          <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-warning mx-1 btn-small">7d</button>
          <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-warning btn-small">1y</button>
        </div>
      </div>
      <div style={{textAlign: "left"}}>
        <h6>About{renderInfo()}</h6>
      </div>
    </>
  );
};

export default HistoryChart;
