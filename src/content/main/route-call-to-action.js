// content
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";


const listMedia= [
  {name: '', media: 'https://img.freepik.com/free-photo/blue-liquid-marble-background-abstract-flowing-texture-experimental-art_53876-104502.jpg?w=600'},

]


export default function RouteCallToActionModule () {

  const asset = {}
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        

      }
      fetchData()
    } else {}
  },[]);


  const handleSubmit = async() => {
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  return (
  <>
    <div className="text-center">
      <h3 className="">Technology-First Approach</h3>
    </div>

    <WebbDividerSmall />
    <div className="container back-color-wite text-center">

      <WebbDividerSmall />
      <div className="">

        <div className="row">
          <div className="col-3 d-none d-md-block"></div>
          <div className="col">

          <WebbDividerMedium />  
          <h3 className="text-center text-primary">A fully integrated suite of financial products for Web3</h3>

          <WebbDividerMedium />
          <p className="text-lead">
            We bring together everything that’s required to build user experiences 
            and dapps that accept payments and send payouts globally. 
          </p>
          <p className="text-lead">
            Route products power payments for web3 first buidlers, subscriptions, 
            software platforms and marketplaces, and everything in between.
          </p>

          <WebbDividerMedium />
          <span className="btn btn-info rounded-wd back-color-next border-none text-color-wite text-small p-3 px-5">
            <span className="" onClick={()=> navigate('/auth')}>Get Started</span>
          </span>

          <WebbDividerMedium />
          </div>
          <div className="col-3 d-none d-md-block"></div>
        </div>

      </div>
      
      <WebbDividerSmall />
    </div>
  

  </>
  );
}