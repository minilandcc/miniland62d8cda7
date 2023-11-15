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

import { AccountsCreate } from "../../services/srvc-accounts-realm";


export default function AccountsLinkInrxBankModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [data, setData] = useState({
    name: asset.name,
    bank: '',
    number: '',
    code: '',
    ticker: 'inr',
    mode: 'sandbox',
    default: false,
    active: true
  })

  useEffect( () => {
    const fetchData = async() => {
      setForm(false)

      if (data.number !== '' && data.code !== '')
      setForm(true)

    }
    fetchData()
  },[data]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, item: asset.item, mmid:'' },
      account: { name: data.name, number: data.number, bank: data.code, ifsc: data.code},
      chain:'000099'
    }

    console.log(datx)

    const result = await AccountsCreate({data: datx})
    console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Account Created.')
      navigate("/user/onboard/thanks")
    }
    else {
      setDone(false)
      setMemo('Account Creation Failed.')
    }

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
        All Transfers (Direct, Automated) will be settled to this account.
        Please ensure this account is correct. Incorrect details may lead to loss of funds.
      </p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="">

      <div className="mb-3 d-none">  
        <label className="form-label small">Account Name / Nickname <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={true}
          placeholder="account name">
        </input>
      </div>   

      <div className="mb-3 d-none">  
        <label className="form-label small">Bank Name  <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.bank}
          onChange={({ target }) => {handleChange("bank", target.value); }}
          placeholder="account name">
        </input>
      </div> 

      <div className="mb-3">  
        <label className="form-label small">Account Number <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.number}
          onChange={({ target }) => {handleChange("number", target.value); }}
          disabled={loading || submit}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">IFSC (branch) Code <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.code}
          onChange={({ target }) => {handleChange("code", target.value); }}
          disabled={loading || submit}
          placeholder="ABCX1234567">
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
          disabled={!form || loading || submit}
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