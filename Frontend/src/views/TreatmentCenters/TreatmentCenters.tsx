import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Card, Pagination } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import CardData from './types'; // Import the CardData interface

interface Props {
    // Removed cards and pageSize props
}

const Controlled: React.FC<Props> = () => {
    const [page, setPage] = useState(1);

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Treatment Centres</h1>

            <TreatmentCentres page={page} onPageChange={onPageChange} />
        </div>
    );
};

const TreatmentCentres: React.FC<{ page: number; onPageChange: (newPage: number) => void }> = ({
    page,
    onPageChange,
}) => {
    const [cards, setCards] = useState<CardData[]>([]);
    const pageSize = 6; // Number of cards per page

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(Base_Url + '/NMK');
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

    // Calculate total pages based on cards length and pageSize
    const totalPages = Math.ceil(cards.length / pageSize);

    // Get the start and end index of cards to display for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedCards = cards.slice(startIndex, endIndex);

    return (
        <>
            {/* Render cards based on current page */}
            <div className="flex flex-wrap justify-around gap-6">
                {displayedCards.map((card, index) => (
                    <div key={index} className="max-w-xs mb-6">
                        {/* Wrap Card content in Link */}
                        <Link to={`/NMK?NMK_Code=${card.NMK_Code}`} className="max-w-xs mb-6">
                            <Card
                                clickable
                                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={
                                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                        <img src={card.ImageURL} alt="card header" />
                                    </div>
                                }
                                headerClass="p-0"
                                footerBorder={false}
                                headerBorder={true}
                            >
                                <span>
                                    <h3 className="text-emerald-600 font-bold ">{card.Name}</h3>
                                </span>
                                <p className="text-sm overflow-hidden">{card.Address}</p>
                                <p className="font-semibold">{card.Owner_Name}</p>
                                <span className='flex justify-between'>
                                    <p className="text-sm overflow-hidden">{card.Email}</p>
                                    <p className="text-sm overflow-hidden">{card.Contact_Number}</p>
                                </span>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                total={totalPages}
                currentPage={page}
                onChange={onPageChange}
            />
        </>
    );
};

export default Controlled;
