import React from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className='box-body'>
        <div className='icon-text'>
          <span className="icon-style">graphic_eq</span>
          <td /><td />
          <span className='font-icon-style'>آوا</span>
        </div>
        <ul className='ul-style'>
          <li className='li-style'
            onClick={(e) => {
              navigate("/");
            }}>
            <span class="material-symbols-outlined">speech_to_text</span>
            <td /><td />
            <span>تبدیل گفتار</span>
          </li>
          <li className='li-style'
            onClick={(e) => {
              navigate("/archive");
            }}
            style={{}}>
            <span class="material-symbols-outlined">archive</span>
            <td /><td />
            <span>آرشیو</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar