// assets
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerMedium from "../../content/webx/webb-divider-md";
import WebbDividerSmall from "../../content/webx/webb-divider-sm";

import { AssetList } from "../../services/srvc-assets-realm";


export default function AssetsListMainModule() {
  
  const asset = {item: ''}
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
        // console.log (result)

        if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);



  const handleClick = async(item) => {
    navigate(`/assets/${item}`)
  }


  if (loading) return <></>
  if (!loading && data && data.length === 0) return <>No Assets Available</>


  return (
    <>
    
      {/* data */}
      <div className="mb-3">
        {/* options */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {data && data.map((item, i) => (
          <div className="col m-0 mb-3" key={i}>
            
            <div className="card h-100 rounded-none border p-0 m-0 back-color-wite cursor"
              onClick={() => handleClick(item.item)}
            >
              
              {/* asset media */}
              <div className="media-standard rounded-none">
                <img
                  src={item.media.link} // Route of the image file
                  layout='fill'
                  className="img-fluid w-100 rounded-none shadow rounded-bottom-none"
                  alt="..."
                />
                <div className='btn back-color-main text-small'>{item.meta.form}</div>
              </div>
              
              {/* asset details */}
              <div className="card-body m-0 p-3 pb-2">
                
                <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
                <h4 className="text-color-next d-md-none">{item.meta.name}</h4>
                
                <div className="">
                  <p className="text-wd">{item.meta.memo}</p>
                </div>
                <div className=""></div>
              </div>

              {/* asset units */}
              <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">
                
                <div className="d-flex text-dark mb-1">
                  <div className="text-small">
                    <p className="m-0">{`SOLD: ${((item.units.done/item.units.mint)*100).toFixed(0)}%`}</p>
                  </div>
                  <div className="ms-auto text-end">{parseInt(item.units.done).toFixed(0)}</div>  
                </div>
                <div className="">
                  <div className="progress" 
                    role="progressbar" 
                    style={{height: '0.27rem'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                      style={{width:`${(item.units.done/item.units.mint)*100}%`, height: '0.27rem'}}></div>
                  </div>
                </div>
                <div className="d-flex text-dark mt-1">
                  <div className=""><p className="text-small text-color-tone m-0 mb-1">{`Units: SQFT`}</p></div>
                  <div className="ms-auto text-end">{parseInt(item.units.mint).toFixed(0)}</div>  
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