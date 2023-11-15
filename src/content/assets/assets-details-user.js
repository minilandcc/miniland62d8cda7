// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";


import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import AssetInfoDetailsModule from "./assetx-details";
import { AssetViewsSet } from "../../services/srvc-assets-webb-realm";


export default function AssetsDetailsUserModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        
        await AssetViewsSet ({data: {asset: id, user: asset.item}, srvc: '******'})

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);


  if (loading) return <><WebbLoaderMedium /></>


  return (
  <>

    {/* details */}
    <AssetInfoDetailsModule />


  </>

  )
}