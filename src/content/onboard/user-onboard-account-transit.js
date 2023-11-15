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

import { AccountsTransitCreate } from "../../services/srvc-accounts-realm";

export default function AccountsTransitModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [bank, setBank] = useState({
    name: '******', // Yes Bank
    code: '******'  // 
  })
  const [account, setAccount] = useState({
    name: 'Transit Account',
    number: '******',
  })

  const [data, setData] = useState({
    name: asset.name,
    mail: asset.mail,
    mobile: asset.mobile,
    item: asset.item
  })

  useEffect( () => {
    const fetchData = async() => {
      setForm(false)
      if (data.number !== '' && data.code !== '')
      setForm(true)
    }
    fetchData()
  },[data]);

  const handleAccountCreate = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, mobile: asset.mobile, item: asset.item}
    }

    const accountx = (await AccountsTransitCreate({data: datx, srvc: '******'}))
    console.log (accountx)

    if (accountx.stat) {
      console.log('set data')
      setBank({ 
        name: accountx.data.bank.name,
        code: accountx.data.bank.code
      })
      setAccount({
        name: accountx.data.account.name,
        number:  accountx.data.account.number,
      })
      setMemo('Transit Account Created. Please Submit to Continue.')

    } else {
      setMemo('Transit Account Not Created. Please Contact Support.')
    }

    setSubmit(false)
    setLoading(false)

  }

  const handleSubmit = async () => {
    navigate('/user/onboard/start')
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  // if (loading) return <></>


  return (
  <>
    
    {/* info */}
    <div className="mx-3">
      <p className="">
        All Internal Transfers will be handled via this account (transit).
        You can transfer and withdraw funds from this account to your external bank account.
      </p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="mx-3">
    <p className="text-color-tone m-0">{'USER DETAILS'}</p>
      <p className="text-normal text-bold text-color-next m-0">{asset?.name || '******'}</p>
      <p className="m-0">{asset?.mail || '******'}</p>
      <p className="m-0">{asset?.mobile || '******'}</p>
    </div>

    <WebbDividerSmall />
    <div className={`${account.number == '******' ? 'd-none': 'mx-3'}`}>

      <div className="mb-3">  
        <label className="form-label small">Bank Name  <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={bank.name}
          onChange={({ target }) => {handleChange("bank", target.value); }}
          disabled={loading || submit || true}
          placeholder="account name">
        </input>
      </div> 

      <div className="mb-3">  
        <label className="form-label small">Account Number <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={account.number}
          onChange={({ target }) => {handleChange("number", target.value); }}
          disabled={loading || submit || true}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">Branch (IFSC) Code <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={bank.code}
          onChange={({ target }) => {handleChange("code", target.value); }}
          disabled={loading || submit || true}
          placeholder="ABCX1234567">
        </input>
      </div>

    </div>




    <WebbDividerMedium />
    <div className={!loading && submit && done ? 'mx-3' : 'd-none'}>
      <p>{memo}</p>
    </div>

    <div className={loading && submit || done ? 'd-none' : 'mx-3'}>
    <div className={`${account.number == '******' ? '': 'd-none'}`}>
        <button className={`btn btn-info w-100 border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={!form || loading || submit}
          type="button"
          onClick={()=> { handleAccountCreate()}}
        >{loading ? 'Please Wait...' : 'Create Account'}</button>

      </div>

      <div className={`${account.number == '******' ? 'd-none': ''}`}>
        <button className={`btn btn-info w-100 border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={!form || loading || submit}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Submit & Continue'}</button>

      </div>

    </div>
    

    <div className={loading && submit ? '' : 'd-none'}>
      Please Wait...
    </div>


  </>

  )
}