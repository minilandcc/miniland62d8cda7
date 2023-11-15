// user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { UserDocumentList } from "../../services/srvc-documents-realm";

const listDocs = [
  {name: 'Pan Card', sort: 'taxc', item: '25782623593d44e4bff02487f03befe57'},
  {name: 'Aadhaar Card', sort: 'adhr', item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: 'Utility Bill', sort: 'util', item: '6661bb7e4c604488bb5d9442ff39ad939'}
]


export default function UserDocumentsListModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  const team = GetLocalBusiness()
  // console.log(team)
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await UserDocumentList({data: {user: asset.item}})
        // console.log (result)

        if (result.data) {
          setData(result.data.list)
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);


  if (loading) return <><div className="mx-3 text-color-tone">Please Wait...</div></>
  if (!loading && data && data.length === 0) return <>
    <div className="mx-3">No Accounts Linked</div>
  </>

  return (
  <>
    {/* data */}
    <div className="back-color-wite rounded-xd border">
    {data && data.map((item, i) => (
      <div key={i}>
      <div className={`d-flex px-3 mt-3 mb-3`} >
          
        <div className="me-auto">         
          <p className="m-0 text-sm">
            <span className="text-color-next">{item.meta.name}</span>
          </p>
          <p className="text-small m-0 text-sm">
            <span className="">Number: {item.meta.number ||'******'}</span>
          </p>
          <p className="text-small m-0 text-sm">
            <span className="">Verified: {item.status ? 'Yes' : 'No'}</span>
          </p>          
        </div>
    
        <div className="text-end">         
          <p className="text-small m-0">
            {item.active ? 'On File' : 'Please Upload'}
          </p>
        </div>

      </div>
      <div className={i < data.length-1 ? 'border-bottom': ''}></div>
      </div>
    ))}
    </div> 

  </>

  )
}