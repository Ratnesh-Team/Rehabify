import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { Link } from 'react-router-dom';
import { homeRemediesData } from './carddata'; // Importing homeRemediesData directly

const Homeremedies: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false); // No need to initialize as true
    const [cards, setCards] = useState<any[]>(homeRemediesData); // Set initial state with homeRemediesData directly

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>
            {isLoading ? (
                <div className='centre'>Loading...</div>
            ) : (
                <div className="flex flex-wrap justify-around gap-6" >
                    {cards.map((card) => (
                        <div key={card.id} className="max-w-xs mb-6">
                            <Link to={`/home-remedies?id=${card.id}`} className="max-w-xs mb-6">
                                <Card
                                    clickable
                                    className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                    header={
                                        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden" style={{ height: '200px' }}>
                                            <img src={card.image} alt="card header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    }
                                    footer={
                                        <div className='flex justify-between'>
                                            <span>
                                                <h6 className="text-sm">{card.author}</h6>
                                                <span className="text-xs">{card.date}</span>
                                            </span>
                                        </div>
                                    }
                                    headerClass="p-0"
                                    footerBorder={false}
                                    headerBorder={true}
                                >
                                    <h4 className="font-bold my-3">{card.title}</h4>
                                    <p className="text-sm h-20 overflow-hidden">
                                        {card.content.split(" ").length > 20
                                            ? `${card.content.split(" ").slice(0, 20).join(" ")}...`
                                            : card.content}
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
