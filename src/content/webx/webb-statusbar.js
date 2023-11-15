//loader
export default function WebbProgressBar(props) {
 
  return (
  <>
    {/* spinner */}
    <div className="">

      <div className="progress" style={{height:".33em"}}>
        <div className="progress-bar bg-success" role="progressbar" 
          style={{width:`${props.stat}%`}} 
          aria-valuenow={props.stat}
          aria-valuemin="0" aria-valuemax="100"></div>
      </div>

    </div>
  </>
  )
}