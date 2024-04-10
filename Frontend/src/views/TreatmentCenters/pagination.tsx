import React, { useState } from 'react';
import Pagination from '@/components/ui/Pagination';
import CardData from './types'; // Import the CardData interface
import { Card } from '@/components/ui';

interface Props {
    cards: CardData[];
    pageSize: number;
}

const Controlled: React.FC<Props> = ({ cards, pageSize }) => {
    const [page, setPage] = useState(1);

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Calculate total pages based on cards length and pageSize
    const totalPages = Math.ceil(cards.length / pageSize);

    // Get the start and end index of cards to display for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedCards = cards.slice(startIndex, endIndex);

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>
                {/* Render cards based on current page */}
                <div className="flex flex-wrap justify-around gap-6">
                    {displayedCards.map((card, index) => (
                        <div key={index} className="max-w-xs mb-6">
                            {/* <Card
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
                            </Card> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                total={totalPages}
                currentPage={page}
                onChange={onPageChange}
            />
        </div>
    );
};

export default Controlled;
