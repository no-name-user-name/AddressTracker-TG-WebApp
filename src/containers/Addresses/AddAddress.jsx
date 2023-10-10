import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useWebApp } from '../../hooks/webApp';
import NewAddressForm from '../../components/Forms/NewAddressForm';

export default function AddAddress() {
    const {MainButton, BackButton} = useWebApp(); 
    const navigate = useNavigate();
  
    const mb = MainButton()
    const bb = BackButton()

    const bb_click = () => {
        navigate('/home')
    }

    useEffect(() => {
        mb.setText('Save')
        mb.show()
        bb.show()
        bb.onClick(bb_click)
      return () => {
        bb.offClick(bb_click)
        
      }
    }, [])
    
    
    return (
        <>
            <section id="top_sect" className="second">
                <h1>NEW ADDRESS</h1>
            </section>
            <div className='main-container'>
                <NewAddressForm />
            </div>
        </>
    );
}
