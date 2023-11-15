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

import { AssetUsers } from "../../services.webb/srvc-data-assets";


export default function AssetUserListModule () {

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

        const result = await AssetUsers({data: {
          item: id, index: 1, items: 25, 
          filters:{ name: {} }
        }})
        // console.log (result)

        if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/units/${item}`)
  }



  if (loading) return <>Please Wait...</>
  if (!loading && data && data.length === 0) return <>Investors Data Not Found</>

  return (
  <>

    {/* info */}
    <div className="">
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className={loading ? 'mx-3' : 'd-none'}>
      Please Wait...
    </div>

    <div className={loading ? 'd-none' : 'back-color-wite border rounded-none'}>
      {data && data.map((x, i) => (
        <div key={i}>
          <div className="d-flex border-bottom p-3">
            <div className="text-normal text-color-tone">
              <i className={`bx bx-user-circle m-0 p-0`}></i>
            </div>
            <div className="ms-2 d-none d-md-block align-middle" >
              <p className="p-0 m-0 text-sm">{x.account}</p>
              {/* <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p> */}
            </div>
            <div className="ms-1 d-md-none" style={{maxWidth:'50%'}}>
              <p className="p-0 m-0 text-sm">{x.account}</p>
              {/* <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p> */}
            </div>          
            <div className="ms-auto text-end">
              <p className="m-0">
                <span>{NumberFormat(x.unit.number)}</span>
                <span>{' '}</span>
                <span>{x.unit.ticker}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
      </div>
      

    </>
  );

}