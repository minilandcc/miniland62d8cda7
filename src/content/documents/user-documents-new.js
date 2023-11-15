// transfers
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";

import listDocuments from "../../data.static/data-documents-new.json"

export default function UserDocumentsNewModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        setData(listDocuments.data)
        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  // if (loading) return <></>


  return (
  <>

  <div className="back-color-wite rounded-wd  border">
    {data && data.map((item, i) => ( item.actv ?
      <Link to={`/${asset.form}/${item.link}`} key={i}>
      <div className="d-flex px-3 pt-3 cursor hirich" >

        <div className="">         
          <i className={`${item.icon} text-icon-sm`}></i>
        </div>

        <div className="ms-2">         
          <p className="m-0 text-sm text-bold">
            <span className=" text-dark">{item.name}</span>
          </p>
          <p className="text-small">
            <span className="text-dark">{item.memo}</span>
          </p>          
        </div>
    
        <div className="ms-auto text-end">         
          <i className={`bx bx-chevron-right text-icon-sm text-color-tone`}></i>
        </div>

      </div>

      <div className="border-bottom"></div>
      </Link>
    :''))}
    </div>


  </>

  )
}