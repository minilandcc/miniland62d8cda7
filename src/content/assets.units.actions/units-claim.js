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

import { UnitDetails, AssetUnitStatus } from "../../services/srvc-assets-realm";

import { AccountsMinterInit } from "../../services/srvc-accounts-minter-realm";
import { AccountsMinterStatus, AccountsMinterDetails } from "../../services/srvc-accounts-minter-realm";

import { TransfersAssetClaim } from "../../services/srvc-transfers-assets-realm";
import { TextSecure, TextReverse } from '../../services/srvc-encr-node'


export default function AssetUnitsClaimModule () {

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

  const [account, setAccount] = useState({number: '', secret: ''})
  const [secret, setSecret] = useState()
  const [balance, setBalance] = useState({number: ''})
  const [status, setStatus] = useState()
 
  const [unit, setUnit] = useState()
  const [unitstat, setUnitStatus] = useState()
  const [data, setData] = useState({
    name: '',
    memo: '',
    count: '',
    rate: '',
    ticker: '',
    chain: '416001'
  })


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        //unit
        const resUnit = await UnitDetails({data: {item: id}, srvc: '******'})
        console.log (resUnit.data)
        if (resUnit.stat) setUnit(resUnit.data)

        //unit
        const resUnitStatus = await AssetUnitStatus({data: {unit: id}, srvc: '******'})
        console.log (resUnitStatus.data)
        if (resUnitStatus.stat) setUnitStatus(resUnitStatus.data)

        //account
        const resAccount = await AccountsMinterDetails({data: {user: asset.item, chain: '416001'}, srvc: '******'})
        if (resAccount.stat) setAccount(resAccount.data.account)

        //balance
        const resBalance = await AccountsMinterStatus({data: { unit: id, user: asset.item, chain: '416001'}, srvc: '******'})
        if (resBalance.stat) setBalance(resBalance.data.balance)
        if (resBalance.stat) setStatus(resBalance.data.status)
        console.log (resBalance.data.status)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (secret && secret !=="" && secret?.length == 6) 
    setForm(true)
  },[secret]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    if (!status.balance) {

      console.log ('account init')
      const result = await AccountsMinterInit({data: {
        user: asset.item, role: '',
        chain: '416001', memo: ''
      }, srvc: '******'})
      
      console.log(result)
    }

    // reverse
    const mnemonix = await TextReverse( {text: account.secret, secret: secret})
    // console.log(mnemonix)

    const datx = {
      asset: unit.asset.item,
      unit: unit.item,
      creator: unit.creator.item,
      sale: { number: "", ticker: "" },
      rate: { number: "", ticker: "" },
      cred: { account: account.number, mnemonic: mnemonix.data, item: asset.item },
      debt: { account: "", item: unit.creator.item },
      chain: "416001",
      memo: `brx.asset.${unit.webx.number}.claim`
    }

    console.log(datx)
    const result = await TransfersAssetClaim({data: datx, srvc: '******'})
    console.log(result)

    if (result.stat) setDone(true)

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
  if (!loading && !unitstat?.status?.mint) return <>
    <div className="">
      <span className="align-middle"><i className="bx bxs-info-circle text-color-wait text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>Issuance will start soon</span>
    </div>
  </>
  if (!loading && status?.asset) return <>
    <div className="">
      <span className="align-middle"><i className="bx bxs-check-circle text-color-success text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>Asset Unit is Subscribed</span>
    </div>
  </>

  return (
  <>

    {/* info */}
    <div className={''}>
      <p className="text-bold m-0">Subscribe Digital Asset</p>
      <p className="m-0">Please authorize via your Digital Asset Account Secret</p>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className={''}>
      <p className="m-0">Digital Assets Account</p>
      <p className="text-truncate m-0">{account?.number.substring(0,10)+'******' || '1234567890******'}</p>
    </div>

    <WebbDividerSmall />
    <div className={'mb-2'}>
      <p className="m-0">Enter Account Secret <FormNeeded/></p>
      <p className="text-small m-0">Please authorize via your Digital Asset Account Secret</p>
    </div>
    <div className="mb-3">  
      <input type="password" 
        className="form-control height-md"
        style={{fontSize:'0.9rem'}}
        value={secret}
        onChange={({ target }) => {setSecret(target.value); }}
        disabled={loading || submit}
        placeholder="123456">
      </input>
    </div>


    {/* action */}
    <div className="">
      <WebbDividerSmall />
      <button className="btn btn-sm btn-success text-small rounded-xx border-none px-4"
        style={{width: 'auto'}}
        disabled={!form}
        onClick={() => handleSubmit()}
      >Subscribe Asset</button>
    </div>


    {/* status */}
    <div className={!loading && submit ? '' : 'd-none'}>
      <WebbDividerMedium />
      <div className={done ? '' : 'd-none'}>
        <p className="m-0 mb-1">🎉 <span className="text-bold">Congratulations</span> </p>
        <p className="m-0">Your Transfer Request has been submitted.</p>
        <p className="m-0">You can check the status in Transfers section.</p>
      </div>
      <div className={done ? 'd-none' : ''}>
        <p className="m-0 mb-1">😑 <span className="text-bold">There was an error</span> </p>
        <p className="m-0">Asset Subscribe Request failed.</p>
        <p className="m-0">Please refresh and try again.</p>
      </div>        
    </div>

    <WebbDividerSmall />
  </>

  )
}