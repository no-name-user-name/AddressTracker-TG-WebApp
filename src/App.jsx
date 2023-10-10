import React from 'react';
import {Routes, Route} from 'react-router-dom';

import './assets/css/App.css';
import Home from './containers/Home'
import { useWebApp } from './hooks/webApp';
import AddAddress from './containers/Addresses/AddAddress';
import Auth from './containers/Auth';
import AddressInfo from './containers/Addresses/AddressInfo';

function App() {
  const {setThemeClass, tg} = useWebApp();
  tg.onEvent('themeChanged', setThemeClass);
  tg.expand()
  tg.enableClosingConfirmation()
  setThemeClass();   

  return (
    <div className='app'>
      <Routes>
        <Route path='/'>
          <Route index element={<Auth/>} />
          <Route path='home' element={<Home/>} />
        </Route>

        <Route path='/addresses/'>
          <Route path='add' element={<AddAddress/>} />
          <Route path=':slug' element={<AddressInfo/>} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
