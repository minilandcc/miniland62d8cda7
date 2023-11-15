// assets
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../../content/webx/webb-divider-md";
import WebbDividerSmall from "../../content/webx/webb-divider-sm";

import { AssetTransfers } from "../../services.webb/srvc-data-assets";

const listicon = [
  {mode: 'mint', icon: 'bx bx-grid-alt'},
  {mode: 'claim', icon: 'bx bx-check-circle'},
  {mode: 'transfer', icon: 'bx bx-right-arrow-circle'},
  {mode: 'freeze', icon: 'bx bx-info-circle'}
]

export default function AssetsTransfersMainModule() {
  
  const asset = {item: ''}
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetTransfers({data: {
          item: id, index: 1, items: 25, 
          filters:{ name: {} }
        }})
        // console.log (result)

        if (result.data) setData(result.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  const handleClick = async(item) => {
    navigate(`/assets/${item}`)
  }


  if (loading) return <>Please Wait...</>
  if (!loading && data && data.length === 0) return <>No Transfers Recorded</>


  return (
    <>
    
      {/* data */}
      <div className={loading ? 'd-none' : 'back-color-wite border rounded-none'}>
      {data && data.map((x, i) => (
        <div key={i}>
          <div className="d-flex border-bottom p-3">
            <div className="text-normal text-color-tone">
              <i className={listicon.find(item => item.mode == x.mode).icon}></i>
            </div>
            <div className="ms-2 d-none d-md-block" >
              <p className="m-0 text-sm">{x.hash}</p>
              <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p>
            </div>
            <div className="ms-1 d-md-none" style={{maxWidth:'50%'}}>
              <p className="m-0 text-sm">{x.hash}</p>
              <p className="text-color-tone text-small m-0">{(new Date(x.created)).toLocaleString()}</p>
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