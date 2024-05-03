import { use } from 'i18next';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const moveToNmK = ({ id }) => {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     navigate(`/nmk?code=${id}`);
    // }, [id]); // Add id as a dependency

    console.log('id', id)
    return (

        <Link to={`/NMK?NMK_Code=${id}`} >

            <div>moveToNmK </div>
        </Link>
    )
}

export default moveToNmK