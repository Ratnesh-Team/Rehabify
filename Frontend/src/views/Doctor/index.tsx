import React, { useState, useEffect } from 'react';
import { Card, Pagination, Input, Dialog, Button } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import CardData from './types';
import '@fortawesome/fontawesome-free/css/all.css';


interface Props { }

const Controlled: React.FC<Props> = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState<CardData | null>(null);
    const [blur, setBlur] = useState(false);

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleCardClick = (doctor: CardData) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseDialog = () => {
        setSelectedDoctor(null);
    };
    useEffect(() => {
        if (selectedDoctor) {
            setBlur(true);
        } else {
            setBlur(false);
        }
    }, [selectedDoctor]);

    return (
        <div style={blur ? { filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' } : {}}>
            <h1 className="text-3xl font-bold mb-6">Doctor Appointment</h1>
            {/* Search Input */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow"></div> {/* Empty div to push the search input to the right */}
                <div > {/* Adjust the width of the search input container */}
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-4"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center">
                {/* Pass searchTerm to TreatmentCentres component */}
                <TreatmentCentres page={page} onPageChange={onPageChange} searchTerm={searchTerm} onCardClick={handleCardClick} />
            </div>
            {selectedDoctor && (
                <Dialog isOpen={true} onClose={handleCloseDialog} >
                    {/* Render dialog content here */}
                    <div className="p-4">
                        <div className='flex justify-between'>

                            <img src={selectedDoctor.ImageURL} alt={selectedDoctor.Name} className="square-full h-32 w-32 mb-4 rounded" />
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-bold mb-2">{selectedDoctor.Name}</h2>
                                <p className="mb-2">
                                    <i className="fas fa-stethoscope"></i> Specialization: {selectedDoctor.Specialization}
                                </p>
                                <p className="mb-2">
                                    <i className="fas fa-envelope"></i> Email: {selectedDoctor.Email}
                                </p>
                                <p className="mb-2">
                                    <i className="fas fa-phone"></i> Contact Number: {selectedDoctor.ContactNumber}
                                </p>
                            </div>
                        </div>
                        <p className="mb-2 font-bold">{selectedDoctor.Description}</p>


                        <p className="mb-2">
                            <i className="fas fa-map-marker-alt"></i> Address: {selectedDoctor.ClinicAddress}
                        </p>
                        <div className='flex flex-row-reverse'>
                            <a href="https://wa.me/?text=I'm%20interested%20in%20booking%20an%20appointment" target="_blank" rel="noopener noreferrer">
                                <Button variant="solid">Book Appointment</Button>
                            </a>
                        </div>
                    </div>
                </Dialog>
            )}

        </div>
    );
};

const TreatmentCentres: React.FC<{ page: number; onPageChange: (newPage: number) => void; searchTerm: string; onCardClick: (doctor: CardData) => void }> = ({
    page,
    onPageChange,
    searchTerm,
    onCardClick,
}) => {
    const [cards, setCards] = useState<CardData[]>([]);
    const pageSize = 6;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(Base_Url + '/doctor');
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

    // Filter cards based on multiple search criteria
    const filteredCards = cards.filter((card) => {
        const search = searchTerm.toLowerCase();
        return (
            card.Name.toLowerCase().includes(search) ||
            card.ClinicAddress.toLowerCase().includes(search) ||
            card.Email.toLowerCase().includes(search) ||
            card.ContactNumber.toString().includes(search) ||
            card.Specialization.toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredCards.length / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedCards = filteredCards.slice(startIndex, endIndex);

    return (
        <>
            <div className="flex flex-wrap justify-around gap-6">
                {displayedCards.map((card, index) => (
                    <div key={index} className="max-w-xs mb-6">
                        {/* Use onClick event handler to handle card click */}
                        <div onClick={() => onCardClick(card)} className="max-w-xs mb-6 cursor-pointer">
                            <Card
                                clickable
                                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={
                                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden" style={{ width: '100%', height: '200px' }}>
                                        <img src={card.ImageURL} alt="card header" />
                                    </div>


                                }
                                footer={
                                    <div className='flex flex-row-reverse'>
                                        <span className="font-bold">Book Appointment </span>
                                    </div>
                                }
                                headerClass="p-0"
                                footerBorder={true}
                                headerBorder={true}
                            >
                                <span>
                                    <h3 className="text-emerald-600 font-bold ">{card.Name}</h3>
                                </span>
                                <p className="text-sm"> <i className="fas fa-stethoscope"></i>{card.Specialization}</p>
                                <p className="font-semibold">{card.Description}</p>
                                <p className="mb-2">
                                    <i className="fas fa-map-marker-alt"></i> Address: {card.ClinicAddress}
                                </p>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                total={totalPages}
                currentPage={page}
                onChange={onPageChange}
            />
        </>
    );
};

export default Controlled;
