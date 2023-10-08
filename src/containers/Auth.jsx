import React, { useEffect } from 'react';
import { useWebApp } from '../hooks/webApp';
import { useNavigate } from 'react-router-dom';
import { BACKEND_ENDPOINT } from '../settings';


export default function Auth() {
    const {initData} = useWebApp(); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch( BACKEND_ENDPOINT + 'api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
                initData: initData,
            })
            })
            .then(response => {
            return response.json()
            })
            .then(data => {
            if(data.status === 0){
                localStorage.setItem('jwt', data.token)
                navigate('/home')
            }
            else{
                alert('Error: ' + data.msg)
            }
        }) 
    }, [])
    

    return (
        <></>
    );
}
