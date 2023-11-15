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


export default function UserOnboardInviteModule () {

  const asset = GetAuthUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');


  const [data, setData] = useState({
    mail: asset.user,
    code: ''
  })


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.mail!=='' && data.code !=='') setForm(true);

  },[data]);

  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);
    setMemo('Please wait...')
    
    const result = await UserAccountCreate({data: {
      name: data.name, mail: data.mail, mobile: data.mobile, memo: data.memo,
      self: true, active: true
    }})
    console.log (result)
    
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

      <WebbModuleInfo data = {{text: 'Invite Code'}} />

      <WebbDividerSmall/>
      <div className={''}>

      <div className="mb-3">  
          <label className="form-label small">Invite Code <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.code}
            onChange={({ target }) => {handleChange("code", target.value); }}
            disabled={true}
            placeholder="123abc">
          </input>
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