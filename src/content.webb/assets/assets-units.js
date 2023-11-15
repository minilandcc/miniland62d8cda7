// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AssetUnitsMainModule (props) {

  const asset = {}
  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        // console.log (id)

        // const result = await AssetDetails({data: {item: id}})
        // console.log (result)

        // if (result.data) setData(result.data)
        // console.log (props.data)
        setData(props.data.units)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loading) return <>Please Wait...</>
  if (!loading && data && data.length === 0) return <>No Units Available</>

  return (
  <>

    {/* info */}
    <div className="">
      Units: {data && data.length}
    </div>

    {/* data */}
    <div className="mb-3">
        {/* options */}
        <div className="row row-cols-1 row-cols-md-4 g-4">
        {data && data.map((item, i) => (
          <div className="col m-0 mb-3" key={i}>
            
            <div className="card h-100 rounded-none border p-0 m-0 back-color-wite"
              // onClick={() => handleClick(item.item)}
            >
              
              {/* asset media */}
              <div className="media-cube rounded-none">
                <img
                  src={item.media.link} // Route of the image file
                  layout='fill'
                  className="img-fluid w-100 rounded-none shadow"
                  alt="..."
                />
                {/* <div className='btn back-color-main text-small'>{item.rate[0].nmbr/1000000}</div> */}
              </div>
              
              {/* asset details */}
              <div className="card-body m-0 p-3 pb-2">
                
                <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
                <h4 className="text-color-next d-md-none">{item.meta.name}</h4>
                
                <div className="">
                  <p className="text-wd d-none">{item.meta.memo}</p>
                </div>
                <div className=""></div>
              </div>

              {/* asset units */}
              <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">
                
                <div className="d-flex text-dark">
                  <div className="text-small">
                    <p className="m-0">{`SOLD: ${((item.unit.done/item.unit.mint)*100).toFixed(0)}%`}</p>
                  </div>
                  <div className="ms-auto text-end">{parseInt(item.unit.done).toFixed(0)}</div>  
                </div>
                <div className="">
                  <div className="progress" 
                    role="progressbar" 
                    style={{height: '0.33rem'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                      style={{width:`${(item.unit.done/item.unit.mint)*100}%`, height: '0.33rem'}}></div>
                  </div>
                </div>
                <div className="d-flex text-dark mt-1">
                  <div className=""><p className="text-small text-color-tone m-0 mb-1">Units: {item.unit.tick || 'SQFT'}</p></div>
                  <div className="ms-auto text-end">{parseInt(item.unit.mint).toFixed(0)}</div>  
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