
import { BACKEND_ENDPOINT } from '../../settings';
import { getCookie } from '../../utils/cookie';

export default function TokenTest() { 
    // useEffect(() => {
        fetch( BACKEND_ENDPOINT + 'api/v1/token_test', {
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
            console.log(data)
        })
    // }, []);
}