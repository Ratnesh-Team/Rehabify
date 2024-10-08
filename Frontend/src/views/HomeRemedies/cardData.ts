import CardData from "./types";
import { Base_Url } from "@/configs/app.config";
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import { getHomeRemedies } from "@/services/HomeRemedies";
import deepParseJson from '@/utils/deepParseJson'
import { get } from "lodash";

export let cardData: CardData[] = [];

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData =    deepParseJson(rawPersistData) 

export const fetchData = async () => {
  try {
    const response = await  getHomeRemedies();
    const responseData = await response.data;    
    
    if (!Array.isArray(responseData.data)) {
      const errorMsg = 'Invalid data format. Expected an array'
      console.error(errorMsg, responseData.data)
      throw new Error(errorMsg)
    }

    cardData = responseData.data
  } catch (error:any) {
    if (error.message === 'Network Error') {
        throw new Error('Network error: Please check your connection.')
    } else {
        console.error('Failed to fetch data:', error);
    }
  }
};
export default cardData;