// site logo

export default function WebbIconUser(props) {

  const data = props.data

  return (
  <>
    <div className="" >
      <i className={`bx bx-user-circle ${data.color} ${data.size}`}></i>    
    </div>

  </>
  )
}