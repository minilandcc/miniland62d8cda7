// web footer
import { useEffect, useState } from "react";
import Link from "next/link";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

const list = require('../../static/data-social.json').data


export default function WebbFooterSocial() {

  const asset = {user: ''}


  const [data, setData] = useState();

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        
        setData(list.filter(x => x.actv))
      }
      fetchData()
    } else {}
  },[]);



  return (
    <>
    {/* footer */}
    <WebbDividerMedium/>
    <WebbDividerMedium/>
    <div className="">
      <div className="row">
        <div className="col" >
          <p className="lead">
            {process.env.NEXT_PUBLIC_WEBB_SITE_NAME} - {process.env.NEXT_PUBLIC_WEBB_SITE_LINE}
          </p>
        </div>    
      </div>    
    </div>

    <div className="">
      <div className="hstack gap-2">
      {data && data.map((item, i) => (
        <Link className="cursor" href={item.link} key={i}>
          <i className={`${item.icon} text-icon-sm`} ></i>
          
        </Link>  
      ))}
      </div>
    </div>

    </>
    )
}