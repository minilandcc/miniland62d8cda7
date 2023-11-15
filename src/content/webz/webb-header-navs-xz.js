// navs
import { useEffect, useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";


const listNavs = require('../../data.static/navs-header-xz.json').data

export default function WebbHeaderNavs() {

  const location = useLocation();  
  const linx = location.pathname.split('/')[2]
  const form = location.pathname.split('/')[1]
  const data = listNavs.filter(item => item.actv );

  return (
    <>
    {/* header-large */}
    <div className="">
      {data && data.map((item, i) => ( item.actv ?
        
        <Link to={item.link} key={i} className="">
          {item.link === linx 
            ? <span className='text-color-dark p-2 px-2 back-color-lite rounded-md mx-1'>{item.name}</span>
            : <span className='p-2 px-2 hirich rounded-md mx-1'>{item.name}</span>
          }
        </Link>
      
      :''))}
    </div>
  
    </>
  )
}