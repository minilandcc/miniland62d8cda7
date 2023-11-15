// web footer
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

export default function WebbFooterBase(props) {

  const data = props.data;

  return (
    <>
    {/* footer */}
  
    {/* <div className="border-bottom"></div> */}
    <div className="">
      <WebbDividerSmall />
      <div className=" text-color-tone">
          <div className="row">
            
            <div className="col small" >
              <p className="small fw-bold m-0">
                Ⓒ TOKENIZE {2022} <span className="mx-1">-</span>
                {(new Date()).toISOString().substring(0,4)}
              </p>
              <p className="small m-0"> <small>
                NIMBL SOLUTION PTE. LTD. -  
                160 ROBINSON ROAD,
                #14-04 SINGAPORE BUSINESS FEDERATION CENTER,
                SINGAPORE (068914)
              </small>

              </p>
            </div>

            
          </div>    

      </div>

      <WebbDividerSmall />
    </div>

    </>
    )
}