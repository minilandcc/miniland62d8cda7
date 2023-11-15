// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";



export default function UserAccountCodeModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  console.log (asset)
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()



  // if (loading) return <WebbLoaderSmall/>


  return (
  <>

    <div className="back-color-wite rounded-wd p-3 border">
      
      <p className="text-small text-color-tone m-0 mb-3">User Code</p>
      <img className="" src={asset.code.link}></img>


    </div>
    
    

  </>

  )
}