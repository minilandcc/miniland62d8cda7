// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetDetails } from "../../services/srvc-assets-realm";

export default function AssetInfoDetailsModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()



  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        // console.log (id)

        const result = await AssetDetails({data: {item: id}})
        console.log (result)

        if (result.data) setData(result.data)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  if (loading) return <>Please Wait...</>


  return (
  <>

    {/* info */}
    <div className="">

    {/* media */}
    <div className="back-color-wite rounded-xd">
      <div className="media-banner d-none d-md-block">
        <img src={data?.media?.link} className="w-100 rounded-xd rounded-bottom-none"></img>
        <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">{data?.meta?.sort || 'asset'}</div>
      </div>

      <div className="media-standard d-md-none">
        <img src={data?.media?.link} className="w-100 rounded-xd rounded-bottom-none"></img>
        <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">{data?.meta?.sort || 'asset'}</div>
      </div>

    </div>
 
    <WebbDividerSmall />
    <div className="container">
      <p className="text-color-next">ID: {data?.webx?.number || '0000'}</p>
      <h1 className="text-lead text-color-main">{data && data.meta.name}</h1>
      <p className="">{data && data.meta.memo}</p>
    </div>
    
    <WebbDividerSmall />
    <div className="container">
      <p className="text-uppercase m-0 d-none">Project By: {data?.creator?.name || 'creator name'}</p>
      <p className="m-0">Location: {data?.location?.site || 'location'}</p>
    </div>

    </div>
  </>

  )
}