// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { auth } from '../../services/firebase'
// import { sendSignInLinkToEmail } from "firebase/auth";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetAuthUser } from '../../services/srvc-auth-user';
import { UserAccountCreate } from "../../services/srvc-user-realm";


export default function UserOnboardNameModule () {

  const asset = GetAuthUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');


  const [data, setData] = useState({
    name: '', 
    mail: asset.user,
    mobile: '',
    memo: ''
  })


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.name!=='' && data.mail!=='' && data.mobile!=='') setForm(true);

  },[data]);

  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);
    setMemo('Please wait...')
    
    const result = await UserAccountCreate({data: {
      name: data.name, mail: data.mail, mobile: data.mobile, memo: data.memo,
      self: true, active: true
    }})
    // console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Account Created. Please wait...')
      navigate('/auth/next')
    }
    else {
      setDone(false)
      setMemo('Error. Please try again...')
    }

    setLoading(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loading) return <WebbLoaderSmall/>


  return (
  <>
    
    <div className={submit ? '' : ''}>

      <WebbModuleInfo data = {{text: 'New Accounts'}} />

      <WebbDividerSmall/>
      <div className={''}>

      <div className="mb-3">  
          <label className="form-label small">Mail <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.mail}
            onChange={({ target }) => {handleChange("mail", target.value); }}
            disabled={true}
            placeholder="user@carbonize.cc">
          </input>
        </div>

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
          <label className="form-label small">Mobile Number <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.mobile}
            onChange={({ target }) => {handleChange("mobile", target.value); }}
            disabled={loading || submit}
            placeholder="9876540123">
          </input>
        </div>

        <div className="mb-3">  
          <label className="form-label small">Short Bio (About Yourself)</label>
          <textarea 
            className="form-control" rows="6"
            style={{fontSize:'0.9rem'}}
            value={data.memo}
            onChange={({ target }) => {handleChange("memo", target.value); }}
            disabled={loading || submit}
          ></textarea>
        </div>

      </div>

      <WebbDividerMedium />
      <div className="">
        <p className="m-0">{memo}</p>
      </div>

      <WebbDividerMedium />
      <div className={submit ? 'd-none' : ''}>
        <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          disabled={loading || submit}
          onClick={()=> { navigate('/auth/next')}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          type="button"
          disabled={!form || loading || submit}
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Continue'}</button>

        </div>


      </div>

    </div>


  </>

  )
}