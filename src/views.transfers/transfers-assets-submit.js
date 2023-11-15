// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import TransfersAssetSubmitModule from "../content/transfers.assets/transfers-assets-submit";

export default function TransfersAssetsSubmit () {
  
  const metadata = {
    name: 'Authorize Asset Transfer',
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
      header = {{ size: 'medium', visible: true, data: 
        <> 
          <WebbHeader data={{name: metadata.name, home: '/', link:'home'}} /> 
        </> }}

      media = {{ size: 'medium', visible: false, data: <></> }}

      content = {{ size: 'medium', visible: true, data: 
      <>
        <WebbDividerSmall />
        <TransfersAssetSubmitModule />

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