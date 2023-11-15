// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import UserAccountInfoModule from "../content/user/user-acount-info";


import AccountsListModule from "../content/accounts/accounts-list";
import UserDocumentsListModule from "../content/documents/user-docx-list";
import UserAccountXModule from "../content/home/user-acount-x";


export default function UserDetails () {
  
  const metadata = {
    name: 'Profile',
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
        <p className="text-normal mx-3">Account Info</p>
        <UserAccountInfoModule />
        
        <WebbDividerMedium />
        <WebbDividerSmall />
        <p className="text-normal mx-3">Documents</p>
        <UserDocumentsListModule />

        <WebbDividerMedium />
        <WebbDividerSmall />
        <p className="text-normal mx-3">Linked Accounts</p>
        <AccountsListModule />

        <WebbDividerMedium />
        <WebbDividerMedium />
        <UserAccountXModule />
        
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
        <div className="">

        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}