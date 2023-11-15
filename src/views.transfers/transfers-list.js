// main
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xw";
import WebbHeader from "../content/webz/webb-header-xw";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import TransfersListModule from "../content/transfers/transfers-list";

const list = [
  {name: 'Pending', code: 'draft', actv: true},
  {name: 'Pending', code: 'pending', actv: false},
  {name: 'Decline', code: 'decline', actv: false},
  {name: 'Failed', code: 'failed', actv: false},
  {name: 'Cancelled', code: 'cancelled', actv: false},
  {name: 'Success', code: 'success', actv: true},
  {name: 'All', code: 'all', actv: true}
]

export default function TransfersList () {
  
  const metadata = {
    name: 'Transfers',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }

  const [search, setSearch] = useState('success')

  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'medium', visible: true, data: 
        <> 
          <div className="">
            <WebbHeader data={{name: metadata.name, home: '/', link:''}} /> 
          </div>
        </> }}

      media = {{ size: 'medium', visible: false, data: <></> }}

      content = {{ size: 'medium', visible: true, data: 
      <>
        <WebbDividerSmall />
        <h2 className="text-normal text-color-next text-uppercase">My Transfers</h2>

        <WebbDividerSmall />
        <div className="">
        {list && list.map((item, i) => (
          <span className={item.actv? '': 'd-none'} key={i} onClick={() => setSearch(item.code)}>
            <span className={`p-2 px-3 rounded-xx text-small ${search == item.code ? 'back-color-next text-color-wite': 'back-color-tint cursor'}`}>{item.name}</span>
            <span className="me-2"></span>
          </span>
          
        ))}
        </div>
        <WebbDividerSmall />

        <TransfersListModule search={search} />        

        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </>
      }}
    
      footer = {{ size: 'medium', visible: true, data: 
      <> 
        <div className="text-center back-color-lite ">
          <WebbFooterMobile /> 
        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}