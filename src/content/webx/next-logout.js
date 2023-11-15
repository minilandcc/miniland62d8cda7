// next logout
import { useNavigate } from "react-router-dom";

export default function NextLogout() {

  const navigate = useNavigate()

  return (
  <>
    <div className={`p-2 px-3 back-color-wite rounded-xx hitone cursor w-50`} 
      onClick={()=>navigate('/auth/x')}>

      <div className="d-flex justify-content-start">
        <div className="">
          <i className="bi bi-dash-circle text-color-tone m-0 text-lead"></i>
        </div>
        <div className="ms-2 mt-1 text-small text-color-tone">
          LOGOUT
        </div>
        <div className="d-none">
          <i className="bx bx-chevron-right text-color-tone m-0 text-icon-sm" ></i>
        </div>

      </div>

    </div>

  </>
  )
}