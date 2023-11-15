// web navigation
import { useEffect, useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";

import { GetUserForm, ActiveSiteLink } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const listNavs = require('../../data.static/navs-header-xw.json').data

export default function WebbFooterMobile(props) {

  const location = useLocation();  
  const linx = location.pathname.split('/')[2]
  const form = location.pathname.split('/')[1]
  // console.log (form)
  const data = listNavs.filter(item => item.user.includes(form) && item.actv );
  // console.log (data)
  // GetEnvironment()

  return (
    <>
    {/* header-large */}
    <div className="back-color-wite p-1 fixed-bottom d-md-none">
      <div className={`row row-cols-${data.length} g-1`}>
        {data && data.map((item, i) => (
        
        <div className="col text-center" key={i}>

          <Link 
            to={`/${form}/${item.link}`}
            style={{pointerEvents:`${ item.actv ? '' : 'none' } `}}
            className={`w-100 h-100 border-none text-center
            text-decoration-none m-0 p-0 ${item.actv ? '' : 'text-color-tone'}`}>

            <div className="p-1 mb-0 rounded-wd back-color-wite hitone">              
              <i className={`m-0 p-0 ${item.icon} ${item.link === linx ? '' : 'text-color-tone'}`}  
                style={{fontSize:"2em",}}>
              </i>
              
              <div className="d-none d-md-block">
                <p className={`small m-0 p-0 text-dark text-nowrap`}>
                  {item.name}
                </p>
              </div>
              
              <div className="d-md-none">
                <p className={`small m-0 p-0 mb-1 text-dark text-nowrap`} style={{lineHeight:'0.25rem'}}>
                  <small>{item.name}</small>
                </p>
              </div>

            </div>            
          </Link>

        </div>
        ))}

      </div>
    </div>
  
    </>
  )
}