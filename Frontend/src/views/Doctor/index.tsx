import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Pagination, Input } from '@/components/ui'; // Import Input from your UI components
import { Base_Url } from '@/configs/app.config';
import CardData from './types';

interface Props { }

const Controlled: React.FC<Props> = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Doctor Appointment</h1>
            {/* Search Input */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow"></div> {/* Empty div to push the search input to the right */}
                <div > {/* Adjust the width of the search input container */}
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-4"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center">
                {/* Pass searchTerm to TreatmentCentres component */}
                <TreatmentCentres page={page} onPageChange={onPageChange} searchTerm={searchTerm} />
            </div>
        </div>

    );
};

const TreatmentCentres: React.FC<{ page: number; onPageChange: (newPage: number) => void; searchTerm: string }> = ({
    page,
    onPageChange,
    searchTerm,
}) => {
    const [cards, setCards] = useState<CardData[]>([]);
    const pageSize = 6;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(Base_Url + '/doctor');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setCards(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCards();
    }, []);

    // Filter cards based on multiple search criteria
    const filteredCards = cards.filter((card) => {
        const search = searchTerm.toLowerCase();
        const contactNumber = card.ContactNumber.toString(); // Convert to string
        return (
            card.Name.toLowerCase().includes(search) ||
            card.ClinicAddress.toLowerCase().includes(search) ||
            card.Name.toLowerCase().includes(search) ||
            card.Email.toLowerCase().includes(search) ||
            contactNumber.includes(search) // Use includes on the stringified contact number
        );
    });

    const totalPages = Math.ceil(filteredCards.length / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedCards = filteredCards.slice(startIndex, endIndex);

    return (
        <>
            <div className="flex flex-wrap justify-around gap-6">
                {displayedCards.map((card, index) => (
                    <div key={index} className="max-w-xs mb-6">
                        <Link to={`/doctor?Docter_Code=${card.Docter_Code}`} className="max-w-xs mb-6">
                            <Card
                                clickable
                                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={
                                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                        <img src={card.ImageURL} alt="card header" />
                                    </div>
                                }
                                footer={
                                    <div className="ml-0">
                                        <span className="font-bold">Book Appointment </span>     
                                    </div>

                                }
                                headerClass="p-0"
                                footerBorder={true}
                                headerBorder={true}
                            >
                                <span>
                                    <h3 className="text-emerald-600 font-bold ">{card.Name}</h3>
                                </span>
                                <p className="text-sm">{card.Specialization}</p>
                                <p className="font-semibold">{card.Description}</p>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>

            <Pagination
                total={totalPages}
                currentPage={page}
                onChange={onPageChange}
            />
        </>
    );
};

export default Controlled;