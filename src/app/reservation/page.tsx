'use client'
import { useEffect, useState } from "react";
import axios from '../utils/axios';
import SeatSelector from "../components/SeatSelector";
import Image from "next/image";
import { redirect } from "next/navigation";

enum BookingStep {
    MovieSelection,
    Availability,
    Reservation,
    Confirmation
}

interface FormData {
    email: string;
    auditorium: string;
    time: string;
    seats: number[];
}

export default function Reservation() {
    const accessToken = window.localStorage.getItem('accessToken');
    const [step, setStep] = useState<BookingStep>(BookingStep.MovieSelection);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        auditorium: '',
        time: '',
        seats: [],
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!accessToken) {
            redirect('/login');
        }
    }, [accessToken]);

    const validateMovieSelection = () => {
        // Validación para la selección de película
        return true;
    };

    const validateAvailability = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.auditorium) errors.auditorium = "La sala es obligatoria.";
        if (!formData.time) errors.time = "El horario es obligatorio.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateReservation = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.email) errors.email = "El email es obligatorio.";
        if (formData.seats.length === 0) errors.seats = "Debes seleccionar al menos un asiento.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextStep = () => {
        if (step === BookingStep.MovieSelection) {
            if (validateMovieSelection()) {
                setStep(BookingStep.Availability);
            }
        } else if (step === BookingStep.Availability) {
            if (validateAvailability()) {
                setStep(BookingStep.Reservation);
            }
        } else if (step === BookingStep.Reservation) {
            if (validateReservation()) {
                handleSubmit();
            }
        }
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, BookingStep.MovieSelection));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/booking', { ...formData });
            setStep(BookingStep.Confirmation);
        } catch (error) {
            console.error(error);
            // Manejo de errores
        }
    };

    const handleSeatSelect = (newSeats: number[]) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            seats: newSeats,
        }));
    };

    const handleResetReservation = () => {
        setFormData({
            email: '',
            auditorium: '',
            time: '',
            seats: [],
        });
        setStep(BookingStep.MovieSelection);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative h-screen w-screen">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <Image
                        src="/poster.jpg"
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 w-full h-full object-cover opacity-35"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <div className="p-4 bg-slate-600 shadow-lg rounded-lg w-full max-w-lg">
                        <button className='bg-yellow-600 hover:bg-yellow-700 p-3 rounded-md mb-6' onClick={handleResetReservation}>Reset Reservation</button>
                        {step === BookingStep.MovieSelection && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl mb-4">Movie: Kung Fu Panda 4</h1>
                                <button onClick={handleNextStep} className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                    Siguiente
                                </button>
                            </div>
                        )}

                        {step === BookingStep.Availability && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl mb-4">Disponibilidad de Salas y Horarios</h1>
                                <label className="block mb-2">Sala:</label>
                                <select
                                    name="auditorium"
                                    value={formData.auditorium}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border rounded w-full text-black"
                                >
                                    <option value="">Selecciona una sala</option>
                                    <option value="Sala A">Sala A</option>
                                    <option value="Sala B">Sala B</option>
                                    <option value="Sala C">Sala C</option>
                                </select>
                                {errors.auditorium && <p className="text-red-500">{errors.auditorium}</p>}
                                <label className="block mb-2">Horario:</label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border rounded w-full text-black"
                                >
                                    <option value="">Selecciona un horario</option>
                                    <option value="3">3:00 PM</option>
                                    <option value="5">5:00 PM</option>
                                    <option value="7">7:00 PM</option>
                                </select>
                                {errors.time && <p className="text-red-500">{errors.time}</p>}
                                <div className="flex gap-2 mt-4">
                                    <button onClick={handlePreviousStep} className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
                                        Anterior
                                    </button>
                                    <button onClick={handleNextStep} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === BookingStep.Reservation && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl mb-4">Reserva tu Asiento</h1>
                                <label className="block mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mb-4 p-2 border rounded w-full text-black"
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                                <label className="block mb-2">Asiento:</label>
                                <SeatSelector onSeatSelect={handleSeatSelect} auditorium={formData.auditorium} />
                                {errors.seats && <p className="text-red-500">{errors.seats}</p>}
                                <div className="flex gap-2 mt-4">
                                    <button onClick={handlePreviousStep} className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded">
                                        Anterior
                                    </button>
                                    <button onClick={handleNextStep} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === BookingStep.Confirmation && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-2xl mb-4">Confirmación de Reserva</h1>
                                <p>Email: {formData.email}</p>
                                <p>Sala: {formData.auditorium}</p>
                                <p>Horario: {formData.time}</p>
                                <p>Asiento: {formData.seats.join(", ")}</p>
                                <p>¡Gracias por tu reserva!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
