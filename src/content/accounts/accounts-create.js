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


export default function AccountsCreateModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [media, setMedia] = useState()
  const [link, setLink] = useState('')  
  const [ticker, setTicker]= useState([])
  const [data, setData] = useState({
    debitname: '',
    debitmail: '',
    saleamount: '', saleticker: '',
    memo: '', domain: '',
    assetname: "", assetmemo:"", assetnumber: "",
  })



  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const basedomain = window.location.host.split(':')[0] === 'localhost' ? `http://${window.location.host}` : `https://${window.location.host}`

    const datx = {
      credit: { name: asset.name, user: asset.mail },
      debit: { name: data.debitname, user: data.debitmail },
      sale: { amount: data.saleamount, ticker: data.saleticker },
      asset: { name: "", memo:"", number: "" },
      media: { link: "", mime: "" }, 
      memo: data.memo, number: '******',
      tickers: ticker, mode: 'testnet', 
      link: {
        success: '', 
        failed: ''
      }, 
      domain: basedomain
    }

    console.log(datx)

    // const result = await TransfersCredit({data: datx})
    // console.log (result)
    
    // if (result.data) {
    //   setDone(true)
    //   setMemo('Transfer Created.')
    //   setLink(result.data.link)
    // }
    // else {
    //   setDone(false)
    //   setMemo('Failed.')
    // }

    setLoading(false)
    
  }

  const handleTicker = async(item) => {
    console.log (item)
    const index = ticker.findIndex(x => x=== item)
    console.log(index)
    if (index === -1) {
      console.log([...ticker, item])
      setTicker([...ticker, item])
    } else {
      console.log ([...ticker.splice(index,1)])
      setTicker([...ticker.splice(index,1)])
    }
  }  


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loading) return <></>


  return (
  <>

    <div className="">

      <div className="mb-3">  
        <label className="form-label small">Account Name / Nickname <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={loading || submit}
          placeholder="account name">
        </input>
      </div>    

      <div className="mb-3">  
        <label className="form-label small">Number <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.debitmail}
          onChange={({ target }) => {handleChange("debitmail", target.value); }}
          disabled={loading || submit}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">Branch Code <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.debitmail}
          onChange={({ target }) => {handleChange("debitmail", target.value); }}
          disabled={loading || submit}
          placeholder="ABCX1234567">
        </input>
      </div>

    </div>




    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p>{memo}</p>
      <p className="cursor text-color-blue" onClick={() => window.location.reload()}>Make Another Transfer</p>
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