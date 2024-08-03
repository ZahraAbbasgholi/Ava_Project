import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';


const TextItem = ({ content }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchedItem, setMatchedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('simple');
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const [rows, setRows] = React.useState([]);
  // let matchedSegments = [];
  const [matchedSegments, setmatchedSegments] = useState([]);


  // console.log(content);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/requests/', {
        headers: {
          Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196',
        },
      });
      // console.log(response.data.results);
      setmatchedSegments(response.data.results.find(item => item.url === content).segments);
      console.log(matchedSegments);

      if (response.data && Array.isArray(response.data.results)) {
        console.log(response.data.results);
        setRows(response.data.results);
      } else {
        console.error('Received data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     console.log(content);

  //     try {
  //       const response = await axios.post('/api/search/',
  //         { query: content }, 
  //         {
  //           headers: {
  //             Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196', 
  //             'Content-Type': 'application/json', 
  //           },
  //           data: {
  //             media_url: content,
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       setResults(response.data);

  //       // let matched = response.data.find(item => item.media_url === content);
  //       console.log(response.data.find(item => item.media_url === content));
  //       setMatchedItem(response.data.find(item => item.media_url === content));
  //       console.log(matchedItem);
  //     }
  //     catch (err) {
  //       setError('خطا در دریافت نتایج جستجو');
  //       console.error('Error searching:', err);
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [content]);

  // if (loading) {
  //   return <div style={{ fontFamily:'Yekan' }}>در حال بارگذاری...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const convertTimeToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(parseFloat);
    return minutes * 60 + seconds;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleTimeUpdate();
    }, 100); // Update every 100ms for smoother highlighting

    return () => clearInterval(interval);
  }, []);


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
              fontFamily: 'Yekan',
              gap: '3px',
            }}
            className='icons-style'
          >
            <span className="material-symbols-outlined"
              style={{ fontSize: '15px' }}>format_align_right</span>
            متن ساده
          </button>
          <button
            onClick={() => setActiveTab('timed')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'timed' ? 'white' : 'white',
              color: activeTab === 'timed' ? 'black' : '#969696',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Yekan',
              gap: '3px',
            }}
            className='icons-style'
          >
            <span className="material-symbols-outlined"
              style={{ fontSize: '15px' }}>schedule</span>
            متن زمان‌بندی شده
          </button>
        </div>

        {activeTab === 'simple' && (
  <div>
    <div style={{ display:'ruby-text', textAlign:'right' }}>
    {matchedSegments.map((item, itemIndex) => {
      const segmentStart = convertTimeToSeconds(item.start);
      const segmentEnd = convertTimeToSeconds(item.end);
      const isActive = currentTime >= segmentStart && currentTime <= segmentEnd;

      return (
        <span
          key={itemIndex}
          style={{ textAlign: 'right', marginRight: '30px'}}
        >
          <p
            // key={itemIndex}
            style={{
              color: isActive ? '#FF1654' : 'black',
              transition: 'color 0.5s ease',
            }}
          >
            <span>{item.text}</span>
          </p>
        </span>
      );
    })}
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <audio
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={content} type="audio/mpeg" />
        مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
      </audio>
    </div>

  </div>
)}




        {activeTab === 'timed' && (
          <div>
            {matchedItem && (
              <div style={{ textAlign: 'right', marginRight: '30px' }}>
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