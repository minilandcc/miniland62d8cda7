// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";
import { AccountsList } from "../../services/srvc-accounts-realm";

const media = {link: 'https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150491609.jpg'}

export default function AccountsTransitBalanceModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({balance: {number: 0}})

  const [balance, setBalance] = useState({number: 0, ticker: '******'})
  const [accounts, setAccounts] = useState([])

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        const result = await AccountsList({data: {user: asset.item}})
        var ac = result.data.list.find(x => x.feat.sort === 'transit' ) 
        // console.log(ac)
        if(ac== undefined) setAccounts([])
        else setAccounts(ac)

        if (result.data) 
        setBalance(result.data.list.find(x => x.feat.sort === 'transit').balance)
        
        setLoading(false);

      }
      fetchData()
    } else {}
  },[]);



  // if (loading) return <WebbLoaderSmall/>


  return (
  <>

    <div className="back-color-wite rounded-xd border">
      
      <div className="rounded-xd"
        style={{
          backgroundImage:`url(${media.link})`, 
          backgroundRepeat:'no-repeat', 
          backgroundSize:'cover',
          backgroundPosition: 'center center',
          width:'100%', height: 'auto'
        }}
      >
        <WebbDividerSmall />
        <div className="p-3 px-4 text-color-wite">

          <i className="bx bx-credit-card text-icon-md text-color-wite"></i>

          <WebbDividerMedium />
          <p className="text-small text-uppercase m-0">
            <span>Credit</span>
          </p>
          <p className="text-lead m-0">
            <span className="text-bold">{(parseFloat(balance?.number || '0')/1000000000).toFixed(3)}</span>
            <span>{' '}</span>
            <span className="text-small d-none">{' x000'}</span>
          </p>
          <p className="text-small m-0">
            <span className="text-small">{'x000'}</span>
            <span className="text-small text-uppercase ms-1">{balance?.ticker || '***'}</span>
          </p>
        </div>
        <WebbDividerSmall />
      </div>

    </div>

  </>

  )
}