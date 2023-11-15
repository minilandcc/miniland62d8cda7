// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import AssetsDetailsUserModule from "../content/assets/assets-details-user";
import AssetFeaturesModule from "../content/assets/assetx-features";
import AssetActionsModule from "../content/assets/assetx-actions";

import AssetStatisticsModule from "../content/assets/assetx-statistics";
import AssetUnitListModule from "../content/assets/assetx-units";

import AssetDocumentsListModule from "../content/assets.media/asset-documents-list";

import AssetOffersListModule from "../content/assets/assetx-offers";
import AssetUserListModule from "../content/assets/assetx-users";
import AssetTransferListModule from "../content/assets/assetx-transfers";


export default function AssetDetailsUser () {
  
  const metadata = {
    name: 'Asset Details',
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
        <div className="back-color-wite rounded-xd border">
          <AssetsDetailsUserModule />

          <WebbDividerMedium />
          <AssetFeaturesModule />

          <WebbDividerMedium />
          <AssetActionsModule />
          
          <WebbDividerSmall />
        </div>
        
        <WebbDividerMedium />
        <div className="">
          {/* <p className="text-normal text-color-main mx-3">Asset Data</p> */}
          {/* <AssetStatisticsModule />   */}

          {/* <WebbDividerMedium /> */}
          <p className="text-normal text-color-main mx-3">Asset Units & Data</p>
          <AssetUnitListModule />
        </div>

        <WebbDividerMedium />
        <div className="">
          <p className="text-normal text-color-main m-0 mx-3">Media & Documents</p>

          <WebbDividerSmall />
          <AssetDocumentsListModule />
          <WebbDividerMedium />

          <p className="text-lead text-color-main mx-3 d-none">Investors</p>
          {/* <AssetUserListModule /> */}
          <WebbDividerMedium />

          <p className="text-lead text-color-main mx-3 d-none">Transfers</p>
          {/* <AssetTransferListModule /> */}
          <WebbDividerMedium />

        </div>        

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