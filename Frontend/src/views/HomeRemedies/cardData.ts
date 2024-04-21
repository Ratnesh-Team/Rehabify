import CardData from "./types";
import { Base_Url } from "@/configs/app.config";

export let cardData: CardData[] = [];


export const fetchData = async () => {
  try {
    const response = await fetch(Base_Url + '/home-remedies');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const responseData = await response.json();    
    
    if (!Array.isArray(responseData.data)) {
      console.error('Invalid data format. Expected an array:', responseData.data);
      return;
    }

    cardData = responseData.data
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

fetchData();

export default cardData;
