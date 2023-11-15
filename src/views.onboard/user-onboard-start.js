// main
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbIconBack from "../content/webx/webb-icon-back"
import WebbIconX from "../content/webx/webb-icon-x";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import NextLogout from "../content/webx/next-logout";
import NextHome from "../content/webx/next-home";

import listActions from '../data.static/data-user-onboard.json'

import { GetLocalUser } from "../services/srvc-auth-user";

import { DocumentsOnboardStatus } from "../services/srvc-documents-realm";
import { AccountsOnboardStatus } from "../services/srvc-accounts-realm";


export default function UserOnboardStart () {
  
  const metadata = {
    name: 'New Account',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }

  const asset = GetLocalUser()

  const navigate = useNavigate();

  const [list, setList] = useState(listActions.data);
  const [loading, setLoading] = useState(true)

  const handleClick = (link) => {
    navigate(link)
  }

  useEffect(()=>{

    const fetchdata = async()=>{
      setLoading(true)

      const docx = await DocumentsOnboardStatus({data: {user: asset.item}})
      const accountx = await AccountsOnboardStatus({data: {user: asset.item}})
      const onboardx = [...docx.data.list, ...accountx.data.list]
      console.log(onboardx)

      var listx = Array.from(listActions.data, x => { return{
        ...x, 
        status: onboardx.find(z => z.code == x.code).status
      }})
      setList(listx)
      
      setLoading(false)
    }
    fetchdata()
  },[])

  //console.log(showhome)


  if (loading) return <div className="text-center mt-5">Please Wait...</div>



  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'fluid', visible: true, data: 
        <> 
          <div className="text-center back-color-lite">
            <div className="d-flex justify-content-between py-1" style={{height:'3.3em'}}>
              <div className="py-1 cursor" onClick={() => navigate(-1)}>
                <WebbIconBack data={{color: 'text-color-tint', size: 'text-icon-md'}}/>
              </div>
              
              <div className="py-1">
                <p className="text-normal m-0">{'New Account'}</p>
              </div>
              
              <div className="py-1">
                <Link to={`/auth/next`}><WebbIconX /></Link>
              </div>
            </div>
          </div>
        </> }}

      media = {{ size: 'xtra', data: 
      <>
        
        
      </>
      }}

      content = {{ size: 'small', data: 
      <>
        <WebbDividerSmall />
        <div className="mx-3">
          <p className="text-lead text-bold text-color-next">Welcome {asset.name}!</p>
          <p className="text-normal text-bold m-0">We're excited to have you onboard!</p>
          <p className="m-0">We have streamlined the next steps to make this a seamless experience.</p>
        </div>


        <WebbDividerSmall />
        <div className="back-color-wite rounded-xd">
        {list && list.map((item, i) => (item.active ?
          <div className={`rounded-wd `} 
            key={i}
            onClick={() => handleClick(item.status ? '' : item.link)}
          >
            <div className={`d-flex p-3 justify-content-start ${item.status? "":" hirich cursor rounded-wd"}`}>
              <div className={`${item.status ? 'text-color-success' : 'text-color-error'}`}>              
                <i className={`${item.icon} text-lead`}></i>
              </div>
              <div className="ms-2 me-3">
                <p className="text-bold m-0">{item.name}</p>
                <p className="text-small m-0">{item.memo}</p>
              </div>
              <div className="ms-auto">
                <i className='bi bi-chevron-right'></i>
              </div>

            </div>  
            <div className={i < list.length-1 ? `border-bottom`: ''}></div>          
          </div>
        :''))}
        </div>

        <WebbDividerMedium />
        <div className="d-flex mx-3">
          <div className={'me-auto cursor'} onClick={() => navigate('/auth/next')}>Go Back</div>
        </div>
        {/* <div className={` ${showhome?'cursor  w-75':'d-none'} `} ><NextHome/></div>
        <WebbDividerMedium/>
        <div className={` ${showhome?'cursor  w-75':'d-none'} `} ><NextLogout/></div> */}

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