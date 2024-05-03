import React, { useEffect, useState } from 'react';
import UserRegisteration from './userRegisteration';
import Index from './index'; // Assuming index is a component, capitalized for convention
import { Button } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom'
import Approval from './approval';
import NewNMK from './newNMK';
import moveToNmK from './moveToNmK';

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
            const response = await fetch(`${Base_Url}/NMK?email=${email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
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
                setId(responseData.data[0]._id)
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
                // NewNMK()
                moveToNmK({ id }) // Pass an object with the id property
            ) : null}
        </div>
    );
}

export default LandingPage;
