// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import WebbDividerMedium from "../../content/webx/webb-divider-md";

export default function AssetDetailsMainModule (props) {

  const asset = {}
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoading(true);
        // console.log (id)

        // const result = await AssetDetails({data: {item: id}})
        // console.log (result)

        // if (result.data) setData(result.data)
        setData(props.data)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loading) return <></>


  return (
  <>

    {/* info */}
    <div className="">
    </div>

    {/* media */}
    <div className="">
      <div className="media-banner d-none d-md-block">
        <img src={data && data.media.link} className="w-100"></img>
        {/* <div className="btn back-color-next text-small">{data && data.meta.form || 'asset'}</div> */}
      </div>
      <div className="media-standard d-block d-md-none">
        <img src={data && data.media.link} className="w-100"></img>
        {/* <div className="btn back-color-next text-small">{data && data.meta.form || 'asset'}</div> */}
      </div>
    </div>

    <WebbDividerMedium />
    <div className="container">
      <div className="">
        <h1 className="caption-sm text-color-main">{data && data.meta.name}</h1>
        <p className="text-normal">{data && data.meta.memo}</p>
      </div>

      <div className="">
        <p className="text-normal text-bold m-0">Project By: {data && data.owner.name}</p>
        <p className="text-normal m-0">Location: </p>
        <p className="m-0 d-none">Last Modified: {(new Date(data && data.modified)).toLocaleDateString()}</p>
      </div>

    </div>

  </>

  )
}