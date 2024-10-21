import React, { useState, useEffect } from 'react';
import { Card, Pagination, Input, Dialog, Button, Alert } from '@/components/ui';
import { Base_Url } from '@/configs/app.config';
import CardData from './types';
import '@fortawesome/fontawesome-free/css/all.css';
import AddDoctor from './addDoctor';
import { DoubleSidedImage } from '@/components/shared';
import { getDoctor } from '@/services/DoctorService';

interface Props {}

const Controlled: React.FC<Props> = () => {
    const [dialogIsOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState<CardData | null>(null);
    const [blur, setBlur] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
    };

    const onPageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleCardClick = (doctor: CardData) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseDialog = () => {
        setSelectedDoctor(null);
        setFormData({
            name: '',
            contactNumber: '',
            email: '',
            appointmentDate: '',
            appointmentTime: '',
        })
        setFormErrors({
            name: '',
            contactNumber: '',
            email: '',
            appointmentDate: '',
            appointmentTime: '',
        })
        setShowForm(false);
    };

    useEffect(() => {
        if (selectedDoctor) {
            setBlur(true);
        } else {
            setBlur(false);
        }
    }, [selectedDoctor]);
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        contactNumber: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
    });

    const validateForm = () => {
        const errors: any = {};
        const phoneRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/; // Example: +91-123-456-7890

        if (!formData.name) {
            errors.name = 'required';
        }
        if (!formData.contactNumber) {
            errors.contactNumber = 'required';
        } else if (!phoneRegex.test(formData.contactNumber)) {
            errors.contactNumber = 'Contact number is invalid';
        }
        if (!formData.email) {
            errors.email = 'required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'invalid Email';
        }
        if (!formData.appointmentDate) {
            errors.appointmentDate = 'required';
        }
        if (!formData.appointmentTime) {
            errors.appointmentTime = 'required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Assuming you have an API function to schedule the appointment
            try {
                window.alert("Appointment Booked!");
                console.log('Form submitted:', formData);
                handleCloseDialog()
            } catch (error) {
                console.error('Error scheduling appointment:', error);
            }
        }
    };
    return (
        <div style={blur ? { filter: 'blur(8px)',pointerEvents: 'none', userSelect: 'none' } : {}}>
            <div className="flex flex-col justify end sm:flex-row justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-6">Doctor Appointment</h1>
                </div>
                <div className="flex justify-end mb-2">
                    <Button variant="solid" onClick={openDialog}>
                        Register Doctor
                    </Button>
                </div>
            </div>

            {dialogIsOpen && <AddDoctor dialogIsOpen={dialogIsOpen} setIsOpen={setIsOpen} />}

            {/* Search Input */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow"></div>
                <div>
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
                <TreatmentCentres page={page} onPageChange={onPageChange} searchTerm={searchTerm} onCardClick={handleCardClick} />
            </div>

            {selectedDoctor && (
    <Dialog isOpen={true} onClose={handleCloseDialog}>
        <div className="p-4 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between">
                <img
                    src={selectedDoctor.ImageURL}
                    alt={selectedDoctor.Name}
                    className="flex square-full h-1/3 w-1/3 mb-4 rounded"
                />
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
            <p className="mb-2" style={{ maxHeight: '3.6rem', overflow: 'hidden' }}>
                <i className="fas fa-map-marker-alt"></i> Address: {selectedDoctor.ClinicAddress}
            </p>

            {/* Appointment Form */}
            {showForm && (

<div className="mt-4 border p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
<div className="mt-4">
    <form className="flex flex-col gap-4">
    <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Name*
    {formErrors.name && <span className="text-red-500">{`   (${formErrors.name}*)`}</span>}
    </label>
    <div className="w-64">

    <Input
        type="text"
        name="name"
        
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
    />
    </div>
    
</div>
<div className="mb-4">
    <label className="block text-sm font-medium mb-1">Contact Number*
    {formErrors.contactNumber && <span className="text-red-500">{`   (${formErrors.contactNumber})`}</span>}
    </label>
    <div className="w-64">

    <Input
        type="tel"
        name="contactNumber"
      
        placeholder="+91"
        value={formData.contactNumber}
        onChange={handleChange}
        required
    />
    </div>
</div>
<div className="mb-4">
    <label className="block text-sm font-medium mb-1">Email*
    {formErrors.email && <span className="text-red-500">{`   (${formErrors.email})`}</span>}
    </label>
    <div className="w-64">

    <Input
        type="email"
        name="email"
        
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
    />
    </div>
</div>
<div className="mb-4">
    <label className="block text-sm font-medium mb-1">Appointment Date*
    {formErrors.appointmentDate && <span className="text-red-500">{`   (${formErrors.appointmentDate})`}</span>}
    </label>
    <div className="w-32">

    <Input
        type="date"
        name="appointmentDate"
        
        value={formData.appointmentDate}
        onChange={handleChange}
        required
    />
    </div>
</div>
<div className="mb-4">
    <label className="block text-sm font-medium mb-1">Appointment Time*
    {formErrors.appointmentTime && <span className="text-red-500">{`   (${formErrors.appointmentTime})`}</span>}
    </label>
    <div className="w-32">

    <Input
        type="time"
        name="appointmentTime"
        
        value={formData.appointmentTime}
        onChange={handleChange}
        required
    />
    </div>
</div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Schedule Appointment
        </button>
    </form>
</div>
</div>
            )}

            <div className="flex justify-between mt-4">
                

                {showForm ? <div className="flex justify-end">
                    <Button type="submit" className= 'mr-2'variant="solid" onClick={() => setShowForm(!showForm)}>Close</Button>

                        </div> : <Button variant="solid" onClick={() => setShowForm(!showForm)}>
                    Book Appointment
                </Button>}
                <a
                    href={`https://wa.me/+91${selectedDoctor.ContactNumber}?text=I'm%20interested%20in%20booking%20an%20appointment`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="greenTwoTone">Message on WhatsApp</Button>
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
    const [serverError, setServerError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [cards, setCards] = useState<CardData[]>([]);
    const pageSize = 6;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await getDoctor();
                const responseData = await response.data;
                setCards(responseData.data);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                if (error.message === 'Network Error') {
                    setNetworkError(true);
                } else {
                    setServerError(true);
                }
            }
        };

        fetchCards();
    }, []);

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
        <div>
            {networkError ? (
                <div className="flex flex-col items-center justify-center">
                    <Alert showIcon className="mb-4" type="danger">
                        Network error: Please check your connection.
                    </Alert>
                    <DoubleSidedImage src="/img/others/img-2.png" darkModeSrc="/img/others/img-2-dark.png" alt="Network Error" />
                </div>

            ) : 
            serverError ? (
            <div className='flex flex-col items-center justify-center'>
                <Alert showIcon className="mb-4" type="danger">
                    The server is not running. Please try again later.
                </Alert>
                <DoubleSidedImage
                    src="/img/others/img-2.png"
                    darkModeSrc="/img/others/img-2-dark.png"
                    alt="Access Denied!"
                />
            </div>
        ) : (
        
        <>
            <div className="flex flex-wrap justify-center gap-6">
                {displayedCards.map((card, index) => (
                    <div key={index} className="max-w-xs mb-6">
                        {/* Use onClick event handler to handle card click */}
                        <div onClick={() => onCardClick(card)} className="max-w-xs mb-6 cursor-pointer">
                            <Card
                                clickable
                                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                header={
                                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden" style={{ width: '100%', height: '200px' }}>
                                        <img src={card.ImageURL} alt="card header" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
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
                                <p className="font-semibold" style={{ overflow: 'hidden' }}>{card.Description}</p>
                                <p className="mb-2">
                                    <i className="fas fa-map-marker-alt"></i> Address: {card.ClinicAddress}
                                </p>
                            </Card>
                        </div>

                    </div>

                    <div className="flex justify-center mt-6">
                        <Pagination currentPage={page} total={totalPages} onChange={onPageChange} />
                    </div>
                </>
            )}
        </div>
    );
};





export default Controlled;
