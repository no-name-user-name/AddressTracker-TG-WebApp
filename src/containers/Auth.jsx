// import React, { useEffect } from 'react';
// import { useWebApp } from '../hooks/webApp';
// import { useNavigate } from 'react-router-dom';
// import { BACKEND_ENDPOINT } from '../settings';
// import { fetchJSON } from '../utils/Utils';


// export default function Auth() {
//     const {initData} = useWebApp(); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchJSON(
//             BACKEND_ENDPOINT + 'api/v1/auth', 'POST', {
//                 initData: initData,
//             })
//         .then(data => {
//             if(data.status === 0){
//                 localStorage.setItem('jwt', data.token)
//                 navigate('/home')
//             }
//         })
//     }, [])
    

//     return (
//         <></>
//     );
// }
