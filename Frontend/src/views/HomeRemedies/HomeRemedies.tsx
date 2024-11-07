import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { cardData, fetchData } from '../HomeRemedies/cardData';
import CardData from './types';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui';
import { DoubleSidedImage } from '@/components/shared';

interface Props {
    numberOfCardsToShow: number; // Prop to specify the number of cards to display
}

const Homeremedies: React.FC<Props> = ({ numberOfCardsToShow }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [cards, setCards] = useState<CardData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                await fetchData();
                setCards(cardData);
            } catch (error: any) {
                console.error(error);
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCards();
    }, []);

    // Filter cards based on search query
    const filteredCards = cards.filter((card) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            card.Title.toLowerCase().includes(searchTerm) ||
            card.Content.toLowerCase().includes(searchTerm)
        );
    });

    // Limit the number of cards displayed
    const displayedCards = filteredCards.slice(0, numberOfCardsToShow);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>

            {/* Container for search bar and content */}
            <div className="w-full flex justify-between items-center mb-4">
                {/* Empty space on the left, can adjust if needed */}
                <div className="flex-grow"></div>
                
                {/* Search bar positioned on the right */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Remedies..."
                    className="p-2 w-64 border border-gray-300 rounded-md"
                />
            </div>

            {isLoading ? (
                <div className="centre">Loading...</div>
            ) : errorMessage ? (
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
                    {displayedCards.map((card) => (
                        <div key={card.ID} className="max-w-xs mb-6">
                            <Link to={`/blog${card.ID}`} className="max-w-xs mb-6">
                                <Card
                                    clickable
                                    className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                    header={
                                        <div
                                            className="rounded-tl-lg rounded-tr-lg overflow-hidden"
                                            style={{ height: '200px' }}
                                        >
                                            <img
                                                src={card.Image}
                                                alt="card header"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    }
                                    footer={
                                        <div className="flex justify-between">
                                            <span>
                                                <h6 className="text-sm">{card.Author}</h6>
                                                <span className="text-xs">{card.Date}</span>
                                            </span>
                                        </div>
                                    }
                                    headerClass="p-0"
                                    footerBorder={false}
                                    headerBorder={true}
                                >
                                    <h4 className="font-bold my-3">{card.Title}</h4>
                                    <p className="text-sm h-20 overflow-hidden">
                                        {card.Content.split(' ').length > 20
                                            ? `${card.Content.split(' ')
                                                  .slice(0, 20)
                                                  .join(' ')}...`
                                            : card.Content}
                                    </p>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homeremedies;
