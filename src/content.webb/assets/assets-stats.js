// assets
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../../content/webx/webb-divider-md";
import WebbDividerSmall from "../../content/webx/webb-divider-sm";

import { AssetStatistics } from "../../services.webb/srvc-data-assets";

export default function AssetsStatsMainModule(props) {

  const asset = {}
  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()
  // const [coin, setCoins] = useState([
  //   {name: '', code: 'coinMint', number: '0'}, 
  //   {name: '', code: 'coinBurned', number: '0'}, 
  //   {name: '', code: 'coinMarket', number: '0'}, 
  //   {name: '', code: 'coinTotal', number: '0'}, 
  //   {name: '', code: 'coinCirculation', number: '0'}
  // ])
  // const [rate, setRates] = useState([
  //   {name: '', code: 'rateBase', number: '0'}, 
  //   {name: '', code: 'rateCurrent', number: '0'},
  // ])  
  // const [market, setMarket] = useState('0')

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetStatistics({data: {item: id, chain: '416002'}})
        // console.log (result)

        if (result.data) setData(result.data)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  // useEffect( () => {
  //   if (asset){

  //     const fetchData = async() => {
  //       setLoading(true);
  //       console.log (data)

  //       if (data) {
  //         var coinMint = data.reduce( (a,c) => a + c.unit.mint, 0) 
  //         var coinBurned = 0
  //         var coinMarket = coinMint - coinBurned
  //         var coinTotal = data.reduce( (a,c) => a + c.unit.mint, 0) 
  //         var coinCirculation = data.reduce( (a,c) => a + c.unit.done, 0) 
        
  //         setCoins([
  //           {name: '', code: 'coinMint', number: coinMint}, 
  //           {name: '', code: 'coinBurned', number: coinBurned}, 
  //           {name: '', code: 'coinMarket', number: coinMarket}, 
  //           {name: '', code: 'coinTotal', number: coinTotal}, 
  //           {name: '', code: 'coinCirculation', number: coinCirculation}
  //         ])
  //         console.log (data[0].rate[0])
  //         var rateCurrent = data[0].rate[0].nmbr/1000000
  //         var rateBase = data[0].rate[0].nmbr/1000000
  //         // console.log(rateCurrent)

  //         setRates([
  //           {name: 'Price (Base)', code: 'rateBase', number: rateBase}, 
  //           {name: 'Price (Current)', code: 'rateCurrent', number: rateCurrent},            
  //         ])

  //         var valueMarket = coinCirculation * rateCurrent
  //         setMarket(valueMarket)
  //       }

  //       // setData(props.data.units)

  //       setLoading(false);
  //     }
  //     fetchData()
  //   } else {}
  // },[data]);


  const handleClick = async(item) => {
    // navigate(`/assets/${item}`)
  }


  // if (loading) return <></>
  // if (!loading && !data) return <>No Data Available</>


  return (
    <>
    
      {/* data */}
      <div className="row row-cols-2 row-cols-md-4 g-2">
        <div className="col">
          <div className="back-color-wite border p-3">
            <p className="text-small m-0">
              <span className="">Market Cap</span>
              <span className="ms-1"><i className="bx bx-info-circle text-color-tone"></i></span>
            </p>
            <p className="text-lead m-0">
              <span>{NumberFormat(data?.market.current/1000000 || '******', 'ww', 0)}</span>
            </p>
          </div>
        </div>
        <div className="col">
          <div className="back-color-wite border p-3">
            <p className="text-small m-0">
              <span className="">Circulating Supply</span>
              <span className="ms-1"><i className="bx bx-info-circle text-color-tone"></i></span>
            </p>
            <p className="text-lead m-0">
              <span>{NumberFormat(data?.units.circulation || '******', 'ww', 0)}</span>
            </p>
          </div>
        </div>
        <div className="col">
          <div className="back-color-wite border p-3">
            <p className="text-small m-0">
              <span className="">Total Supply</span>
              <span className="ms-1"><i className="bx bx-info-circle text-color-tone"></i></span>              
            </p>
            <p className="text-lead m-0">
              <span>{NumberFormat(data?.units.market || '******', 'ww', 0)}</span>
            </p>
          </div>
        </div>    
        <div className="col">
          <div className="back-color-wite border p-3">
            <p className="text-small m-0">
              <span className="">Average Price</span>
              <span className="ms-1"><i className="bx bx-info-circle text-color-tone"></i></span>
            </p>
            <p className="text-lead m-0">
              <span>{NumberFormat(data?.rates.current/1000000 || '******', 'ww', 2)}</span>
            </p>
          </div>
        </div>                
      </div>
      

    </>
  );

}