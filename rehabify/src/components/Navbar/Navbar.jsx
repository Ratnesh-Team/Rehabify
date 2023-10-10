import "./Navbar.css"
import logo from "/Rehabify-logo.png";


function Navbar() {
  return (
    <>

      <div className="container1 w-full flex py-5   items-center h-20 ">

          <img
            src={logo}
            alt="Rehabify"
          />
        
          <ul  className="list-none sm:flex hidden justify-end  items-center flex-1">
            <li className="text-orange-600 cursor-pointer font-medium  text-[20px] pr-12 self-center  my-auto">
              Home
            </li>
            <li className="text-blue-900 cursor-pointer font-medium text-[20px] pr-12  self-center  my-auto">
              Database
            </li>
            <li className="text-blue-900  cursor-pointer font-medium text-[20px]  pr-12 self-center  my-auto">
              Treatment Centers
            </li>
            <li className="text-blue-900  cursor-pointer font-medium text-[20px] pr-12  self-center  my-auto">
              Home Remedies
            </li>
            <li className="text-blue-900  cursor-pointer font-medium text-[20px] pr-12  self-center  my-auto">
              Community
            </li>
            <li className="text-blue-900  cursor-pointer font-medium text-[20px] pr-10 self-center  my-auto">
              Sign Up
            </li>


          </ul>

        

      </div>
    </>

  )
}

export default Navbar