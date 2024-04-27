import React, { useEffect, useState } from 'react';
import { Base_Url } from '@/configs/app.config';
import CardData from "./types";

const NewPage: React.FC<{ id: string }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Base_Url + `/home-remedies?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        const data: CardData = responseData.data[0];
        setCard(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-4 text-center">{card?.Title}</h1>
          <div className="flex justify-center mb-4">
            <img src={card?.Image} alt="Card Header" style={{ width: '70%', height: '70%' }} />
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm">{card?.Author}</span>
            <span className="text-sm">{card?.Date}</span>
          </div>
          <p className="text-lg">{card?.Content}</p>
        </div>
      )}
    </div>
  );
};

export default NewPage;
