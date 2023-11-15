// web navigation
import { Link } from "react-router-dom";

import WebbIcon from "../webx/webb-icon"
// import WebbIconBack from "../webx/webb-icon-back"
// import WebbIconX from "../webx/webb-icon-x";
import WebbIconUser from "../webx/webb-icon-user"
import UserWebb from "../webx/user-webb"

import WebbHeaderNavs from "./webb-header-navs-xz";

export default function WebbHeader(props) {

  const data = props.data;

  return (
    <>
    {/* header-large */}
    <div className="container d-none d-md-block">
      <div className="d-flex justify-content-between py-1" style={{height:'3.3em'}}>
        
        <div className="py-1">
          <Link href={data.home}>
            <WebbIcon data={{color: 'text-color-main', size: 'text-icon-md'}}/>
          </Link>
        </div>
        
        <div className="py-2">
          <WebbHeaderNavs />
        </div>
        
        <div className="py-1">
          <Link to={`/auth`}> <WebbIconUser data={{color: 'text-color-main', size: 'text-icon-md'}}/> </Link>
        </div>
      </div>
    </div>
  
    {/* header-small */}
    <div className="container d-md-none">
      <div className="d-flex justify-content-between py-1" style={{height:'3.3em'}}>
        
        <div className="py-1">
          <Link to={data.home}>
            <WebbIcon data={{color: 'text-dark', size: 'text-icon-md'}}/>
          </Link>
        </div>
        
        <div className="py-2">
          <h2 className="text-lead text-sm text-center">
            {data.name}
          </h2>
        </div>
        
        <div className="py-1">
          <Link to={`/auth`}> 
            <WebbIconUser data={{color: 'text-color-tone', size: 'text-icon-md'}}/> 
          </Link>
        </div>
      </div>
    </div>
  
    </>
    )
}