function deepSearchByKey(obj, kee) {
    if (kee in obj) return obj[kee];
    for(let n of Object.values(obj).filter(Boolean).filter(v => typeof v === 'object')) {
        let found = deepSearchByKey(n, kee)
        if (found) return found
    }
}


async function fetchJSON(url, method='GET', json_data=null, auth=false) {
    let headers = {
        'Content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      }
    if (auth){
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt')
    }
    try {
      const response = await fetch(url,{
        body: json_data===null?null:JSON.stringify(json_data),
        method: method,
        headers:headers
      });
      const data = await response.json();
  
      if (response.ok){
        return data;
      }
      else{
        console.log('Fetch error. Code status: ' + response.status)
      }
    } catch (error) {
      console.log('Fetch fatal error ' + error)
      return undefined
    }
    
  }

  function setCookie(cname, cvalue, expmins) {
    const d = new Date();
    d.setTime(d.getTime() + (expmins*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export {deepSearchByKey, fetchJSON, setCookie, getCookie}