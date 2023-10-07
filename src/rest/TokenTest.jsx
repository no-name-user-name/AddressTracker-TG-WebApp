import React from 'react';
import { useState } from 'react'
import { BACKEND_ENDPOINT } from '../settings';

export default function TokenTest() { 
    React.useEffect(() => {
        fetch( BACKEND_ENDPOINT + 'api/v1/token_test', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
    }, []);

    // const [authToken, setAuthToken] = useState(null);

  return (<></>)
}