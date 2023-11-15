// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";
import { v4 as uuidv4 } from 'uuid';

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";



export default function AssetOffersListModule () {

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

        // const result = await AssetUnits({data: {item: id}})
        // console.log (result)

        // if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/offers/${item}`)
  }



  if (loading) return <></>


  return (
  <>

    {/* info */}
    <div className="">
      <p className="mx-3">No Offers Listed</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
 

  </>

  )
}