import eclips_right from "/Eclips_22.svg";
import user_img from "/User_image.png";
import nashamukti_img from "/Nashamukti_image.png";
import ngo_img from "/Ngo_image.png";


function SignUp_page() {
    return (
        <>

            <div className="pt-10 pb-24 px-2 -mt-1 bg-cyan-50">
                {/* vector Image */}
                <img src={eclips_right} className=" w-60 h-60 absolute -ml-24 left-0 top-20 mt-4 " alt="eclips_right" />
                <img src={eclips_right} className="w-32 h-32  absolute right-4 top-28	" alt="eclips_right" />

                {/* First Section */}
                <div className="flex justify-start items-center my-5 pl-20 relative">
                    <div className="mt-2  ">
                        <h2 className="text-blue-900 text-4xl font-normal mb-1 ">Rehabify: The Path to a Brighter Tomorrow</h2>
                        <p className="text-orange-600 text-xl ">Select for whom you have to create account for</p>
                    </div>
                    {/* <div className="right-0 ">
                    <img src={eclips_right} className="w-32 h-32 text-left" alt="eclips_right" />
                    </div> */}
                </div>

                {/* Card Section */}
                <div className="flex justify-around  md:flex-row flex-col items-center  pt-7 ">
                    {/* First-card */}
                    <div className="flex w-64 px-2 pt-4">
                        <div className="flex flex-col items-center justify-center bg-amber-200 rounded-xl  shadow">
                            <img src={user_img} className="w-28 h-28 rounded-[500px] m-auto mt-7" alt="user_img" />
                            <h2 className="text-center font-semibold text-black text-[32px]">For User</h2>
                            <p className="text-center mb-3 px-4  text-black text-base font-normal font-['Inter'] leading-[17.68px]">Explore, learn and apply for opportunities by just one-click.</p>
                            <div className=" flex justify-center items-center bg-white mb-4 h-16 rounded-[38.43px] border border-yellow-500 ">
                                <button className=" text-sky-950 text-[23.06px] font-semibold tracking-normal px-6 leading-[17.68px]">Create Account</button>
                            </div>
                        </div>
                    </div>
                    {/* Second-card */}
                    <div className="w-64 px-2 pt-4">
                        <div className="flex flex-col items-center justify-start bg-lime-300 rounded-xl shadow ">
                            <img src={nashamukti_img} className="w-28 h-28  m-auto mt-7 rounded-[500px]" alt="user_img" />
                            <h2 className="text-center font-semibold text-black text-[32px]">For Centers</h2>
                            <p className="text-center mb-3 px-4  text-black text-base font-normal font-['Inter'] leading-[17.68px]">Explore, learn and apply for opportunities by just one-click.</p>
                            <div className=" flex justify-center items-center bg-zinc-100 mb-4 h-16 rounded-[38.43px] border border-lime-600">
                                <button className=" text-sky-950  text-[23.06px] font-semibold tracking-normal px-6 leading-[17.68px] ">Create Account</button>
                            </div>
                        </div>
                    </div>
                    {/* Third-card */}
                    <div className="w-64 px-2 pt-4">
                        <div className="flex flex-col items-center  justify-start bg-blue-300  rounded-xl shadow">
                            <img src={ngo_img} className="w-28 h-28 m-auto mt-7 rounded-[500px]" alt="user_img" />
                            <h2 className="text-center font-semibold text-black text-[32px]">For NGOs</h2>
                            <p className="text-center mb-3 px-4  text-black text-base font-normal font-['Inter'] leading-[20px]">Explore, learn and apply for opportunities by just one-click.</p>
                            <div className=" flex justify-center items-center bg-white mb-4 h-14 rounded-[38.43px] border border-sky-500 ">
                                <button className=" text-sky-950 text-[23.06px] font-semibold tracking-normal px-4 leading-[17.68px]">Create Account</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default SignUp_page