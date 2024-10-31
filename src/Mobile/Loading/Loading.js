import React from 'react';
import './Loading.css';
import Logo from "../../images/Loading/logo.svg"

function Loading() {
  return (
    <div className='loading'>
      <div className='loading__load'>
        <img src={Logo} alt="logo" className='loading__logo'/>
      </div>
    </div>
  );
}

export default Loading;
