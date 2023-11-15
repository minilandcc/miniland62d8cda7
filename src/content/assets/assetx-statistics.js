// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetStatistics } from "../../services/srvc-assets-realm";

const list = [
  {name: 'Market Cap', code: 'market.book', number: '0', ticker: '***', active: true },
  {name: 'Circulating Supply', code: 'unit.book', number: '0', ticker: '***', active: true },
  {name: 'Total Supply', code: 'unit.mint', number: '0', ticker: '***', active: true },
  {name: 'Rate (Base)', code: 'unit.rate', number: '0', ticker: '***', active: true }
]

export default function AssetStatisticsModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()
  const [book, setBooked] = useState({number: 0, ticker: '***'})
  const [mint, setMinted] = useState({number: 0, ticker: '***'})


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetStatistics({data: {asset: id, chain: '416001'}})
        console.log (result)

        const stats = Array.from(list, x => { return {
          ...x, 
          number: result.data.find(z => z.code == x.code).number || '0',
          ticker: result.data.find(z => z.code == x.code).ticker || 'BRX'
        }})

        if (result.stat) setData(stats)

        if (result.stat) {
          setBooked(result.data.find(x => x.code == 'unit.book').number)
          setMinted(result.data.find(x => x.code == 'unit.mint').number)
        }


        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loading) return <></>


  return (
  <>

    {/* info */}
    
    <div className="back-color-wite rounded-xd border p-3">

      <div className="d-flex">
        <div className="">
          <p className="p-0 m-0">
            <span>SOLD: {book && book.number}</span>
            <span>{' '}</span>
            <span>{`(${((book.number/mint.number)*100).toFixed(0)}%)`}</span>
          </p>
        </div>
        <div className="ms-auto">
        <p className="p-0 m-0">{mint.number}</p>
        </div>
      </div>

      <div className="mb-1">
        <div className="progress" 
          role="progressbar" 
          style={{height: '0.27rem'}}>
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
            style={{width:`${(book.number/mint.number)*100}%`, height: '0.27rem'}}>
          </div>
        </div>
      </div>

    </div>


    {/* data */}
    <div className="back-color-wite rounded-xd border d-none">      
      <div className="row row-cols-2 row-cols-md-4 g-1">
        {data && data.map((item, i) => (
        <div className="col" key={i}>
          <div className="p-3" key={i}>
            <p className="m-0" style={{fontSize: '0.75rem'}}>
              <span className="text-uppercase text-sm">{item.name}</span>
            </p>
            <p className="text-lead m-0">
              <span>{(!item?.number || !item.number ? '***' : item.number)}</span>
            </p>
          </div>
        </div>
        ))}
      </div>

    </div>

    </>
  );

}