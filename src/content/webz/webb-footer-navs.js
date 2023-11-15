// web footer
import { useEffect, useState } from "react";
import Link from "next/link";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

const list = require('../../static/navs-footer-webb.json').data

export default function WebbFooterNavs() {

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
    <WebbDividerMedium />
    <WebbDividerMedium />

    <div className="">
      <div className="row">    
        <div className="col" >
          
          <div className="row row-cols-2 row-cols-md-4 g-0">
            {head && head.map((hedx, x) => (
              <div className="col mb-3" key={x}>
                <h4 className="fw-bold text-tint text-small mb-1">
                  {hedx.toUpperCase()}
                </h4>
                <hr></hr>
                
                {navx && navx.map((item, i) => ( item.sort === hedx  ?
                  <div className="py-1" key={i}>
                    <Link href={item.link} >  
                      <span className="cursor text-small">{item.name}</span>  
                    </Link>
                  </div>
                :''))}
              </div>
            ))}
          </div>

        </div>
            
      </div>    

    </div>
    <WebbDividerMedium />
    </>
    )
}