// content

export default function ContentHeader (props) {

  const data = props.data;

  return (
  <>
    <div className="">
      <h1 className="text-color-main">{data.name}</h1>
      <p className="text-lead">{data.memo}</p>
      <p className="text-color-tone m-0">{'Updated: '}{data.date.substring(0,10)}</p>
    </div>

  </>
  );
}