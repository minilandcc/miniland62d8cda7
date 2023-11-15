// user avatar
import { Link } from 'react-router-dom';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

export default function UserAvatar(props) {
  
  const asset = GetLocalUser();
  // console.log (asset)

  return (
    <>
      <div className="d-none" >
        <Jazzicon diameter={27} seed={jsNumberForAddress(asset.item)} />    
      </div>
  
      <div className="btn-group ">
        
        <Link className="" to="#" 
          role="button" id="dropdownMenuLink" 
          data-bs-toggle="dropdown" aria-expanded="false">
          <Jazzicon diameter={27} seed={jsNumberForAddress(asset.item ??= Date.now().toString())} /> 
        </Link>

        <ul className="dropdown-menu dropdown-menu-end p-0 rounded-wd shadow-lg" aria-labelledby="dropdownMenuLink">
          <div className="back-color-next p-3 rounded-wd text-white"
            style={{width:'222px', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
            <p className="text-bold m-0 p-0 text-sm">
              {asset ? asset.name : '******'}
            </p>
            <p className="small m-0 p-0">
             {asset ? `${GetUserForm() === 'user' ? 'Personal' : 'Team'}` : '******'} Account
            </p>
          </div>
          <li><Link className="dropdown-item small py-2" to={`/${asset.form}/account`}>Account Details</Link></li>
          <li><Link className="dropdown-item small py-2" to={`/auth/next`}>Switch Account</Link></li>
          <li><Link className="dropdown-item small py-2" to={"/auth/x"}>Logout</Link></li>
        </ul>
      </div> 

      <div className="d-none">
        <Link to={`/${asset.form}/account`}>
          <Jazzicon diameter={30} seed={jsNumberForAddress(asset.item ??= Date.now().toString())} /> 
        </Link>
      </div>


    </>
    )
  }