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
  const decodeHTML = (html: string) => {
    return html.replace(/\\u(\d{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' , lineHeight:'2'}}>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-10">
          <h1 className="text-3xl font-bold mb-4 text-center">{card?.Title}</h1>
          <div className="flex justify-center mb-4">
            <img src={card?.Image} alt="Card Header" style={{ width: '70%', height: '70%' }} />
          </div>
          <div>
            <span className="text-sm">{card?.Author}</span>
          </div>
          <div>
            <span className="text-sm">{card?.Date}</span>
          </div>
          
          { card?.body !='abcd' ?
            <div dangerouslySetInnerHTML={{ __html: decodeHTML(card?.body || '') }} /> :
            <p className="text-lg">{card?.Content}</p>
          }
        </div>
      )}
    </div>
  );
};

export default NewPage;
