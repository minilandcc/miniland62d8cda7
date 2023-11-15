// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { TokensListAsset } from "../../services/srvc-tokens-realm";


export default function UnitsListOwnersModule () {

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

        const result = await TokensListAsset({data: {
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


  // useEffect for form validation


  if (loading) return <>
    <p className="text-color-tone mt-1 mx-3">Please Wait...</p>
  </>
  if (!loading && (!data || data.length === 0)) return <>
    <p className="text-color-tone mt-1 mx-3">No Units Listed</p>
  </>

  return (
  <>

    {/* info */}
    <div className="d-none">
      <p className="text-color-main m-0 mx-3">Distribution</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="back-color-wite rounded-xd border mb-3">
    {data && data.map((item, i) => (
      <div className="" key={i}>
        <div className="d-flex rounded-wd p-3" >
          <div className="" style={{fontSize:'1.2rem', lineHeight:'1rem'}}>
            <i className={item?.user?.item == asset.item 
              ? `bx bxs-user-circle text-color-next` 
              : `bx bx-user-circle text-color-tone`
            }></i>
          </div>

          <div className="ms-2 w-50" >
            <p className="text-uppercase m-0 text-sm">
              <span className="align-middle">{item?.user?.item || '******'}</span>
            </p>
          </div>

          <div className="ms-auto text-end w-25">
            <p className="m-0 text-sm">
              <span>{parseInt(item?.balance?.number || '0')}</span>
              <span>{' '}</span>
              <span className="text-small text-color-tone">{(item?.balance?.ticker || 0)}</span>
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