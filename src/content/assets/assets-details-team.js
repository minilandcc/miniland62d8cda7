// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetDetails, AssetUnits } from "../../services/srvc-assets-realm";

export default function AssetsDetailsTeamModule () {


  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState()
  const [units, setUnits] = useState()

  const [stats, setStats] = useState([
    {ticker: 'market cap', number: Math.random()*999999, trend: 1.5},
    {ticker: 'supply (c)', number: Math.random()*999999, trend: 20},
    {ticker: 'supply (t)', number: Math.random()*9999999, trend: 0}
  ])

  const [actions, setActions] = useState([
    {name: "New Unit", icon: "bx bx-grid-alt", link: "units/create", actv: true},
    {name: "Checkout", icon: "bx bx-credit-card", link: "units/checkout", actv: true},
    {name: "Invite", icon: "bx bx-user-circle", link: "invite", actv: true},
    {name: "Docs", icon: "bx bx-file", link: "docs", actv: true},
    {name: "DAO", icon: "bx bx-badge-check", link: "dao", actv: false},
    {name: "Costs", icon: "bx bx-wallet-alt", link: "costs", actv: true},
  ])


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        console.log (id)

        const resDetails = await AssetDetails({data: {item: id}})
        console.log (resDetails)

        const resUnits = await AssetUnits({data: {item: id}})
        console.log (resUnits)

        if (resDetails.data) setData(resDetails.data)
        if (resUnits.data) setUnits(resUnits.data.list)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loading) return <>Please Wait...</>


  return (
  <>
    {/* info */}

    {/* media */}
    <div className="media-standard">
      <img src={data && data.media.link} className="rounded-wd w-100"></img>
      <div className="btn back-color-next text-small">{data && data.meta.form || 'asset'}</div>
    </div>

    {/* data */}
    <WebbDividerSmall />
    <div className="back-color-wite border rounded-wd p-3">
      <h1 className="caption-sm text-color-main">{data && data.meta.name}</h1>
      <p className="text-normal">{data && data.meta.memo}</p>
    </div>

    <WebbDividerSmall/>
    <div className="back-color-wite border rounded-wd p-1">
      <div className="row row-cols-3 row-cols-md-6 g-1">
        {actions && actions.map((item, i) => (
        
        <div className="col text-center" key={i}>

          <Link 
            to={`/${asset.form}/assets/${id}/${item.link}`}       
            style={{pointerEvents:`${ item.actv ? '' : 'none' } `}}
            className={`w-100 h-100 border-none text-center
            text-decoration-none m-0 p-0 ${item.actv ? '' : 'text-color-tone'}`}>

            <div className="p-1 py-2 rounded-none back-color-wite hitone">              
              <i className={`m-0 p-0 ${item.icon}`}  
                style={{fontSize:"2em",}}>
              </i>
              
              <div className="d-none d-md-block">
                <p className={`m-0 p-0 text-dark text-small text-nowrap`}>
                  <small>{item.name}</small>
                </p>
              </div>
              
              <div className="d-md-none">
                <p className={`m-0 p-0 text-dark text-small text-nowrap`}>
                  <small>{item.name}</small>
                </p>
              </div>

            </div>            
          </Link>

        </div>
        ))}

      </div>
    </div>
    

    <WebbDividerMedium />
    <div className="back-color-wite border rounded-wd p-3">
      <div className="row row-cols-3 row-cols-md-3 g-1">
      {stats && stats.map((x, i) => (
        <div className="col text-start" key={i}>
          <div className="">
            <p className="text-small text-color-tone text-bold text-uppercase m-0">{x.ticker}</p>
            <p className="text-lead m-0 text-sm">
              <span>{NumberFormat(x.number.toFixed(0),'ww').split('.')[0]}</span>
              <span className="ms-1 text-small d-none">{x.trend}%</span>
              <span className="text-small d-none">
                <i className={x.trend > 0 ? 'bx bxs-up-arrow-circle text-color-success' : ''}></i>
              </span>
            </p>
          </div>
        </div>
      ))}
      </div>

    </div>


    <WebbDividerMedium/>
    <p className="text-color-tone text-bold text-uppercase mx-3">Units</p>
    <div className="">
        {/* options */}
        <div className="row row-cols-1 row-cols-md-3 g-2">
        {units && units.map((item, i) => (
          <div className="col m-0 mb-3" key={i}>
            {/* <Link to={`/${usxx}/assets/${item.item}`}> */}
            <div className="card h-100 rounded-wd border-none p-0 m-0 back-color-wite p-1">
              <div className="media-cube border rounded-wd">
                <img
                  src={item.media.link} // Route of the image file
                  layout='fill'
                  className="img-fluid w-100 rounded-wd shadow"
                  alt="..."
                />
                <div className='btn back-color-next text-small rounded-wd p-0 p-1 px-3'>
                  <span className="text-bold">{(item.rate[0].amnt/1000000).toFixed(0)}</span>
                  <span className="ms-1">{item.rate[0].tick}</span>
                </div>
              </div>
              
              <div className="card-body m-0 p-3 px-2 text-dark">
                
                <h4 className="text-bold text-normal text-color-next d-none d-md-block">{item.meta.name}</h4>
                <h4 className="text-small ext-color-next d-md-none">{item.meta.name}</h4>
                
                <div className="">
                  <p className="text-small text-md">{item.meta.memo}</p>
                </div>


                <div className="mb-2"></div>
                <div className="d-flex text-dark text-small">
                  <div className="">{`SOLD: ${((item.count.sold/item.count.mint)*100)}%`}</div>
                  <div className="ms-auto text-end">{item.count.sold}</div>  
                </div>
                <div className="">
                  <div className="progress" 
                    role="progressbar" 
                    style={{height: '0.33rem'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated back-color-success" 
                      style={{width:`${parseInt(item.count.sold)/parseInt(item.count.mint)*100}%`, height: '0.33rem'}}></div>
                  </div>
                </div>
                <div className="d-flex text-dark mt-1 text-small">
                  <div className="text-color-tone">{`Units: SQFT`}</div>
                  <div className="ms-auto text-end">{item.count.mint}</div>  
                </div>
                
              </div>
            </div>
            {/* </Link> */}
          </div>
        ))}
        </div>
      </div>

    <div className={units && units.length > 0 ? 'd-none' : 'p-3 back-color-wite text-center rounded-wd border'}>
      No Units...
    </div>


  </>

  )
}