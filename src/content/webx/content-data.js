// content
import WebbDividerMedium from "./webb-divider-md";

export default function ContentData (props) {

  const data = props.data;

  return (
  <>

    <div className="">
      <div dangerouslySetInnerHTML={{__html: (data.content)}} />
      
      <WebbDividerMedium />
      <WebbDividerMedium />
      <WebbDividerMedium />
    </div>

  </>
  );
}