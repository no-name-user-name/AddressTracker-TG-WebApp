import React, { useEffect, useState } from 'react';
import { useWebApp } from '../hooks/webApp';
import { redirect, useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import { deepSearchByKey, fetchJSON } from '../utils/Utils';
import { BACKEND_ENDPOINT, TOKENS } from '../settings';


export default function Home() {
    const {MainButton, BackButton, tg, CloudStorage} = useWebApp(); 
    const navigate = useNavigate();
    const [avalibleTokens, setAvalibleTokens] = useState(null)
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
        // mb.enable()
        mb.setColor(tg.themeParams.button_color)
        mb.show()
        mb.onClick(mb_click)

        fetchJSON(BACKEND_ENDPOINT + 'api/v1/watch_doge/tokens/', 'GET', null, true)
        .then(data => { 

            localStorage.setItem('avalibleTokens', JSON.stringify(data))

            let new_data = {}
            for (let i of data){
                new_data[i['short_name']] = i['coin_geco_name']
            }
            setAvalibleTokens(new_data)
            
            let coin_geco = []
            let tags = []
            for (let row of data){
                tags.push(row['short_name']+'-'+row['network'])
                coin_geco.push(row['coin_geco_tag'])
            }
                
            coin_geco = coin_geco.filter((value, index, array) => 
                array.indexOf(value) === index
            )

            let localAddressBalances = localStorage.getItem('addressBalances')
            if (localAddressBalances!==null){
                setAddressBalances(JSON.parse(localAddressBalances))
            }
            cs.getItems(tags, cloudResponse)
            
            let localPrice = localStorage.getItem('prices')
            if (localPrice !== null){
                setPrices(JSON.parse(localPrice))
            }
            try {
                fetchJSON('https://api.coingecko.com/api/v3/simple/price?ids='+coin_geco.toString()+'&vs_currencies=usd')
                .then(data => { 
                    localStorage.setItem('prices', JSON.stringify(data))
                    setPrices(data)
                });
            } catch (error) {
                console.log(error)
            }
 
            }
        )
    
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

            let urls = {}
            for (let t in data){
                for (let a of data[t]){
                    try {
                        let token = t.slice(0, t.indexOf('-'))
                        let network = t.slice(t.indexOf('-')+1)
                        urls[a] = {
                            url: TOKENS[token][network]['balance_url'].replace('${address}', a),
                            key: TOKENS[token][network]['balance_key'],
                            zeros: TOKENS[token][network]['zeros']
                        }
    
                    } catch (error) {
                        
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
                                    '$'+(prices[avalibleTokens[token.slice(0, token.indexOf('-'))]]['usd']*addressBalances[addr]).toFixed(2)
                                    :'...'}
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
