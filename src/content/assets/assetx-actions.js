// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetCounts, AssetInterestStatus } from "../../services/srvc-assets-webb-realm";
import { AssetInterestSet, AssetLikesSet } from "../../services/srvc-assets-webb-realm";


const listActions = [  
  {name: "", icon: "bx bx-user", code: "user", color: '', actv: true, item: '25782623593d44e4bff02487f03befe57'},
  {name: "", icon: "bx bx-like", code: "like", color: '', actv: true, item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: "", icon: "bx bx-show", code: "view", color: '', actv: true, item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: "", icon: "bx bx-share-alt", code: "invite", color: '', actv: false, item: '6661bb7e4c604488bb5d9442ff39ad939'},
  // {name: "Checkout", icon: "bx bx-credit-card", link: "transfer", actv: true},
  // {name: "Offer", icon: "bx bx-up-arrow-circle", link: "offer", actv: true}
]


export default function AssetActionsModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [interest, setInterest] = useState(0)
  const [users, setUsers] = useState(0)
  const [likes, setLikes] = useState(0)
  const [views, setViews] = useState(0)
  const [data, setData] = useState()


  useEffect( () => {
    if (asset){

      const fetchData = async() => {

        const countx = await AssetCounts({data: {asset: id}, srvc: '******'})
        if (countx.stat) {
          setUsers(countx?.data?.count?.users || 0)
          setLikes(countx?.data?.count?.likes || 0)
          setViews(countx?.data?.count?.views || 0)
        } 

        const interestx = await AssetInterestStatus({data: {asset: id, user: asset.item}, srvc: '******'})
        if (interestx.stat) setInterest(interestx?.data?.status || 0)

      }
      fetchData()
    } else {}
  },[id]);


  const handleInterest = async() => {
    // console.log('interest')
    const datx =  {asset: id, user: asset.item}
    const result = await AssetInterestSet({data: datx, srvc: '******'})
    console.log (result)

    if (result.stat) {
      setUsers(interest === 0 ? users+1 : users-1 )
      setInterest(interest === 0 ? 1 : 0)
    }

  }

  const handleLikes = async() => {
    console.log('interest')
    const datx =  {asset: id, user: asset.item}
    const result = await AssetLikesSet({data: datx, srvc: '******'})
    console.log (result)

    if (result.stat) setLikes(likes+1)

  }


  if (loading) return <></>


  return (
  <>

    {/* info */}


    {/* data */}
    <div className="ms-3">

      <span onClick={() => handleInterest()} 
        className={`btn rounded-xx p-2 px-3 ${interest !==0 ? 'btn-primary' : 'btn-secondary'}`}>
        <span className={`align-middle`} style={{fontSize:'1.25rem', lineHeight: '1.25rem'}}>
          <i className={`bx ${interest !==0 ? 'bxs-check-circle' : 'bx-check-circle '}`}></i>
        </span>
        <span className={`ms-1 text-small ${interest !==0 ? 'text-color-wite' : ''}`}>{interest !==0 ? 'Interested' : 'Show Interest'}</span>
      </span>
      <span className="me-1"></span>

      <span onClick={() => handleLikes()} 
        className={`btn btn-outline-primary back-color-wite rounded-xx p-2 px-3`}>
        <span className={`align-middle`} style={{fontSize:'1.25rem', lineHeight: '1.25rem'}}>
          <i className={`bx bx-like`}></i>
        </span>
        <span className={`ms-1 text-small`}>{likes}</span>
      </span>
      <span className="me-1"></span>

      <span className={`btn back-color-wite rounded-xx p-2 px-3 border d-none`}>
        <span className={`align-middle`} style={{fontSize:'1.25rem', lineHeight: '1.25rem'}}>
          <i className={`bx bx-user`}></i>
        </span>
        <span className={`ms-1 text-small`}>{users}</span>
      </span>
      <span className="me-1 d-none"></span>

      <span className={`btn back-color-wite rounded-xx p-2 px-3 border`}>
        <span className={`align-middle`} style={{fontSize:'1.25rem', lineHeight: '1.25rem'}}>
          <i className={`bx bx-show`}></i>
        </span>
        <span className={`ms-1 text-small`}>{views}</span>
      </span>

    </div>
    <p className="text-small ms-3 mt-2 text-color-tone d-none">Please Express Your Interest to activate this deal</p>

    <WebbDividerSmall />
   
  </>

  )
}