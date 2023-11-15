// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";
import { UserDocumentList } from "../../services/srvc-documents-realm";
import { AccountsList } from "../../services/srvc-accounts-realm";

const listactions = require("../../data.static/data-user-actions.json").data;

export default function UserActionsModule () {

  const navigate = useNavigate();
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  // console.log(listactions.filter(x => x.user.includes(asset.form)))

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = listactions.filter(x => x.user.includes(asset.form))
        setData(result)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  const handleClick = (live, link) => {
    if (live) navigate(`/${asset.form}/${link}`)
  }

  if (loading) return <></>


  return (
  <>
    
    <div className="back-color-wite  border rounded-xd py-2">
      <div className="container-fluid">

      <div className="row row-cols-3 row-cols-md-6 g-1">
        {data && data.map((item, i) => (item.actv ?
        
        <div className="col text-center" key={i}>

          <div 
            className={`w-100 h-100 border-none text-center text-decoration-none m-0 p-0            
            ${item.live ? 'text-color-next' : 'text-color-tint'}`}>

            <div 
              className={`p-1 py-2 pb-1 rounded-xd border-none back-color-wite
              ${item.live ? 'hirich cursor' : ''}
              `}
              onClick={() => handleClick(item.live, item.link)}>              
              <i className={`m-0 p-0 ${item.icon}`}  
                style={{fontSize:"2em",}}>
              </i>
              
              <div className="d-none d-md-block">
                <p className={`m-0 p-0 text-nowrap ${item.live ? 'text-dark' : 'text-color-tint'}`}>
                <span className="text-small">{item.name}</span>
                </p>
              </div>
              
              <div className="d-md-none">
                <p className={`m-0 p-0 text-nowrap ${item.live ? 'text-dark' : 'text-color-tint'}`}>
                  <span className="text-mini">{item.name}</span>
                </p>
              </div>

            </div>  

          </div>

          <Link 
            to={`/${asset.form}/${item.link}`}       
            style={{pointerEvents:`${ item.actv ? '' : 'none' } `}}
            className={`w-100 h-100 border-none text-center
            text-decoration-none m-0 p-0 ${item.actv ? 'text-color-next' : 'text-color-tone'}`}>

          
          </Link>

        </div>
        :''))}

      </div>
    </div>
    </div>
  </>

  )
}