// main
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xw";
import WebbHeader from "../content/webz/webb-header-xw";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import WebbLoaderSmall from "../content/webx/webb-loader-sm";

// check onboarding status
import listActions from '../data.static/data-user-onboard.json'
import { GetLocalUser } from "../services/srvc-auth-user";
import { DocumentsOnboardStatus } from "../services/srvc-documents-realm";
import { AccountsOnboardStatus } from "../services/srvc-accounts-realm";

// renders
import AssetsListUserModule from "../content/assets/assets-list-user";
import AssetsListUserFundedModule from "../content/assets/assets-list-user-funded";


export default function AssetsUser () {
  
  const metadata = {
    name: 'Assets',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }


  const asset = GetLocalUser()
  const navigate = useNavigate();

  const [list, setList] = useState(listActions.data);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    const fetchdata = async()=>{
      setLoading(true)

      setLoading(false)
    }
    fetchdata()
  },[])

  // if (loading) return <div className="text-center mt-5"><WebbLoaderSmall /></div>

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
          <WebbHeader data={{name: metadata.name, home: '/', link:''}} /> 
          
        </> }}

      media = {{ size: 'fluid', visible: false, data: <></> }}

      content = {{ size: 'medium', visible: true, data: 
      <>

        <WebbDividerSmall />
        <div className="">
          <h2 className="text-normal text-color-next text-uppercase">My Portfolio</h2>
          <WebbDividerSmall />
          <AssetsListUserFundedModule />
        </div>        

        <WebbDividerMedium />
        <WebbDividerMedium />
        <div className="d-none">
          <h2 className="text-normal text-color-next text-uppercase">My Asset</h2>
          <WebbDividerSmall />
          <AssetsListUserModule />
        </div>

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
          <WebbDividerSmall />
          <WebbFooterMobile /> 
        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}