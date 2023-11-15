// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";

import { AccountsMinterStatus, AccountsMinterCreate } from "../../services/srvc-accounts-minter-realm";

import { CreateRandWallet } from "../../services/srvc-wallet-rand";
import { TextSecure, TextReverse } from '../../services/srvc-encr-node'

import randicon from '../../data.media/rand.icon.png'

export default function AccountsMinterCreateModule () {

  const navigate = useNavigate();
  const asset = GetLocalUser()
  console.log(asset)

  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [data, setData] = useState()

  const [accountstatus, setAccountStatus] = useState(false)
  const [account, setAccount] = useState({
    address: '******',
    mnemonic: '******',
  })

  const [minter, setMinter] = useState(false);
  const [secret1, setSecret1] = useState()
  const [secret2, setSecret2] = useState()
  const [secretStatus, setSecretStatus] = useState('')

  useEffect( () => {
    const fetchData = async() => {
      setLoading(true)

      const result = await AccountsMinterStatus({data: {user: asset.item}, srvc: '******'})
      console.log (result)
      if (result.stat) setMinter(result?.data?.account || false)
      
      setLoading(false)
    }
    fetchData()
  },[]);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {

        account.address !== '******' ? setAccountStatus(true) : setAccountStatus (false)
        account.mnemonic !== '******' ? setAccountStatus(true) : setAccountStatus (false)
      
      }
      fetchData()
    }
  }, [account])

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {

        secret1 == secret2 ? setSecretStatus(true) : setSecretStatus(false)
      
      }
      fetchData()
    }
  }, [secret1, secret2])


  const handleAccount = async () => {
    
    const accountx = await CreateRandWallet()
    console.log(accountx)

    setAccount({...account, address: accountx.data.address, mnemonic: accountx.data.mnemonic})

  }


  const handleSubmit = async() => {
    
    setLoading(true)
    setSubmit(true)
    handleSave()
    const mnemonix = await TextSecure( {text: account.mnemonic, secret: secret1})
    console.log(mnemonix)

    const datx = {
      account: {
        number: account.address,
        secret: mnemonix.data
      },
      auth: secret1, // we can hash secret before saving
      bank: { name: 'Algorand', code: '416001' },
      user: { name: asset.name, mail: asset.mail, mobile: asset.mobile, item: asset.item },
      item: '***'
    }

    // setAccount({...account, mnemonic: '******'})

    console.log(datx)

    const result = await AccountsMinterCreate({data: datx, srvc: '******'})
    console.log(result)

    if (result.stat) {
      setDone(true)
    } else {
      setSubmit(false)
      setDone(false)
    }

    setLoading(false)

  }


  function handleSave() {

    const content = '' + 
      '\n--------------------------------------------------\n' +
      '\nBRX * Real Estate Asset Tokenization & Exchange' + 
      '\nvisit: https://brx.mx' + 
      '\n\n--------------------------------------------------\n' +
      '\n\nDigital Asset Account Number\n> ' + account.address + 
      // '\n\nView Account on Mainnet\n> ' + `https://algoexplorer.io/address/${data.address}` +
      // '\n\nView Account on Testnet\n> ' + `https://testnet.algoexplorer.io/address/${data.address}` +
      '\n\n--------------------------------------------------\n' +
      '\n\nRecovery Phrase (Mnemonic/Secret)\n' + '*** DO NOT SHARE THIS WITH ANYONE ***\n> ' + account.mnemonic +
      '\n\n--------------------------------------------------\n' +
      '\nIf you lose your recovery phrase or private key, you will not be able to access your wallet or its funds. It is always a good idea to back it up either by writing down in private diary or printing it out.' + 
      '\n\n--------------------------------------------------\n'

    const blob = new Blob([content], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, `brx-account-${Date.now().toString()}`);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = `brx-account-${Date.now().toString()}`;
        document.body.appendChild(elem);
        elem.click();  
        document.body.removeChild(elem);
    }
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  if (loading) return <></>
  if (!loading && minter) return <>
    <div className="p-3 back-color-wite rounded-xd">
      <span className={`align-middle`} style={{fontSize:'1.15rem', lineHeight: '1.15rem'}}>
          <i className={`bx bxs-check-circle text-color-success`}></i>
        </span>
        <span className={`ms-1 text-`}>{'Account Linked'}</span>
    </div>
  
  </>



  return (
  <>
    
    {/* info */}
    <div className="mx-3">
      <p className="m-0 text-bold">Create Digital Assets Account</p>
      <p className="">
        You need a blockchain account to own and manage your digital assets. 
        Please create your digital assets account below.
      </p>
    </div>

    {/* data */}
    <div className="p-3 back-color-wite rounded-xd">
      <p className="m-0 text-bold">User: {asset?.name || '***'}</p>
      <p className="m-0">Mail: {asset?.mail || '***'}</p>
    </div>
    
    <WebbDividerSmall />
    <div className="">
      
      <div className={`p-3 back-color-wite rounded-xd ${done ? '': ''}`}>
        
        <p className="m-0 mb-1 text-small text-uppercase text-bold text-color-tone">Powered by Algorand</p>
        <div className=''>
        
          <p className='text-bold m-0'>Account Number</p>
          <p className='text-normal text-color-next m-0  text-break'>{account.address}</p>

          <WebbDividerSmall/>
          <p className='text-bold m-0'>Mnemonic/Secret</p>   
          <p className='text-normal text-color-next m-0 text-break'>{account.mnemonic}</p>

          <div className={accountstatus || submit ? 'd-none' : ''}>
            <WebbDividerMedium />
            <WebbDividerMedium />
            <button 
              className='btn btn-sm btn-primary rounded-xx text-small px-4' 
              style={{width:'auto'}}
              onClick={() => handleAccount()}
            >
              Create Account
            </button>
            
          </div>
          <div className="mb-1"></div>
        </div>
        
        {/* download */}
        <WebbDividerSmall />
        <div className={account.address === '******' ? 'd-none' : ''}>
          <span className={`btn btn-light rounded-xx p-2 px-3 border`} onClick={() => handleSave()}>
            <span className={`align-middle`} style={{fontSize:'1.25rem', lineHeight: '1.25rem'}}>
              <i className={`bx bx-down-arrow-circle`}></i>
            </span>
            <span className={`ms-1 text-small`}>{'Download Account Details'}</span>
          </span>

          <WebbDividerSmall />
          <p className='text-small text-color-error m-0 mb-2'>
            Download Account Details and save it safely.
            Do not share account details and secret with anyone. 
          </p>

        </div>

      </div>
    </div>

    <div className={accountstatus && !submit ? 'mb-3' : ''}></div>
    <div className={accountstatus && !submit ? 'p-3 back-color-wite rounded-xd' : 'd-none'}>
      
      <p className='text-bold m-0'>Secure Account</p>
      <p className='text-small text-color-tone m-0 mb-2'>
        Create a 6 Digit Passcode to secure your account credentials.
        Please remember the Passcode, as it cannot be retrieved later.
      </p>

      <p className='m-0 mb-2 text-small'>Enter Passcode (6 digit) <FormNeeded /></p>
      <div className="mb-3">  
        <input type="password" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={secret1}
          onChange={({ target }) => {setSecret1(target.value); }}
          disabled={loading || submit}
          placeholder="• • • • • •">
        </input>
      </div>

      <p className='m-0 mb-2 text-small'>Re-Enter Passcode (6 digit) <FormNeeded /></p>
      <div className="mb-1">  
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={secret2}
          onChange={({ target }) => {setSecret2(target.value); }}
          disabled={loading || submit}
          placeholder="123abc">
        </input>
      </div>
      <div className={secret1 && secret2 ? '' : 'd-none'}>
        <p className={`text-small m-0 ${secretStatus ? 'text-color-success': 'text-color-error'}`}>
          {secretStatus ? 'Passcode OK' : 'Passcode Mismatch, Please check'}
        </p>
      </div>

      <WebbDividerSmall />
      <div className={!loading && submit ? 'd-none' : ''}>
        <button 
          className='btn btn-sm btn-primary rounded-xx text-small px-4' 
          disabled={loading || submit || !secretStatus || !secret1 || !secret2}
          style={{width:'auto'}}
          onClick={() => handleSubmit()}
        >
          Continue
        </button>
      </div>

    </div>

    {/* status */}
    <div className={submit ? 'mb-3' : ''}></div>
    <div className={submit ? 'p-3 back-color-wite rounded-xd' : 'd-none'}>
      <div className={loading ? '' : 'd-none'}>
        <span className={`align-middle`} style={{fontSize:'1.15rem', lineHeight: '1.15rem'}}>
          <i className={`bx bxs-error-circle text-color-wait`}></i>
        </span>
        <span className={`ms-1 text-`}>{'Please Wait...'}</span>
      </div>
      <div  className={!loading && done ? 'text-bold' : 'd-none'}>
        <span className={`align-middle`} style={{fontSize:'1.15rem', lineHeight: '1.15rem'}}>
          <i className={`bx bxs-check-circle text-color-success`}></i>
        </span>
        <span className={`ms-1 text-`}>{'Account Linking Success'}</span>
      </div>
      <div  className={!loading && done ? 'd-none' : ''}>
        <span className={`align-middle`} style={{fontSize:'1.15rem', lineHeight: '1.15rem'}}>
          <i className={`bx bxs-error-circle text-color-error`}></i>
        </span>
        <span className={`ms-1 text-`}>{'Account Linking Failed'}</span>
      </div>
    </div>

  </>

  )
}