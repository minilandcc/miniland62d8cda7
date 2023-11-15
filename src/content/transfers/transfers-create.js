// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { AccountsDetails } from "../../services/srvc-accounts-realm";
import { TransfersCreate } from "../../services/srvc-transfers-realm";


export default function TransfersCreateModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
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

  const [credit, setCredit] = useState({name:"Miniland User", mail:"finnovateinc+usin@gmail.com", item:"074f4bffb8cf49d1a61e06d9cca9d3862"})
  const [remark,setRemark] = useState(`indx.fund.transfer`)


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AccountsList({data: {user: asset.item}})
        // console.log (result)

        setAccounts(result.data.list)
        var ac = result.data.list.find(x => x.feat.sort === 'transit') 
        //console.log(ac)
        if(ac== undefined) setAccounts([])
        else setAccounts(ac)

        if (result.data) setBalance(result.data.list.find(x => x.feat.sort === 'transit').balance.number)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (parseInt(data.amount) > 0 && parseInt(data.amount) <= parseFloat(balance)/1000000) setForm(true);

  },[data]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);
    var datx ={
      credit: { name:credit.name, mail: credit.mail, item: credit.item },
      debit: { name:asset.name,mail: asset.mail, item: asset.item},
      sale: { number:data.amount},
      meta: { name:"Transfer to transit Account", memo: remark}
    }

    // console.log(datx)
    const result = await TransfersCreate({data: datx, srvc:'******'})
    // console.log (result)
    
    if (result.stat) {
      setDone(true)
      setMemo('Transfer Submit.')
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


  if (loading) return <><WebbLoaderMedium /></>
  if (!loading) return <>
    <div className="text-center">
      Coming Soon ! <br/>Feature is enabled for business accounts
    </div>
  </>
    
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
          <p className="text-small text-color-tone m-0">Account Balance</p>
          <p className="text-lead m-0">{parseInt(balance && parseInt(balance/1000000)).toFixed(6)}</p>
        </div>
        <div className=""></div>
      </div>

    </div>
    
    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p>{memo}</p>
    </div>  

    <WebbDividerMedium/>
      <div className="">
        <div className="mb-3">  
          <label className="form-label small">You are paying to <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={credit.name}
            // onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled
            placeholder="123">
          </input>

          <label className="form-label small">Email Address <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={credit.mail}
            // onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled
            placeholder="123">
          </input>

          <label className="form-label small">Account Id <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={credit.item}
            // onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled
            placeholder="123">
          </input>
        </div>
      </div>  


    <WebbDividerMedium/>
      <div className="">
        <div className="mb-3">  
          <label className="form-label small">Amount <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.amount}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled={loading || submit}
            placeholder="100">
          </input>
        </div>
      </div> 

       <div className="mb-4">
        <div className="mb-3">  
          <label className="form-label small">Transaction Remark <FormNeeded/></label>
          <textarea type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'5.7rem'}}
            value={remark}
            onChange={({ target }) => {setRemark(target.value); }}
            disabled={loading || submit}
            placeholder="">
          </textarea>
        </div>
      </div> 

      <div className={loading && submit || done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between ">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> { navigate(`/${asset.mode}/home`)}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={!form || loading || submit}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Continue'}</button>

      </div>
    </div>

    <p className={done? 'text fw-bold mt-3 text-success':'d-none'}>{memo}</p>
    <p onClick={()=>navigate("/user/transfers")} className={done? 'text small btn-link mt-3 text-success':'d-none'}>View Status</p>

    
    {/* <div className={loading && submit || done || !form ? 'd-none' : ''}>
      <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> { navigate(`/${asset.mode}/home`)}}
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