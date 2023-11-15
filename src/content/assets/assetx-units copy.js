// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetUnits } from "../../services/srvc-assets-realm";


export default function AssetUnitListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        // console.log (id)

        const result = await AssetUnits({data: {asset: id, creator: ''}, srvc: '******'})
        // console.log (result)

        if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/au/${item}`)
  }

  if (loading) return <></>

  if (!loading && (!data || data.length === 0)) return <>
    <p className="mx-3">No Units Listed</p>
  </>

  return (
  <>

    {/* info */}
    <div className="">
      <p className="text-lead text-color-main mx-3">Units</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="mb-3">
      <div className="row row-cols-1 row-cols-md-3 g-2">
      {data && data.map((item, i) => (
        <div className="col m-0 mb-3" key={i}>
          
          <div className="card h-100 rounded-xd border p-0 m-0 back-color-wite cursor hitone"
            onClick={() => handleClick(item.item)}
          >
            
            {/* asset media */}
            <div className="media-cube">
              <img
                src={item.media.link} // Route of the image file
                layout='fill'
                className="img-fluid w-100 rounded-xd rounded-bottom-none"
                alt="..."
              />
              {/* <div className='btn back-color-main text-small'>
                <span>{(item?.rate[0]?.nmbr)/1000000 || 0}</span>
                <span className="ms-1"></span>
                <span>{(item?.rate[0]?.tick) || '***'}</span>
              </div> */}
            </div>
            
            {/* asset details */}
            <div className="card-body m-0 p-3">
              <p className="text-small text-sm m-0 mb-1">ID: {item?.number || '0000'}</p>
              <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
              <h4 className="text-color-next d-md-none">{item.meta.name}</h4>
              
              <div className="">
                <p className="text-small text-md m-0">{item.meta.memo}</p>
              </div>

            </div>
          
            <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-3">
              
                <div className="d-flex text-dark">
                  <div className="text-small">
                    <p className="m-0">
                      <span>{`SOLD: ${((item?.units?.mint !=='0' ? (item?.units?.sale/item?.units?.mint) : 0)*100)}%`}</span>
                      <span className="text-color-tone d-none">{' • '}</span>
                      <span className="d-none">{NumberFormat(item?.units?.sale || '0')}</span>
                    </p>
                  </div>
                  <div className="ms-auto text-end">{NumberFormat(item?.units?.mint || '0')}</div>  
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
            </div>

          </div>
        
        </div>
      ))}
      </div>
    </div>

  </>

  )
}