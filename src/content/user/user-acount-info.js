// user account
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";
import WebbDividerSmall from "../webx/webb-divider-sm";


export default function UserAccountInfoModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  const team = GetLocalBusiness()
  // console.log(asset)
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()



  // if (loading) return <WebbLoaderSmall/>


  return (
  <>
    
    <div className="back-color-wite rounded-xd p-3 border">

      <div className="d-flex">
        <div className="me-auto">
          <p className="text-small text-color-tone m-0">User Details</p>
          <p className="text-color-next text-bold text-normal">{asset.name}</p>
        </div>

        <div className="">
          <Jazzicon diameter={33} seed={jsNumberForAddress(asset.item ??= Date.now().toString())} /> 
        </div>
      </div>      

      <p className="m-0">{asset.mobile}</p>
      <p className="m-0">{asset.mail}</p>

      <WebbDividerSmall />
      <p className="m-0">Status: {asset.active ? 'Active' : 'Inactive'}</p>

    </div>
    <p className="text-small text-color-tint m-0 mt-2 ms-3">{asset?.item || '******'}</p>

  </>

  )
}