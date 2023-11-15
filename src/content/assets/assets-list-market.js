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

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetList } from "../../services/srvc-assets-realm";
import { AssetListCounts } from "../../services/srvc-assets-webb-realm";

export default function AssetsListMarketModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const navigate = useNavigate();

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

        const counts = await AssetListCounts({data: {}, srvc: '******'})
        console.log (counts.data)

        // console.log (result)
        const assets = Array.from(result.data.list, x => { 
          var countx = counts.data.find(z => z.asset == x.item)

          return {
          ...x, count: countx?.count || {users: 0, likes: 0, views: 0}
        }})
        console.log(assets)
        if (result.stat) setData(assets)

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
    
    
      {/* data */}
      <div className="mb-3">
        {/* options */}
        <div className="row row-cols-1 row-cols-md-3 g-2">
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
              <div className="card-body m-0 px-3 mb-2">
                <div className="mb-0">
                  <p className="text-bold text-color-tone text-uppercase text-sm m-0" style={{fontSize:'0.7rem'}}>
                    {item?.creator?.name || '******'}
                  </p>
                </div>

                <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
                <h4 className="text-color-next text-normal d-md-none">{item.meta.name}</h4>
                
                <div className="text-small d-none d-md-block">
                  <p className="text-md m-0">{item.meta.memo}</p>
                </div>
                <div className="d-md-none">
                  <p className="text-md m-0">{item.meta.memo}</p>
                </div>
                <div className=""></div>
              </div>


              {/* asset units */}
              <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">

                <div className={`d-flex text-dark text-small mb-1 ${item?.status?.live ? 'd-none' : ''}`}>
                  COMING SOON !
                </div>
                <div className={`d-flex text-dark text-small mb-1 ${item?.status?.live && item?.units?.mint > 0 ? '' : 'd-none'}`}>
                  <div className="">
                    <p className="m-0">
                      {`SOLD: ${(item?.units?.mint > 0 ? (((item?.units?.book || '0')/item?.units?.mint)*100).toFixed(0) : '0')}%`}
                    </p>
                  </div>
                  <div className="ms-auto text-end">{(item?.units?.mint || '0')}</div>  
                </div>
                <div className="">
                  <div className="progress" 
                    role="progressbar" 
                    style={{height: '0.27rem'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                      style={{width:`${(item?.units?.book/item?.units?.mint)*100}%`, height: '0.27rem'}}></div>
                  </div>
                </div>
                <div className="d-flex text-dark d-none">
                  <div className=""><p className="text-small text-color-tone m-0 mb-1">Units: {item?.units?.ticker || 'BRX'}</p></div>
                  <div className="ms-auto text-end">{(item?.units?.mint || '0')}</div>  
                </div>

                <div className="mb-2"></div>

 
              </div>



              {/* market stats */}
              <div className="d-flex mx-3 mb-3 text-small">

                <div className="">
                  <span className={`align-middle`} style={{fontSize:'0.9rem', lineHeight: '0.9rem'}}>
                    <i className={`bx bxs-like text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>{item?.count?.likes || 0}</span>
                </div>

                <div className="ms-3"></div>
                <div className="">
                  <span className={`align-middle`} style={{fontSize:'0.9rem', lineHeight: '0.9rem'}}>
                    <i className={`bx bxs-show text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>{item?.count?.views || 0}</span>
                </div>

                <div className="ms-auto">
                  <span className={`align-middle`} style={{fontSize:'0.9rem', lineHeight: '0.9rem'}}>
                    <i className={`bx bxs-user text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>{item?.count?.users || 0}</span>
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