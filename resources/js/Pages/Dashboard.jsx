// resources/js/Pages/Dashboard.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CustomButton from '../Components/CustomButton';
import CustomCard from '../Components/CustomCard';

export default function Dashboard() {
    const handleButtonClick = () => {
        alert("Button clicked!");
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CustomCard title="Welcome to Your Dashboard">
                                You're logged in!
                            </CustomCard>
{/* 
                            <CustomButton onClick={handleButtonClick} color="primary">
                                Click Me
                            </CustomButton> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
