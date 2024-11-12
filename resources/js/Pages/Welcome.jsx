import { Link, Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    useEffect(() => {
        // Fade-in effect for the cards
        document.querySelectorAll('.fade-in').forEach((element) => {
            element.classList.add('opacity-100', 'translate-y-0');
        });
    }, []);

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
                {/* Background Boxes */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 opacity-50 rounded-lg animate-float" />
                    <div className="absolute top-20 right-20 w-24 h-24 bg-green-500 opacity-30 rounded-lg animate-float delay-75" />
                    <div className="absolute bottom-16 left-1/3 w-40 h-40 bg-purple-500 opacity-40 rounded-lg animate-float delay-150" />
                    <div className="absolute bottom-10 right-10 w-28 h-28 bg-yellow-500 opacity-20 rounded-lg animate-float delay-200" />
                    <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-red-500 opacity-25 rounded-lg animate-float delay-300" />
                    <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500 opacity-25 rounded-lg animate-float delay-400" />
                </div>

                {/* Overlay Mask */}
                <div className="absolute inset-0 bg-slate-900 opacity-90 z-20 pointer-events-none [mask-image:radial-gradient(transparent,white)]"></div>

                {/* Main Content */}
                <div className="relative z-30 flex flex-col items-center text-center px-6">
                    <h1 className="text-4xl font-bold text-white">Chirp up</h1>
                    <p className="text-cyan-300 mt-2">Don't give up, just.</p>

                    <nav className="mt-6 flex space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-lg text-[#FF2D20] hover:underline transition duration-300 transform hover:scale-105">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-lg text-[#007bff] hover:underline transition duration-300 transform hover:scale-105">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-lg text-[#b9afaf] hover:underline transition duration-300 transform hover:scale-105">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
