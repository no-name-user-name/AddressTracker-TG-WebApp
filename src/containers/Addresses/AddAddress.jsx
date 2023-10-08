import React, {  } from 'react';

import { useNavigate } from 'react-router-dom';
import { useWebApp } from '../../hooks/webApp';
import NewAddressForm from '../../components/Forms/NewAddressForm';

export default function AddAddress() {
    const {MainButton, BackButton} = useWebApp(); 
    const navigate = useNavigate();
  
    const mb = MainButton()
    mb.setText('Save')
    mb.onClick(()=>{
        navigate('/addresses/add')
    })
    mb.show()

    const bb = BackButton()
    bb.onClick(()=>{
        navigate('/')
    })
    bb.show()

  return (<>
        <div className='home'>
            <section id="top_sect" className="second">
                <h1>NEW ADDRESS</h1>
            </section>
            <NewAddressForm/>
        </div>
    </>);
}
