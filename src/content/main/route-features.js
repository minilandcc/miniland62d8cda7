// content
import { useEffect, useState } from "react";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

const listMedia = require('../../static/data-route-features.json').data


export default function RouteFeaturesModule () {

  const asset = {}
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        setData(listMedia)

      }
      fetchData()
    } else {}
  },[]);


  return (
  <>
    <div className="text-center">
      <h3 className="">How Does it Work</h3>
    </div>

    <WebbDividerMedium />
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-3">
      {data && data.map((item, i) => (item.name ?
        <div className="col" key={i}>

          <div className="media-cube">
            <img src={item.media} className="rounded-wd" alt={item.name} />
          </div>
          
          <div className="mb-3"></div>

          <div className="text-center">
            <h4 className="text-lead text-primary">{item.name}</h4>
            <p className="text-normal">{item.memo}</p>
          </div>

        </div>
      : ''))}
      </div>
      
    </div>
  

  </>
  );
}