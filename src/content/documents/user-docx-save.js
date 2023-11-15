// user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import FileSaveCX from "../../services/srvc-filesave-cweb-xx";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";


const listDocs = [
  {name: 'Pan Card', code: 'acn', item: '699afacd-f87a-4fb6-acb0-9f44071ee4ca'},
  {name: 'Aadhaar Card', code: 'adhr', item: '33c7814a-19d2-44d4-83d1-e6aa303639db'},
  {name: 'Utility Bill', code: 'util', item: '6c0e9af0-1c40-4105-9894-86554c152899'}
]

export default function UserDocumentsAddModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [media, setMedia] = useState({link: '', mime: 'image/png', size: 0})
  const [data, setData] = useState({
    name: '',
    number: '',
    format: '',
    verified: true,
    active: false
  })


  useEffect( () => {
    const fetchData = async() => {
      setForm(false)

      if (data.format !== '' && data.number !== '' && media.link !=='')
      setForm(true)

    }
    fetchData()
  },[data, media]);

  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, item: asset.item },
      account: { name: data.name, number: data.number },
      bank: { name: data.code, code: data.code },
      network: 'bank'
    }

    console.log(datx)

    // const result = await AccountsCreate({data: datx})
    // console.log (result)
    
    // if (result.data) {
    //   setDone(true)
    //   setMemo('Account Created.')
    // }
    // else {
    //   setDone(false)
    //   setMemo('Account Creation Failed.')
    // }

    setLoading(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleFile = async(item) => {
    console.log(item)
    setMedia(item)

  };

  // if (loading) return <WebbLoaderSmall/>


  return (
    <>
      {/* info */}
      <div className="">
        <p className="">
          Please use this form to upload your KYC Documents.
          Documents - PAN Card, Aadhaar Card, Latest Utility Bill.
        </p>
      </div>
  
      {/* data */}
      <WebbDividerSmall />
      <div className="">
  
        <div className="mb-3">  
          <label className="form-label small">Document Type <FormNeeded/></label>
          <select className="form-select height-md"
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          onChange={({ target }) => {handleChange("format", target.value); }}
          value={data.format}
          disabled={loading || submit}
        >
          <option defaultValue value="">Select Document</option>
          {listDocs && listDocs.map((x, i) => (
            <option value={x.item} key={i}>{x.name}</option>
          ))}
        </select>
        </div>    
  
        <div className="mb-3">  
          <label className="form-label small">Document Number <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.number}
            onChange={({ target }) => {handleChange("number", target.value); }}
            disabled={loading || submit}
            placeholder="9900000000000123">
          </input>
        </div>

      </div>
    
      <div className="">
        <label className="form-label small">Document Upload <FormNeeded/></label>
        <FileSaveCX media={handleFile}/>
      </div>
      

  
      <WebbDividerMedium />
      <div className={!loading && submit && done ? '' : 'd-none'}>
        <p>{memo}</p>
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