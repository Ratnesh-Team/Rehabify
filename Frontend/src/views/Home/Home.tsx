import React from 'react';
import cardData from './cardData';
import { Card, CardProps } from '@/components/ui';
import CardData from './types'; // Import the CardData interface

const Home: React.FC = () => {
    // Assuming cardData is an array of CardData objects
    const cards: CardData[] = cardData;

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>
            <div className="flex flex-wrap justify-around gap-6">
                {cards.map((card) => (
                    <div key={card.id} className="max-w-xs mb-6">
                        <Card
                            clickable
                            className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                            header={
                                <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                    <img src={card.image} alt="card header" />
                                </div>
                            }
                            footer={
                                <div className='flex justify-between'>
                                    <span>
                                        <h6 className="text-sm">{card.author}</h6>
                                        <span className="text-xs">{card.date}</span>
                                    </span>
                                    <span>
                                        <h6 className="text-sm">Read More⏭️</h6>
                                    </span>
                                </div>
                            }
                            headerClass="p-0"
                            footerBorder={false}
                            headerBorder={true}
                        >
                            <span className="text-emerald-600 font-semibold">
                                {card.category}
                            </span>
                            <h4 className="font-bold my-3">{card.title}</h4>
                            {/* Add CSS class for truncated text */}
                            <p className="text-sm h-20 overflow-hidden">{card.content}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
