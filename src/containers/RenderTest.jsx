import React, { useEffect } from 'react';

import '../assets/css/App.css';
import { useWebApp } from '../hooks/webApp';


function RT() {
    const {MainButton, tg, BackButton} = useWebApp();

    useEffect(() => {
        tg.ready()
    }, []);

    const mb = MainButton()
    mb.setText('Test')
    mb.disable()

    const bb = BackButton()
    bb.show()

  return (
    <>
    <div className='home'>
        <section id="top_sect" className="second">
            <h1>TRACKED ADDRESSES</h1>
        </section>
        <section>
            <table>
                <tbody>
                    <tr>
                    <td>Address</td>
                    <td>Balance</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                    <tr>
                    <td>b1weqo3mfmem3mkqkwmekdmk4</td>
                    <td>0.01 BTC</td>
                    </tr>
                </tbody>
            </table>
            
        </section>
    </div>
    </>
  );
}

export default RT;
