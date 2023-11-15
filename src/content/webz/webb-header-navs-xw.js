// web navigation
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { GetUserForm, ActiveSiteLink } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const listNavs = require('../../data.static/navs-header-xw.json').data

export default function WebbHeaderNavs(props) {

  const usxx = GetUserForm();
  // console.log (usxx)
  const asset = GetLocalUser();
  const team = GetLocalBusiness()
  // console.log(team)

  const location = useLocation();  
  const linx = location.pathname.split('/')[2]
  const form = location.pathname.split('/')[1]

  const data = listNavs.filter(item => item.user.includes(form) && item.actv );

  return (
    <>
    {/* header-large */}
    <div className="">
      {data && data.map((item, i) => ( item.actv ?
        
        <Link to={`/${form}/${item.link}`} key={i}>
          {item.link === linx 
            ? <span className='p-2 text-color-next me-1'>{item.name}</span>
            : <span className='p-2 text-color-tone hidark rounded me-1'>{item.name}</span>
          }
        </Link>
      
      :''))}

    </div>
  
    </>
  )
}