// accounts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import { GetLocalUser } from "../../services/srvc-auth-user";

import { AccountsList } from "../../services/srvc-accounts-realm";

export default function AccountsListModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()



  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AccountsList({data: {
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

  // console.log(data)

  if (loading) return <><div className="mx-3 text-color-tone">Please Wait...</div></>
  if (!loading && data && data.length === 0) return <>
    <div className="mx-3">No Accounts Linked</div>
  </>


  return (
  <>

    {/* info */}
    {/* <p className="text-normal text-bold">Accounts Linked</p> */}

    {/* data */}
    <div className="back-color-wite rounded-xd border">
    {data && data.map((item, i) => (
      <div key={i} >
      <div className={`d-flex px-3 mt-3`} >
          
        <div className="me-auto">         
          <p className="m-0 text-sm">
            <span className="text-color-next">{item.name}</span>
          </p>
        </div>

        <div className="me-auto">         
          <p className="m-0 text-sm">
            {/* <span className="">{item.format}</span> */}
          </p>
        </div>
    
        <div className="text-end">         
          <p className="m-0">
            <span>{parseFloat(item.balance.number)/1000000}</span>
            {/* <span className="">{NumberFormat((item.balance.number/1000000).toFixed(6))}</span> */}
          </p>
        </div>

      </div>
      <div className="px-3 mb-3" style={{maxWidth: '60%'}}>
        <p className="text-small m-0 text-truncate">Number: {item.account.number}</p>
        <p className="text-small m-0 text-truncate">Branch: {item.bank.code}</p>
        {/* <button onClick={()=>navigate('/user/accounts/create/virtual')} className={`${item.format=="virtual account" && item.check==false? 'btn btn-link small mt-2':'d-none'} `}>Create</button> */}
        <p className="text-small text-color-tone m-0">{}</p>
      </div>
      <div className={i < data.length-1 ? 'border-bottom': ''}></div>
      </div>
    ))}
    </div> 

  </>

  )
}