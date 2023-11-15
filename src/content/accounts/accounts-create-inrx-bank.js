// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";

import { AccountsCreate, AccountsCreateVirtual } from "../../services/srvc-accounts-realm";


export default function AccountsCreateInrxVirtualModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [data, setData] = useState({
    // name: 'BRX Internal Account',
    name: asset.name,
    item: asset.item,
    mmid:'',
    ticker: 'inr',
    mode: 'sandbox',
    default: false,
    active: true
  })

  


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, item: asset.item, mmid: data.mmid },
    }

    console.log(datx)

    const result = await AccountsCreateVirtual({data: datx})
    console.log (result)
    
    if (result.data) {
      
      setMemo('Account Created.')
    }
    else {
      
      setMemo('Account Creation Failed.')
    }
    setDone(true)
    setLoading(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  // if (loading) return <></>


  return (
  <>
    {/* info */}
    <div className="">
      <p className="">
        All Internal Transfers will be handled via this account (virtual).
        You can transfer and withdraw funds from this account to your external bank account.
      </p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="">

      <div className="mb-3">  
        <label className="form-label small">Account Name / Nickname <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={true}
          placeholder="account name">
        </input>
      </div>    

      <div className="mb-3">  
        <label className="form-label small">User Id <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.item}
          onChange={({ target }) => {handleChange("account", target.value); }}
          disabled={true}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">Mobile <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.mmid}
          onChange={({ target }) => {handleChange("mmid", target.value); }}
          disabled={loading || submit}
          placeholder="99XXXXXXXX">
        </input>
      </div>

    </div>




    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p>{memo}</p>
    </div>

    
    <div className={loading && submit || done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> { navigate(`/${asset.form}/home`)}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={data.mmid.length!= 10}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Continue'}</button>

      </div>
    </div>
    

    <div className={loading && submit ? '' : 'd-none'}>
      Please Wait...
    </div>


  </>

  )
}