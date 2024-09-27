import CardData from "./types";
import { Base_Url } from "@/configs/app.config";
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'

export let cardData: CardData[] = [];

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData =    deepParseJson(rawPersistData) 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessToken = (persistData as any).auth.session.token
export const fetchData = async () => {
  try {
    const response = await fetch(Base_Url + '/home-remedies', {
                    method: 'GET', // Specify method if needed
                    headers: {
                        'Content-Type': 'application/json', // Set content type
                        'Authorization': `Bearer ${accessToken}`,// Add Authorization header
                    },
                });
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