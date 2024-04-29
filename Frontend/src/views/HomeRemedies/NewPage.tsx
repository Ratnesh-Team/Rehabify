import React, { useEffect, useState } from 'react';
import { homeRemediesData } from './carddata';
import CardData from './types';

const NewPage: React.FC<{ id: string }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true); // Change initial state to true
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = homeRemediesData.find(item => item.id === parseInt(id, 10)); // Parse id to integer
        if (!data) {
          throw new Error('Data not found');
        }
        setCard(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false); // Move setIsLoading(false) to finally block to handle loading state
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : card ? (
        <div className="mt-8">
          <div className="justify-center mb-8">
            <img src={card.image} alt="Card Header" className="rounded-lg h-48 w-full object-cover" />
          </div>
          <h1>{card.title}</h1>
          <div className='flex justify-between'>
            <div>
              <span className="text-sm font-bold">Created By: {card.author}</span> {/* Changed text-bold to font-bold */}
            </div>
            <div>
              <span className="flex text-sm">Last Updated {card.date} &nbsp; <li>2 min Read</li></span> {/* Removed unnecessary bold */}
            </div>
          </div>
          <div className='mb-6'></div>
          <div className="content" dangerouslySetInnerHTML={{ __html: card.body }} /> {/* Render the body content */}
        </div>
      ) : (
        <div className="text-center">Data not found</div>
      )}
    </div>
  );
};

export default NewPage;
