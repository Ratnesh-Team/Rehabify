import { Base_Url } from "@/configs/app.config";
import axios from "axios";
import { useEffect, useState } from "react";

const Database = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(Base_Url + '/users')
            const responseData = await data.json()
            setData(responseData)
            console.log(responseData)
        }
        fetchData()
    }, [])
    console.log('Index component rendered');
    return (
        <div>
            Jhftgfdhgfhfh
        </div>
    );
}

export default Database
