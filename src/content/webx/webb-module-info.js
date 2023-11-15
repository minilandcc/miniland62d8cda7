// module

export default function WebbModuleInfo(props) {
 
  const data = props.data;

  return (
  <>
    <p className="text-color-tone">{data.text || ''}</p>
  </>
  )
}