import { Button } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import { getNMK } from '@/services/NMKService';
import { PhoneIcon } from '@heroicons/react/20/solid';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { HiMail } from 'react-icons/hi';
import { IoMdPerson, IoMdPin } from 'react-icons/io';

const index: React.FC = () => {
    const [cards, setCards] = useState<any>([]);

    useEffect(() => {
        fetchNonVerifiedData();
    }, []);

    const fetchNonVerifiedData = async () => {
        try {
            const response = await getNMK({ role: 'superadmin' });
            const responseData = await response.data;
            if (responseData.data !== null) {
                setCards(responseData.data);
            } else {
                setCards([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`${Base_Url}/NMK/approve?id=${id}`, {
                method: 'POST',
            });
            if (response.ok) {
                fetchNonVerifiedData();
            }
        } catch (error) {
            console.error('Error approving data:', error);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-4">Approval</h1>
            <div className="container my-5 flex flex-col items-center" style={{ marginLeft: '2.8em' }}>
                {cards.length === 0 ? (
                <p className="text-2xl text-center text-gray-500 mt-8">No items to verify</p>
                    ) : (
                    <div className="flex flex-wrap justify-around gap-6">
                        {cards.map((card: any, index: any) => (
                            <div key={index} className="max-w-7xl rounded overflow-hidden shadow-lg mb-4">
                                <div className="flex flex-col lg:flex-row justify-between">
                                    <div className="w-full lg:w-1/2">
                                        <img className="w-full h-full object-cover" src={card.ImageURL} alt="card header" />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-6 py-4">
                                        <h1 className="text-cyan-600 font-bold mb-2">{card.Name}</h1>
                                        <div className="flex items-center mb-2">
                                            <IoMdPin className="h-5 w-5 mr-1 " />
                                            <h2 className="text-sm lg:text-lg">{card.Address}</h2>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.Address)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-500 hover:underline"
                                            >
                                                (View on Map)
                                            </a>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <IoMdPerson className="h-5 w-5 mr-1 " />
                                            <h2 className="font-semibold text-sm lg:text-lg">{card.Owner_Name}</h2>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <HiMail className="h-5 w-5 mr-1 " />
                                            <a href={`mailto:${card.Email}`} className="text-sm lg:text-lg">{card.Email}</a>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <PhoneIcon className="h-5 w-5 mr-1 " />
                                            <a href={`tel:${card.Contact_Number}`} className="text-sm lg:text-lg">{card.Contact_Number}</a>
                                        </div >
                                        {/* Display all data */}
                                        <div className="text-sm lg:text-lg">
                                            <p>State: {card.State}</p>
                                            <p>District: {card.District}</p>
                                            <p>Pincode: {card.Pincode}</p>
                                            {card.NMK_Verification_Image ? (
                                                <p className="break-words">
                                                    Document: <a href={card.NMK_Verification_Image} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{card.NMK_Verification_Image}</a>
                                                </p>
                                            ) : (
                                                <p>No Document Available</p>
                                            )}
                                            <p>Established Year: {card.Established_Year}</p>
                                            {/* Approve button */}
                                            <div className="flex flex-col items-center justify-center">
                                                <Button variant="solid" onClick={() => handleApprove(card._id)}>Approve</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default index;


