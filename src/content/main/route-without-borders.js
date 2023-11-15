// content
import { useEffect, useState } from "react";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

const listMedia = require('../../static/data-route-intro.json').data


export default function RouteWithoutBordersModule () {

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

    <WebbDividerMedium />
    <WebbDividerMedium />
    <div className="container">
      <div className="row">
      <div className="col-md-6">

      <div className="text-start">
        <h2 className="text-primary caption-md text-uppercase">Move Money</h2>
        <h3 className=" caption-wd text-uppercase">Without Borders</h3>
      </div>


      </div>
      
        <div className="col-md-6">
          <p className="text-lead">
            Our dream is for people to live and work anywhere seamlessly. 
            That means money without borders: moving it instantly, transparently, 
            conveniently, and — eventually — for free.
          </p>

          <p className="text-lead">
            <span className="text-primary text-bold">
              Route Protocol is the universal way for you to move and manage money internationally. 
            </span>
          </p>

          <p className="text-lead">
            It's made for the world. And it's built to get your money and save time, 
            so you can do more of the things you love.
          </p>

        </div>
      
      </div>
      <WebbDividerMedium />
      
      <WebbDividerMedium />
      <WebbDividerMedium />
    </div>
  

  </>
  );
}