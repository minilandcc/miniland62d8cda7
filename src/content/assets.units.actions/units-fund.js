// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { UnitDetails } from "../../services/srvc-assets-realm";

import { AccountsTransitBalance } from "../../services/srvc-accounts-realm";
import { AuthCodeCreate, AuthCodeCheck } from "../../services/srvc-auth-realm";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { TransfersAccountDebit } from "../../services/srvc-transfers-realm";
import { TransfersCreate } from "../../services/srvc-transfers-realm";
import { TransfersAssetCredit } from "../../services/srvc-transfers-funds-realm";

import { AssetUnitStatus } from "../../services/srvc-assets-realm";

const list = [
  {code: 0, memo: 'Please Select Units', icon: 'bi bi-exclamation-circle-fill', color: 'text-color-wait'},
  {code: -1, memo: 'Error. Account Balance Low. Please add funds.', icon: 'bi bi-exclamation-circle-fill', color: 'text-color-error'},
  {code: 1, memo: 'OK. Authorize via OTP to Confirm', icon: 'bi bi-check-circle-fill', color: 'text-color-success'}
]


export default function AssetUnitsFundModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(false);

  const [code, setCode] = useState('')
  const [codetrxn, setCodeTransfer] = useState()
  const [memocode, setMemoCode] = useState()

  const [codenew, setCodeNew] = useState(false)
  const [codesubmit, setCodeSubmit] = useState(false)
  const [codestatus, setCodeStatus] = useState(false)

  
  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState({number: 0, ticker: ''})

  const [checkout, setCheckout] = useState(0)

  const [count, setCount] = useState()
  const [unit, setUnit] = useState()
  const [data, setData] = useState()
  

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        //unit
        const resUnit = await UnitDetails({data: {item: id}, srvc: '******'})
        if (resUnit.stat) setUnit(resUnit.data)
        console.log(resUnit.data)

        // balance
        const resBalance = await AccountsTransitBalance({data: {user: asset.item},srvc: '******'})
        if (resBalance.stat) setBalance(resBalance.data.balance)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        
        if (balance.number < (count || 0)* parseInt(unit?.rate?.number || 0)) setCheckout(-1)
        if (balance.number > (count || 0)* parseInt(unit?.rate?.number || 0)) setCheckout(1)
        if (count == 0) setCheckout(0)
      }
      fetchData()
    } else {}
  },[count]);  


  const handleCodeCreate = async () => {
    setCodeNew(true)

    setMemoCode('Please Wait...')
    const datx = { 
      user: asset.mail, 
      memo: `transfer funds, amount: ${((((count || 0) * parseInt(unit?.rate?.number || 0)))/1000000)} ${unit?.rate?.ticker || 'INR'} for ${count} ${unit?.unit?.ticker || 'BRX'} units of asset id: ${unit?.webx?.number || '******'}` 
    }
    const result = await AuthCodeCreate({data: datx})
    // console.log (result)
    if (result.data) {
      setCodeTransfer(result.data.trxn)
      setMemoCode('OTP sent to Your Email. Please check (SPAM also)')

    }
    else { setMemoCode('Failed') }

  }

  const handleCodeCheck = async() => {
    
    setMemoCode('Please Wait...');
    setCodeSubmit(true)
    const datx = { user: asset.mail, trxn: codetrxn, code: code }
    const result = await AuthCodeCheck({data: datx})
    // console.log (result)
    
    if (result.data) {
      setMemoCode('Passcode Verified')
      setCodeStatus(true)

      handleSubmit()
    }
    else {
      setMemoCode('Incorrect Passcode');
      setCodeSubmit(false)
      setCodeStatus(false)
    } 

  }

  const handleSubmit = async() => {

    setLoading(true)
    setSubmit(true)

    var datx ={
      credit: { name: unit?.creator?.name, mail: unit?.creator?.mail, item: unit?.creator?.item },
      debit: { name: asset.name, mail: asset.mail, item: asset.item },
      count: { number: count, ticker: unit?.unit?.ticker || 'BRX' },
      rate: { number: unit.rate.number, ticker: unit?.rate?.ticker || 'INR' },
      meta: { name: "unit.sale", memo: `brx.unit.${unit.webx.number}.sale.${count}` },
      asset: unit.asset,
      unit: { name: unit.meta.name, memo: unit.meta.memo, item: unit.item, number: unit.webx.number, media: unit.media },
    }

    console.log (datx)
    const result = await TransfersAssetCredit({data: datx, srvc: '******'})
    console.log (result)

    if (result.data) setDone(true)
    else setDone(false)

    setLoading(false)
  }


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  if (loading) return <>
    <div className="">
    <span className="align-middle"><i className="bx bxs-info-circle text-color-wait text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>Please Wait...</span>
    </div>
  </>
  if (!loading && (unit?.units.mint == unit?.units.book)) return <>
    <div className="">
    <span className="align-middle"><i className="bx bxs-check-circle text-color-success text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>No Units Avaiable for Sale</span>
    </div>
  </>

  return (
  <>
    {/* info */}
    <div className={''}>
      <p className="text-bold m-0">Enter Checkout Details</p>
      <p className="m-0">Please select units and authorize via One Time Passcode</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="">
        <div className="d-flex justify-content-between">
          <div className="">
          <p className="text-color-next m-0">{'Select Units'}</p>
          </div>
          <div className="">
            <p className="text-color-next text-lead text-bold m-0">{count || 0}</p>
          </div>
        </div>
        
        <input 
          type="range" className="form-range" 
          min="0" 
          max={(unit?.units?.mint - unit?.units?.book)} 
          onChange={({ target }) => {setCount (target.value); }}
          disabled={codenew}
          step="1">  
        </input>
      </div>
      <div className="d-flex justify-content-between">
        <div className="">0</div>
        <div className="">
          <p className="m-0">{((unit?.units?.mint - unit?.units?.book))}</p>
        </div>
      </div>

      <WebbDividerSmall />
      <p className="text-small">or Enter Units</p>
      <div className={`mb-2`}>  
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={count}
            onChange={({ target }) => {setCount (target.value); }}
            disabled={loading || submit}
            placeholder="******">
          </input>
        </div>


      {/* amount */}
      <WebbDividerSmall />
      <div className="back-color-lite rounded-wd p-2 px-3">

        <div className="d-flex justify-content-between ">
          <div className="">
            <p className="m-0 mt-1">
              <span className={`text-small ${list.find(x => x.code == checkout).color}`}>
                <i className={list.find(x => x.code == checkout).icon}></i>
              </span>
              <span>{' '}</span>
              <span className="align-middle">Total Contribution </span>
            </p>
          </div>

          <div className="">
            <p className="m-0">
              <span className="text-bold text-lead">
                {((((count || 0) * parseInt(unit?.rate?.number || 0)))/1000000).toFixed(0)}
              </span>
              <span>{' '}</span>
              <span className="text-small">{unit?.rate?.ticker || '*'}</span>
            </p>
          </div>


        </div>


        <p className="text-small text-color-next m-0">
          <span>{'@ '}</span>
          <span>{((unit?.rate?.number || '0')/1000000).toFixed(6)}</span>
          <span>{' '}</span>
          <span>{unit?.rate?.ticker || '*'}/SQFT</span>
        </p>

      </div>

      <div className="mb-2"></div>     
      <div className={`ms-2 text-small text-color-tone ${codenew ? 'd-none' : ''}`}>
        <span>{list.find(x => x.code == checkout).memo}</span>
      </div>

      {/* code */}
      <div className={codenew && !submit  ? 'mb-3' : 'd-none'}>
        <WebbDividerMedium />
        
        <div className="d-flex justify-content-between">
          <div className="">
            <span className="text-small">Enter One Time Passcode <FormNeeded/></span>
          </div>
          <div className="">
            <span>Resend Code</span>
          </div>
        </div>

        <div className={`mb-2`}>  
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={code}
            onChange={({ target }) => {setCode(target.value); setMemoCode('')}}
            disabled={loading || submit}
            placeholder="******">
          </input>
        </div>

      </div>

      <div className={codenew && !submit  ? 'mb-3' : 'd-none'}>
        <p className="text-small m-0">{memocode}</p>
        <WebbDividerMedium />
      </div>
      
      {/* action */}
      <WebbDividerSmall />
      <div className={codenew ? 'd-none' : ''}>
        <WebbDividerSmall />
        <button className="btn btn-sm btn-success text-small rounded-xx border-none"
          disabled={checkout!==1}
          onClick={() => handleCodeCreate()}
        >Get OTP</button>
      </div>

      <div className={codenew && !codesubmit && !codestatus ? '' : 'd-none'}>
        <button className="btn btn-sm btn-success text-small rounded-xx border-none px-3"
          style={{width: 'auto'}}
          disabled={!code || code =='' || code.length !==6 }
          onClick={() => handleCodeCheck()}
        >Authorize Transfer</button>
      </div>


      <WebbDividerSmall />
      {/* status */}
      <div className={!loading && submit ? '' : 'd-none'}>
        <WebbDividerSmall />
        <div className={done ? '' : 'd-none'}>
          <p className="m-0 mb-1">🎉 <span className="text-bold">Congratulations</span> </p>
          <p className="m-0">Your Transfer Request has been submitted.</p>
          <p className="m-0">You can check the status in Transfers section.</p>
        </div>
        <div className={done ? 'd-none' : ''}>
          <p className="m-0 mb-1">😑 <span className="text-bold">There was an error</span> </p>
          <p className="m-0">Your Transfer Request failed.</p>
          <p className="m-0">You can check the status in Transfers section.</p>
        </div>        
      </div>
      <WebbDividerSmall />


  </>

  )
}