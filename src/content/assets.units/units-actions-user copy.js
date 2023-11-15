// units
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AccountsTransitBalance } from "../../services/srvc-accounts-realm";
import { AuthCodeCreate, AuthCodeCheck } from "../../services/srvc-auth-realm";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { TransfersAccountDebit } from "../../services/srvc-transfers-realm";
import { TransfersCreate } from "../../services/srvc-transfers-realm";


const list = [
  {code: 0, memo: 'Please Select Units', icon: 'bi bi-exclamation-circle-fill', color: 'text-color-wait'},
  {code: -1, memo: 'Account Balance Low', icon: 'bi bi-exclamation-circle-fill', color: 'text-color-error'},
  {code: 1, memo: 'Authorize via OTP', icon: 'bi bi-check-circle-fill', color: 'text-color-success'}
]

export default function AssetUnitActionsUserModule (props) {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(true);
  
  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState({number: 0, ticker: ''})

  const [data, setData] = useState(props?.data)
  const [actions, setActions] = useState([
    {name: "Claim", icon: "bx bx-plus-circle", code: "fund", actv: true},
    {name: "Fund", icon: "bx bx-credit-card", code: "fund", actv: true},
    {name: "Mint", icon: "bx bx-down-arrow-circle", code: "mint", actv: false},
    {name: "Offer", icon: "bx bx-up-arrow-circle", code: "offer", actv: false},
    {name: "Transfer", icon: "bx bx-check-circle", code: "transfer", actv: false}
  ])

  const [task, setTask] = useState()
  const [unit, setUnits] = useState(0)

  const [code, setCode] = useState('')
  const [codetrxn, setCodeTransfer] = useState()
  const [memocode, setMemoCode] = useState()

  const [codenew, setCodeNew] = useState(false)
  const [codesubmit, setCodeSubmit] = useState(false)
  const [codestatus, setCodeStatus] = useState(false)

  const [checkout, setCheckout] = useState(0)
  const [submit, setSubmit] = useState(false)
  const [done, setDone] = useState(false)


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        const resBalance = await AccountsTransitBalance({data: {user: asset.item},srvc: '******'})
        // console.log (resBalance)
        setBalance(resBalance.data.balance)

        const resAccounts = await AccountsList({data: {user: asset.item}})
        if (resAccounts.data) setAccounts(resAccounts.data.list)
        // console.log(resAccounts)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        if (balance.number < (unit || 0)* parseInt(data.rate.number)) setCheckout(-1)
        if (balance.number > (unit || 0)* parseInt(data.rate.number)) setCheckout(1)        
        if (unit == 0) setCheckout(0)
      }
      fetchData()
    } else {}
  },[unit]);


  const handleClick = (item) => {
    if (task == item) setTask() 
    else setTask(item)
    // navigate(`/${asset.form}/au/${id}/${item}`)
  }

  const handleCodeCreate = async () => {
    setCodeNew(true)

    setMemoCode('Please Wait...')
    const datx = { user: asset.mail, memo: `transfer funds for asset id: ${data?.number || '******'}` }
    const result = await AuthCodeCreate({data: datx})
    // console.log (result)
    if (result.data) {
      setCodeTransfer(result.data.trxn)
      setMemoCode('OTP sent to Your Email. Please check (SPAM also)')

    }
    else { setMemoCode('Failed') }

  }

  const handleCodeResend = async() => {

    setCodeSubmit(false)

    setMemoCode('Please Wait...')
    const datx = { user: asset.mail, memo: `transfer funds for asset id: ${data?.number || '******'}` }
    const result = await AuthCodeCreate({data: datx})
    // console.log (result)
    if (result.data) {
      setCodeTransfer(result.data.trxn)
      setMemoCode('OTP sent to Your Email. Please check (SPAM also)')
      setCodeStatus(true)
    }
    else { 
      setMemoCode('Failed');
      setCodeStatus(false);
    }

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
      credit: { name: data?.creator?.name, mail: data?.creator?.mail, item: data?.creator?.item },
      debit: { name: asset.name, mail: asset.mail, item: asset.item },
      count: { number: unit, ticker: data?.unit?.ticker || 'BRX' },
      rate: { number: data.rate.number, ticker: data?.rate?.ticker || 'INR' },
      meta: { name: "unit.sale", memo: `brx.${data.webx.number}.sale.${unit}.miniland` },
      asset: data.asset,
      unit: { name: data.meta.name, memo: data.meta.memo, item: data.item, number: data.webx.number, media: data.media },
    }

    console.log (datx)
    const result = await TransfersCreate({data: datx, srvc: '******'})
    console.log (result)

    if (result.data) setDone(true)
    else setDone(false)

    setLoading(false)
  }


  // if (loading) return <></>

  return (
  <>

    {/* info */}

    {/* actions */}
    <div className="">
      <div className="row row-cols-5 g-1 back-color-wite rounded-xd border">
        {actions && actions.map((item, i) => (
        <div className="col text-center p-1" key={i}>

          <div className={`m-1 mt-0 p-1 rounded-xd ${item.actv ? 'text-color-next hirich cursor' : 'text-color-tint'}`}
            onClick={() => handleClick(item.code)}
          >
            <i className={`m-0 p-0 ${item.icon} text-icon-md`}></i>
            <p className={`m-0 p-0 text-small text-nowrap `}>{item.name}</p>
          </div>  
        </div>
        ))}

      </div>
    </div>
    
    <WebbDividerMedium />
    {/* fund */}
    <div className={task == 'fund' ? 'border rounded-xd back-color-wite p-3' : 'd-none'}>
      <p className="text-bold m-0">Enter Checkout Details</p>

      {/* rate */}
      <WebbDividerSmall />
      <div className="mb-1">
        <p className="text-bold m-0">
          <span>{'Rate: '}</span>
          <span>{NumberFormat(data?.rate?.number || '0')}</span>
          <span>{' '}</span>
          <span>{data?.rate?.ticker || '*'}</span>
        </p>
      </div>

      <div className="">
        <div className="d-flex justify-content-between">
          <div className="">
          <p className="text-color-next m-0">{'Select Units'}</p>
          </div>
          <div className="">
            <p className="text-color-next text-lead text-bold m-0">{unit || 0}</p>
          </div>
        </div>
        
        <input 
          type="range" className="form-range" 
          min="0" 
          max={(data?.units?.mint - data?.units?.sale)} 
          onChange={({ target }) => {setUnits (target.value); }}
          disabled={codenew}
          step="1">  
        </input>
      </div>
      <div className="d-flex justify-content-between">
        <div className="">0</div>
        <div className="">
          <p className="m-0">{((data?.units?.mint - data?.units?.sale))}</p>
        </div>
      </div>
      
      {/* amount */}
      <WebbDividerSmall />
      <div className="d-flex justify-content-between back-color-lite rounded-wd p-2 px-3">
        <div className="">
          <p className="m-0 mt-1">
            <span className={`text-small ${list.find(x => x.code == checkout).color}`}>
              <i className={list.find(x => x.code == checkout).icon}></i>
            </span>
            <span>{' '}</span>
            <span className="align-middle">Contribution </span>
          </p>
        </div>

        <div className="">
          <p className="m-0">
            <span className="text-bold text-lead">
              {((((unit || 0) * parseInt(data.rate.number)))/1000000)}
            </span>
            <span>{' '}</span>
            <span className="text-small">{data?.rate?.ticker || '*'}</span>
          </p>
        </div>
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
    </div>

  </>

  )
}



    // var datx = {
    //   credit: { 
    //     name: asset.name, mail: asset.mail, item: asset.item, 
    //     account: (accounts.find(x => x.feat.sort =='settle')).account.number, 
    //     code: (accounts.find(x => x.feat.sort =='settle')).bank.code
    //   },
    //   debit: { 
    //     name: asset.name, mail: asset.mail, item: asset.item,
    //     account: (accounts.find(x => x.feat.sort =='transit')).account.number, 
    //     code: (accounts.find(x => x.feat.sort =='transit')).bank.code
    //   },
    //   sale: { number: unit, ticker: data?.units?.ticker || 'BRX' },
    //   rate: { number: data.rate.number, ticker: data?.rate?.ticker || 'INR' },
    //   meta: { name:"unit.sale", memo: `brx.${data.webx.number}.sale.${unit}.miniland` }      
    // }