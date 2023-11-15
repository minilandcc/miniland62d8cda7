// site icon

const listColor = [
  {theme: 'dark', color: 'text-color-wite'},
  {theme: 'lite', color: 'text-color-2023'},
]

export default function WebbIcon(props) {

  const data = props.data

  return (
  <>  
    {/* <div className="back-color-lite text-center rounded" style={{lineHeight:'0rem', width:'1.9rem', height:'1.9rem'}}> */}
    <div className="">
      <i className={`bx bxs-crown ${data.color} ${data.size}`}></i>    
    </div>

  </>
  )
}

