import "./Footer.css"


function Footer() {
  return (
    <>

      <div className=" footer  py-4 w-full ">
        <div className="flex  justify-between items-center flex-nowrap pt-3 px-7  ">
          <div className="w-1/2  pl-6 mb-2">
            <div className="w-80 ">
              <h1 className=" text-orange-600 pb-1 mb-2 text-start font-bold text-[24px]	">ABOUT US</h1>
              <p className="text-blue-900 font-normal text-lg leading-7">Rehabify is your partner in addiction recovery. With a dedicated team and evidence-based programs, we're here to help you on your journey to a healthier, addiction-free life. </p>
            </div>
          </div>
          <div className="w-72 mb-5">
            <h1 className=" text-orange-600 pb-2  text-start font-bold text-[24px]"	 >Quick Links</h1>
            <ul className="w-50">
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Home</a></li>
              <li className="text-blue-900 font-normal text-lg pb-1.5 "><a href="#">Blog</a></li>
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Home Remedies</a></li>
              <li className="text-blue-900 font-normal text-lg "><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="w-1/3">
            <ul className="w-50 pt-7" >
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Graphs</a></li>
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Nearest Nasha Mukti Kendra</a></li>
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Donate</a></li>
              <li className="text-blue-900 font-normal text-lg  pb-1.5"><a href="#">Your Story</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center flex-nowrap pt-2 px-7  ">
          <div className=" w-1/2 flex justify-start pl-10">
            <h1 className=" text-orange-600 mr-3  text-start font-bold text-[24px]">Contact us </h1>
            <div className="pl-2">
              <p className="text-blue-900 text-[18px] "><span className="text-2xl leading-7 mr-2 "><i class='bx bxs-phone-call'></i></span>+91 25552 22552</p>
              <p className="text-blue-900 text-[18px] " ><span className="text-2xl leading-7 mr-2 "><i class='bx bxs-envelope'></i></span>rehabify@gmail.com</p>
            </div>

          </div>

          <div className="w-1/4">
            <h1 className=" text-orange-600 mr-3  text-start font-bold text-[24px]">Follow Us On</h1>
            <div className="w-60">
              <a href="#" className="text-[30px] pl-4 	"><i class='bx bxl-instagram'></i></a>
              <a href="#" className="text-[30px] px-3"><i class='bx bxl-linkedin' ></i></a>
              <a href="#" className="text-[30px]"><i class='bx bxl-youtube' ></i></a>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Footer