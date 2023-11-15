// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import NextLogout from "../content/webx/next-logout";

import media from '../data.media/thanku.png'
import NextHome from "../content/webx/next-home";
// import minilandmp4 from '../data.media/miniland-launch.mp4'

export default function UserOnboardLaunch () {
  
  const metadata = {
    name: 'Thank You',
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

      header = {{ size: 'medium', data: 
      <>
        <div className="">
          
        </div>
      </>
      }}

      media = {{ size: 'xtra', data: 
      <>
        
        
      </>
      }}

      content = {{ size: 'mini', data: 
      <>
         <WebbDividerMedium />
        {/*<p className="text-lead text-bold text-color-next">Thank You !</p>
        <p className="text-normal m-0">We're thrilled to welcome you aboard!</p>
        <p className="">Your trust means a lot to us. </p> */}

        <video className="rounded-xd" width='100%' height='auto' loop autoPlay muted  >
          {/* <source src={minilandmp4} type="video/mp4"/> */}
        </video>
        
        {/* <WebbDividerSmall />
        <p className="m-0">
          Our team is here to support your investment journey in real-estate and 
          ensure a seamless experience.
        </p> */}

        {/* <WebbDividerSmall />
        <p className="m-0">
          Please watch out for an email from our side for next step. 
          If you have any questions, feel free to reach out.
        </p>

        <WebbDividerSmall />
        <p className="m-0">Here's to a successful partnership!</p>
        <p className="m-0">Ajay Kumar</p>
        <p className="">Saurav Raaj</p> */}

        <WebbDividerMedium />
        <NextLogout />
        {/* <WebbDividerSmall />
        <NextHome/> */}

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
      </>
      }}
    
    
    ></ContentFormat>


  </>
  )
}