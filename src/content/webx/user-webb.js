// user avatar
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

export default function UserWebb(props) {
  
  return (
    <>
      <div className="" >
        <Jazzicon diameter={27} seed={jsNumberForAddress(Date.now().toString())} />    
      </div>
  
    </>
    )
  }