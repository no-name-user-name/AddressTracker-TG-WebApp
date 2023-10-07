import React from 'react';
import { useState } from 'react'

import '../../App.css';
import { useScript } from "@uidotdev/usehooks";
import { setCookie } from '../../utils';
import { BACKEND_ENDPOINT } from '../../settings';

export default function Init() {
  const status = useScript(`https://telegram.org/js/telegram-web-app.js`, {removeOnUnmount: false});
  
  React.useEffect(() => {
    if (typeof window.Telegram !== "undefined") {
      function setThemeClass() {
          document.documentElement.className = window.Telegram.WebApp.colorScheme;
      }
      window.Telegram.WebApp.onEvent('themeChanged', setThemeClass);
      setThemeClass();

      console.log('TG CONNECTED')

      fetch( BACKEND_ENDPOINT + 'api/v1/auth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ 
          initData: window.Telegram.WebApp.initData,
        })
      })
      .then(response => {
      return response.json()
      })
      .then(data => {
        if (data.status === 0){
          console.log(data)
          localStorage.setItem('jwt', data.token)
          setCookie('jwt', data.token, 15)

          

        }
        else{
          alert('Error: ' + data.msg)
        }
      })
    }
  }, [status]);
  const scriptReady = status === 'ready';

  const [authToken, setAuthToken] = useState(null);


  
  return (<>
    <div className="app">
        hohoho
    </div>
  </>)
}