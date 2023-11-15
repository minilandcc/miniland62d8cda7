// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import NavsButtonBack from "../webx/navs-button-back";
import NavsButtonNext from "../webx/navs-button-next";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { TransfersAssetListUnit } from "../../services/srvc-transfers-assets-realm";


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


const listicon = [
  {mode: 'mint', icon: 'grid-alt'},
  {mode: 'claim', icon: 'check-circle'},
  {mode: 'transfer', icon: 'chevron-up-square'},
  {mode: 'recall', icon: 'chevron-down-square'},
  {mode: 'freeze', icon: 'info-circle'},
  {mode: 'unfreeze', icon: 'info-circle'},
  {mode: 'burn', icon: 'grid-alt'},
]

export default function TransfersAssetsListInvestorModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

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

        const result = await TransfersAssetListUnit({data: {
          unit: id, index: index, items: items, 
          filters:{ name: '' }
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
  },[id, index, items]);

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

  if (loading) return <>
    <p className="text-color-tone mt-1 mx-3">Please Wait...</p>
  </>
  if (!loading && (!data || data.length === 0)) return <>
    <p className="text-color-tone mt-1 mx-3">No Transactions</p>
  </>

  return (
  <>

    {/* info */}
    <div className="d-none">
      <p className="text-color-main m-0 mx-3">Trasactions</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="back-color-wite rounded-xd border mb-3">
    {data && data.map((item, i) => (
      <div className="" key={i}>
        <div className="d-flex rounded-wd p-3" >
          <div className={item?.credit?.item == asset.item 
              ? `text-color-next` 
              : `text-color-tone`
            }
            style={{fontSize:'1.2rem', lineHeight:'1rem'}}>
            <i className={item?.credit?.item == asset.item 
              ? `bx bxs-${(listicon.find(x => x.mode == item.feat.sort).icon)}`
              : `bx bx-${listicon.find(x => x.mode == item.feat.sort).icon}`
            }></i>
            {/* <i className={listicon.find(x => x.mode == item.feat.sort).icon}></i> */}
          </div>


          <div className="ms-2 w-50" >
            <p className="text-uppercase m-0 text-sm">
              <span className="align-middle">{item?.item || '******'}</span>
            </p>
          </div>

          <div className="ms-auto text-end w-25">
            <p className="m-0 text-sm">
              <span>{parseInt(item?.sale?.number || 0)}</span>
              <span>{' '}</span>
              <span className="text-small text-color-tone">{(item?.sale?.ticker || 0)}</span>
              <span className={`text-small ms-1 ${list.find(x => x.code == item.status).color}`}>
              <i className={`small ${list.find(x => x.code == item.status).icon}`}></i>
            </span>                 
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