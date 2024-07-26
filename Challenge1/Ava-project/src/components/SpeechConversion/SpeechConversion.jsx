import React, { useState, useRef } from 'react';
import "./SpeechConversion.css";
import Sidebar from '../Sidebar/Sidebar';
import Language from '../language/language';
import { Tabs, Tab } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/card";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SpeechConversion = () => {

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

  const [activeTab, setActiveTab] = useState('record');
  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (url) {
      console.log('URL entered:', url);
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
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
                  mic</span>
                {audioUrl && (
                  <audio controls>
                    <source src={audioUrl} type="audio/webm" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                <div>برای شروع به صحبت، دکمه را فشار دهید</div>
                <span>متن پیاده شده آن، در اینجا ظاهر می شود</span>
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
                    paddingLeft: '15px'
                  }}
                >
                  <VisuallyHiddenInput type="file" />
                </Button>
                <div>برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید</div>
                <span>متن پیاده شده آن، در اینجا ظاهر می شود</span>

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