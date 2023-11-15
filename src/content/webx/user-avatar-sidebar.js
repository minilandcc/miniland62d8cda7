// user avatar
import { Link } from 'react-router-dom';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import WebbDividerMedium from "./webb-divider-md";
import WebbDividerSmall from "./webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const list = [
  {name: 'Account Settings', icon: 'bx bx-user-circle', link: '/user/account'},
  {name: 'Switch Account', icon: 'bx bx-reset', link: '/auth/next'},
  {name: 'Logout', icon: 'bx bx-minus-circle', link: '/auth/x'}
]

export default function UserAvatarSidebar(props) {
  
  const asset = GetLocalUser();
  // console.log (asset)

  return (
    <>
      <div className="" >
        <a className="" 
          data-bs-toggle="offcanvas" 
          href="#offcanvasExample" role="button" 
          aria-controls="offcanvasExample">
          <Jazzicon diameter={30} seed={jsNumberForAddress(asset.item)} />   
        </a>
      </div>

      <div className="offcanvas offcanvas-end m-1 rounded-none" 
        tabindex="-1" id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="text-lead text-color-tone offcanvas-title" id="offcanvasExampleLabel">Account Details</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        
        <div className="offcanvas-body">

          <p className="text-normal text-bold m-0 p-0 text-sm">{asset ? asset.name : '******'}</p>
          <p className="m-0 p-0 mb-2">
            {asset ? asset.mail : '******'}
          </p>
          <p className="m-0 p-0">
            {asset ? `${GetUserForm() === 'user' ? 'Personal' : 'Team'}` : '******'} Account
          </p>
          
          <WebbDividerSmall />
          <div className='border-bottom'></div>  
          <WebbDividerSmall />

          {list && list.map((item, i) => (
            <Link className="" to={item.link} key={i}>
              <div className='d-flex cursor hitone py-1 my-1 rounded-none '>
                <div className=''>
                  <i className={`${item.icon} text-icon-sm text-dark ms-2`}></i>
                </div>
                <div className='ms-2 text-dark'>
                  <p className='py-1 m-0 p-0'>{item.name}</p>
                </div>
                <div className='ms-auto'>
                  <i className='bx bx-chevron-right text-icon-sm text-color-tone me-2'></i>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>


    </>
    )
  }