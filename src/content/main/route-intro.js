// content
import { useEffect, useState } from "react";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

const listMedia = require('../../static/data-route-intro.json').data


export default function RouteIntroModule () {

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

    <div className="container">
      
      <p className="text-lead">
        Cross-border money transfers can be challenging due to various factors such as 
        currency exchange rates, transaction fees, processing time, and security concerns. 
        Other issues include the lack of transparency, regulatory requirements, and the 
        complexity of the process. These challenges can affect the speed, cost, and 
        efficiency of cross-border transactions.
      </p>

      <WebbDividerMedium />
      <div className="text-center">
        <h2 className="text-primary">Introducing Route Protocol</h2>
        <h3>A Global Multi-Channel Payment Protocol For Web3 Money</h3>
      </div>
      

      <WebbDividerMedium />
      <div className="row row-cols-1 row-cols-md-3 g-3">
      {data && data.map((item, i) => (
        <div className="col" key={i}>

          <div className="media-cube">
            <img src={item.media} className="rounded-wd" alt={item.name} />
          </div>
          <div className="mb-3"></div>
          <h4 className="text-lead text-center">{item.name}</h4>

        </div>
      ))}
      </div>

      <WebbDividerMedium />
      <WebbDividerMedium />
      <p className="text-lead">
        Blockchain technology has several benefits for cross-border money transfer. 
        Firstly, it allows for faster transaction processing times, as transactions 
        can be completed in a matter of minutes instead of days. 
        
        Secondly, it provides increased transparency, security, and immutability, 
        ensuring that transactions are tamper-proof and trackable. Finally, blockchain-based 
        cross-border money transfer can reduce costs by eliminating the need for intermediaries 
        and reducing currency exchange fees. Overall, blockchain technology can improve the speed, 
        efficiency, and cost-effectiveness of cross-border money transfers.
      </p>

      <WebbDividerMedium />
      <WebbDividerMedium />
    </div>
  

  </>
  );
}