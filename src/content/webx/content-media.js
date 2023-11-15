// content
import Image from 'next/image';

export default function ContentMedia (props) {

  const data = props.data;

  return (
  <>

    <div className="media-wide-md d-none d-md-block">
      <Image src={data.media} alt={data.memo} layout="fill"></Image>
    </div>

    <div className="media-wide-sm d-md-none">
      <Image  src={data.media} alt={data.memo} layout="fill"></Image>
    </div>


  </>
  );
}