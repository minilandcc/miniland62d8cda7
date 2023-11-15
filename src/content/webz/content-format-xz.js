//format
const wide = {
  xtra: ["", ""],
  fluid: ["", ""],
  wide: ["col-1 d-none d-md-block", "col"],
  medium: ["col-2 d-none d-md-block", "col"],
  small: ["col-3 d-none d-md-block", "col"],
  mini: ["col-4 d-none d-md-block", "col"],
}


export default function ContentFormat ({header, media, content, footer, name}) {

  // console.log (header, content, footer, name)

  return (
    <>
      {/* header */}
      <div className={`sticky-top back-color-wite ${header.visible ? '' : 'd-none'}`}>
        
        <div className="py-1" style={{ height:'3.3rem' }}>
          
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
      <div className={`${media.visible ? '' : 'd-none'}`}>
        <div className="" style={{
          backgroundImage : `url('${media.link}')`,
          backgroundSize:'cover', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center center'
          }}>
          
          <div className={media.size === "xtra" ? '': media.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={media.size === "xtra" ? '' : "row"}>
              <div className={media.size === "xtra" ? '' : wide[media.size][0]}></div>
              <div className={media.size === "xtra" ? '' : wide[media.size][1]}>{media.data}</div>
              <div className={media.size === "xtra" ? '' : wide[media.size][0]}></div>
            </div>
          </div>

        </div>

      </div>


      {/* content */}
      <main>
        <div className="" style={{ minHeight:'100vh' }}>
          
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
        <div className="" style={{  }}>
          
          <div className={footer.size === "xtra" ? '': footer.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={footer.size === "xtra" ? '' : "row"}>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][0]}></div>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][1]}>{footer.data}</div>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][0]}></div>
            </div>
          </div>

        </div>

        <div className="fixed-bottom d-none">
          <div className="back-color-main text-color-wite text-small py-1 text-center">
            
          </div>
        </div>

      </footer>      

    </>
    )
  }