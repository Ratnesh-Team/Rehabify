import ModeSwitcher from '@/components/template/ThemeConfigurator/ModeSwitcher';
import { Alert, Button } from '@/components/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";

const Home: React.FC = () => {
    return (
        <div>
            {/* <Alert showIcon className="mb-4" >
                Please be patient, this page is under development
            </Alert> */}
            <div className='flex flex-row s:flex-col justify-around mt-2 mb-20'>
                <div className='mt-12 ml-12 mr-14'>

                    <h1 className=' mt-8 mb-2 ' >Rehabify</h1>
                    <h4 >The Path to a Brighter Tomorrow</h4>
                    <p className='text-base my-10 tracking-wide '>We serve to individuals, healthcare professionals, and organisations by giving a comprehensive and broad database that offers a plethora of information about addiction recovery and rehabilitation.</p>
                    <div className=''>
                        <Link to={"/database"}>
                            <Button shape="circle" variant='solid' className="mr-2" >
                                <div className='flex justify-between'>
                                    Database {<FiArrowUpRight />}
                                </div>

                            </Button>
                        </Link>
                        <Link to={"/Doctor"}>
                            <Button shape="circle" variant='solid' className="mr-2 ml-16" >
                                <div className='flex justify-between'>
                                    Book Appointment  {<FiArrowUpRight />}
                                </div>

                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='size-11/12 ' >
                    <img src="/img/home_page_img/india-map.png" alt="" />
                </div>
            </div>

            {/* <div className='size-2/12 -ml-8 mb-0'>
                <img src="/img/home_page_img/Ellipse 1.png" alt="" />
            </div> */}

            <div className=' flex flex-row bg-blue-400 ml-20 mr-14 mt-40 mb-16 rounded-2xl  justify-between '>

                <div className='ml-2 mt-4  w-6/12'>
                    <h1 className='ml-3 mt-2 '>DATABASE</h1>
                    <p className='text-black dark:text-white  ml-3 mt-8  mb-10 text-base tracking-wide'>Our website relies on a robust database to organize and deliver information efficiently. It ensures data accuracy, supports quick access to specific details, and enhances your online experience. Whether you're exploring our offerings or seeking information, our database ensures smooth and reliable interactions.</p>
                    <div className=' mt-2 mb-8'>
                        <Button shape="circle" variant='solid' className="mr-2 ml-16" >
                            <div className='flex justify-between'>
                                Explore more  {<FiArrowUpRight />}
                            </div>

                        </Button>
                    </div>
                </div>


                <div className='size-5/12 -mt-20 -mr-12 '>
                    <img src="/img/home_page_img/cloud_database.png" alt="" />
                </div>
            </div>



            {/* <div className='flex  flex-row-reverse'>
                <div className=' size-2/12 dark:list-image-none'>
                    <img src="/img/home_page_img/Ellipse 2.png" alt="" />
                </div>
            </div> */}




            <div className=' flex flex-row bg-amber-300 mt-28 ml-12 mr-28 mb-10 -mt-40 rounded-2xl  justify-between '>

                <div className='  w-4/12  self-center ml-7'>
                    <img src="/img/home_page_img/chart .png" alt="" />
                </div>

                <div className='mr-2 mt-4  w-7/12 '>
                    <h1 className='text-right mr-3 mt-2'>GRAPH</h1>
                    <h3 className='text-right mr-3 mt-1 mb-3'>Visualizing data Insights</h3>
                    <p className='text-right mr-3  mb-6 text-base tracking-wide'>Our graph feature transforms complex data into easily understandable visuals, such as charts and graphs. Quickly identify trends and patterns, making data-driven decisions a breeze. Whether you're analyzing business metrics or research data, our user-friendly graphs simplify data interpretation, helping you uncover valuable insights and communicate your findings effectively.</p>
                    <div className=' mt-2 mb-8 ml-20'>
                        <Button shape="circle" variant='solid' className="mr-2 ml-16" >
                            <div className='flex justify-between'>
                                Explore more  {<FiArrowUpRight />}
                            </div>

                        </Button>
                    </div>
                </div>



            </div>


            <div className=' flex flex-row justify-around items-center h-28 rounded-full bg-[#8fc8e8]  px-2 py-4 mx-0 my-8'>
                <h5 ><span className='text-[#f75700]'>100+</span> Registered
                    Nasha Mukti Kendra</h5>
                <h5 ><span className='text-[#f75700]'>50+</span> Registered
                    NGO</h5>
                <h5 ><span className='text-[#f75700]'>400+</span> Community Member</h5>
            </div>


            <div className='flex flex-row mx-12 mt-14  mb-20 bg-[#edeaff] rounded-md'>
                <div className='  w-6/12  self-center'>
                    <img src="/img/home_page_img/map.png" alt="" />
                </div>
                <div className='w-6/12 mx-3 mt-4 text-base '>
                    <p className='mb-4'>Discover the closest Nasha Mukti Kendra to you with our user-friendly locator. We understand that taking the first step towards recovery is a critical decision, and we're here to assist you. Our tool allows you to enter your location, providing instant access to the nearest addiction treatment centers. Find the support and care you need for a journey towards a healthier, addiction-free life.</p>
                    <div className='my-3'>
                        <Button shape="circle" variant='solid' className="mr-2 ml-16 " >
                            <div className='flex justify-between'>
                                Nearest Nasha Mukti Kendra  {<FiArrowUpRight />}
                            </div>

                        </Button>
                    </div>

                </div>

            </div>

            <div>
                <h1 className='text-center'>Home Remedies </h1>
            </div>

        </div>
    );
};

export default Home;
