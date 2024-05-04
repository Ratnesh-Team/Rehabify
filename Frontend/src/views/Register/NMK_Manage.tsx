import React, { useState, useEffect } from 'react';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import { Base_Url } from '@/configs/app.config';
import Sorter from '@/components/ui/Table/Sorter';
import TBody from '@/components/ui/Table/TBody';
import THead from '@/components/ui/Table/THead';
import Td from '@/components/ui/Table/Td';
import Th from '@/components/ui/Table/Th';
import Tr from '@/components/ui/Table/Tr';
import Button from '@/components/ui/Button';
import { HiOutlineInboxIn, HiMail } from 'react-icons/hi';
import Input from '@/components/ui/Input';
import { IoMdPin } from "react-icons/io";
import CardData from './types';
import { DocumentTextIcon, PhoneIcon } from '@heroicons/react/20/solid';

import { IoMdPerson } from "react-icons/io";
import UserRegisteration from './userRegisteration';

type Person = {
    Name: string;
    Addiction_Type: string;
    State: string;
    Nasha_Mukti_Centre_Address: string;
    Joining_Date: string;
    Gender: string;
    Employment_Status: number;
    Counselling_Count: number;
    Counsellor_Name: string;
    Guardian_Name: string;
    District: string;
    Duration_of_Treatment: number;
    Under_Treatment: number;
    Is_Treatment_Completed: number;
    Addictio_Duration: number;
    Age: number;


};

type Option = {
    value: number;
    label: string;
};


interface Props {
    id: string; // Add id prop
}


const SimpleTable: React.FC<Props> = ({ id }) => {
    const openDialog = () => {
        setDialogIsOpen(true);
    };
    const columns = [
        {
            header: 'Name',
            accessorKey: 'Name',
        },
        {
            header: 'Age',
            accessorKey: 'Age',
        },
        {
            header: 'Gender',
            accessorKey: 'Gender',
        },
        {
            header: 'State',
            accessorKey: 'State',
        },
        {
            header: 'District',
            accessorKey: 'District',
        },
        {
            header: 'Guardian Name',
            accessorKey: 'Guardian_Name',
        },
        {
            header: 'Addiction Type',
            accessorKey: 'Addiction_Type',
        },
        {
            header: 'Addiction Duration',
            accessorKey: 'Addictio_Duration', // Corrected accessor key
        },
        {
            header: 'Duration of Treatment',
            accessorKey: 'Duration_of_Treatment',
        },
        {
            header: 'Is Treatment Completed',
            accessorKey: 'Is_Treatment_Completed',
        },
        {
            header: 'Under Treatment',
            accessorKey: 'Under_Treatment',
        },
        {
            header: 'Employment Status',
            accessorKey: 'Employment_Status',
        },
        {
            header: 'Joining Date',
            accessorKey: 'Joining_Date',
        },
        {
            header: 'Counselling Count',
            accessorKey: 'Counselling_Count',
        },
        {
            header: 'Counsellor Name',
            accessorKey: 'Counsellor_Name',
        },
    ];



    const [data, setData] = useState<Person[]>([]);
    const [filteredData, setFilteredData] = useState<Person[]>([]);
    const [sorting, setSorting] = useState<string>('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const NMK_Code = id

    // Page size options
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Base_Url}/users?NMK_Code=${NMK_Code}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();

                console.log('API Response:', responseData);

                if (!Array.isArray(responseData.data)) {
                    console.error('Invalid data format. Expected an array:', responseData.data);
                    return;
                }

                const mappedData: Person[] = responseData.data.map((item: any) => ({
                    Name: item.Name,
                    Age: item.Age,
                    Gender: item.Gender,
                    State: item.State,
                    District: item.District,
                    Guardian_Name: item.Guardian_Name,
                    Addiction_Type: item.Addiction_Type,
                    Addictio_Duration: item.Addiction_Duration,
                    Duration_of_Treatment: item['Duration_of-Treatment'], // Adjusted property name
                    Is_Treatment_Completed: item.Is_Treatment_Completed === true ? "Yes" : "No",
                    Under_Treatment: item.Under_Treatment === true ? "Yes" : "No",
                    Employment_Status: item.Employment_Status === 1 ? "Employed" : "Unemployed",
                    Joining_Date: item.Joining_Date, // Ensure proper formatting
                    Counselling_Count: item.Counselling_Count,
                    Counsellor_Name: item.Counsellor_Name,
                }));

                setData(mappedData);
                setFilteredData(mappedData); // Initialize filtered data with all data
                setTotalData(mappedData.length);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData(); // Call fetchData only once when the component mounts

    }, []); // Empty dependency array ensures this effect runs only once


    const onPaginationChange = (page: number) => {
        setPageIndex(page - 1);
    };

    const onSelectChange = (value: number) => {
        setPageIndex(0);
    };

    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const handleDownloadJSON = () => {
        const jsonContent = JSON.stringify(filteredData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table_data.json');

        document.body.appendChild(link);
        link.click();

        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        }, 0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        // Filter data based on search term
        const filtered = data.filter(
            (person) =>
                person.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.Addiction_Type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.State.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.Gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.Joining_Date.toLowerCase().includes(searchTerm.toLowerCase())||
                person.District.toLowerCase().includes(searchTerm.toLowerCase())||
                person.Guardian_Name.toLowerCase().includes(searchTerm.toLowerCase())||
                person.Counsellor_Name.toLowerCase().includes(searchTerm.toLowerCase())||
                person.Duration_of_Treatment.toString().includes(searchTerm.toLowerCase())||
                person.Addictio_Duration.toString().includes(searchTerm.toLowerCase())||
                person.Counselling_Count.toString().includes(searchTerm.toLowerCase())||
                person.Age.toString().includes(searchTerm.toLowerCase())


        );

        setFilteredData(filtered);
        setTotalData(filtered.length);
        setPageIndex(0);
    };
    const [cards, setCards] = useState<CardData[]>([]);
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${Base_Url}/NMK?NMK_Code=${NMK_Code}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                setCards(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCards();
    }, []);

    useEffect(() => {
        if (dataSubmitted) {
            console.log("first")
            
        }
    }, [dataSubmitted]);


    return (

        <div>
            {cards.map((card, index) => (
                <div key={index} className="max-w-7xl rounded overflow-hidden shadow-lg mb-4">
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="w-full lg:w-1/2">
                            <img className="w-full h-full object-cover" src={card.ImageURL} alt="card header" />
                        </div>
                        <div className="w-full lg:w-1/2 px-6 py-4">
                            <h1 className="text-cyan-600 font-bold mb-2">{card.Name}</h1>
                            <div className="flex items-center mb-2">
                                <IoMdPin className="h-5 w-5 mr-1 " />
                                <h2 className="text-sm lg:text-lg">{card.Address}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <IoMdPerson className="h-5 w-5 mr-1 " />
                                <h2 className="font-semibold text-sm lg:text-lg">{card.Owner_Name}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <HiMail className="h-5 w-5 mr-1 " />
                                <a href={`mailto:${card.Email}`} className="text-sm lg:text-lg">{card.Email}</a>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-1 " />
                                <a href={`tel:${card.Contact_Number}`} className="text-sm lg:text-lg">{card.Contact_Number}</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }


            <div className="flex-grow">
                <div className='flex justify-between mb-2'>
                    <h3 className="font-semibold">Nasha Mukti Kendra Patient</h3>
                    <Button variant='solid' onClick={openDialog}>Add User</Button>
                    {dialogIsOpen && <UserRegisteration dialogIsOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} setDataSubmitted={setDataSubmitted} />}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span></span>
                    <div className="flex items-center ">
                        <Input
                            className="mr-2"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button
                            className="mr-2 px-3 py-4"
                            variant="solid"
                            icon={<HiOutlineInboxIn />}
                            onClick={handleDownloadJSON}
                        ></Button>
                       
                    </div>
                </div>
                <Table>
                    <THead>
                        <Tr>
                            {columns.map((column, index) => (
                                <Th key={index}>
                                    <div className="cursor-pointer select-none" onClick={() => setSorting(column.accessorKey)}>
                                        {column.header}
                                        {sorting === column.accessorKey && <Sorter />}
                                    </div>
                                </Th>
                            ))}
                        </Tr>
                    </THead>
                    <TBody>
                        {loading ? (
                            <Tr>
                                <Td colSpan={columns.length}>Loading...</Td>
                            </Tr>
                        ) : (
                            filteredData.map((person, index) => (
                                <Tr key={index}>
                                    <Td>{person.Name}</Td>
                                    <Td>{person.Age}</Td>
                                    <Td>{person.Gender}</Td>
                                    <Td>{person.State}</Td>
                                    <Td>{person.District}</Td>
                                    <Td>{person.Guardian_Name}</Td>
                                    <Td>{person.Addiction_Type}</Td>
                                    <Td>{person.Addictio_Duration}</Td>
                                    <Td>{person.Duration_of_Treatment}</Td>
                                    <Td>{person.Is_Treatment_Completed}</Td>
                                    <Td>{person.Under_Treatment}</Td>
                                    <Td>{person.Employment_Status}</Td>
                                    <Td>{person.Joining_Date}</Td>
                                    
                                    
                                    <Td>{person.Counselling_Count}</Td>
                                    <Td>{person.Counsellor_Name}</Td>
                                    
                                    
                                    
                                    
                                    
                                    
                                </Tr>
                            ))
                        )}
                    </TBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <Pagination
                        pageSize={pageSizeOption[0].value}
                        currentPage={pageIndex + 1}
                        total={totalData}
                        onChange={onPaginationChange}
                    />
                    <div style={{ minWidth: 130 }}>
                        <Select
                            size="sm"
                            isSearchable={false}
                            value={pageSizeOption.find((option) => option.value === pageSizeOption[0].value)}
                            options={pageSizeOption}
                            onChange={(option) => onSelectChange(option?.value || 0)}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SimpleTable;
