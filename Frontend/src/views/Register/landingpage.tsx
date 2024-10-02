import React, { useEffect, useState } from 'react';
import UserRegisteration from './userRegisteration';
import Index from './index'; // Assuming index is a component, capitalized for convention
import { Button } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom'
import Approval from './approval';
import SimpleTable from './NMK_Manage';
import { getNMK } from '@/services/NMKService';


function LandingPage() { // Capitalized function name for convention
    const [flag, setFlag] = useState<string>('');
    const { email } = useAppSelector((state) => state.auth.user);
    const [id, setId] = useState<string>('')
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const openDialog = () => {
        setDialogIsOpen(true);
    };

    const fetchData = async () => {
        try {
            const response = await  getNMK({ email: email??`` });
            const responseData = response.data;
           
            if (responseData.status === 200 && responseData.data === null) {
                setFlag('one');
            }
            if (responseData.status === 200 && responseData.data !== null && responseData.data[0].IsVerified === false) {
                console.log('Waiting for approval');
                setFlag('two');
            }
            if (responseData.status === 200 && responseData.data !== null && responseData.data[0].IsVerified === true) {
                console.log('User already registered');
                setFlag('three');
                localStorage.setItem('Nasha_Mukti_Centre_Code', responseData.data[0]._id);
                localStorage.setItem('Nasha_Mukti_Centre_Address', responseData.data[0].Address);
                localStorage.setItem('Nasha_Mukti_Centre_Name', responseData.data[0].Name);
                setId(responseData.data[0]._id);
            }
            console.log('API Response:', responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {flag === 'one' ? (
                <Index />
            ) : flag === 'two' ? (
                Approval()
            ) : flag === 'three' ? (
                        <SimpleTable id={id}/>
            ) : null}
        </div>
    );
}

export default LandingPage;
