// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { TransfersAssetDetails } from "../../services/srvc-transfers-assets-realm";
import { TransfersAssetSubmit, TransfersAssetDecline } from "../../services/srvc-transfers-assets-realm";

import { AuthCodeCreate, AuthCodeCheck } from "../../services/srvc-auth-realm";

const list = [
  {code: 0, memo: 'created', icon: 'bx bxs-circle', color: 'text-color-tint'},
  {code: 1, memo: 'active', icon: 'bx bxs-circle', color: 'text-color-wait'},
  {code: 2, memo: 'scheduled', icon: 'bx bxs-info-circle', color: 'text-color-wait'},
  {code: 3, memo: 'locked / on-hold', icon: 'bx bxs-minus-circle', color: 'text-color-wait'},
  {code: 4, memo: 'cancelled', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 5, memo: 'timeout', icon: 'bx bxs-error-circle', color: 'text-color-error'},
  {code: 6, memo: 'closed (success)', icon: 'bx bxs-check-circle', color: 'text-color-success'},
  {code: 7, memo: 'declined (user)', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 8, memo: 'revoked (user)', icon: 'bx bxs-x-circle', color: 'text-color-error'},
  {code: 9, memo: 'declined (user)', icon: 'bx bxs-right-arrow-circle', color: 'text-color-next'}
]

export default function TransfersAssetActionsModule (props) {

  // console.log(props.search)
 
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(false);
  

  const [code, setCode] = useState('')
  const [codetrxn, setCodeTransfer] = useState()
  const [memocode, setMemoCode] = useState()

  const [codenew, setCodeNew] = useState(false)
  const [codesubmit, setCodeSubmit] = useState(false)
  const [codestatus, setCodeStatus] = useState(false)

  const [data, setData] = useState()


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await TransfersAssetDetails({data: {
          item: id, user: asset.item, chain: '416001'
        }})
        // console.log (result)

        if (result.stat) {
          setData(result.data)
        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);


  const handleCodeCreate = async () => {
    setCodeNew(true)

    setMemoCode('Please Wait...')
    const datx = { user: asset.mail, memo: `authorize asset transfer for asset id: ${data?.unit?.number || '******'}` }
    const result = await AuthCodeCreate({data: datx})
    console.log (result)
    if (result.data) {
      setCodeTransfer(result.data.trxn)
      setMemoCode('OTP sent to Your Email. Please check (SPAM also)')

    }
    else { setMemoCode('Failed') }

  }

  const handleCodeCheck = async() => {
    
    setMemoCode('Please Wait...');
    setCodeSubmit(true)
    const datx = { user: asset.mail, trxn: codetrxn, code: code }
    const result = await AuthCodeCheck({data: datx})
    console.log (result)
    
    if (result.data) {
      setMemoCode('Passcode Verified')
      setCodeStatus(true)

      handleSubmit()
    }
    else {
      setMemoCode('Incorrect Passcode');
      setCodeSubmit(false)
      setCodeStatus(false)
    } 

  }
  
  const handleDecline = async() => {
    setLoading(true)
    setSubmit(true)

    const result = await TransfersAssetDecline({data: {item: id, chain: "416001"}, srvc:'******'})
    console.log (result)

    if (result.stat) setDone(true)

    setLoading(false)

  }
  
  const handleSubmit = async() => {

    setLoading(true)
    setSubmit(true)

    const result = await TransfersAssetSubmit({data: {item: id, chain: "416001"}, srvc:'******'})
    console.log (result)

    if (result.stat) setDone(true)

    setLoading(false)

  }

  // console.log(data)

  if (loading) return <>Please Wait...</>
  if (!loading && (!data)) return <>Transaction Not Found !</>

  return (
  <>
    <div className="row g-3">

      <div className="col">
        
        {/* asset+sale info */}

        <div className="rounded-xd back-color-wite p-3">
        <p className="text-small text-color-tone m-0">ASSET DETAILS</p>
          <p className="text-normal text-bold m-0">{data?.unit?.name || '******'}</p>
          <p className="text-color-next m-0">ID: {data?.unit?.number || '******'}</p>
          <p className="text-color-next m-0">
            <span>{'Units:  '}</span>
            <span>{data?.sale?.number || '******'}</span>
            <span>{' '}</span>
            <span>{data?.sale?.ticker || '******'}</span>
          </p>
          
          <WebbDividerSmall />
          <div className="w-75">
            <div className="media-cube">
              <img src={data?.media?.link} 
                className="rounded-xd" 
                alt={data?.unit?.name || 'miniland'}
              ></img>
            </div>
          </div>
          
          <WebbDividerSmall />
          <p className="text-small m-0">{data?.unit?.memo || '******'}</p>
          <WebbDividerSmall />

        </div>

        
      </div>

      <div className="col">

        {/* user info */}
        <div className="rounded-xd back-color-wite p-3">
          <p className="text-small text-color-tone m-0">USER DETAILS</p>
          <p className="text-bold text-truncate m-0">Name: {data?.credit?.name || '******'}</p>
          <p className="text-small text-truncate m-0">Mail: {data?.credit?.mail || '******'}</p>
        </div>

        <WebbDividerSmall />
        <div className="rounded-xd back-color-wite p-3">
          <p className="text-bold m-0">Authorize via OTP</p>
          <p className="text-small m-0">Please Authorize asset transfer via OTP</p>
          
          <WebbDividerMedium />
          <div className={`mb-2`}>  
            <input type="text" className="form-control height-md  "
              style={{fontSize:'0.9rem', height:'2.7rem'}}
              value={code}
              onChange={({ target }) => {setCode(target.value); setMemoCode('')}}
              disabled={loading || submit || !codenew}
              placeholder="123456">
            </input>
          </div>


          {/* memo */}
          <div className={codenew && !submit  ? '' : 'd-none'}>
            <p className="text-small m-0">{memocode}</p>
            <WebbDividerSmall />
          </div>

          {/* action */}
          <WebbDividerSmall />
          <div className={!loading && !submit ? "d-flex justify-content-between" : 'd-none'}>
          
            <div className="">
              <div className={codenew && !codesubmit && !codestatus ? '' : 'd-none'}>
                
                <button className="btn btn-outline-danger btn-sm text-small rounded-xx px-4"
                  style={{width: 'auto'}}
                  disabled={!code || code =='' || code.length !==6 }
                  onClick={() => handleDecline()}
                >Decline</button>
              </div>
            </div>

            <div className="">
              <div className={codenew ? 'd-none' : ''}>
                
                <button className="btn btn-primary btn-sm text-small rounded-xx border-none px-4"
                  disabled={loading}
                  onClick={() => handleCodeCreate()}
                >Get OTP</button>
              </div>

              <div className={codenew && !codesubmit && !codestatus ? '' : 'd-none'}>
                
                <button className="btn btn-success btn-sm text-small rounded-xx border-none px-4"
                  style={{width: 'auto'}}
                  disabled={!code || code =='' || code.length !==6 }
                  onClick={() => handleCodeCheck()}
                >Authorize Transfer</button>
              </div>

            </div>
          </div>


          {/* status */}
          <div className={!loading && submit ? '' : 'd-none'}>
            <WebbDividerMedium />
            <div className={done ? '' : 'd-none'}>
              <p className="m-0 mb-1">🎉 <span className="text-bold">Congratulations</span> </p>
              <p className="m-0">Asset Transfer Request has been submitted.</p>
              <p className="m-0">You can check the status in Transfers section.</p>
            </div>
            <div className={done ? 'd-none' : ''}>
              <p className="m-0 mb-1">😑 <span className="text-bold">There was an error</span> </p>
              <p className="m-0">Asset Transfer Request failed.</p>
              <p className="m-0">Please refresh and try again.</p>
            </div>        
          </div>

          <WebbDividerSmall />
        </div>

      </div>
    
    </div>

  </>

  )
}