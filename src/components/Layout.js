const Layout = ({ children })=>{
    return(
        <div className="w-full h-screen text-black grid grid-cols-1 lg:grid-cols-3">
            <div className="w-full h-screen lg:col-start-1 lg:col-end-3 flex justify-center items-center from-cyan-600" id="layout1">
                <div className="text-center md:text-left">
                  <h1 className="font-black text-4xl mb-3.5">Generate NFTs</h1>
                  <p className=" max-w-sm text-lg leading-5" >Upload different variations of parts of image and generate bulk images</p>
                  <button type="button" className=" mt-3.5 w-40 h-11 font-medium text-lg leading-5 text-white" style={{'backgroundColor':'#0575E6','borderRadius':'73px'}}>Read More</button>
                </div>
            </div>
            <div className="w-full h-screen bg-white flex justify-center items-center lg:col-start-3 lg:col-end-4">
                {children}
            </div>
        </div>
    )
}

export default Layout;