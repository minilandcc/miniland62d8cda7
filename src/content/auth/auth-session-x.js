// auth - session x
import { useNavigate } from "react-router-dom";
//import { auth } from '../../services/firebase'
import { getAuth, signOut } from "firebase/auth";

import WebbLoaderMedium from "../webx/webb-loader-md";

import { AuthClearStore } from "../../services/srvc-auth-user";

const auth = getAuth();

export default function AuthSessionXModule () {

  const navigate = useNavigate();

  AuthClearStore();
  setTimeout(() => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log ('signout: ', 'success')
      navigate('/')
      //window.location.href='/';
    }).catch((error) => {
      // An error happened.
      console.log ('signout: ', error.code)
      navigate('/')
    });
  }, 2000);


  return (
  <>
    <WebbLoaderMedium />

  </>

  )
}