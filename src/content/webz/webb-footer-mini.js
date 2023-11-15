// web footer
import { useEffect, useState } from "react";
import Link from "next/link";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

const list = require('../../static/navs-footer-webb.json').data

export default function WebbFooterMini() {

  const asset ={user: ''}


  const [head, setHead] = useState();
  const [navx, setNavs] = useState();

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        
        setNavs(list.filter(x =>x.actv).sort((a, c) => a.rank - c.rank))
        setHead([...new Set(list.map(item=>item.sort))])
      }
      fetchData()
    } else {}
  },[]);



  return (
    <>
    {/* footer */}

    <div className="">
      <div className="hstack gap-2">
      {navx && navx.map((item, i) => (item.actv ?
        <Link className="cursor" href={item.link} key={i}>
          {item.name}
        </Link>  
      :''))}
      </div>
    </div>
    <WebbDividerMedium />
    </>
    )
}