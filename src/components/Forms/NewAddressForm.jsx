import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TOKENS } from "../../settings";
import { useWebApp } from "../../hooks/webApp";
import { useNavigate } from "react-router-dom";
import { deepSearchByKey, fetchJSON } from "../../utils/Utils";

export default function NewAddressForm() {
    const { register, handleSubmit } = useForm({mode:"all"});

    const [token, setToken] = useState(null)
    const [network, setNetwork] = useState(null)
    const [address, setAddress] = useState(null)
    const [disableElements, setDisableElements] = useState(false)

    const {MainButton, tg, CloudStorage} = useWebApp()
    const mb = MainButton()
    const cs = CloudStorage()

    const buttonRef = useRef(null);
    const navigate = useNavigate();
    
    const mb_click = () => {
        buttonRef.current.click()
    }

    useEffect(() => {
        mb.onClick(mb_click)
        
        let firstToken = Object.keys(TOKENS)[0]
        let firstTokenNets = TOKENS[firstToken]['network']
        let firstTokenNet = Object.keys(firstTokenNets)[0]

        setToken(firstToken)
        setNetwork(firstTokenNet)
   
      return () => {
        mb.offClick(mb_click)
      }
    }, [])
    

    const onSubmit = () => {
        mb.showProgress()
        setDisableElements(true)

        // Data Validate
        if ((token===null)||(network===null)||(address===null)||(address=='')){
            tg.showAlert('Fill all fields')
            setDisableElements(false)
            mb.hideProgress()
            return
        }
        
        // address validate
        let balance_url = TOKENS[token]['network'][network]['balance_url']
        let balance_key = TOKENS[token]['network'][network]['balance_key']
        let status_key = TOKENS[token]['network'][network]['status_key']
        let status_value = TOKENS[token]['network'][network]['status_value']
        let url = balance_url.replace('${address}', address)
            
            fetchJSON(url).then(jsonData => {
                let result = false
                if (jsonData !== undefined){
    
                    if (status_key === null){
                        status_key = balance_key
                        let status = deepSearchByKey(jsonData, status_key)
                        if (status !== null){
                            result = true
                        }
                    }
                    else{
                        let status = deepSearchByKey(jsonData, status_key)
                        if (status == status_value){
                            result = true
                        }
                    }

                    if (result){
                        cs.getItem(token+'-'+network, cloudResponse)
                    }
                    else{
                        setDisableElements(false)
                        mb.hideProgress()
                        tg.showAlert('Bad address')
                    }
                
                }
                else{
                    setDisableElements(false)
                    mb.hideProgress()
                    tg.showAlert('Validation error')
                }
                
            });
    };

    function cloudResponse(error, data){
        if (error === null){
            if((data == '') || (data == '[]')){
                data = []
            }
            else{
                data = JSON.parse(data)
            }
            
            if (data.indexOf(address) != -1){
                setDisableElements(false)
                mb.hideProgress()
                tg.showAlert('Address already added')
                return
            }

            data.push(address)
            cs.setItem(token+'-'+network, JSON.stringify(data))
            console.log('New address added to cloud')
            mb.hideProgress()
            navigate('/home')
        }
        else{
            mb.hideProgress()
            setDisableElements(false)
            tg.showAlert('Error!')
            console.log(error)
        }
    }

    const tokenChange = (e) => {
        const t = e.target.value
        setToken(t)
        setNetwork(Object.keys(TOKENS[t]['network'])[0])
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row-element'>
            <div className='row-element-part30'>
                <p>Token:</p>
            </div>

            <div className='row-element-part70'>
                <select 
                    disabled={disableElements?true:false}
                    {...register("token")} 
                    id="header_color_sel" onChange={tokenChange}>
                    {   
                        Object.keys(TOKENS).map((x, i) =>
                            <option key={i} value={x}> {x}</option>
                        )
                    }
                </select>
            </div>
        </div>

        <div className='row-element'>
            <div className='row-element-part30'>
                <p>Network:</p>
            </div>
            <div className='row-element-part70'>
                <select {...register("network")}
                    id="header_color_sel" 
                    disabled={disableElements?true:false}
                    onChange={(e)=>setNetwork(e.target.value)}>
                    {    
                        token!==null?
                        Object.keys(TOKENS[token]['network']).map((x) => 
                            <option key={x} value={x}>{x}</option>
                        ):null
                    }
                </select>
            </div>
        </div>

        <div className='row-element'>

            <div className='row-element-part30'>
                <p>Address:</p>
            </div>

            <div className='row-element-part70'>
                <input 
                    disabled={disableElements?true:false}
                    {...register("address")}
                    onChange={(e)=>setAddress(e.target.value)} 
                    type="text" 
                    className='address_input' 
                    placeholder="Blockchain address"/>
            </div>
        </div>

        <input ref={buttonRef} type="submit" hidden={true}/>
    </form>
  );
}