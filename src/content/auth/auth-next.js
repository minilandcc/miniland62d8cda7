import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbModuleInfo from "../webx/webb-module-info";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import NextIntro from "../webx/next-intro";
import NextAccounts from "../webx/next-accounts";
import NextDivider from "../webx/next-divider";
import NextUser from "../webx/next-user";
import NextBusiness from "../webx/next-business";
import NextLogout from "../webx/next-logout";


import { UserAccountList } from "../../services/srvc-user-realm";

import { GetAuthUser, SetLocalUser, SetLocalBusiness } from '../../services/srvc-auth-user';
import { SetNewUser, SetNewBusiness } from '../../services/srvc-auth-user';

import listActions from '../../data.static/data-user-onboard.json'
import { DocumentsOnboardStatus } from "../../services/srvc-documents-realm";
import { AccountsOnboardStatus } from "../../services/srvc-accounts-realm";


export default function AuthNextModule () {

  const asset = GetAuthUser();
 //console.log(asset) // asset.user = authenticated email

  const [onboard, setOnboard] = useState(false);
  const [user, setUser] = useState();
  const [loading,setLoading] = useState(true);

  const [gotoOnboarding, setGoToOnboarding] = useState(false)

  const navigate = useNavigate()

  const [list, setList] = useState()

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        setLoading(true);

        var result = {data: {user: '******'}}
        // user roles
        var user = []
        if (result.data) {
          setOnboard (true);
          user = await UserAccountList({ data: { user: asset.user } })
          console.log(user)
          
          if(user.data!= false) {

            const docx = await DocumentsOnboardStatus({data: {user: user.data.list[0].item}})
            const accountx = await AccountsOnboardStatus({data: {user: user.data.list[0].item}})
            const onboardx = [...docx.data.list, ...accountx.data.list]
            console.log(onboardx)

            var listx = Array.from(listActions.data, x => { return{
              ...x, 
              status: onboardx.find(z => z.code == x.code).status
      
            }})
            setList(listx)

            listx.map( item => { if(item.status==false) {
              setGoToOnboarding(true);
              setOnboard(false);
              user.data.list[0].onboard = false
              return
            } })

          }
         
        } else {
          setOnboard (false);
        }
        
        setUser(user.data.list)
        setLoading(false);

      }
      fetchData()
    } else {}
  },[]);


  const newUser = () => {
    SetNewUser({user:''})
    if (user) {
      SetNewUser({user:user[0].item})
      // console.log(user[0].item)
    }
    navigate(`/user/onboard`)
  }

  const newBusiness = () => {
    SetLocalUser(user[0]);
    SetNewBusiness({user: ''})
    navigate(`/team/onboard`)
  }

  const onboardUser = (usxx) => {

    if (usxx.form === 'user'){
      SetNewUser({user:usxx.item});
      console.log(usxx.item);
    }

    if (usxx.form === 'team'){
      SetLocalUser(user[0]);
      SetNewBusiness({user: usxx.item});
      console.log(usxx.item);
    }
    
    const base = usxx.form === 'user' ? `onboard` : `business`
    
    if (!usxx.onbd.obnm)  navigate(`/${base}/name`)
    else {
      if (!usxx.onbd.obcr) navigate(`/${base}/docs`)
      else {
        if (!usxx.onbd.obdc) navigate(`/${base}/docs`)
        else {
          if (!usxx.onbd.obcm) navigate(`/${base}/contact`)
          else {
            if (!usxx.onbd.oblc) navigate(`/${base}/location`)
            else {
              if (!usxx.onbd.obtr) navigate(`/${base}/terms`)
            }
          }
        }
      }
    }

  }

  const nextuseraction = (usxx) => {
    if (usxx.active) {
      usxx.form === 'user' 
        ? SetLocalUser (usxx)
        : SetLocalBusiness (usxx)
    }
    else onboardUser (usxx)
    console.log(usxx)
    console.log(onboard)

    if (usxx.form === 'user' && !onboard) {
      navigate (`/user/onboard/start`)
      return
    }
    if (usxx.form === 'user' && usxx.hold) {
      navigate (`/user/onboard/hold`)
      return
    }
    if (usxx.form === 'user') {
      navigate (`/user/home`)
      return
    }
    
    // if (usxx.form === 'user') {}
      // navigate (`${gotoOnboarding ? '/user/onboard/start':  `/${usxx.form}/onboard/launch`  } `) 
    
    
      // if (usxx.form === 'team') navigate (`/${usxx.form}/home`) 

  }

  if (loading) return <>
    <div className="text-center">
      <WebbDividerMedium />
      <WebbLoaderSmall />
    </div>
  </>
  
  // user does not exist or user was added contact or refer
  if (!(user && user[0].self)) {
    return (
      <>
        <div className="mx-3">
          <NextIntro stat={'new'} />
          <WebbDividerSmall />
          <div className="" onClick={() => { newUser(); }}>
            <NextUser/>
          </div>

          {/* create a new user here and then onboard */}
          <WebbDividerSmall />
          {/* <NextDivider /> */}
          <NextLogout />
        </div>

      </>
    )
  }

  // // user has incomplete onboarding steps
  // if (!(user && user[0].onbx)) {
  //   return (
  //     <>
  //       <WebbDividerSmall />
  //       <NextIntro stat={'incomplete'} />
  //       <WebbDividerMedium />
  //       <div className="text-center">
  //         <button onClick={async ()=> { onboardUser(user[0]) }} 
  //           className="btn btn-primary back-color-next border-none rounded-pill px-3">
  //           <small>Update Account</small>
  //         </button>
  //       </div>
  //       <WebbDividerSmall />
  //       <NextDivider />
  //       <NextLogout />
  //     </>
  //   )
  // }

  // if (!(user && user[0].actv)) {
  //   return (
  //     <>
  //       <WebbDividerSmall />
  //       <NextIntro stat={'review'} />
  //       <WebbDividerSmall />
  //       <NextDivider />
  //       <NextLogout />
  //     </>
  //   )
  // }


  // if ((user && user[0].hold)) {
  //   return (
  //     <>
  //       <div className="mx-3">
  //       <NextIntro stat={'hold'} />
  //       <WebbDividerSmall />
  //       <NextDivider />
        
  //       <NextLogout />
  //       </div>

        
  //     </>
  //   )
  // }
  
  
  return (
    <>
    {/* info  */}
    <div className="mx-3">
      <WebbModuleInfo data={{text: 'Select Account to continue'}} />
    </div>
    <WebbDividerSmall />

    {/* personal */}
    <NextAccounts 
      data={user.filter(item => item.form==='user')}
      form={'Personal'}
      user={nextuseraction}
    />
    
    <WebbDividerMedium />
    {/* business */}
    <NextAccounts
      data={user.filter(item => item.form==='team')} 
      form={'Team'}
      user={nextuseraction}
    />

    {/* actions */}
    {/* <WebbDividerSmall />
    <NextDivider />
    <div className="" onClick={() => { newBusiness(); }}>
      <NextBusiness/>
    </div> */}

    <WebbDividerSmall />
    <div className="mx-3">
      <NextLogout />
    </div>

    
  </>
  )
  
}