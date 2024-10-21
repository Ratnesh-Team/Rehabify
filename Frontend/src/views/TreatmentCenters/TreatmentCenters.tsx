import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Pagination, Input } from '@/components/ui'; // Import Input from your UI components
import { Base_Url } from '@/configs/app.config';
import CardData from './types';
import { getNMK } from '@/services/NMKService';
import { Alert } from '@/components/ui'
import { DoubleSidedImage } from '@/components/shared'

interface Props { }

const Controlled: React.FC<Props> = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Treatment Centres</h1>
            {/* Search Input */}
            <div className="flex  sm:ml-0 ml-4 justify-between items-center mb-4">
                <div className="flex-grow sm:flex hidden"></div> {/* Empty div to push the search input to the right */}
                <div> {/* Adjust the width of the search input container */}
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
                <TreatmentCentres
                    page={page}
                    onPageChange={onPageChange}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    );
};

const TreatmentCentres: React.FC<{
    page: number;
    onPageChange: (newPage: number) => void;
    searchTerm: string;
}> = ({ page, onPageChange, searchTerm }) => {
    const [cards, setCards] = useState<CardData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const pageSize = 6;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await getNMK();
                const responseData = response.data;
                setCards(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Network error: Please check your connection.')
            }
        };

        fetchCards();
    }, []);

    // Filter cards based on multiple search criteria
    const filteredCards = cards.filter((card) => {
        const search = searchTerm.toLowerCase();
        const contactNumber = card.Contact_Number.toString(); // Convert to string
        return (
            card.Name.toLowerCase().includes(search) ||
            card.Address.toLowerCase().includes(search) ||
            card.Owner_Name.toLowerCase().includes(search) ||
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
                {errorMessage ? (
                    <div className="flex flex-col items-center justify-center">
                        <Alert showIcon className="mb-4" type="danger">
                            {errorMessage}
                        </Alert>
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Network Error"
                        />
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-around gap-6">
                        {displayedCards.map((card, index) => (
                            <div
                                key={index}
                                className="w-[300px] max-w-xs sm:w-[400px] mb-6" // fixed size of cards on small and large screens
                            >
                                <Link
                                    to={`/NMK?NMK_Code=${card._id}`}
                                    className="block"
                                >
                                    <Card
                                        clickable
                                        className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                        header={
                                            <div
                                                className="rounded-tl-lg rounded-tr-lg overflow-hidden"
                                                style={{
                                                    height: '200px',
                                                    width: '100%',
                                                }}
                                            >
                                                <img
                                                    src={card.ImageURL}
                                                    alt="card header"
                                                    style={{
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            </div>
                                        }
                                        headerClass="p-0"
                                        footerBorder={false}
                                        headerBorder={true}
                                    >
                                        <span>
                                            <h3 className="text-emerald-600 font-bold">
                                                {card.Name}
                                            </h3>
                                        </span>
                                        <p className="text-sm overflow-hidden whitespace-nowrap">
                                            {card.Address}
                                        </p>
                                        <p className="font-semibold">
                                            {card.Owner_Name}
                                        </p>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Pagination
                total={totalPages}
                currentPage={page}
                onChange={onPageChange}
            />
        </>

    )
};

export default Controlled;
