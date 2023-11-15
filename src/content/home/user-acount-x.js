// account-x
import { useNavigate } from "react-router-dom";


export default function UserAccountXModule () {

  const navigate = useNavigate();

  // if (loading) return <WebbLoaderSmall/>


  return (
  <>

    <span className="m-0 cursor rounded-xx p-2 px-4 btn btn-danger text-small"
      onClick={() => navigate('/auth/x')}
    >Logout</span>
    

  </>

  )
}