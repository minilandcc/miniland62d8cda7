// transfers
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import WebbDividerMedium from '../webx/webb-divider-md'
import WebbDividerSmall from '../webx/webb-divider-sm'
import WebbLoaderMedium from '../webx/webb-loader-md'
import FormNeeded from '../webx/form-needed'

import { TransfersDetails } from '../../services/srvc-transfers-realm'
import { TransfersFundsDecline, TransfersFundsSubmit } from '../../services/srvc-transfers-realm'

import { GetLocalUser } from '../../services/srvc-auth-user'
import { AccountsList } from '../../services/srvc-accounts-realm'


export default function TransferViewModule () {

  const asset = GetLocalUser()
  const {id} = useParams()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [balance, setBalance] = useState({number: 0, ticker: '******'})
  const [accounts, setAccounts] = useState([])
  const [data, setData] = useState(null)

  useEffect(()=>{
    const fetchdata = async()=>{
        setLoading(true)
        var result = await TransfersDetails({data:{item:id}})
        console.log(result)

        if(result.stat) setData(result.data)





        setLoading(false)
    }
    fetchdata()

  },[])

  useEffect( () => {
    if (asset){

      const fetchData = async() => {

        const result = await AccountsList({data: {user: asset.item}})
        console.log (result)

        setAccounts(result.data.list)
        var ac = result.data.list.find(x => x.feat.sort === 'transit') 
        //console.log(ac)
        if(ac== undefined) setAccounts([])
        else setAccounts(ac)

        if (result.data) 
        setBalance(result.data.list.find(x => x.feat.sort === 'transit').balance.number)

      }
      fetchData()
    } else {}
  },[]);

  // useEffect for form validation
  useEffect( () => {
    if(data)
    {
        setForm(false);

    }
  },[data]);

  const handleDecline = async () => {
    setLoading(true);
    setSubmit(true);

    var datx ={
      item: id,
      user: asset.item
    }

    const result= await TransfersFundsDecline({data: datx})
    console.log (result)
    
    if (result.stat) {
      setDone(true)
      setMemo('Transfer Declined.')
    }
    else {
      setDone(false)
      setMemo('Transfer Failed.')
    }

    setLoading(false)
  }


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);
    var datx ={
      item: id,
      user: asset.item
    }

    // console.log(datx)
    const result= await TransfersFundsSubmit({data: datx})
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


  if (loading) return <>Please Wait...</>
  if (!loading && !data) return <>Transaction Not Found</>
  if (!loading && data && data.status !== 0) return <>Transaction Closed</>

  return (
    <>
    <div className='back-color-wite p-3 border rounded-xd'>
      {/* credit */}
      <p className='text-small text-color-tone m-0'>{'CREDIT'}</p>
      <div className='d-flex'>
        <div className=''>

        </div>
        <div className=''>
          <p className='text-bold m-0'>{data?.credit?.name || 'Credit User'}</p>
          <p className='text-small m-0'>{data?.credit?.mail || 'credit@miniland'}</p>
        </div>
      </div>

      {/* debit */}
      <WebbDividerSmall />
      <p className='text-small text-color-tone m-0'>{'DEBIT'}</p>
      <div className='d-flex'>
        <div className=''>

        </div>
        <div className=''>
          <p className='text-bold m-0'>{data?.debit?.name || 'Debit User'}</p>
          <p className='text-small m-0'>{data?.debit?.mail || 'debit@miniland'}</p>
        </div>
      </div>

    </div>

    <WebbDividerSmall />
    <div className='back-color-wite p-3 border rounded-xd'>
      {/* amount */}
      <p className='text-small text-color-tone m-0'>{'AMOUNT'}</p>
      <p className='m-0'>
        <span className='text-lead text-bold'>{((data?.amount?.number || '000000')/1000000).toFixed(6)}</span>
        <span>{' '}</span>
        <span>{data?.amount?.ticker || '***'}</span>
      </p>

      {/* memo */}
      <WebbDividerSmall />
      <p className='text-small text-color-tone m-0'>{'NOTES'}</p>
      <p className='m-0'>{data?.meta?.memo || '***'}</p>
    </div>

    <WebbDividerMedium/>
    <div className={!loading && submit && done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between ">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          onClick={()=> {handleDecline()}}
        >{loading ? 'Please Wait...' : 'Decline'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small`}
          disabled={parseInt(data.amount.number) < parseInt(balance.number)}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Authorize'}</button>

      </div>
    </div>

    <WebbDividerMedium />
    <div className={!loading && submit && done ? '' : 'd-none'}>
      <p className="text-success fw-bold">{memo}</p>
      <p onClick={()=>navigate("/user/transfers")} className={done? 'text small btn-link mt-3 text-success':'d-none'}>View Status</p>

    </div>    

    <div className={loading && submit ? '' : 'd-none'}>
      Please Wait...
    </div>

    {/*  */}
    <div className="back-color-wite rounded-wd p-3 border d-none">
      <div className="d-flex">
        <div className="">
          <p className="text-small text-color-tone m-0">Account Balance</p>
          <p className="text-lead m-0">{parseInt(balance && parseInt(balance/1000000)).toFixed(6)}</p>
        </div>
        <div className=""></div>
      </div>

    </div>

  </>
  )
}