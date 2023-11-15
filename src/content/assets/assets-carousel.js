// assets
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { Carousel } from 'react-responsive-carousel';
import { GetLocalUser } from "../../services/srvc-auth-user";

import { AssetList } from "../../services/srvc-assets-realm";

export default function AssetsCarouselModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetList({data: {
          user: asset.item, index: 1, items: 25, 
          filters:{ name: {} }
        }})
        console.log (result)

        if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/ax/${item}`)
  }


  if (loading) return <>Please Wait...</>
  if (!loading && (!data || data.length === 0)) return <>No Assets Available</>


  return (
    <>
    
      <Carousel>
        {data && data.map((item, i) => (
        <>
          <div className="">
            <div className="rounded-xd ratio ratio-16x9"
              style={{
                backgroundImage:`url(${item.media.link})`, 
                backgroundRepeat:'no-repeat', 
                backgroundSize:'cover',
                backgroundPosition: 'center center',
                width:'100%', height: 'auto'
              }}
            >
              <div className="text-start">
                <div className="p-3">

                <div className='btn back-color-main rounded-xx text-color-wite text-small text-uppercase px-4'>
                  {item.meta.sort}
                </div>

                </div>


                <WebbDividerMedium/>

                <div className="fixed-bottom rounded-xd rounded-top-none" style={{ backgroundColor: `rgba(0,0,0,.5)`}} >
                  <WebbDividerSmall />
                  <div className="mx-3">
                    <p className="text-color-wite m-0 text-uppercase">{item?.creator?.name || '******'}</p>
                    <p className="text-lead text-bold text-color-wite">{item.meta.name}</p>
                  </div>
                  
                  <div className="mx-3 d-none d-md-block">
                  <div className="d-flex text-color-wite">
                    <div className="text-small">
                      <p className="m-0">
                        {`SOLD: ${((item?.units?.mint !=='0' ? (item?.units?.sale/item?.units?.mint) : 0)*100)}%`}
                      </p>
                    </div>
                    <div className="ms-auto text-end">{(item?.units?.sale || '0')}</div>  
                  </div>
                  <div className="">
                    <div className="progress" 
                      role="progressbar" 
                      style={{height: '0.27rem'}}>
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                        style={{width:`${(item?.units?.sale/item?.units?.mint)*100}%`, height: '0.27rem'}}></div>
                    </div>
                  </div>
                  <div className="d-flex text-color-wite">
                    <div className=""><p className="text-small m-0 mb-1">Units: {item?.units?.ticker || 'BRX'}</p></div>
                    <div className="ms-auto text-end">{(item?.units?.mint || '0')}</div>  
                  </div>


                  </div>

                  <WebbDividerSmall />
                  <WebbDividerMedium/>
                </div>

              </div>

            </div>

          </div>
        </>
         
        ))}
      </Carousel>
    
      {/* data */}
      <div className="mb-3">
        {/* options */}
        <div className="row row-cols-1 row-cols-md-3 g-2 d-none">
        {data && data.map((item, i) => (
          <div className="col m-0 mb-3" key={i}>
            
            <div className="card h-100 rounded-xd border p-0 m-0 back-color-wite cursor"
              onClick={() => handleClick(item.item)}
            >
              
              {/* asset media */}
              <div className="media-standard rounded-xd rounded-bottom-none">
                <img
                  src={item.media.link} // Route of the image file
                  layout='fill'
                  className="img-fluid w-100 rounded-none shadow rounded-bottom-none"
                  alt="..."
                />
                <div className='btn back-color-main rounded-xx text-mini'>{item.meta.sort}</div>
              </div>
              
              {/* asset details */}
              <div className="card-body m-0 p-3 pb-2">
                
                <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
                <h4 className="text-color-next text-normal d-md-none">{item.meta.name}</h4>
                
                <div className="text-small d-none d-md-block">
                  <p className="text-md">{item.meta.memo}</p>
                </div>
                <div className="d-md-none">
                  <p className="text-md">{item.meta.memo}</p>
                </div>
                <div className=""></div>
              </div>

              {/* asset units */}
              <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">
                
                <div className="mb-2">
                  <p className="text-small text-bold text-color-tone text-uppercase text-sm m-0">
                    {item?.creator?.name || '******'}
                  </p>
                </div>

                <div className="d-flex text-dark">
                  <div className="text-small">
                    <p className="m-0">
                      {`SOLD: ${((item?.units?.mint !=='0' ? (item?.units?.sale/item?.units?.mint) : 0)*100)}%`}
                    </p>
                  </div>
                  <div className="ms-auto text-end">{NumberFormat(item?.units?.sale || '0')}</div>  
                </div>
                <div className="">
                  <div className="progress" 
                    role="progressbar" 
                    style={{height: '0.27rem'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                      style={{width:`${(item?.units?.sale/item?.units?.mint)*100}%`, height: '0.27rem'}}></div>
                  </div>
                </div>
                <div className="d-flex text-dark">
                  <div className=""><p className="text-small text-color-tone m-0 mb-1">Units: {item?.units?.ticker || 'BRX'}</p></div>
                  <div className="ms-auto text-end">{NumberFormat(item?.units?.mint || '0')}</div>  
                </div>
              </div>

            </div>
          
          </div>
        ))}
        </div>
      </div>
      

    </>
  );

}