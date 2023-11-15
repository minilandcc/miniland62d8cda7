// auth - firebase mail link
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
import { TransfersAccountDebit } from "../../services/srvc-transfers-realm";


export default function TransfersAccountDebitModule () {


  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');
  const [bank, setBank] = useState([])
  const [balance, setBalance] = useState({number: 0, ticker: '******'})
  const [accounts, setAccounts] = useState([])
  const [data, setData] = useState({
    amount: '',
    memo: `account.debit`
  })

  const [remark, setRemark] = useState(`withdrawal of amount to linked settlement account`)

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AccountsList({data: {user: asset.item}})
        // console.log (result)


        setAccounts(result.data.list)
        var transit = result.data.list.find(x => x.feat.sort === 'settle')
        if(transit== undefined) setAccounts([])
        else setBank(transit)
        
        

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

  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (parseInt(data.amount) > 0 && parseInt(data.amount) <= parseFloat(balance)/1000000) setForm(true);

  },[data]);

  // console.log(bank)
  const handleSubmit = async () => {

 
    setLoading(true);
    setSubmit(true);
    var datx =  {
      credit: { 
        name: asset.name, 
        mail: asset.mail,
        item: asset.item,
        account: bank.account.number,
        code: bank.bank.code
      },
      debit: { name:asset.name, mail:asset.mail, item : asset.item },
      sale: { number: data.amount },
      meta: { name: "account.debit", memo: `account.debit.${data.amount}.miniland` }
    }

    // cred.item == debt.item (user.name == 'Self', item: '', mail: '', account: '')
    // console.log(datx)

    const result = await TransfersAccountDebit({data:datx})
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


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  if (loading) return <>Please Wait...</>
  if (!loading && accounts.length ==0) return <>
    <div className="">
      No Linked Accounts. <br></br>Please Create / Link via Dashboard
    </div>
  </>


  return (
  <>
    <div className='back-color-wite p-3 border rounded-xd'>
      {/* credit */}
      <p className='text-small text-color-tone m-0'>{'CREDIT ACCOUNT'}</p>
      <div className='d-flex'>
        <div className=''>

        </div>
        <div className=''>
          <p className='text-bold m-0'>{bank.account.number || '000000'}</p>
          <p className='text-small m-0'>{bank.bank.code || 'ABCD12345567'}</p>
        </div>
      </div>

    </div>     

    <WebbDividerSmall />
    <div className="back-color-wite rounded-wd p-3 border">
      <div className="d-flex">
        <div className="">
          <p className="text-small text-color-tone m-0">BALANCE</p>
          <p className="text-lead text-color-next m-0">
            <span>{parseInt(balance && parseInt(balance/1000000)).toFixed(6)}</span>
            <span>{' '}</span>
            <span></span>
          </p>
        </div>
        <div className=""></div>
      </div>

      <WebbDividerSmall />
      <div className="">
        <div className="mb-3">  
          <label className="form-label small">Amount <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.amount}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled={loading || submit}
            placeholder="123">
          </input>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-3">  
          <label className="form-label small">Memo <FormNeeded/></label>
          <textarea type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'5.7rem'}}
            value={data.memo}
            onChange={({ target }) => {handleChange("memo", target.value); }}
            disabled={loading || submit}
            placeholder="">
          </textarea>
        </div>
      </div> 

    </div>
    
    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p className="text-success fw-bold">{memo}</p>
      <p onClick={()=>navigate("/user/transfers")} className={done? 'text small btn-link mt-3 text-success':'d-none'}>View Status</p>

    </div>    

    
    <div className={loading && submit || done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> { navigate(`/${usxx}/home`)}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          // disabled={!form || loading || submit}
          type="button"
          disabled={loading || submit || !data?.amount || data.amount == "" || data.amount == 0}
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