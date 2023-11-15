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

import FileSaveMD from "../../services/srvc-filesave-cweb-md";

import { AssetDetails, AssetUnitsCreate } from "../../services/srvc-assets-realm";

const creditmode = ['inr', 'usd', 'eur' ]


export default function UnitsCreateModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [media, setMedia] = useState({link: '', mime:''})
  const [ticker, setTicker]= useState([])

  const [assetx, setAssetx] = useState()
  const [data, setData] = useState({
    name: '',
    memo: '',
    count: '',
    rate: '',
    ticker: '',
    chain: '416012'
  })


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        console.log (id)

        const resDetails = await AssetDetails({data: {item: id}})
        console.log (resDetails)

        if (resDetails.data) setAssetx(resDetails.data)
        setData({...data, name: resDetails.data.meta.name, memo: resDetails.data.meta.memo})

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.name !=="" && data.memo !=="" && media.link !=="" && parseInt(data.count) > 0 && parseInt(data.rate)>0) 
    setForm(true)
  },[data]);

  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx = {
      name: data.name, memo: data.memo,
      media: media,
      units: {count: data.count},
      rate: {amount: data.rate, ticker: data.ticker},
      asset: id,
      owner: asset.item
    }
    console.log (datx)
    // setLoading(false)

    const result = await AssetUnitsCreate({ data: datx, srvc: asset.item })
    console.log (result)

    if (result.data) {
      setDone(true)
      setMemo('Success: Units Created')
    }

    setLoading(false)
    
  }

  const handleMediaBanner = async(filedata) => {
    console.log (filedata);
    setMedia(filedata);
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loading) return <></>


  return (
  <>
    {/* info */}

    {/* data */}
    <div className="back-color-wite rounded-wd p-3 border">

      <div className="row ">

        <div className="col-md-6">
          <WebbDividerSmall />
          <p className="text-bold">Asset Data</p>

          <div className="mb-3">  
            <label className="form-label small">Name <FormNeeded/></label>
            <input type="text" className="form-control height-md  "
              style={{fontSize:'0.9rem', height:'2.7rem'}}
              value={data.name}
              onChange={({ target }) => {handleChange("name", target.value); }}
              disabled={loading || submit}
              placeholder="asset name">
            </input>
          </div>

          <div className="mb-3">  
            <label className="form-label small">Description <FormNeeded/></label>
            <textarea 
              className="form-control" rows="6"
              style={{fontSize:'0.9rem'}}
              value={data.memo}
              onChange={({ target }) => {handleChange("memo", target.value); }}
              disabled={loading || submit}
              placeholder="asset details">  
            </textarea>
          </div>

          <div className="mb-3">  
            <label className="form-label small">Units (SQFT) <FormNeeded/></label>
            <input type="text" className="form-control height-md  "
              style={{fontSize:'0.9rem', height:'2.7rem'}}
              value={data.count}
              onChange={({ target }) => {handleChange("count", target.value); }}
              disabled={loading || submit}
              placeholder="123">
            </input>
          </div>

          <div className="mb-3">  
            <label className="form-label small">Rate (Per Unit) <FormNeeded/></label>
            <input type="text" className="form-control height-md  "
              style={{fontSize:'0.9rem', height:'2.7rem'}}
              value={data.rate}
              onChange={({ target }) => {handleChange("rate", target.value); }}
              disabled={loading || submit}
              placeholder="123">
            </input>
          </div>

          <div className="mb-3">  
            <label className="form-label small d-none">Currency <FormNeeded/></label>
            {creditmode && creditmode.map((item, i) => (
              <span className="me-1" key={i}>
                <span className={`${data.ticker === item ? 'back-color-rich' : 'back-color-wite'} p-2 px-3  border rounded-wd text-uppercase text-small cursor hirich`}
                  onClick={()=> handleChange('ticker', item)}
                >{item}</span>
              </span>
            ))}
          </div>          

          <WebbDividerMedium/>
        </div>

        <div className="col-md-6">

          <WebbDividerSmall />
          <p className="text-bold m-0">Asset Artwork</p>
          <p className="text-small mb-3">Media Dimensions 600 x 600 px <FormNeeded/></p>
          <FileSaveMD size='media-cube' media={handleMediaBanner} />
          

          <WebbDividerMedium/>
        </div>


      </div>

    </div>

    {/* action */}
    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p>{memo}</p>
      <p className="cursor text-color-blue d-none"
        onClick={() => window.location.reload()}>Make Another Transfer</p>
    </div>    


    <div className={loading && submit && !done ? '' : 'd-none'}>
      Please Wait...
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

  </>

  )
}