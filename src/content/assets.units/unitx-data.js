// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";
import { v4 as uuidv4 } from 'uuid';

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";




export default function UnitsDataModule () {

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

        // const result = await AssetUnits({data: {item: id}})
        // console.log (result)

        // if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/units/${item}`)
  }



  if (loading) return <></>


  return (
  <>

    {/* info */}
    <div className="">
      <p className="text-color-tone text-bold text-uppercase mx-3">Units</p>

    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="mb-3">
      <div className="row row-cols-1 row-cols-md-3 g-4">
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
                className="img-fluid w-100 rounded-wd rounded-bottom-none"
                alt="..."
              />
              <div className='btn back-color-main text-small'>
                <span>{(item.rate[0]?.nmbr)/1000000 || 0}</span>
                <span className="ms-1"></span>
                <span>{(item.rate[0]?.tick) || '***'}</span>
              </div>
            </div>
            
            {/* asset details */}
            <div className="card-body m-0 p-3">
              
              <h4 className="text-bold text-lead text-color-next d-none d-md-block">{item.meta.name}</h4>
              <h4 className="text-color-next text-normal d-md-none">{item.meta.name}</h4>
              
              <div className="">
                <p className="text-small text-md">{item.meta.memo}</p>
              </div>
              <div className=""></div>

              <div className="text-small">
                <p className="m-0">
                  <span>{`SOLD: ${((item.count.done/item.count.mint)*100).toFixed(0)}%`}</span>
                  <span className="ms-2"></span>
                  <span>[{item.count.done} / {item.count.mint}]</span>
                </p>
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