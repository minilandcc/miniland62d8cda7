// web navigation
import { Link, useLocation } from "react-router-dom";

import WebbIcon from "../webx/webb-icon"
// import WebbIconBack from "../webx/webb-icon-back"
// import WebbIconX from "../webx/webb-icon-x";
// import WebbIconUser from "../webx/webb-icon-user"
import UserWebb from "../webx/user-webb"
import UserAvatar from "../webx/user-avatar";
import UserAvatarSidebar from "../webx/user-avatar-sidebar";

import WebbHeaderNavs from "./webb-header-navs-xw";

export default function WebbHeader(props) {

  const data = props.data;

  const location = useLocation();  
  const linx = location.pathname.split('/')[2]
  const form = location.pathname.split('/')[1]

  return (
    <>
    {/* header-large */}
    <div className="d-none d-md-block">
      <div className="d-flex justify-content-start py-1" style={{height:'3.6em'}}>
        
        <div className="py-1">
          <Link to={`/${form}/home`}>
            <WebbIcon data={{color: 'text-color-main', size: 'text-icon-sm'}}/>
          </Link>
        </div>
        
        <div className="py-2 ms-3">
          <WebbHeaderNavs />
        </div>
        
        <div className="py-1 ms-auto">
          <UserAvatar /> 
        </div>
      </div>
    </div>
  
    {/* header-small */}
    <div className="d-md-none">
      <div className="d-flex justify-content-between py-1" style={{height:'3.6em'}}>
        
        <div className="py-1">
          <WebbIcon data={{color: 'text-color-main', size: 'text-icon-sm'}}/>
        </div>
        
        <div className="py-2">
          <h2 className="text-normal text-color-main"> {data.name}</h2>
        </div>
        
        <div className="py-1">
          <UserAvatar /> 
        </div>
      </div>
    </div>
  
    </>
    )
}