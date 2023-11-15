// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { UnitDetails } from "../../services/srvc-assets-realm";
import { CheckoutCreate } from "../../services/srvc-checkout-realm";


export default function UnitsCheckoutUserModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()
  
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [media, setMedia] = useState({link: '', mime:''})
  const [ticker, setTicker]= useState([])

  const [item, setItem] = useState()
  const [data, setData] = useState({
    name: '',
    memo: '',
    count: '',
    sale: '',
    ticker: '',
    chain: '416012'
  })


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        console.log (id)

        const result = await UnitDetails({data: {item: id}})
        console.log (result)

        if (result.data) setItem(result.data)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.count !=="" && data.count > 0 ) 
    setForm(true)
  },[data]);

  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);

    const datx= {
      user: { name: asset.name, mail: asset.mail },
      count: data.count,
      chain: '416012',
      unit: id,
      asset: item.asset.item
    }
    
    const result = await CheckoutCreate({data: datx})
    console.log(result)

    if (result.data) {
      setDone(true)
    }

    setLoading(false)
    
  }


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  if (loading) return <><WebbLoaderMedium /></>


  return (
  <>
    {/* info */}

    {/* data */}
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="back-color-wite rounded-xd">
          <h1 className="text-lead text-color-main mx-3 pt-3">{item && item.meta.name}</h1>
          <p className="text-lead m-0 mx-3">{item && item.owner.name}</p>
          <p className="m-0 mx-3">Asset: {item && item.web3.nmbr}</p>


          <WebbDividerSmall />
          <div className="media-cube">
            <img src={item && item.media.link} className="rounded-none w-100"></img>
            <div className="d-none btn back-color-next text-small">{item && item.meta.form || 'asset'}</div>
          </div>

          <WebbDividerSmall />
          <p className="mx-3 mb-3">{item && item.meta.memo}</p>

          <WebbDividerSmall />
        </div>

      </div>
      
      
      <div className="col-md-6">
        <WebbDividerSmall />
        <p className="text-bold m-0">Checkout Details</p>
        
        <WebbDividerMedium />
        <p className="m-0">User Details</p>
        <p className="text-lead text-bold m-0">{asset.name}</p>
        <p className="text-normal m-0 mb-2">{asset.mail}</p>

        <WebbDividerMedium />
        <p className="m-0">Units Available</p>
        <p className="text-lead text-bold m-0 mb-2">{item && item.unit.mint}</p>

        <WebbDividerSmall />
        <p className="m-0">Rate Per SQFT</p>
        <p className="text-lead text-bold m-0 mb-2">
          <span>{item && item.rate.number/1000000}</span>
          <span>{' '}</span>
          <span>{item && item.rate.ticker.toUpperCase()}</span>
        </p>

        <WebbDividerMedium />
        <p className="m-0 mb-2">Enter Units to Checkout</p>
        <div className="mb-3">  
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.count}
            onChange={({ target }) => {handleChange("count", target.value); }}
            disabled={loading || submit}
            placeholder="123">
          </input>
          <p className={`text-danger text-small mt-2 ${parseInt(data.count) > parseInt(item.unit.mint) ? '' : 'd-none'}`}>
            {`Please select less than ${data && item.unit.mint}`}
          </p>
        </div>

        <WebbDividerSmall />
        <p className="m-0">Total</p>
        <p className="text-lead text-bold m-0 mb-2">
          <span>{NumberFormat(data.count * item.rate.number/1000000)}</span>
          <span>{' '}</span>
          <span>{item && item.rate.ticker.toUpperCase()}</span>
        </p>

        <WebbDividerMedium />
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