const TOKENS = {
   TON: {
      coingecko_name:'the-open-network',
      network:{
         Toncoin:{
            balance_url: 'https://toncenter.com/api/v2/getWalletInformation?address=${address}',
            balance_key: 'balance',
            status_key: 'ok',
            status_value: true,
            zeros: 9,
         },
      }
      
   },
   BTC: {
      coingecko_name:'bitcoin',
      network:{
         Bitcoin:{
            balance_url: 'https://blockchain.info/balance?active=${address}&cors=true',
            balance_key: 'final_balance',
            status_key: null,
            status_value: null,
            zeros: 9,
         }
      }
   }
 }


export {TOKENS}

