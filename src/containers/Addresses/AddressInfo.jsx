import { useNavigate, useParams } from 'react-router-dom';
import { useWebApp } from '../../hooks/webApp';
import { useEffect, useState } from 'react';

import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { fetchJSON } from '../../utils/Utils';

const AddressInfo = () => {
   const { slug } = useParams();
   const navigate = useNavigate();

   const [token, setToken] = useState(null)
   const [network, setNetwork] = useState(null)
   const [price, setPrice] = useState(null)
   const [balance, setBalance] = useState(null)
   // const [avalibleTokens, setAvalibleTokens] = useState(null)

   const {MainButton, BackButton, CloudStorage, HapticFeedback, tg} = useWebApp(); 
   const bb = BackButton()
   const mb = MainButton()
   const cs = CloudStorage()
   const feedBack = HapticFeedback()

   const mb_click = () => {
      console.log('ADDRESS INFO')
      mb.showProgress()
      // bb.hide()

      cs.getKeys((e, keys)=>{
         cs.getItems(keys, (e, data)=>{
            for (let t in data){
               let addrs = JSON.parse(data[t])
               for (let a of addrs){
                  if (a == slug){
                     let new_arr = arrayRemove(addrs, slug)
                     cs.setItem(t, JSON.stringify(new_arr), ()=>{
                        navigate('/home')
                        mb.hideProgress()
                     })
                  }
               }
            }
         })
      })
   }
   
   const bb_click = () => {
      navigate('/home')
   }

   function arrayRemove(arr, value) {
      return arr.filter(function (geeks) {
          return geeks != value;
      });
  }

   useEffect(() => {
      bb.show()
      bb.onClick(bb_click)
      mb.setText('Delete address')
      mb.setColor('#830707')
      mb.onClick(mb_click)
      mb.enable()
      mb.show()
      
      cs.getKeys((e, keys)=>{
         cs.getItems(keys, (e, data)=>{
            for (let t in data){
               let addrs = JSON.parse(data[t])
               
               for (let a of addrs){
                  if (a == slug){

                     let network = t.slice(t.indexOf('-')+1)
                     let token = t.slice(0, t.indexOf('-'))

                     setNetwork(network)
                     setToken(token)
                     
                     let coingeco = {}
                     let savedAvalibleTokens = JSON.parse(localStorage.getItem('avalibleTokens'))
                     let localPrices = JSON.parse(localStorage.getItem('prices'))
                     let localAddressBalances = JSON.parse(localStorage.getItem('addressBalances'))

                     for (let i of savedAvalibleTokens){
                        coingeco[i['short_name']] = i['coin_geco_name']
                     }
                     
                     setBalance(localAddressBalances[slug])
                     setPrice(localPrices[coingeco[token]]['usd'])
                  }
               }
            }
         })
      })

      return () => {
         mb.offClick(mb_click)
         bb.offClick(bb_click)
      }
   }, [])
   

   async function copy(text){
      feedBack.notificationOccurred('success')
      try {
         await navigator.clipboard.writeText(text)  
      } catch (error) {
         console.log(error)
      }
   }

   return (
         <>
            <section id="top_sect" className="second">
               <h1>ADDRESS INFO</h1>
            </section>
            <div className='main-container'>
               <div className='address-info'>
                  <div id='qr-container' style={{ height: "auto", margin: "0 auto", width: "60%",}}>
                     <QRCode
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={slug}
                        bgColor={tg.themeParams.hint_color}
                        fgColor={tg.themeParams.bg_color}
                     />
                  </div>

                  <div style={{padding: '15px 0'}}>
                     <a onClick={() => copy(slug)} className='address row60'>{slug}</a>
                  </div>
               </div>

               <div>
                  <p>Token: {token?token:'.....'}</p>
                  <p>Network: {network?network:'.....'}</p>
                  <p>Balance: {balance!==null?balance.toFixed(4) + ' ' + token:'.....'}</p>
                  <p>Price: {price?'$' + (price*balance).toFixed(2):'.....'}</p>
               </div>

            </div>
         </>
      );
};

export default AddressInfo