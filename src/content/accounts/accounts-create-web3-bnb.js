// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from 'ethers';

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";

import { AccountsCreate } from "../../services/srvc-accounts-realm";


export default function AccountsCreateWeb3BinanceModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(true);
  const [memo, setMemo] = useState('');

  const [metamask, setMetamask] = useState(false);
  const [chain, setChain] = useState()
  const [account, setAccount] = useState()

  const [data, setData] = useState({
    name: 'Route Binance Account',
    number: '',
    branch:'97',
    ticker: 'bnb',
    mode: 'sandbox',
    default: false,
    active: true
  })

  useEffect( () => {

    const fetchData = async() => {
    
      if (window.ethereum.isMetaMask) {
        console.log ('metamask wins')
        setMetamask(true)
        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

      } else {
        console.log ('metamask needed')
      }
    }
    fetchData()
  },[]);


  useEffect( () => {

    const fetchData = async() => {
      setForm(false)

      if (chain && chain == 97 && account && account.length == 42 )
      setForm(true)
    }
    fetchData()
  },[account, chain]);

  const handleChainChanged = async() => {
    // We recommend reloading the page, unless you must do otherwise.
    console.log('chain reset')
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (parseInt(chainId) == data.branch) {      
      setChain(parseInt(chainId))
      setMemo('');
    } else {
      setChain('******')
      setAccount('******')
      setMemo('Please switch to Binance Testnet in Metamask');
    }
    
    window.location.reload();
  }

  const handleAccountsChanged = async () => {
    console.log('account reset')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts.
      setMemo('Please connect to MetaMask.');
    } else if (accounts[0] !== account) {
      setAccount((chain == data.branch) ? accounts[0] : '******');
      setMemo((chain == data.branch) ? 'New Account Selected' : 'Please switch to Binance Testnet in Metamask')
    }
    console.log(accounts[0])
  }

  const handleConnect = async() => {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    console.log(parseInt(chainId));  
    console.log(accounts[0]);  

    if (parseInt(chainId) == data.branch) {
      setMemo('')
      setAccount(accounts[0]);
      setChain(parseInt(chainId))
    } else {
      setMemo('Please switch to Binance Testnet in Metamask')
      setAccount('******');
      setChain('******')
    }
  
  }

  const handleAuthorize = async() => {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    console.log(parseInt(chainId));  
    console.log(accounts[0]);  

    if (parseInt(chainId) == data.branch) {
      setAccount(accounts[0]);
      setChain(parseInt(chainId))
      setMemo('')

    } else {
      setAccount('******');
      setChain('******');
      setMemo('Please switch to Binance Testnet in Metamask')
    }
  
  }


  const handleSubmit = async () => {

    setLoading(true);
    setSubmit(true);
    setMemo('Please Wait...')

    const datx = {
      name: data.name,
      account:{ number: account, ticker: data.ticker },
      branch: {name: 'binance', code: chain}, form: 'web3',
      user: asset.item, mode: 'user'
    }
    console.log(datx)

    const result = await AccountsCreate({data: datx})
    console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Account Linked.')
    }
    else {
      setDone(false)
      setMemo('Failed.')
    }

    setLoading(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loading) return <></>


  return (
  <>

    <div className="">

      <div className="mb-3">  
        <label className="form-label small">Account Name / Nickname <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={true}
          placeholder="account name">
        </input>
      </div>    

      <div className="mb-3">  
        <label className="form-label small">Account / Wallet <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={account}
          onChange={({ target }) => {setAccount(target.value); }}
          disabled={loading || submit}
          placeholder="0x">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">Chain / Network <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={chain}
          onChange={({ target }) => {setChain(target.value); }}
          disabled={true}
          placeholder="0x">
        </input>
      </div>

    </div>




    
    <div className={!loading ? '' : 'd-none'}>
      <WebbDividerSmall />
      <p>{memo}</p>
      <WebbDividerSmall />
    </div>

    
    <div className={loading && submit || done ? 'd-none' : ''}>
      <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-wd button text-small`}
          type="button"
          disabled={loading || submit}
          onClick={()=> { navigate(`/${asset.form}/home`)}}
        >{loading ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small ${!form ? '' : 'd-none'}`}
          disabled={''}
          type="button"
          onClick={()=> { handleAuthorize()}}
        >{loading ? 'Please Wait...' : 'Authorize'}</button>

        <button className={`btn btn-info border-none back-color-main text-color-wite rounded-wd text-small ${!form ? 'd-none' : ''}`}
          type="button"
          disabled={loading || submit}
          onClick={()=> { handleSubmit()}}
        >{loading ? 'Please Wait...' : 'Submit'}</button>

      </div>
    </div>
    

    <div className={loading && submit ? '' : 'd-none'}>
      Please Wait...
    </div>


  </>

  )
}