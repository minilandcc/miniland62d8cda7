// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetFeatures } from "../../services/srvc-assets-realm";

const list = [
  {name: 'Model', code: 'features.model', number: '***', ticker: '', active: true },
  {name: 'Ticket Size', code: 'features.ticket', number: '0', ticker: 'INR', active: true },
  {name: 'Returns', code: 'features.returns', number: '0', ticker: '%', active: true },
  {name: 'Exit', code: 'features.lockin', number: '0', ticker: 'm', active: true }
]

export default function AssetFeaturesModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(list)



  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AssetFeatures({data: {item: id, chain: '416001'}})
        console.log (result)

        const stats = Array.from(list, x => { return {
          ...x, 
          number: result.data.features[x.code.split('.')[1]] || '0',
          // ticker: result.data.find(z => z.code == x.code).ticker || 'BRX'
        }})

        if (result.data) setData(stats)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loading) return <></>


  return (
  <>

    {/* info */}
    <div className="">
    </div>

      {/* data */}
      <div className="row row-cols-2 row-cols-md-4 g-0">
        {data && data.map((item, i) => (
        <div className="col" key={i}>
          <div className="p-3" key={i}>
            <p className="m-0" style={{fontSize: '0.75rem'}}>
              <span className="text-uppercase text-sm">{item.name}</span>
            </p>
            <p className="text-lead m-0 text-uppercase">
              <span>{(item?.number || '0')}</span>
              <span className="ms-1 text-small">{(item?.ticker || '')}</span>
            </p>
          </div>
        </div>
        ))}
        
                       
      </div>
      

    </>
  );

}