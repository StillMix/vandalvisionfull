import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import App from './components/App';
import AppMobile from './Mobile/AppMobile';
import './index.css';

// Проверка устройства
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  console.log("fuuu");
}

// Теперь оборачиваем компонент App в BrowserRouter
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {!isMobile ? <App /> : <AppMobile />}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);