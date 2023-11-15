// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

import { NumberFormat } from "../../services/srvc-utilities";
import { GetUserForm } from "../../services/srvc-utilities";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

// import AssetUnitActionsUserModule from "./units-actions-user";

import { UnitDetails } from "../../services/srvc-assets-realm";



export default function AssetUnitDetailsInvestorModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState()
  const [unit, setUnits] = useState()


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        
        console.log (id)
        const resUnit = await UnitDetails({data: {item: id}, srvc: '******'})
        console.log (resUnit)
        if (resUnit.data) setData(resUnit.data)


        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  if (loading) return <>
    <p className="text-color-tone mt-1 mx-3">Please Wait...</p>
  </>

  return (
  <>

    {/* info */}

    {/* media */}
    <div className="d-none">
      <div className="media-banner">
        <img src={data?.media?.link} className="w-100 rounded-xd"></img>
      </div>
    </div>


    <div className="p-3 back-color-wite border rounded-xd">

      <h1 className="text-lead text-color-main">{data?.meta?.name || '******'}</h1>
      <p className="m-0">ID: {data?.webx?.number || '******'}</p>            
      <p className="m-0 mt-3">{data?.meta?.memo || '******'}</p>         

      <WebbDividerMedium />
      <div className="d-flex text-dark">
        <div className="text-small">
          <p className="m-0">
            {`SOLD: ${((data?.units?.mint !=='0' ? (data?.units?.sale/data?.units?.mint) : 0)*100).toFixed(0)}%`}
          </p>
        </div>
        
        <div className="ms-auto text-end">{(data?.units?.sale || '0')}</div>  
      </div>
      
      <div className="mb-1">
        <div className="progress" role="progressbar" style={{height: '0.27rem'}}>
          <div className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
            style={{width:`${(data?.units?.sale/data?.units?.mint)*100}%`, height: '0.27rem'}}>
          </div>
        </div>
      </div>
      
      <div className="d-flex text-dark">
        <div className=""><p className="text-small text-color-tone m-0 mb-1">Units: {data?.units?.ticker || 'BRX'}</p></div>
        <div className="ms-auto text-end">{(data?.units?.mint || '0')}</div>  
      </div>
    
    </div>


  </>

  )
}