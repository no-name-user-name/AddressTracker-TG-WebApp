import React, { useEffect, useState } from 'react';
import { BACKEND_ENDPOINT } from '../../settings';

export default function NewAddressForm() {

    const [avalibleTokens, setAvalibleTokens] = useState(null)
    const [token, setToken] = useState(null)
    const [filtredTokens, setFiltredTokens] = useState(null)

    useEffect(() => {
        fetch( BACKEND_ENDPOINT + 'api/v1/watch_doge/tokens', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAvalibleTokens(data)
            
            let temp = {}
            for (let e of data){
                let cur = e.short_name
                let net = e.network
                if (temp.hasOwnProperty(cur)){
                    temp[cur].push(net)
                }
                else{
                    temp[cur] = [net]
                }
            }
            setFiltredTokens(temp)
            setToken(data[0].short_name)
        })
    }, [])

    const pickToken = (e) =>{
        setToken(e.target.value)
    }
    const Test = false;
    return (
        <div className='main-container'>
            <div className='row-element'>
                <div className='row-element-part30'>
                    <p>Currency:</p>
                </div>

                <div className='row-element-part70'>
                    <select id="header_color_sel" onChange={pickToken}>
                        {   
                            avalibleTokens === null ? null :
                            avalibleTokens.map((x) => 
                            <option key={x.id} value={x.short_name}> {x.name}</option>)
                        }
                    </select>
                </div>
            </div>
            
            <div className='row-element'>
                <div className='row-element-part30'>
                    <p>Network:</p>
                </div>

                <div className='row-element-part70'>
                    <select id="header_color_sel" disabled={filtredTokens===null?true:false}>
                        {          
                            filtredTokens===null?null:
                            filtredTokens[token].map((x) => 
                            <option key={x} value={x}>{x}</option>)
                        }
                    </select>
                </div>

            </div>

            <div className='row-element'>
                <div className='row-element-part30'>
                    <p>Address:</p>
                </div>

                <div className='row-element-part70'>
                    <input type="text" className='address_input' placeholder="Blockchain address"/>
                </div>

            </div>
        </div>
  );
}
