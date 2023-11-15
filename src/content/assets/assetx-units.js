// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";


import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetUnits } from "../../services/srvc-assets-realm";


export default function AssetUnitListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()
  const [book, setBook] = useState({number: 0, ticker: '***'})
  const [mint, setMint] = useState({number: 0, ticker: '***'})

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        // console.log (id)

        const result = await AssetUnits({data: {asset: id, creator: ''}, srvc: '******'})
        console.log (result)

        if (result.stat) setData(result.data.list)

        if (result.stat) {
          const bookx = result.data.list.reduce( (a,c) => a + parseInt(c.units.book), 0)
          const mintx = result.data.list.reduce( (a,c) => a + parseInt(c.units.mint), 0)

          setBook({...book, number: bookx})
          setMint({...mint, number: mintx})
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/au/${item}`)
  }

  if (loading) return <></>

  if (!loading && (!data || data.length === 0)) return <>
    <p className="mx-3">No Units Listed</p>
  </>

  return (
  <>

    {/* info */}
    <div className="d-none">
      <p className="text-lead text-color-main m-0 mx-3">Units & Data</p>
    </div>

    {/* data */}
    <div className="back-color-wite rounded-xd border p-3">

    <div className="d-flex mb-1">
      <div className="">
        <p className="p-0 m-0">
          <span>SOLD: {book && book.number}</span>
          <span>{' '}</span>
          <span>{`(${((book.number/mint.number)*100).toFixed(0)}%)`}</span>
        </p>
      </div>
      <div className="ms-auto">
      <p className="p-0 m-0">
        <span>{mint.number}</span>
        <span className="text-small text-color-tone ms-1">{'BRX'}</span>
      </p>
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


    <WebbDividerSmall />
    {/* units */}
    <div className="back-color-wite rounded-xd border mb-3">
    {data && data.map((item, i) => (
      <div className="cursor " key={i}  onClick={() => handleClick(item.item)}>
        <div className="d-flex rounded-wd p-3 hitone" >
          <div className="" style={{width: '2.4rem', height: '2.4rem'}}>
            <div className="media-cube" >
              <img src={item.media.link} className="rounded-xx" alt={item.name || ''}></img>
            </div>
          </div>

          <div className="ms-2 w-50" >
            <p className="text-bold m-0 text-sm">{item.meta.name}</p>
            <p className="text-small m-0 text-sm">{item.number}</p>
          </div>

          <div className="ms-auto text-end w-25">
            <p className="m-0 text-sm">
              <span className="text-bold ">{(item?.units?.book || 0)}</span>
              <span>{' '}</span>
              <span className="text-small text-color-tone">{(item?.units?.ticker || '**')}</span>
            </p>
            <p className="text-small m-0 text-sm">
              <span>{(item?.units?.mint || 0)}</span>
              <span>{' '}</span>
              <span className="text-small text-color-tone">{(item?.units?.ticker || '**')}</span>
            </p>
          </div>

          <div className="ms-auto text-end d-none">
            <p className="text-bold m-0 text-sm">
              <span>{item?.rate?.number/1000000 || 0}</span>
              <span>{' '}</span>
              <span>{item?.rate?.ticker || '*'}</span>
            </p>
          </div>

        </div>
        <div className={i < data.length-1 ? 'border-bottom' : ''}></div>
      </div>      
    ))}
    </div>

  </>

  )
}