// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import NavsButtonBack from "../webx/navs-button-back";
import NavsButtonNext from "../webx/navs-button-next";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { TransfersList } from "../../services/srvc-transfers-realm";

export default function NetworkListModule () {
 
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  const [search, setSearch] = useState()

  const [index, setIndex] = useState(1)
  const [items, setItems] = useState(10)

  const [curr, setCurrentIndex] = useState(1)
  const [next, setNextIndex] = useState()
  const [last, setLastIndex] = useState()

  const [count, setCount] = useState()
  const [total, setTotal] = useState()

  const [text, setText] = useState('')


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await TransfersList({data: {
          user: asset.item, index: index, items: items, 
          filters:{ name: search }
        }})
        // console.log (result)

        if (result.data) {
          setData(result.data.list)
          setTotal(result.data.count)

          setText(`${((index-1) * items +1)} - ${index * items < result.data.count ? index * items : result.data.count} of ${result.data.count}`)
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[search, index, items]);

  const NextIndex = async() =>{
    if(data.length < items) {}
    else {
      setNextIndex(curr+1)
      setIndex(curr+1)
      setCurrentIndex(curr+1)
    }
  }

  const LastIndex = async()=>{
    if(index == 1) {}
    else{
      setLastIndex(curr-1)
      setIndex(curr-1)
      setCurrentIndex(curr-1)
    }
  }


  if (loading) return <></>
  if (!loading && (!data || data.length === 0)) return <>No Transactions !</>

  return (
  <>

    <div className="back-color-wite rounded-wd border">
    {data && data.map((item, i) => (
      <div key={i}>
        <div className="d-flex px-3 mt-3">

          <div className="d-none">
            <span className="text-small">
              <i className={`bx bxs-${item.status == 6 ? 'check-circle text-color-success' : 'circle text-color-warning'}`}></i>
            </span>
          </div>  

          <div className="">         
            <p className="m-0 text-sm text-primary">
              <span className="text-bold">{item.user.name}</span>
            </p>
          </div>
      
          <div className="ms-auto text-end">         
            
              <span>{data && item.mode === 'credit' ? '+' : '-'}</span>
              <span className="text-bold">{NumberFormat(data && parseFloat(item.amount.number/1000000).toFixed(6))}</span>
              {/* <span className="ms-1 text-color-tone text-uppercase">{item.amount.ticker}</span> */}
            
            <span className="text-small ms-1">
              <i className={`bx bxs-${item.status == 6 ? 'check-circle text-color-success' : 'circle text-color-warning'}`}></i>
            </span>            
          </div>

        </div>
        <div className="px-3 mb-3">
          <p className="text-small m-0">{item.memo}</p>
          <p className="text-small text-color-tone m-0">{new Date(item.created).toLocaleString()}</p>
        </div>
        <div className="border-bottom"></div>
      </div>
    ))}
    </div>
    
    {/* navs */}
    <WebbDividerSmall />
    <div className={data.length < items ? '' : ''}>
      <div className="d-flex justify-content-between">

        <div className="" onClick={()=>LastIndex()}>
          <NavsButtonBack />
        </div>

        <div className="">
          <p className="my-2 text-color-tone">{text}</p>
        </div>

        <div className="" onClick={()=>NextIndex()}>
          <NavsButtonNext />
        </div>

      </div>
    </div>    

  </>

  )
}