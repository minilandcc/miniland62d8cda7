// user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import FileCreateCX from "../../services/srvc-filecreate-cweb-xx";
import { DocumentSave } from "../../services/srvc-documents-realm";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";


const listDocs = [
  {name: 'Pan Card', code: 'taxc', item: '25782623593d44e4bff02487f03befe57'},
  {name: 'Aadhaar Card', code: 'adhr', item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: 'Utility Bill', code: 'util', item: '6661bb7e4c604488bb5d9442ff39ad939'}
]

export default function UserDocumentsCreateAadhaarModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [media, setMedia] = useState({file: ''})
  const [data, setData] = useState({
    format: '9001cd7381e745d19e55a1365a1f4b9e2',
    number: Date.now().toString()
  })


  useEffect( () => {
    const fetchData = async() => {
      setForm(false)

      if (data.format !== '' && media.file !=='')
      setForm(true)

    }
    fetchData()
  },[data, media]);


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, item: asset.item },
      file: media.file,
      format: data.format,
      number: data.number
    }

    // console.log(datx)

    const result = await DocumentSave({data: datx})
    // console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Document Save Success. You can close this window.')
      navigate("/user/onboard/start")
    }
    else {
      setDone(false)
      setMemo('Document Save Failed. Please refresh the page and try again.')
    }

    setLoading(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleFile = async(item) => {
    //console.log(item)
    setMedia({...media, file: item.file})

    handleChange('item', item.item)

  };

  // if (loading) return <WebbLoaderSmall/>


  return (
    <>
      {/* info */}
      <div className="">
        <p className="">
          Please use this to upload your KYC Documents.
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
          disabled={loading || submit || true}
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
        <FileCreateCX media={handleFile}/>
      </div>
      

  
      <WebbDividerMedium />
      <div className={!loading && submit && done ? '' : 'd-none'}>
        <p>{memo}</p>
      </div>
  
      
      <div className={loading && submit || done ? 'd-none' : ''}>
        <div className="d-flex justify-content-between">
  
          <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
            type="button"
            disabled={loading}
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