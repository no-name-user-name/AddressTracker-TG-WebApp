const BACKEND_ENDPOINT = 'http://192.168.0.108:8000/'

const TOKENS = {
   TON: {
      Toncoin:{
         balance_url: 'https://toncenter.com/api/v2/getWalletInformation?address=${address}',
         balance_key: 'balance',
         status_key: 'ok',
         status_value: true,
         zeros: 9,
      }
   },
   BTC: {
      Bitcoin:{
         balance_url: 'https://bitcoinexplorer.org/api/address/${address}',
         balance_key: 'balanceSat',
         status_key: 'isvalid',
         status_value: true,
         zeros: 9,
      }
   }
 }


export {BACKEND_ENDPOINT, TOKENS}

