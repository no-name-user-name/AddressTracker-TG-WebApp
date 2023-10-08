import React, {  } from 'react';
import { useWebApp } from '../hooks/webApp';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';


export default function Home() {
    const {MainButton, BackButton} = useWebApp(); 
    const navigate = useNavigate();
    
    const bb = BackButton()
    bb.hide()

    const mb = MainButton()
    mb.setText('Add address')
    mb.onClick(()=>{
        navigate('/addresses/add')
    })
    mb.enable()
    mb.show()

  return (
    <div className='home'>
        <section id="top_sect" className="second header">
            <div className='loaderBoxIntro'>
                <Loader/>
            </div>
            <h1>WATCH DOGE SERVICE</h1>
            
            <p>Add crypto wallet addresses to the service to track it</p>
        </section>
    </div>
  );
}
