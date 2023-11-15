// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

import { NumberFormat } from "../../services/srvc-utilities";
import { GetUserForm } from "../../services/srvc-utilities";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import AssetUnitActionsUserModule from "../assets.units.actions/units-actions-user";

import { UnitDetails } from "../../services/srvc-assets-realm";


export default function AssetUnitDetailsUserModule () {

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

        const resUnit = await UnitDetails({data: {item: id}, srvc: '******'})
        if (resUnit.stat) setData(resUnit.data)
        // console.log (resUnit)


        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  if (loading) return <>Please Wait...</>

  return (
  <>

    {/* info */}
    <div className="row g-2">
      
      {/* asset */}
      <div className="col-md">

        <p className="text-small text-color-tone m-0 ms-3 mb-2">ASSET/UNIT DETAILS</p>
        <div className="rounded-xd back-color-wite border">

          <div className="d-flex px-3 mt-3">

            <div className="" style={{width: '2.7rem', height: '2.7rem'}}>
              <div className="media-cube" >
                <img src={data.media.link} className="rounded-xx" alt={data.name || ''}></img>
              </div>
            </div>

            <div className="ms-2">
              <p className="text-normal text-bold m-0 text-sm">{data?.meta?.name || '******'}</p>
              <p className="text-color-next m-0">ID: {data?.webx?.number || '******'}</p>
            </div>
          </div>

          
          <div className="d-none">
            <div className="media-cube">
              <img src={data?.media?.link} 
                className="" 
                alt={data?.unit?.name || 'miniland'}
              ></img>
            </div>
          </div>
          
          <WebbDividerSmall />
          <div className="px-3">
            <p className="m-0 text-wd">{data?.meta?.memo || '******'}</p>
          </div>


          <WebbDividerSmall />
          <div className="px-3">
            <p className="text-color-main m-0 p-0">
              <span>{'Rate:  '}</span>
              <span className="">
                {(((parseInt(data?.rate?.number || 0)))/1000000).toFixed(2)}
              </span>
              <span>{' '}</span>
              <span className="text-small">{data?.rate?.ticker || '*'}/SQFT</span>
            </p>        
          </div>          

          <div className="mb-1"></div>
          <div className="d-flex text-dark px-3">
            <div className="text-small">
              <p className="m-0">
                {`SOLD: ${((data?.units?.mint !=='0' ? (data?.units?.book/data?.units?.mint) : 0)*100).toFixed(0)}%`}
              </p>
            </div>
            
            <div className="ms-auto text-end">{(data?.units?.mint || '0')}</div>  
          </div>
          
          <div className="px-3">
            <div className="progress" role="progressbar" style={{height: '0.27rem'}}>
              <div className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                style={{width:`${(data?.units?.book/data?.units?.mint)*100}%`, height: '0.27rem'}}>
              </div>
            </div>
          </div>
          
          <div className="d-flex text-dark d-none">
            <div className=""><p className="text-small text-color-tone m-0 mb-1">Units: {data?.units?.ticker || 'BRX'}</p></div>
            <div className="ms-auto text-end">{(data?.units?.mint || '0')}</div>  
          </div>

          <WebbDividerSmall />

        </div>

        <WebbDividerSmall />
        {/* user info */}
        <div className="rounded-xd back-color-wite border p-3 d-none">
          <p className="text-small text-color-tone m-0">USER DETAILS</p>
          <p className="text-bold text-truncate m-0">Name: {asset?.name || '******'}</p>
          <p className="text-small text-truncate m-0">Mail: {asset?.mail || '******'}</p>
        </div>

      </div>


      <div className="col-md">
        
        {/* user info */}
        <p className="text-small text-color-tone m-0 ms-3 mb-2">USER DETAILS</p>
        
        <div className="rounded-xd back-color-wite border p-3">
          <p className="text-bold text-truncate m-0">Name: {asset?.name || '******'}</p>
          <p className="text-small text-truncate m-0">Mail: {asset?.mail || '******'}</p>
        </div>

        <WebbDividerSmall />
        <AssetUnitActionsUserModule />

        <WebbDividerSmall />
      </div>

    </div>

  </>

  )
}