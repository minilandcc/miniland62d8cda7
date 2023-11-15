// next logout
import { useNavigate } from "react-router-dom";

export default function NextHome() {

  const navigate = useNavigate()

  return (
  <>
    <div className={`p-2 px-3 back-color-wite rounded-xx hitone cursor w-50`} 
      onClick={()=>navigate('/user/home')}>

      <div className="d-flex justify-content-start">
        <div className="">
          <i className="bi bi-house-door text-color-tone m-0 text-icon-sm"></i>
        </div>
        <div className="py-1 ms-2 text-normal text-color-tone">
          Home
        </div>
        <div className="d-none">
          <i className="bx bx-chevron-right text-color-tone m-0 text-icon-sm" ></i>
        </div>

      </div>

    </div>

  </>
  )
}