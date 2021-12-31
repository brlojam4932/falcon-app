import React, {useState, useEffect} from 'react';
import CoinData from './CoinData';
import coinGecko from '../Utility/coinGecko';
import HistoryChart from './HistoryChart';

function CoinDetailsPage(props) {

  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail, about] = await Promise.all([
        coinGecko.get(`/coins/${props.id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1"
          },
        }),
        coinGecko.get(`/coins/${props.id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7"
          },
        }),
        coinGecko.get(`/coins/${props.id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365"
          },
        }),
        coinGecko.get("coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: props.id
          }
        }),
        coinGecko.get(`coins/${props.id}`, { //about each coin...
          params: {
            ids: props.id
          }
        })
      ]);
      //console.log("Results: ", resultsYear);
      //console.log("About: ", about);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
        about: about.data
        //before reconstruction of values...
        //day: resultsDay.data.prices, 
        //week: resultsWeek.data.prices,
        //year: resultsYear.data.prices
      });

      console.log("About: ", Object.values(about));

      setIsLoading(false);
    }

    fetchData();

  }, [props.id]);


  const renderData = () => {
    // render conditionally
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="coinlist">
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    )
  }

  return renderData();

};

export default CoinDetailsPage;
