// web navigation
import { Link, useNavigate } from "react-router-dom";

// import WebbIcon from "../webx/webb-icon"
import WebbIconBack from "../webx/webb-icon-back"
import WebbIconX from "../webx/webb-icon-x";
// import WebbIconUser from "../webx/webb-icon-user"
// import UserWebb from "../webx/user-webb"
// import UserAvatar from "../webx/user-avatar";

import { GetLocalUser } from "../../services/srvc-auth-user";

export default function WebbHeader(props) {

  const asset = GetLocalUser();
  const navigate = useNavigate();
  const data = props.data;

  return (
    <>
    {/* header-large */}
    <div className="d-none d-md-block">
      <div className="d-flex justify-content-between py-1" style={{height:'3.3em'}}>
        
        <div className="py-1 cursor" onClick={() => navigate(-1)}>
          <WebbIconBack data={{color: 'text-color-tint', size: 'text-icon-md'}}/>
        </div>
        
        <div className="py-1">
          <p className="text-normal m-0">{data.name}</p>
        </div>
        
        <div className="py-1">
          <Link to={`/${asset.form}/${data.link}`}><WebbIconX /></Link>
        </div>
      </div>
    </div>
  
    {/* header-small */}
    <div className="d-md-none">
      <div className="d-flex justify-content-between py-1" style={{height:'3.3em'}}>
        
        <div className="py-1" onClick={() => navigate(-1)}>
          <WebbIconBack data={{color: 'text-color-tint', size: 'text-icon-md'}}/>
        </div>
        
        <div className="py-1">
          <p className="text-lead">{data.name}</p>
        </div>
        
        <div className="py-1">
        <Link to={`/${asset.form}/${data.link}`}><WebbIconX /></Link>
        </div>
      </div>
    </div>
  
    </>
    )
}