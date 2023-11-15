// next

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const form = [
  {name:'Personal', form:'user'},
  {name:'Team', form:'team'}
]

export default function NextAccounts(props) {

  // console.log (props)

  const stat = (data) =>{
    
    if (!data.onboard) 
      return {
        text: 'Profile Incomplete', 
        icon: 'bx bxs-exclamation-circle', colr:'danger', 
        actn: true,
        name: 'Update'
      }    
    
    if (data.hold) 
      return {
        text: 'Account In Review', 
        icon:'bx bxs-exclamation-circle', colr:'danger', 
        actn: false,
        name: 'Select'
      }

    if (data.active) 
      return {
        text: 'Active', 
        icon: 'bx bxs-circle', colr:'success',
        actn: true,
        name: 'Select'
      }
    else 
      return {
        text: 'In Review', 
        icon: 'bx bxs-circle', colr:'warning',
        actn: false,
        name: 'Select'
    }
  }

  return (
  <>
    <div className={ props.data.length !== 0 ? 'mx-3': 'd-none'}>
      <p className="text-small">{props.form} Account(s)</p>
        
      {props.data && props.data.length > 0 && props.data.map((item, i) => ( 
        item.form === form.find(item=>item.name===props.form).form ?

      <div className="" 
        style={{cursor:'pointer'}}
        onClick={async () => { props.user(item) }}
        disabled={!stat(item).actn}
        key={i}
      >

        <div className={`p-3 back-color-wite rounded-wd hitone cursor mb-2`} style={{height:'4.5rem'}}>

          <div className="d-flex">

            <div className="">
              <Jazzicon diameter={37} seed={jsNumberForAddress(item.item || Date.now())} /> 
            </div>

            <div className="ms-2">
              <p className='p-0 m-0 text-bold text-sm'>{ item.name || 'User Name'}</p>
              <p className="p-0 m-0">
                <span className={`text-color-${stat(item).colr}`}>
                  <i className={`${stat(item).icon} text-small`}></i>
                </span>
                <span className='text-bold text-small text-color-tone text-uppercase'>{' '}{stat(item).text}</span>
              </p>
            </div>

            <div className="ms-auto py-1">
              <i className="bx bx-chevron-right text-color-tint m-0 p-0 text-icon-sm" ></i>
            </div>

          </div>

        </div>


      </div>
      
      : ''))}

    </div>
  </>
  )
}