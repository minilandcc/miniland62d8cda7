// main
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import NextLogout from "../content/webx/next-logout";

import media from '../data.media/thanku.png'
import NextHome from "../content/webx/next-home";

export default function UserOnboardThanks () {
  
  const metadata = {
    name: 'Thank You',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }

  const navigate = useNavigate();

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

      content = {{ size: 'small', data: 
      <>
        <WebbDividerMedium />
        <p className="text-lead text-bold text-color-next">Thank You !</p>


        <div className="row">
        <div className="col-md-6">
          <img src={media} className="w-100" alt='...'></img>
        </div>
        <div className="col-md-6">
        <p className="text-normal text-bold m-0">We're thrilled to welcome you aboard!</p>
        <p className="m-0">Your trust means a lot to us. </p>
        
        <WebbDividerSmall />
        <p className="m-0">
          Our team is here to support your investment journey in real-estate and 
          ensure a seamless experience.
        </p>

        <WebbDividerSmall />
        <p className="m-0">
          Please watch out for an email from our side for next step. 
          If you have any questions, feel free to reach out.
        </p>

        <WebbDividerSmall />
        <p className="m-0">Here's to a successful partnership!</p>
        <p className="m-0">Ajay Kumar</p>
        <p className="">Saurav Raaj</p>

        </div>

        </div>
       
        



        <WebbDividerMedium />
        <div className="d-flex mx-3">
          <div className={'me-auto cursor'} onClick={() => navigate('/auth/next')}>Go Back</div>
        </div>
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