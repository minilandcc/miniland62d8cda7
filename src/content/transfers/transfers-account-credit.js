// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { TransfersAccountCredit } from "../../services/srvc-transfers-realm";


export default function TransfersAccountCreditModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [balance, setBalance] = useState({number: 0, ticker: '******'})
  const [accounts, setAccounts] = useState([])
  const [data, setData] = useState({
    amount: ''
  })

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AccountsList({data: {user: asset.item}})
        // console.log (result.data.list)
        var ac = result.data.list.find(x => x.feat.sort === 'transit' ) 
        //console.log(ac)
        if(ac== undefined) setAccounts([])
        else setAccounts(ac)

        if (result.data)setBalance(result.data.list.find(x => x.feat.sort === 'transit').balance.number)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  useEffect( () => {
    setForm(false);
    if (accounts.length > 0) {
      setBalance(accounts.find(x => x.feat.sort === 'transit').balance.number)
    }

  },[accounts]);

// console.log(accounts)

  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.amount > 0) setForm(true);

  },[data]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const result = await TransfersAccountCredit({data: {
      credit: { user: asset.item }, // user: asset.mail,
      debit: { user: asset.item }, // user: asset.mail, 
      amount: {number: data.amount},
      memo: "account credit"
    }})
    //console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Transfer Success.')
    }
    else {
      setDone(false)
      setMemo('Transfer Failed.')
    }

    setLoading(false)
    
  }

  //console.log(balance)

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  if (loading) return <><WebbLoaderMedium /></>
  if (!loading && accounts.length ==0) return <>
    <div className="text-center">
      No Linked Accounts. <br></br>Please Create / Link via Dashboard
    </div>
  </>


  return (
  <>

    <div className="back-color-wite rounded-wd p-3 border">
      <div className="d-flex">
        <div className="">
          <p className="text-small text-color-tone m-0">Account Balance (Current)</p>
          <p className="text-lead m-0">{parseInt(balance && parseInt(balance/1000000)).toFixed(6)}</p>
          {/* <p className="text-lead m-0">{parseFloat(balance/1000000)}</p> */}
        </div>
        <div className=""></div>
      </div>

      <WebbDividerMedium/>
      <div className="">
        <div className="mb-3">  
          <label className="form-label small">Account Number <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={accounts.account.number}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled={true}
            placeholder="123">
          </input>
        </div>
      </div>
      
      <div className="">
        <div className="mb-3">  
          <label className="form-label small">IFSC Code <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={accounts.bank.code}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled={true}
            placeholder="123">
          </input>
        </div>
      </div>

      <div className="">
        <div className="mb-3">  
          <label className="form-label small">Allowed Payment Mode <FormNeeded/></label>
          <button className="btn btn-disabled">IMPS</button>
          <button className="btn btn-disabled">NEFT</button>
          <button className="btn btn-disabled">RTGS</button>
        </div>
      </div>

      <div className="">
        <div className="mb-3">  
          <label className="form-label small"> <FormNeeded/></label>
          <span className="text small">You can topup your account, above is your bank account details. you can add money via the allowed payment mode</span>
        </div>
      </div>

    </div>

    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p>{memo}</p>
      <p className="cursor text-color-blue" onClick={() => window.location.reload()}>Make Another Transfer</p>
    </div>    

    
    {/* <div className={loading && submit || done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> { navigate(`/${usxx}/home`)}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={!form || loading || submit}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Continue'}</button>

      </div>
    </div> */}
    

    <div className={loading && submit ? '' : 'd-none'}>
      Please Wait...
    </div>


  </>

  )
}