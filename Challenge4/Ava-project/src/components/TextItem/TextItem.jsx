import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  setMatchedSegments,
  setActiveTab,
  setCurrentTime,
  setError,
} from '../..actions';

const TextItem = ({ content }) => {

  // const dispatch = useDispatch();
  // const {
  //   results,
  //   loading,
  //   error,
  //   matchedSegments,
  //   activeTab,
  //   currentTime,
  //   matchedItem,
  // } = useSelector((state) => state.textItem);

  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [matchedItem, setMatchedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('simple');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      console.log(content);

      try {
        const response = await axios.post('/api/search/',
          { query: content }, 
          {
            headers: {
              Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196', 
              'Content-Type': 'application/json', 
            },
            data: {
              media_url: content,
            },
          }
        );
        console.log(response.data);
        setResults(response.data);
        
        // let matched = response.data.find(item => item.media_url === content);
        console.log(response.data.find(item => item.media_url === content));
        setMatchedItem(response.data.find(item => item.media_url === content));
        console.log(matchedItem);
      }
      catch (err) {
        setError('خطا در دریافت نتایج جستجو');
        console.error('Error searching:', err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [content]);

  if (loading) {
    return <div style={{ fontFamily:'Yekan' }}>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <>
      {/* {matchedItem && (
        <div style={{ fontFamily:'Yekan' }}>
          <h3>نتیجه مطابق:</h3>
          <pre>{JSON.stringify(matchedItem, null, 2)}</pre>
        </div>
      )}
      {results.length > 0 && !matchedItem && (
        <div>
          <h3>نتایج جستجو:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>{result.title}</strong>: {result.description}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      <div style={{ fontFamily: 'Yekan', padding: '20px', direction: 'rtl' }}>
      <div className='header-tab' style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={() => setActiveTab('simple')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'simple' ? 'white' : '#white',
            color: activeTab === 'simple' ? 'black' : '#969696',
            border: 'none',
            cursor: 'pointer',
            fontFamily:'Yekan',
            gap: '3px',
          }}
          className='icons-style'
        >
          <span className="material-symbols-outlined"
          style={{ fontSize:'15px'}}>format_align_right</span>
          متن ساده
        </button>
        <button
          onClick={() => setActiveTab('timed')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'timed' ? 'white' : '#white',
            color: activeTab === 'timed' ? 'black' : '#969696',
            border: 'none',
            cursor: 'pointer',
            fontFamily:'Yekan',
            gap: '3px',
          }}
          className='icons-style'
        >
          <span className="material-symbols-outlined"
          style={{ fontSize:'15px'}}>schedule</span>
          متن زمان‌بندی شده
        </button>
      </div>

      {activeTab === 'simple' && (
        <div>
          {matchedItem && (
            <div style={{ textAlign: 'right', marginRight: '30px' }}>
              <p>{matchedItem.segments[0].segment.text || 'متنی یافت نشد.'}</p>
            </div>
          )}
          {results.length > 0 && !matchedItem && (
            <div>
              <h3>نتایج جستجو:</h3>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    <strong>{result.title}</strong>: {result.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'timed' && (
        <div>
          {matchedItem && (
            <div>
              <h3>متن زمان‌بندی شده:</h3>
              <pre>{JSON.stringify(matchedItem.timedText, null, 2)}</pre>
            </div>
          )}
          {!matchedItem && (
            <div>هیچ متنی برای نمایش وجود ندارد.</div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default TextItem;