// assets
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../../content/webx/webb-divider-md";
import WebbDividerSmall from "../../content/webx/webb-divider-sm";

import { AssetUsers } from "../../services.webb/srvc-data-assets";

const listicon = [
  {mode: 'mint', icon: 'bx bx-grid-alt'},
  {mode: 'claim', icon: 'bx bx-check-circle'},
  {mode: 'transfer', icon: 'bx bx-right-arrow-circle'},
  {mode: 'freeze', icon: 'bx bx-info-circle'}
]

export default function AssetsUsersMainModule() {
  
  const asset = {item: ''}
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetUsers({data: {
          item: id, index: 1, items: 25, 
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


  if (loading) return <>Please Wait...</>
  if (!loading && data && data.length === 0) return <>No Users</>


  return (
    <>
    
      {/* data */}
      <div className={loading ? 'd-none' : 'back-color-wite border rounded-none'}>
      {data && data.map((x, i) => (
        <div key={i}>
          <div className="d-flex border-bottom p-3">
            <div className="text-normal text-color-tone">
              <i className={`bx bx-user-circle m-0 p-0`}></i>
            </div>
            <div className="ms-2 d-none d-md-block align-middle" >
              <p className="p-0 m-0 text-sm">{x.account}</p>
              {/* <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p> */}
            </div>
            <div className="ms-1 d-md-none" style={{maxWidth:'50%'}}>
              <p className="p-0 m-0 text-sm">{x.account}</p>
              {/* <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p> */}
            </div>          
            <div className="ms-auto text-end">
              <p className="m-0">
                <span>{NumberFormat(x.unit.number)}</span>
                <span>{' '}</span>
                <span>{x.unit.ticker}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
      </div>
      

    </>
  );

}