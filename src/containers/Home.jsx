import React, { useEffect, useState } from 'react';
import { useWebApp } from '../hooks/webApp';
import {useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import { deepSearchByKey, fetchJSON } from '../utils/Utils';
import { TOKENS } from '../settings';


export default function Home() {
    const {MainButton, BackButton, tg, CloudStorage} = useWebApp(); 
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState({})
    const [prices, setPrices] = useState(null)
    const [addressBalances, setAddressBalances] = useState({})
    
    const bb = BackButton()
    const mb = MainButton()
    const cs = CloudStorage()

    const mb_click = () => {
        navigate('/addresses/add')
    }

    useEffect(() => {
        bb.hide()
        mb.setText('Add address')
        mb.setColor(tg.themeParams.button_color)
        mb.show()
        mb.onClick(mb_click)

        let coin_geco_names = []
        let tags = []

        for (const t in TOKENS){
            for (const n in TOKENS[t]['network']){
                tags.push(t + '-' + n)
            }
            coin_geco_names.push(TOKENS[t]['coingecko_name'])
        }
        
        // doubles delete
        coin_geco_names = coin_geco_names.filter((value, index, array) => 
            array.indexOf(value) === index
        )

        if (localStorage.getItem('addressBalances')!==null){
            setAddressBalances(JSON.parse(localStorage.getItem('addressBalances')))
        }
        
        if (localStorage.getItem('addresses')!==null){
            setAddresses(JSON.parse(localStorage.getItem('addresses')))
        }

        cs.getItems(tags, cloudResponse)
        
        if(localStorage.getItem('prices')!==null){
            setPrices(JSON.parse(localStorage.getItem('prices')))
        }

        try {
            fetchJSON('https://api.coingecko.com/api/v3/simple/price?ids='+coin_geco_names.toString()+'&vs_currencies=usd')
            .then(data => { 
                localStorage.setItem('prices', JSON.stringify(data))
                setPrices(data)
            });
        } catch (error) {
            console.log(error)
        }

        return () => {
            mb.offClick(mb_click)
        }
    }, [])
    
    

    const cloudResponse = (error, data) => {
        if (error === null){
            if((data == '') || (data == '[]')){
                data = []
            }
            else{
                for(let key of Object.keys(data)){
                    if((data[key] == '')){
                        data[key] = '[]'
                    }
                    data[key] = JSON.parse(data[key])
                }
            }
            setAddresses(data)
            localStorage.setItem('addresses', JSON.stringify(data))

            let urls = {}
            for (let t in data){
                for (let a of data[t]){
                    try {
                        let token = t.slice(0, t.indexOf('-'))
                        let network = t.slice(t.indexOf('-')+1)
                        urls[a] = {
                            url: TOKENS[token]['network'][network]['balance_url'].replace('${address}', a),
                            key: TOKENS[token]['network'][network]['balance_key'],
                            zeros: TOKENS[token]['network'][network]['zeros']
                        }
    
                    } catch (error) {
                        console.log(error)
                    }
                }
            }  
            
            parseAddressBalances(urls)
        }   
        else{
            console.log("cloudResponse: " + error)
        }
    }

    function wait(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    async function parseAddressBalances(urls){
        let temp = {}

        try {
            for(const address of Object.keys(urls)){
                const addressDetails = await (await fetch(urls[address]['url'])).json();
    
                let balance = deepSearchByKey(addressDetails, urls[address]['key'])
    
                if (balance === undefined){
                    balance = 0
                }
                balance = parseFloat(balance)/10**urls[address]['zeros']
                
                temp[address] = balance
    
                await wait(1000);
            }
            localStorage.setItem('addressBalances', JSON.stringify(temp))
            setAddressBalances(temp)
        } catch (error) {
            console.log('balances fetch error')
        }
        
    };

  return (
    <div className='home'>
        <section id="top_sect" className="second header">
            <div className='loaderBoxIntro'>
                <Loader/>
                </div>
                <h1>WATCH DOGE SERVICE</h1>
                <p>Add crypto addresses to the service to track it</p>
        </section>

        <div className='main-container'>
            <div className='address-book'>
                {
                    Object.keys(addresses).map((token) => 
                        addresses[token].map((addr)=>
                            <a onClick={()=>{navigate('/addresses/' + addr)}} key={addr} className='book-row'>
                                <div className='row20'>{token.slice(0, token.indexOf('-'))}</div>
                                <div className='row60'>{addr.slice(0,7)+'...'+addr.slice(-9)}</div>
                                <div 
                                    key={addr+'-'+'balance'} 
                                    className='row30 tright'>
                                        {addressBalances[addr]!==undefined?addressBalances[addr].toFixed(5):'...'}
                                </div>
                                <div className='row30 tright'>
                                    {addressBalances[addr]!==undefined&&prices!==null?
                                    '$'+(prices[TOKENS[token.slice(0, token.indexOf('-'))]['coingecko_name']]['usd']*addressBalances[addr]).toFixed(2)
                                    :'...'
                                    }
                                </div>
                            </a>
                        )
                    )
                }
            </div>
        </div>
    </div>
  );
}
