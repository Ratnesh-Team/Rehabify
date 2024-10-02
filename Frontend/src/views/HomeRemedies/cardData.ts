import CardData from "./types";
import { Base_Url } from "@/configs/app.config";
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import { getHomeRemedies } from "@/services/HomeRemedies";
import deepParseJson from '@/utils/deepParseJson'
import { get } from "lodash";

export let cardData: CardData[] = [];

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData =    deepParseJson(rawPersistData) 

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessToken = (persistData as any).auth.session.token
export const fetchData = async () => {
  try {
    const response = await  getHomeRemedies();
    const responseData = await response.data;    
    
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