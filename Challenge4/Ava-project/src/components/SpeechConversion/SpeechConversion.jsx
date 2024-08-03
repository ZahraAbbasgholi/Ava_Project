import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "./SpeechConversion.css";
import Sidebar from '../Sidebar/Sidebar';
import Language from '../language/language';
import { Tabs, Tab } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/card";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { transcribeMediaUrl } from '../ApiConfig/ApiConfig';
import { transcribeMediaFile } from '../ApiConfig/ApiConfig';
import TextItem from '../TextItem/TextItem';


const VisuallyHiddenInput = styled('input')({
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const SpeechConversion = () => {

  const [activeTab, setActiveTab] = useState('record');
  const handleTabClick = (key) => {
    setActiveTab(key);
  };


  // Uploading File Api:
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcriptionFile, setTranscriptionFile] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('لطفاً یک فایل انتخاب کنید.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('language', 'FA'); 
    formData.append('media', selectedFile); 

    try {
      const response = await axios.post('/api/transcribe_files/', formData, {
        headers: {
          'Authorization': 'Token d3a08cd693cdac5e8eb50c10ada68b98bfea1f09',
          // 'Content-Type': 'multipart/form-data' 
        }
      });
      console.log(response.data);
      const results = response.data[0] || [];
      setTranscriptionFile(results);
      alert('بارگذاری با موفقیت انجام شد!');
    } catch (error) {
      console.error('خطا در بارگذاری فایل:', error);
      alert('خطایی در بارگذاری فایل رخ داده است.');
    } finally {
      setLoading(false);
    }
  };




  // Link Api:
  const [url, setUrl] = useState('');
  const [transcriptionLink, setTranscriptionLink] = useState([]);
  // const [wsLink, setWsLink] = useState(null);
  // const [isConnectedLink, setIsConnectedLink] = useState(false);

  // useEffect(() => {
  //   const connectWebSocket = () => {
  //     const socket = new WebSocket('/api/transcribe_files/');

  //     socket.onopen = () => {
  //       console.log('WebSocket connected');
  //       setIsConnectedLink(true);
  //     };

  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.transcription) {
  //         setTranscriptionLink(data.transcription);
  //       }
  //     };

  //     socket.onerror = (error) => {
  //       console.error('WebSocket error:', error);
  //     };

  //     socket.onclose = () => {
  //       console.log('WebSocket connection closed');
  //       setIsConnectedLink(false);
  //       setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
  //     };

  //     setWsLink(socket);
  //   };

  //   connectWebSocket();

  //   return () => {
  //     if (wsLink) {
  //       wsLink.close();
  //     }
  //   };
  // }, []);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/transcribe_files/', {
        media_urls: [url],
      }, {
        headers: {
          Authorization: 'Token a85d08400c622b50b18b61e239b9903645297196',
        },
      });

      console.log(response.data[0].segments);
      const results = response.data[0].segments || [];
      setTranscriptionLink(results); 
    } catch (error) {
      console.error('Error fetching transcription:', error);
      setTranscriptionLink([]);
    }
  };





  // Recording voice Api:
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [wsRecord, setWsRecord] = useState(null);
  const [isConnectedRecord, setIsConnectedRecord] = useState(false);
  const [transcriptionRecord, setTranscriptionRecord] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);

  // WebSocket setup
  // useEffect(() => {
  //   const connectWebSocket = () => {
  //     const socket = new WebSocket('https://harf-dev.roshan-ai.ir/api/transcribe_files/');

  //     socket.onopen = () => {
  //       console.log('WebSocket connected');
  //       setIsConnectedRecord(true);
  //     };

  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.transcription) {
  //         setTranscriptionRecord(data.transcription);
  //       }
  //     };

  //     socket.onerror = (error) => {
  //       console.error('WebSocket error:', error);
  //     };

  //     socket.onclose = () => {
  //       console.log('WebSocket connection closed');
  //       setIsConnectedRecord(false);
  //       setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
  //     };

  //     setWsRecord(socket);
  //   };

  //   connectWebSocket();

  //   return () => {
  //     if (wsRecord) {
  //       wsRecord.close();
  //     }
  //   };
  // }, []);

  // // Function to start recording
  const startRecording = () => {
  //   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //     alert('Your browser does not support audio recording.');
  //     return;
    }

  //   navigator.mediaDevices.getUserMedia({ audio: true })
  //     .then(stream => {
  //       const recorder = new MediaRecorder(stream);
  //       setMediaRecorder(recorder);
  //       recorder.start();

  //       recorder.ondataavailable = (event) => {
  //         setAudioChunks((prev) => [...prev, event.data]);
  //       };

  //       recorder.onstop = () => {
  //         const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         setAudioUrl(audioUrl);

  //         if (isConnectedRecord && wsRecord) {
  //           const formData = new FormData();
  //           formData.append('language', 'FA');
  //           formData.append('media', audioBlob, 'audio.webm');

  //           const message = {
  //             type: 'transcribe',
  //             token: 'd3a08cd693cdac5e8eb50c10ada68b98bfea1f09',
  //             formData
  //           };

  //           wsRecord.send(message);
  //           console.log('Audio file sent.');
  //         }

  //         setAudioChunks([]);
  //       };

  //       setIsRecording(true);
  //     })
  //     .catch(error => {
  //       console.error('Error accessing microphone:', error);
  //     });
  // };

  // // Function to stop recording
  const stopRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //   }
  };


  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <Sidebar />

      <div className="sec-center">
        <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
        <label className="for-dropdown" for="dropdown">
          <div className='button-18 icon-text-direction'>
            <span className="material-symbols-outlined ">person</span>
            <span>مهمان</span>
            <span class="material-symbols-outlined">arrow_drop_down</span>
            <i className="uil uil-arrow-down"></i>
          </div></label>
        <div className="section-dropdown">
          <a href="#" style={{ direction: "rtl" }}>
            <span className="material-symbols-outlined icon-text-direction">logout</span>
            <span>خروج</span>
            <i className="uil uil-arrow-right"></i></a>
        </div>
      </div>

      <div className='title'>تبدیل گفتار به متن</div>
      <div className='paragrapgh'>،آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف</div>
      <div className='paragrapgh'>.زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد</div>

      <div className="flex w-full flex-col"
        style={{ direction: 'rtl', textAlign: 'center', marginTop: '10px', marginLeft: "130px" }}>
        <Tabs aria-label="Options" variant="bordered">
          <Tab
            className='tab-button-style'
            key="record"
            title={
              <div
                className={`flex items-center space-x-2 icon-text-tabs cursor-pointer ${activeTab === 'record' ? 'select-record' : ''}`}
                onClick={() => handleTabClick('record')}>
                <span class="material-symbols-outlined">mic</span>
                <span>ضبط صدا</span>
              </div>
            }
          >
            <Card className='card-record'>
              <CardBody>
                <span class="material-symbols-outlined record-icon"
                  onClick={isRecording ? stopRecording : startRecording}>
                  {isRecording ? 'stop' : 'mic'}
                  </span>
                {audioUrl && (
                  <audio controls>
                    <source src={audioUrl} type="audio/webm" />
                    .مرورگر شما از عنصر پخش صوتی پشتیبانی نمی‌کند
                  </audio>
                )}
                <div>برای شروع به صحبت، دکمه را فشار دهید</div>
                <span>متن پیاده شده آن، در اینجا ظاهر می شود</span>
                {transcriptionRecord && (
                  <div className="transcription-result">
                    <h3>نتیجه‌ی تبدیل به متن:</h3>
                    <p>{transcriptionRecord}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            className='tab-button-style'
            key="upload"
            title={
              <div
                className={`flex items-center space-x-2 icon-text-tabs cursor-pointer ${activeTab === 'upload' ? 'select-upload' : ''}`}
                onClick={() => handleTabClick('upload')}>
                <span class="material-symbols-outlined">cloud_upload</span>
                <td />
                <span>بارگذاری فایل</span>
              </div>
            }
          >
            <Card className='card-upload'>
              <CardBody>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon fontSize='large' />}
                  style={{
                    padding: '15px 5px',
                    color: 'white',
                    borderRadius: '2000px',
                    backgroundColor: '#3f88cd',
                    paddingLeft: '15px',
                    display: 'unset'
                  }}
                >
                  <VisuallyHiddenInput type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileChange} />
                </Button>
                <div>برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید</div>
                <span>متن پیاده شده آن، در اینجا ظاهر می شود</span>
                {selectedFile && (
            <div className="file-info">
              <p>فایل انتخاب شده: {selectedFile.name}</p>
              <Button
                onClick={handleFileUpload}
                style={{
                  marginTop: '10px',
                  color: 'white',
                  backgroundColor: '#3f88cd',
                  padding: '10px 20px',
                  borderRadius: '2000px',
                  fontFamily: 'Yekan',
                }}
                disabled={loading} 
              >
                {loading ? 'در حال بارگذاری...' : 'بارگذاری'}
              </Button>
            </div>
          )}

          {transcriptionFile && (
            <div className="transcription-result">
              <TextItem />
            </div>
          )}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            className='tab-button-style'
            key="link"
            title={
              <div
                className={`flex items-center space-x-2 icon-text-tabs cursor-pointer ${activeTab === 'link' ? 'select-link' : ''}`}
                onClick={() => handleTabClick('link')}>
                <span class="material-symbols-outlined">link</span>
                <td />
                <span>لینک</span>
              </div>
            }
          >
            <Card className='card-link'>
              <CardBody>
                <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto"
                  style={{ textAlign: '-webkit-center' }}>
                  <div className='link-box'>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={url}
                      onChange={handleChange}
                      placeholder="https://example.com/sample.mp3"
                      className='link-box-without-icon'
                      required
                    />
                    <button
                      type="submit"
                      className='submit-link-icon'
                    >
                      <span class="material-symbols-outlined">link</span>
                    </button>
                  </div>
                </form>

                <div>نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد</div>
                <span>و دکمه را فشار دهید</span>
                {/* {transcriptionLink && (
                  <div className="transcription-result">
                    <h3>نتیجه‌ی تبدیل به متن:</h3>
                    <p>{transcriptionLink}</p>
                  </div>
                )} */}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <Language />

    </>
  )
}

export default SpeechConversion