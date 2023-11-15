// content
import { useEffect, useState } from "react";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";


const listBase = [
  {name: 'usd', ticker: 'usd', active: true},
  {name: 'eur', ticker: 'eur', active: true},
  {name: 'inr', ticker: 'inr', active: true}
]

const listTickers = [
  // {name: 'usd', ticker: 'usd', active: true},
  {name: 'ethereum', ticker: 'eth', active: true},
  {name: 'matic-network', ticker: 'matic', active: true},
  {name: 'celo', ticker: 'celo', active: true},
  {name: 'algorand', ticker: 'algo', active: true},
  {name: 'ripple', ticker: 'xrp', active: true},
  {name: 'bitcoin', ticker: 'btc', active: false},

]

const callAPI = async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cmatic-network%2Ccelo%2Cripple%2Calgorand%2Cusd%2Cinr%2Ceur&vs_currencies=usd%2Ceur%2Cinr&precision=6`,
      {
        method: 'GET',
        headers: {},
      }
    );
    const data = await res.json();
    return data
    
  } catch (err) {
    console.log(err);
  }
};

export default function RouteRatesCheckModule () {

  const asset = {}
  const [loading, setLoading] = useState(true)

  const [amount, setAmount] = useState()
  const [ticker, setTicker] = useState('usd')
  
  const [data, setData] = useState(listTickers)
  const [rates, setRates] = useState()

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        
        setLoading(true);
        const result = await callAPI()
        // console.log (result)

        var ratex = Array.from(listTickers, x => {return {
          name: x.name, ticker: x.ticker, active: x.active,
          rate: result ? result[x.name] : null
        }})
        var ratez = Array.from(ratex, x => {return {
          name: x.name, ticker: x.ticker, active: x.active,
          // usd: x.rate ? x.rate.usd : 0, inr:x.rate ? x.rate.inr : 0, amount: 0
        }})
        // ratez = [ ...ratez, {name: 'inr', ticker: 'inr', active: true, usd: 0, inr: 1, amount: 0} ]
        // console.log(ratez)

        setRates(ratez)
        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  useEffect( () => {
    if (asset){
      const fetchData = async() => {

        if (rates) {

          var factor = rates.find(x=> x.ticker === ticker).usd
          // console.log (factor)

          var ratec = Array.from(rates, x => {return {
            ...x, 
            amount: x.ticker === ticker 
              ? (amount/1*1).toFixed(6) : x.usd ? (amount / x.usd * factor).toFixed(6) : 0
          }})
  
          setRates(ratec)
        }

      }
      fetchData()
    } else {}
  },[amount, ticker]);

  const handleSubmit = async() => {
    // console.log(amount, ticker)
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  return (
  <>

    <div className="container">
      <div className="back-color-wite border rounded-wd">
        <WebbDividerMedium />  
        <h4 className=" text-center">Configure Your Route</h4>

        <WebbDividerMedium />

        <div className="row">
          <div className="col-3 d-none d-md-block"></div>
          <div className="col">

            <div className="p-3">
              <div className="mb-3">
                <div className="mb-3">
                  <label className="text-lead text-bold mb-2">I Want to Collect</label>
                  <input 
                    type="text" 
                    className="form-control height-md h4"
                    style={{}}
                    onChange={({ target }) => {setAmount(target.value) }}
                    placeholder="">
                  </input>
                </div>
                
                <div className="mb-3">
                {listBase && listBase.length > 0 && listBase.map((item, i) => ( item.active ?
                  <span 
                    className={`p-2 px-3 rounded-md me-1 ${item.ticker === ticker ? 'back-color-next text-color-wite': 'back-color-lite'} cursor hirich`} 
                    onClick={() => {setTicker(item.ticker) }}
                    key={i}>
                    <small>{item.ticker.toUpperCase()}</small>
                  </span>
                :''))}
                </div>

                <WebbDividerSmall />  
              </div>


              <div className="">
                <div className="">
                  <label className="text-lead text-bold mb-2">Users will Route</label>
                </div>

                <div className="mb-3">
                  {rates && rates.length > 0 && rates.map((item, i) => ( item.active ?
                    
                    <div className="d-flex rounded-wd back-color-lite p-1 px-2 mb-1" key={i}>
                      <div className="me-auto m-1">
                      {item.ticker.toUpperCase()}
                        
                      </div>
                      <div className="back-color-lite rounded m-1 p-1 px-2 text-color-tone text-bold">
                      <h4 className="m-0" style={{fontFamily:''}}>{item.amount || '******'}</h4>
                      </div>
                    </div>

                  :''))}
                </div>
                
              </div>

            </div>

            <WebbDividerSmall />  
            <WebbDividerSmall />  
            <div className="mx-3 text-color-tint">Rates: CoinGecko</div>
            <WebbDividerSmall />  
            <WebbDividerSmall />  
          </div>
          <div className="col-3 d-none d-md-block"></div>
        </div>
        



      </div>
      
    </div>
    
  </>
  );
}