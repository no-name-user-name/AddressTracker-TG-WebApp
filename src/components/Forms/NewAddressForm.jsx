import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_ENDPOINT, TOKENS } from "../../settings";
import { useWebApp } from "../../hooks/webApp";
import { useNavigate } from "react-router-dom";
import { deepSearchByKey, fetchJSON } from "../../utils/Utils";

export default function NewAddressForm() {
    const { register, handleSubmit } = useForm({mode:"all"});

    const [avalibleTokens, setAvalibleTokens] = useState(null)
    const [token, setToken] = useState(null)
    const [filtredTokens, setFiltredTokens] = useState(null)
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

        fetchJSON(BACKEND_ENDPOINT + 'api/v1/watch_doge/tokens/', 'GET', null, true)
            .then(data => {
                let no_doubles_data = []
                let temp = {}
                let t = []

                for (let e of data){
                    let cur = e.short_name
                    let net = e['network']
                    if (temp.hasOwnProperty(cur)){
                        temp[cur].push(net)
                    }
                    else{
                        temp[cur] = [net]
                    }
                    if (t.indexOf(e.short_name) == -1){
                        t.push(e.short_name)
                        no_doubles_data.push(e)
                    }
                }
                
                setAvalibleTokens(no_doubles_data)
                setFiltredTokens(temp)
                setToken(no_doubles_data[0].short_name)
                setNetwork(no_doubles_data[0].network)
        });
    
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
        let balance_url = TOKENS[token][network]['balance_url']
        let balance_key = TOKENS[token][network]['balance_key']
        let status_key = TOKENS[token][network]['status_key']
        let status_value = TOKENS[token][network]['status_value']
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
            }
            if (result){
                cs.getItem(token+'-'+network, cloudResponse)
            }
            else{
                setDisableElements(false)
                mb.hideProgress()
                tg.showAlert('Bad address')
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
        setToken(e.target.value)
        setNetwork(filtredTokens[e.target.value][0])
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row-element'>
            <div className='row-element-part30'>
                <p>Currency:</p>
            </div>
            <div className='row-element-part70'>
                <select disabled={disableElements?true:false}
                {...register("token")} id="header_color_sel" onChange={tokenChange}>
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
                <select {...register("network")}
                    id="header_color_sel" 
                    disabled={filtredTokens===null||disableElements?true:false}
                    onChange={(e)=>setNetwork(e.target.value)}>
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
                <input disabled={disableElements?true:false}
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