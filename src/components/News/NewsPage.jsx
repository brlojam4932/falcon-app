import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import News from './News';
import styled from 'styled-components';
import coinGecko from '../Utility/coinGecko';


const StyledHeaderNews = styled.header`  
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;


function NewsPage() {
  //-------news----------------
  const [getNews, setNewsData] = useState(null); 
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [coinListData, setCoinListData] = useState([]);

  const searchCrypto = newsCategory;
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: searchCrypto,
      count: '20',
      freshness: 'Week',
      textFormat: 'Raw',
      safeSearch: 'Off'
    },
    headers: {
      'user-agent': 'cryptonews',
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
    }
  };

  //----------GET NEWS------------------

  async function getNewsList() {
    //setLoading(true);
   axios.request(options).then((response) => {
    setNewsData(response.data);
     //console.log(data);
   })
   .catch((err) => {
     setError(err);
   })
  };


  // get news from news api
  useEffect(() => {
    if(coinListData.length === 0) {
      getNewsList();
    };
    return () => {
      console.log("cleanup")
    }
  });


  const refetch = () => { // trigger the api call with refetch (re-fresh)
    //setLoading(true);
    axios.request(options).then((response) => {
      setNewsData(response.data);
      //console.log(response);
    })
    .catch((err) => {
      setError(err);
    })
  };


  //-------------get news end -------------------

  // get coin list from coin api
  async function getCoinList() {
    try {
      const res = await coinGecko.get('coins');
      //console.log("response:", res);
      setCoinListData(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getCoinList();
    return () => {
      console.log("cleanup")
    }
  }, []) // component did mount for coin list


  // filter coins ---------------------------
  const inputRef = useRef(null);

  const handleOnClick = () => {
    setNewsCategory(inputRef.current.value);
    console.log(inputRef.current.value);
  }

  const filterOption = coinListData.filter((option) => {
    return option.name === coinListData;
  });


  useEffect(() => {
    console.log("filter option");
  }, [filterOption]);


//if (loading) return console.log("...loading");
if (error) return console.log('...error');


  //------news--end-----------------

  return (
    <div className='container-fluid'>
      <StyledHeaderNews>
        <h2>Crypto News</h2>
        <h5 className="text-primary">News about crypto currencies world-wide.</h5>
      </StyledHeaderNews>
      <br />
      <br />
      <div className='row'>
        {coinListData && (
          <div className='select-crypto'>
            <div className='select-crypto-btn'>
               <button type="button" className="btn btn-outline-warning" onClick={refetch}>Select and Submit Crypto News</button>
            </div>
            <div>
              <div className="form-group">
                <label for="exampleSelect1" className="form-label mt-4"></label>
                <select
                  className="form-select" style={{ width: "25%" }}
                  id="exampleSelect1"
                  value={newsCategory}
                  onChange={handleOnClick}
                  ref={inputRef}
                >
                  {coinListData.map((currency) => <option value={currency.name}>{currency.name}</option>)}
                </select>
              </div>
            </div>
            <br />
          </div>
        )}
        {getNews && getNews.value.map((news, index) => {
          return (
            <News key={index}
              name={news.name}
              description={news.description}
              url={news.url}
              image={news.image}
              provider={news.provider}
              datePublished={news.datePublished}
            />
          )
        })};
      </div>
    </div>
  )
}

export default NewsPage;
