import ModeSwitcher from '@/components/template/ThemeConfigurator/ModeSwitcher';
import { Alert, Button } from '@/components/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";
import Homeremedies from '../HomeRemedies/HomeRemedies';
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';
import Testimonials from '../testimonal/Testimonials';

const Home: React.FC = () => {
    return (
        <div className='container mx-auto px-0'>
            {/* <Alert showIcon className="mb-4" >
                Please be patient, this page is under development
            </Alert> */}
            <div className='flex flex-col md:flex-row justify-around mt-2 mb-20'>
                <div className='md:mt-12 md:ml-12 md:mr-14'>

                    <h1 className='mt-8 mb-2'>Rehabify</h1>
                    <h4>The Path to a Brighter Tomorrow</h4>
                    <p className='text-base my-10 tracking-wide dark:text-white'>We serve to individuals, healthcare professionals, and organisations by giving a comprehensive and broad database that offers a plethora of information about addiction recovery and rehabilitation.</p>
                    <div className=''>
                        <Link to={"/database"}>
                            <Button shape="circle" variant='solid' className="mr-2 mb-2">
                                <div className='flex justify-between'>
                                    Database {<FiArrowUpRight />}
                                </div>
                            </Button>
                        </Link>
                        <Link to={"/Doctor"}>
                            <Button shape="circle" variant='solid' className="mr-2 md:ml-16">
                                <div className='flex justify-between'>
                                    Book Appointment  {<FiArrowUpRight />}
                                </div>

                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='hidden md:block w-full md:w-2/2'>
                    <img src="/img/home_page_img/india-map.png" alt="" />
                </div>
            </div>

            {/* <div className='size-2/12 -ml-8 mb-0'>
                <img src="/img/home_page_img/Ellipse 1.png" alt="" />
            </div> */}

            <div className='flex flex-col md:flex-row bg-blue-400 ml-0 md:ml-20 mr-0 md:mr-14 mt-40 mb-16 rounded-2xl  justify-between '>
                <div className='w-full md:w-5/12 -mt-20 -mr-12'>
                    <img src="/img/home_page_img/cloud_database.png" alt="" />
                </div>
                <div className='md:ml-2 md:mt-4 md:w-6/12'>
                    <h1 className='ml-3 mt-2 text-white'>DATABASE</h1>

                    <p className='text-white mx-3 mt-4 mb-10 text-base tracking-wide'>Our website relies on a robust database to organize and deliver information efficiently. It ensures data accuracy, supports quick access to specific details, and enhances your online experience. Whether you're exploring our offerings or seeking information, our database ensures smooth and reliable interactions.</p>
                    <div className='mt-2 mb-8'>
                        <Link to={"/database"}>
                            <Button shape="circle" variant='solid' className=" ml-2 md:ml-16">
                                <div className='flex justify-between'>
                                    Explore more  {<FiArrowUpRight />}
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>



            </div>



            {/* <div className='flex  flex-row-reverse'>
                <div className=' size-2/12 dark:list-image-none'>
                    <img src="/img/home_page_img/Ellipse 2.png" alt="" />
                </div>
            </div> */}




            <div className='flex flex-col mt-36 md:flex-row bg-amber-300 ml-0 md:ml-12 mr-0 md:mr-28 mb-10 -mt-40 rounded-2xl  justify-between '>

                <div className='w-full md:w-1/2 self-center md:ml-7'>
                    <img src="/img/home_page_img/doctor.png" alt="" />
                </div>

                <div className='md:ml-2 md:mt-4 md:w-6/12'>
                    <h1 className='text-right mr-3 mt-2'>Experienced Doctors </h1>
                    <h3 className='text-right mr-3 mt-1 mb-3'>Book Your Appointment Now</h3>
                    <p className='text-right mx-3 mb-6 text-base tracking-wide text-black dark:text-white'>
                        Our team of experienced doctors is dedicated to providing exceptional medical care tailored to your needs. With expertise in various specialties, including cardiology, neurology, and pediatrics, our doctors are committed to your well-being. Whether you need a routine check-up or specialized treatment, we're here to help. Book your appointment now and experience compassionate care from our trusted medical professionals.
                    </p>
                    <div className='mt-2 mb-8 ml-20'>
                        <Link to={"/Doctor"}>
                            <Button shape="circle" variant='solid' className="mr-2 md:ml-16">
                                <div className='flex justify-between'>
                                    Explore more <FiArrowUpRight />
                                </div>
                            </Button>
                        </Link>
                    </div>

                </div>



            </div>

            <div className='flex flex-row justify-around items-center h-28 rounded-full bg-[#8fc8e8] px-2 py-4 mx-0 my-8'>
    <div className='text-center'>
        <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
            {({ isVisible }: { isVisible: boolean }) => (
                <div>
                    {isVisible ? (
                        <h2 className='text-[#f75700] text-sm font-bold sm:text-xl'>
                            <CountUp end={100} duration={3} />+
                        </h2>
                    ) : null}
                    <h5 className='text-sm sm:text-xl max-w-xs'>Registered Nasha Mukti Kendra</h5>
                </div>
            )}
        </VisibilitySensor>
    </div>

    <div className='text-center'>
        <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
            {({ isVisible }: { isVisible: boolean }) => (
                <div>
                    {isVisible ? (
                        <h2 className='text-[#f75700] text-sm font-bold sm:text-xl'>
                            <CountUp end={50} duration={3} />+
                        </h2>
                    ) : null}
                    <h5 className='text-sm sm:text-xl'>Registered NGO</h5>
                </div>
            )}
        </VisibilitySensor>
    </div>

    <div className='text-center'>
        <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
            {({ isVisible }: { isVisible: boolean }) => (
                <div>
                    {isVisible ? (
                        <h2 className='text-[#f75700] text-sm font-bold sm:text-xl'>
                            <CountUp end={400} duration={3} />+
                        </h2>
                    ) : null}
                    <h5 className='text-sm sm:text-xl'>Community Member</h5>
                </div>
            )}
        </VisibilitySensor>
    </div>
</div>




            <div className='flex flex-col md:flex-row mx-0 md:mx-12 mt-14 mb-20 bg-[#edeaff] rounded-md'>
                <div className='w-full md:w-1/2 self-center'>
                    <img src="/img/home_page_img/map.png" alt="" />
                </div>
                <div className='w-full md:w-1/2 mt-2 px-4 md:px-0 md:mx-3 md:mt-4 text-base '>
                    <p className='mb-4'>Discover the closest Nasha Mukti Kendra to you with our user-friendly locator. We understand that taking the first step towards recovery is a critical decision, and we're here to assist you. Our tool allows you to enter your location, providing instant access to the nearest addiction treatment centers. Find the support and care you need for a journey towards a healthier, addiction-free life.</p>
                    <div className='my-3'>
                        <Link to={"/treatment-centers"}>
                            <Button shape="circle" variant='solid' className="mr-2 md:ml-16 " >
                                <div className='flex justify-between'>
                                    Nearest Nasha Mukti Kendra  {<FiArrowUpRight />}
                                </div>

                            </Button>
                        </Link>
                    </div>

                </div>

            </div>
            <Testimonials />
            <Homeremedies numberOfCardsToShow={3} />
        </div>
    );
};

export default Home;
