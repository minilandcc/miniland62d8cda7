// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";


export default function NetworkInviteTeamModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('')

  const [data, setData] = useState({
    name: '', 
    mail: asset.user,
    mobile: '',
    memo: ''
  })

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        setLoading(false);
      }
      fetchData()
    } else {}
  },[]);

  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.name !== '' && data.mail !== "" ) setForm(true);

  },[data]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    // const result = await TransfersAccountCredit({data: {
    //   credit: { user: asset.mail },
    //   debit: { user: asset.mail },
    //   amount: {number: data.amount},
    //   memo: "account credit"
    // }})
    // console.log (result)
    
    // if (result.data) {
    //   setDone(true)
    //   setMemo('Transfer Success.')
    // }
    // else {
    //   setDone(false)
    //   setMemo('Transfer Failed.')
    // }

    setLoading(false)
    
  }



  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  // if (loading) return <></>


  return (
  <>

    {/* form */}
    <div className="">
        <div className="mb-3">  
          <label className="form-label small">Name <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.name}
            onChange={({ target }) => {handleChange("name", target.value); }}
            disabled={loading || submit}
            placeholder="User Name">
          </input>
        </div>

        <div className="mb-3">  
          <label className="form-label small">Mail <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.mail}
            onChange={({ target }) => {handleChange("mail", target.value); }}
            disabled={loading || submit}
            placeholder="user@brx">
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
          onClick={()=> { navigate(`/${asset.mode}/home`)}}
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