// main
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";
import WebbHeader from "../content/webz/webb-header-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import WebbIcon from "../content/webx/webb-icon";


export default function Main () {
  
  const metadata = {
    name: 'Welcome',
    banner: {link: 'https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-994.jpg?w=996'}
  }
  //https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-1036.jpg?w=996
  // https://www.freepik.com/free-photo/dreamlike-surrealistic-landscape-wallpaper-purple-tones_40572368.htm
  
  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'medium', visible: false, data: 
      <>
        <WebbHeader data={{home: '/', name: metadata.name, link: '/'}}/>
      </>
      }}

      media = {{ size: 'xtra', data: 
      <>
        <div className="">

        </div>
      </>
      }}

      content = {{ size: 'xtra', data: 
      <>

        <div className="" 
          style={{
            backgroundImage:`url(${metadata.banner.link})`, 
            backgroundRepeat:'no-repeat', 
            backgroundSize:'cover',
            backgroundPosition: 'center center',
            height:'100vh',

          }}
        >
        
        <WebbDividerMedium />
        <WebbDividerMedium /> 
        <div className="container">
          <div className="row">
            <div className="col d-none d-lg-block"></div>
            <div className="col">
              {/* <video className="w-100 rounded-xd" width='100%' height={'auto'} loop autoPlay muted  >
                <source src={minilandmp4} type="video/mp4"/>
              </video> */}
              <div className="back-color-wite rounded-wd text-center" 
                style={{minHeight:'60vh', backgroundColor: `rgba(0,0,0,.5)`}}>

                <WebbDividerMedium/>
                <WebbIcon data={{color: 'text-color-wite', size: 'text-icon-wd'}}/>
                
                <WebbDividerMedium/>
                <h2 className="text-color-rich">{process.env.REACT_APP_WEBB_SITE_NAME}</h2>
                {/* <p className="text-normal">{process.env.REACT_APP_WEBB_SITE_LINE}</p> */}
                <p className="text-normal text-color-wite m-0 mx-4">{'Diversify Your Investment Portfolio with Real Estate'}</p>
                

                <WebbDividerMedium/>
                <WebbDividerMedium/>
                <div className="mx-3">
                  <Link to ={`/auth`}>
                    <div className="p-3 rounded-xx back-color-rich text-color-wite hirich">Account Login</div>
                  </Link>
                </div>
                <p className="text-lead text-bold d-none">Launching on 27 AUG 2023</p>

                <WebbDividerSmall/>
                <div className="mx-3 d-none">
                  
                    <div className="p-3 rounded-wd back-color-next text-color-wite hirich">Connect Metamask</div>
                  
                </div>

                <WebbDividerMedium />
                <WebbDividerMedium /> 
                <a href={process.env.REACT_APP_WEBB_SITE_LINK} 
                  target={'_blank'} 
                  rel="noopener" 
                  className="text-color-wite"
                >Main Website</a>
                <WebbDividerMedium /> 

              </div>
              

            </div>
            <div className="col d-none d-lg-block"></div>
          </div>

        </div>

        </div>

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