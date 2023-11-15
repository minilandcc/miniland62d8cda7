//format
const wide = {
  xtra: ["", ""],
  fluid: ["", ""],
  wide: ["", ""],
  medium: ["col-2 d-none d-md-block", "col"],
  small: ["col-3 d-none d-md-block", "col"],
  mini: ["col-4 d-none d-md-block", "col"],
}


export default function ContentFormat ({header, media, content, footer, name}) {

  // console.log (header, content, footer, name)

  return (
    <>
      {/* header */}
      <div className="back-color-lite sticky-top">
        
        <div className="border-bottom py-1" style={{ height:'3.3rem' }}>
          
          <div className={header.size === "xtra" ? '': header.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={header.size === "xtra" ? '' : "row"}>
              <div className={header.size === "xtra" ? '' : wide[header.size][0]}></div>
              <div className={header.size === "xtra" ? '' : wide[header.size][1]}>{header.data}</div>
              <div className={header.size === "xtra" ? '' : wide[header.size][0]}></div>
            </div>
          </div>

        </div>

      </div>


      {/* media */}
      <div className="">
      </div>


      {/* content */}
      <main>
        <div className="back-color-lite" style={{ minHeight:'100vh' }}>
          
        <div className={content.size === "xtra" ? '': content.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={content.size === "xtra" ? '' : "row"}>
              <div className={content.size === "xtra" ? '' : wide[content.size][0]}></div>
              <div className={content.size === "xtra" ? '' : wide[content.size][1]}>{content.data}</div>
              <div className={content.size === "xtra" ? '' : wide[content.size][0]}></div>
            </div>
          </div>

        </div>
      </main>

      {/* footer */}
      <footer className=''>
        <div className="" style={{  }}></div>
      </footer>      

    </>
    )
  }