// units
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetUnitStatus } from "../../services/srvc-assets-realm";
import { AssetUserAuthStatus } from "../../services/srvc-assets-webb-realm";


import AssetUnitsClaimModule from "./units-claim";
import AssetUnitsFundModule from "./units-fund";


export default function AssetUnitActionsUserModule (props) {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  const [loading, setLoading] = useState(true);

  const [actions, setActions] = useState([
    {name: "Fund", icon: "bx bx-credit-card", code: "fund", actv: true},
    // {name: "Claim", icon: "bx bx-plus-circle", code: "claim", actv: true},
    // {name: "Mint", icon: "bx bx-down-arrow-circle", code: "mint", actv: false},
    {name: "Offer", icon: "bx bx-up-arrow-circle", code: "offer", actv: false},
    {name: "Transfer", icon: "bx bx-check-circle", code: "transfer", actv: false}
  ])

  const [data, setData] = useState()

  const [auth, setAuth] = useState(0)
  const [task, setTask] = useState()
  
  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const resUnit = await AssetUnitStatus({data: {unit: id}, srvc: '******'})
        if (resUnit.stat) setData(resUnit.data)
        console.log (resUnit)

        const statusx = await AssetUserAuthStatus({data: {
          asset: resUnit.data.asset.item, 
          user: asset.item}, 
          srvc: '******'
        })
        if (statusx.stat) setAuth(statusx.data.auth == 0 ? false : true)
        console.log (statusx)        

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  const handleClick = (item) => {
    if (task == item) setTask() 
    else setTask(item)
  }

  if (loading) return <></>
  if (!loading && (!data?.status?.book || !auth)) return <>
    <div className="back-color-wite border rounded-xd p-3">
      <span className="align-middle"><i className="bx bxs-info-circle text-color-wait text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>Bookings will start soon</span>
    </div>
  </>

  return (
  <>

    {/* info */}
    <div className="">
      <p className="text-small text-color-tone m-0 ms-3 mt-2 mb-2">MY ACTIONS</p>

      <div className={`row row-cols-${actions.length} g-0 back-color-wite rounded-xd border`}>
        {actions && actions.map((item, i) => (
        <div className="col text-center p-1" key={i}>

          <div className={`m-1 p-1 rounded-wd ${item.actv ? 'text-color-next hirich cursor' : 'text-color-tint'}`}
            onClick={() => handleClick(item.code)}
          >
            <i className={`m-0 p-0 ${item.icon} text-icon-md`}></i>
            <p className={`m-0 p-0 text-small text-nowrap d-none d-md-block`}>{item.name}</p>
            <p className={`m-0 p-0 text-mini text-nowrap d-md-none`}>{item.name}</p>
          </div>  
        </div>
        ))}

      </div>
    </div>
    
    
    {/* actions */}
    <WebbDividerSmall />
    <div className={task == 'claim' ? 'border rounded-xd back-color-wite p-3' : 'd-none'}>
      <AssetUnitsClaimModule />
    </div>

    <div className={task == 'fund' ? 'border rounded-xd back-color-wite p-3' : 'd-none'}>
      <AssetUnitsFundModule />
    </div>


  </>

  )
}