// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import AssetUnitDetailsInvestorModule from "../content/assets.units/units-details-investor";
import UnitsListOwnersModule from "../content/assets.units/units-list-owners";
import UnitsListTransfersModule from "../content/assets.units/units-list-transfers";

import TransfersAssetsListInvestorModule from "../content/transfers.assets/transfers-assets-list-investors";

export default function AssetsUnitsDetailsInvestor () {
  
  const metadata = {
    name: 'Asset Unit Details',
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

      media = {{ size: 'medium', data: <></> }}

      content = {{ size: 'medium', data: 
      <>
        <WebbDividerSmall />
        <AssetUnitDetailsInvestorModule />

        <WebbDividerMedium />
        <div className="">
          <p className="text-color-main m-0 mx-3">Distribution</p>
        </div>        
        <UnitsListOwnersModule />        

        <WebbDividerMedium />
        <div className="">
          <p className="text-color-main m-0 mx-3">Transactions</p>
        </div>
        <TransfersAssetsListInvestorModule />

        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </>
      }}
    
      footer = {{ size: 'medium', data: 
      <> 
        <div className="text-center back-color-lite fixed-bottom d-block d-md-none">
          <WebbDividerSmall />
          <WebbFooterMobile /> 
        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}