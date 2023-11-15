//webb icon
import { Link } from "react-router-dom"

export default function WebbIconFull() {

  return (
    <>
      <Link to={'/'}>
        <div className='cursor text-color-tone'>  
          <i className="bx bxs-color text-color-tone "  style={{fontSize: '1.6rem'}}></i>
            <span className='ms-1 text-bold text-uppercase' style={{fontSize: '1.9rem'}}>
              {process.env.REACT_APP_WEBB_SITE_NAME}
            </span>
        </div>
      </Link>
    </>
  )
}