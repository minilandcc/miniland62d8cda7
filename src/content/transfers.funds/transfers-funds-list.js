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

const list = [
  {code: 0, memo: 'created', icon: 'bx bxs-circle', color: 'text-color-tint'},
  {code: 1, memo: 'active', icon: 'bx bxs-circle', color: 'text-color-wait'},
  {code: 2, memo: 'scheduled', icon: 'bx bxs-info-circle', color: 'text-color-wait'},
  {code: 3, memo: 'locked / on-hold', icon: 'bx bxs-minus-circle', color: 'text-color-wait'},
  {code: 4, memo: 'cancelled', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 5, memo: 'timeout', icon: 'bx bxs-error-circle', color: 'text-color-error'},
  {code: 6, memo: 'closed (success)', icon: 'bx bxs-check-circle', color: 'text-color-success'},
  {code: 7, memo: 'declined (user)', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 8, memo: 'revoked (user)', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 9, memo: 'declined (user)', icon: 'bx bxs-right-arrow-circle', color: 'text-color-next'}
]

export default function TransfersListFundsModule (props) {

  // console.log(props.search)
 
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
        console.log ('transfers')

        const result = await TransfersList({data: {
          user: asset.item, index: index, items: items, 
          filters:{ name: props.search }
        }})
        console.log (result)

        if (result.data) {
          setData(result.data.list)
          setTotal(result.data.count)

          setText(`${((index-1) * items +1)} - ${index * items < result.data.count ? index * items : result.data.count} of ${result.data.count}`)
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[props.search, index, items]);

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

  // console.log(data)

  if (loading) return <>Please Wait...</>
  if (!loading && (!data || data.length === 0)) return <>No Transactions !</>

  return (
  <>
    <div className="back-color-wite rounded-xd border">
      
    {data && data.map((item, i) => (
      <div key={i}>
        <div className="d-flex px-3 mt-3">

          <div className="d-none">
            <span className="">
              <i className={`bx bx-credit-card`}></i>
            </span>
          </div>  

          <div className="">         
            <p className="m-0 text-sm">
              <span className="text-color-next text-bold">{item.user.name}</span>
            </p>
          </div>
      
          <div className="ms-auto text-end">         
            
              <span>{data && item.mode === 'credit' ? '+' : '-'}</span>
              <span className="text-bold">{((item?.amount?.number || 0)/1000000).toFixed(2)}</span>
              <span className="text-small ms-1 text-color-tone text-uppercase">{item.amount.ticker}</span>
            
            <span className={`text-small ms-1 ${list.find(x => x.code == item.status).color}`}>
              <i className={`small ${list.find(x => x.code == item.status).icon}`}></i>
            </span>            
          </div>

        </div>
        <div className="px-3 mb-3 w-50">
          <p className="text-small m-0">{item.memo}</p>
          <p className="text-small text-color-tone m-0">{new Date(item.created).toLocaleString()}</p>
        </div>
        <div className={i < data.length-1 ? 'border-bottom': ''}></div>
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