// main
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";
import WebbHeader from "../content/webz/webb-header-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";


import MainHeaderModule from "../content/main/main-header";
import AssetListMainModule from "../content.webb/assets/assets-list";


export default function Main () {
  
  const metadata = {
    name: 'Welcome',
    banner: {link: 'https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-40.jpg?w=900'}
  }

  // https://www.freepik.com/free-photo/dreamlike-surrealistic-landscape-wallpaper-purple-tones_40572368.htm
  
  const navigate = useNavigate()

  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'xtra', visible: true, data: 
      <>
        <WebbHeader data={{home: '/', name: metadata.name, link: '/'}}/>
      </>
      }}

      media = {{ size: 'xtra', visible: true, link: metadata.banner.link, data: <>
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <div className="container text-center text-color-wite">
          <MainHeaderModule />
        </div>
        
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </> }}

      content = {{ size: 'xtra', data: 
      <>

        <div className="container" 
          // style={{
          //   backgroundImage:`url(${metadata.banner.link})`, 
          //   backgroundRepeat:'no-repeat', 
          //   backgroundSize:'cover',
          //   backgroundPosition: 'center center',
          //   height:'100vh'
          // }}
        >
        
        <WebbDividerMedium />
        

        <WebbDividerMedium /> 
        <div className="d-none">
          <h2 className=''>Featured Assets</h2>
          <p className='text-lead'>Harnessing the power of blockchain technology, tokenization allows fractional ownership of properties, granting investors access to traditionally inaccessible markets. </p>
        </div>

        <WebbDividerMedium /> 
        {/* <AssetListMainModule /> */}


        
        <WebbDividerMedium /> 
        <WebbDividerMedium />
        <WebbDividerMedium /> 
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