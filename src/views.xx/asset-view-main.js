// main
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


import ContentFormat from "../content/webz/content-format-xz";
import WebbHeader from "../content/webz/webb-header-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import WebbLoaderMedium from "../content/webx/webb-loader-md";
import WebbLoaderSmall from "../content/webx/webb-loader-sm";


import AssetsDetailsMainModule from "../content.webb/assets/assets-details";
import AssetsStatsMainModule from "../content.webb/assets/assets-stats";
import AssetUnitsMainModule from "../content.webb/assets/assets-units";
import AssetsTransfersMainModule from "../content.webb/assets/assets-transfers";
import AssetsUsersMainModule from "../content.webb/assets/assets-users";


import { AssetDetails } from "../services/srvc-assets-realm";


export default function AssetViewMain () {
  
  const metadata = {
    name: 'Welcome',
    banner: {link: 'https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-40.jpg?w=900'}
  }

  // https://www.freepik.com/free-photo/dreamlike-surrealistic-landscape-wallpaper-purple-tones_40572368.htm
  
  const navigate = useNavigate()
  const {id} = useParams()

  const asset = {}
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetDetails({data: {item: id}})
        console.log (result)

        if (result.data) setData(result.data)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  if (loading) return <><WebbLoaderMedium /></>
  if (!loading && !data) return <>
    <div className="text-center">
      <WebbDividerMedium />
      <WebbDividerMedium />
      
      <i className="bx bx-error-circle text-color-tone text-icon-md"></i>
      
      <WebbDividerMedium />
      <p className="">Asset Not Found</p>
      <a href="/">Go Back</a>
    </div>
  </>

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

      media = {{ 
        size: 'xtra', 
        visible: false, 
        link: metadata.banner.link,
        data: <></> 
      }}

      content = {{ size: 'xtra', data: 
      <>

        {/* header */}
        <div className="">
          <AssetsDetailsMainModule data={data}/>
          {/* <h2 className=''>{(data && data.meta.name) || 'Asset Name'}</h2> */}
          {/* <p className='text-lead'>{(data && data.meta.memo) || 'Asset Details'}</p> */}
        </div>

        <div className="container" 
          // style={{
          //   backgroundImage:`url(${metadata.banner.link})`, 
          //   backgroundRepeat:'no-repeat', 
          //   backgroundSize:'cover',
          //   backgroundPosition: 'center center',
          //   height:'100vh'
          // }}
        >

        {/* stats  */}
        <WebbDividerMedium /> 
        <WebbDividerMedium /> 
        <div className="">
          <AssetsStatsMainModule data={data.units}/>
        </div>

        {/* units */}
        <WebbDividerMedium /> 
        <WebbDividerMedium /> 
        <div className="">
          <h3 className="text-lead mb-3">Asset Units</h3>
          <AssetUnitsMainModule data={data}/>
        </div>

        {/* users */}
        <WebbDividerMedium />
        <WebbDividerMedium />  
        <div className="">
          <h3 className="text-lead mb-3">Asset Owners</h3>
          <AssetsUsersMainModule />
        </div>        
        
        {/* transfers */}
        <WebbDividerMedium /> 
        <WebbDividerMedium /> 
        <div className="">
          <h3 className="text-lead mb-3">Asset Transfers</h3>
          <AssetsTransfersMainModule />
        </div>


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