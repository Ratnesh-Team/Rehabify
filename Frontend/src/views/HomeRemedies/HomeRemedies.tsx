import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { cardData, fetchData } from '../HomeRemedies/cardData';
import CardData from './types'; 
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

const Homeremedies: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState<CardData[]>([]);

    useEffect(() => {
        fetchData().then(() => {
            setCards(cardData);     
            setIsLoading(false);
        });
    }, []);
    
    const toastNotification = (
        <Notification closable type="info" duration={4000}>
            Page under Development
        </Notification>
    )
    const onRemedyClick = ()=>{
        toast.push(toastNotification,{placement:'top-center'})
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Home Remedies</h1>
            {isLoading ? (
                <div className='centre'>Loading...</div>
            ) : (
                <div className="flex flex-wrap justify-around gap-6" onClick={onRemedyClick}>
                    {cards.map((card) => (
                        <div key={card.ID} className="max-w-xs mb-6">
                            <Card
                                clickable
                                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={
                                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                        <img src={card.Image} alt="card header" />
                                    </div>
                                }
                                footer={
                                    <div className='flex justify-between'>
                                        <span>
                                            <h6 className="text-sm">{card.Author}</h6>
                                            <span className="text-xs">{card.Date}</span>
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
                                <h4 className="font-bold my-3">{card.Title}</h4>
                                <p className="text-sm h-20 overflow-hidden">
                                    {card.Content.split(" ").length > 20 
                                        ? `${card.Content.split(" ").slice(0, 20).join(" ")}...` 
                                        : card.Content}
                                </p>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homeremedies;
