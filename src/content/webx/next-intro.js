// next intro

import WebbDividerSmall from "./webb-divider-sm";

const stat =[
  {
    stat:'new', 
    name:'Welcome Onboard', memo:'Please Create Your New Account', 
    desc:'Please use the Create Account Link below to setup your account.', 
    icon:'bx bx-user-circle', colr:'text-success',
    avtr:'https://img.freepik.com/free-vector/gradient-virtual-metaverse-illustration_23-2149237426.jpg?w=600'
  },
  {
    stat:'incomplete', 
    name:'Profile Incomplete', memo:'Incomplete Account Information', 
    desc:'Please use the Update Account Information Link below to complete your account setup.', 
    icon:'bi-exclamation-circle', colr:'text-danger',
    avtr:'https://img.freepik.com/premium-vector/blue-bitcoin-wallet-with-coins-cash-isolated-pink-background-online-shop-finance-banks-moneysaving-cashless-society-concept-3d-vector-illustration_145666-1632.jpg?w=600'
  },
  {
    stat:'review', 
    name:'Account In Review', memo:'We are reviewing your account information', 
    desc:'Once your account review is completed, we will notify you of the same.', 
    icon:'bi-shield-fill-check', colr:'text-color-main',
    avtr:'https://img.freepik.com/premium-vector/people-seamless-illustration_28923-145.jpg?w=960'
  },
  {
    stat:'hold', 
    name:'Account On Hold', memo:'We are reviewing your account information', 
    desc:'Once your account review is completed, we will notify you of the same.', 
    icon:'bi-shield-fill-exclamation', colr:'text-warning',
    avtr:'https://img.freepik.com/free-vector/colorful-pattern-young-people_23-2148218147.jpg?w=960'
  },  
]


export default function NextIntro(props) {
 
  const next = stat.find (item=> item.stat === props.stat)

  return (
  <>
    <div className="">

      <h1 className='text-lead'>{next.name}</h1>
      <p>{next.memo}</p>

      <div className='media-cube rounded-wd'>
        <img src={next.avtr} alt="user" className=''  />
      </div>

    </div>

  </>
  )
}