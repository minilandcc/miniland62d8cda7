// user
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { AssetDocumentsListMedia, AssetDocumentsListDocs } from "../../services/srvc-documents-assets-realm";


const listFormats = [
  {name: 'Media', code: 'image', actv: true, item: '25782623593d44e4bff02487f03befe57'},
  {name: 'Video', code: 'video', actv: true, item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: 'Documents', code: 'docs', actv: true, item: '6661bb7e4c604488bb5d9442ff39ad939'}
]


export default function AssetDocumentsListModule () {

  const asset = GetLocalUser()
  const team = GetLocalBusiness()

  const navigate = useNavigate();
  const {id} = useParams()

  const [loading, setLoading] = useState(true);
  
  const [format, setFormat] = useState('image')
  const [media, setMedia] = useState()
  const [video, setVideo] = useState()
  const [docs, setDocs] = useState()
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);

        var result
        if (format == 'image') result = await AssetDocumentsListMedia({data: {asset: id, format: format}})
        if (format == 'video') result = await AssetDocumentsListMedia({data: {asset: id, format: format}})
        if (format == 'docs') result = await AssetDocumentsListDocs({data: {asset: id, format: format}})

        console.log (result)

        if (result.stat) {

          setData(result.data.list)

          if (format == 'image') setMedia(result.data.list)
          if (format == 'video') setVideo(result.data.list)
          if (format == 'docs') setDocs(result.data.list)

        }

        setLoading(false);
      }
      fetchData()
    } else {}
  },[format]);

  const handleMedia = () => {

  }

  // if (loading) return <><div className="mx-3 text-color-tone">Please Wait...</div></>
  // if (!loading && data && data.length === 0) return <>
  //   <div className="mx-3 text-color-tone">No Content</div>
  // </>

  return (
  <>
    {/* format */}
    <div className="ms-3">
      {listFormats && listFormats.map((item, i) => (
        <span className={item.actv? '': 'd-none'} key={i} onClick={() => setFormat(item.code)}>
          <span className={`p-2 px-3 rounded-xx text-small ${format == item.code ? 'back-color-next text-color-wite': 'back-color-wite cursor'}`}>{item.name}</span>
          <span className="me-2"></span>
        </span>
          
      ))}
    </div>
    <WebbDividerMedium />

    {/* loader */}
    <div className={loading ? 'ms-3': 'd-none'}>
      <p className="text-color-tone">Please Wait...</p>
    </div>

    {/* no data */}
    <div className={!loading && data.length == 0 ? 'ms-3': 'd-none'}>
      <p className="text-color-tone">Content Coming Soon...</p>
    </div>

    {/* data */}
    <div className={!loading && data.length > 0 && format == 'image' ? '': 'd-none'}>

      <div className="row row-cols-1 row-cols-md-2 g-2">
        {media && media.map((item, i) => (
          <div className="col" key={i}>
          <div className={`back-color-wite rounded-xd border mb-2`} >
            <div className="ratio ratio-16x9">
              <img src={item.link} className="rounded-xd" 
                onClick={() => handleMedia()}
              ></img>
            </div>
            <p className="m-3 d-none">{item.name || '******'}</p>
          </div>
          <div className={i < media.length-1 ? 'border-bottom d-none': 'd-none'}></div>
          </div>
        ))}
      </div> 
    </div>

    <div className={!loading && data.length > 0 && format == 'video' ? '': 'd-none'}>

      <div className="row row-cols-1 row-cols-md-2 g-2">
        {video && video.map((item, i) => (
          <div className="col" key={i}>
          <div className={`rounded-xd border mb-2`} style={{backgroundColor:'black'}}>
            
            {/* vimeo */}
            <div style={{padding:'75% 0 0 0', position:'relative'}}>
              <iframe src={item.link} 
                frameborder = "0" 
                allow = {"autoplay; fullscreen; picture-in-picture"} 
                style={{position: 'absolute', top:'0', left: '0', width:'100%', height:'100%'}} 
                title="ananta1">
              </iframe></div>

            {/* youtube */}
            <div class="ratio ratio-16x9 d-none">
              <iframe 
                src={item.link} 
                className="rounded-xd rounded-bottom-none" 
                title={item.name || '******'} allowfullscreen></iframe>
            </div>
            <p className="m-3 d-none">{item.name || '******'}</p>
          </div>
          <div className={i < video.length-1 ? 'border-bottom d-none': 'd-none'}></div>
          </div>
        ))}
      </div> 
    </div>

    <div className={!loading && data.length > 0 && format == 'docs' ? '': 'd-none'}>

      <div className="back-color-wite rounded-xd border">
      {docs && docs.map((item, i) => (
        <div key={i}>
        <div className={`d-flex px-3 mt-3 mb-3`} >
            
          <div className="me-auto">         
            <p className="m-0 text-sm">
              <span className="text-color-next">{item.name}</span>
            </p>
            <p className="text-small m-0 text-sm">
              <span className="">Created: {item.crts ||'******'}</span>
            </p>        
          </div>
      
          <div className="text-end">         
            <a className="p-2 px-3 rounded-xx text-small " href={item.link} target="_blank">View</a>
          </div>

        </div>
        <div className={i < docs.length-1 ? 'border-bottom': ''}></div>
        </div>
      ))}
      </div> 

    </div>

  </>

  )
}