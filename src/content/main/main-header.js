// content
import { Link } from "react-router-dom";
import WebbDividerMedium from "../webx/webb-divider-md";

export default function MainHeaderModule () {


  return (
  <>

    <div className="">
      <h1 className='text-color-warning'>Unlock Real Estate Investments</h1>
      <h2 className=''>Your Gateway to Fractional Ownership and Tokenized Assets</h2>
      
      <WebbDividerMedium />
      <WebbDividerMedium />

      <Link 
        to={`/auth`}
        className="btn btn-info back-color-warning text-dark border-none p-3 rounded-wd text-color-wite"
        style={{width:'9rem'}}
      >Get Started</Link> 

      <span className="ms-1"></span>
      <Link 
        to={`/`}
        className="btn btn-info back-color-wite text-dark border-none p-3 rounded-wd text-color-wite"
        style={{width:'9rem'}}
      >List Property</Link>       
    
      <WebbDividerMedium />
    </div>

  </>
  );
}