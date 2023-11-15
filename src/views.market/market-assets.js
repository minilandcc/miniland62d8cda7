// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xw";
import WebbHeader from "../content/webz/webb-header-xw";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import TransfersListModule from "../content/transfers/transfers-list";
import AssetsListMarketModule from "../content/assets/assets-list-market";


export default function MarketAssetsList () {
  
  const metadata = {
    name: 'Assets',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }

  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'fluid', visible: true, data: 
        <> 
          <div className="">
            <WebbHeader data={{name: metadata.name, home: '/', link:''}} /> 
          </div>
        </> }}

      media = {{ size: 'xtra', visible: false, data: <></> }}

      content = {{ size: 'fluid', visible: true, data: 
      <>
        <WebbDividerSmall />
        <h2 className="text-normal text-color-next text-uppercase">Featured Assets</h2>        
        <WebbDividerMedium />
        
        <AssetsListMarketModule />        

        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </>
      }}
    
      footer = {{ size: 'xtra', visible: true, data: 
      <> 
        <div className="text-center back-color-lite ">
          <WebbFooterMobile /> 
        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}