import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import WebbDividerMedium from '../webx/webb-divider-md'
import WebbDividerSmall from '../webx/webb-divider-sm'

import { GetUserForm } from '../../services/srvc-utilities'
import { GetLocalBusiness, GetLocalUser } from '../../services/srvc-auth-user'

import { TransfersAssetListUserWait } from '../../services/srvc-transfers-assets-realm'

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

export default function TransfersAssetListWaitModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()

  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState()
  const [index, setIndex] = useState(1)
  const [items, setItems] = useState(10)

  const [curr, setCurrentIndex] = useState(1)
  const [next, setNextIndex] = useState()
  const [last, setLastIndex] = useState()

  const [search, setSearch] = useState("draft")

  const [count, setCount] = useState()
  const [total, setTotal] = useState()

  const [text, setText] = useState('')

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await TransfersAssetListUserWait({data: {
          user: asset.item, index: index, items: items, 
          filters:{ name: search }
        }})
        console.log (result)

        if (result.stat) {
          setData(result.data.list)
          setTotal(result.data.count)

          setText(`${((index-1) * items +1)} - ${index * items < result.data.count ? index * items : result.data.count} of ${result.data.count}`)
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[search, index, items]);

  const handleClick = (item) => {
    navigate(`/${asset.form}/mx/${item}`)
  }

  
  if (loading) return <>Please Wait...</>
  if (!loading && (!data || data.length == 0)) return <>
    <p className="m-0 text-color-tone">No Pending Asset Transfers</p>
  </>

  return (
  <>

    {/* info */}
    <p className='m-0'>You have {data.length} Pending Transactions</p>
    
    <WebbDividerSmall />
    <div className="back-color-wite rounded-xd border">

    {data && data.map((item, i) => (
      <div className='cursor' onClick={() => handleClick(item.item)} key={i}>
        <div className="d-flex px-3 mt-3">

          <div className="d-none">
            <span className="text-small">
              <i className={`bx bxs-${item.status == 6 ? 'check-circle text-color-success' : 'circle text-color-warning' }`}></i>
            </span>
          </div>  

          <div className="">         
            <p className="m-0 text-sm text-color-next">
              <span className="text-bold">{item?.unit?.name || '******'}</span>
            </p>
          </div>
      
          <div className="ms-auto text-end">         
            
              <span>{item?.credit?.item == asset.item ? '+' : '-'}</span>
              <span className="text-bold">{(item?.sale?.number || 0)}</span>
              <span className="text-small ms-1">{(item?.sale?.ticker || 0)}</span>
              <span className={`text-small ms-1 ${list.find(x => x.code == item.status).color}`}>
                <i className={`small ${list.find(x => x.code == item.status).icon}`}></i>
              </span>            
          </div>

        </div>
        <div className="px-3 mb-3 w-50">
          <p className="text-small m-0">
            <span>{item.feat.form}</span>
            <span>{'-'}</span>
            <span>{item.feat.sort}</span>
          </p>
          <p className="text-small text-color-tone m-0 d-none">{new Date(item.created).toLocaleString()}</p>
        </div>
        <div className={i < data.length-1 ? 'border-bottom': ''}></div>
      </div>
    ))}
    </div>
    
    {/* navs */}
   

  </>

  )
}