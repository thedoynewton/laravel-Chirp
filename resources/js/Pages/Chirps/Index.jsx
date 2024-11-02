// resources/js/Chirps/Index.jsx
import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import Chirp from '@/Components/Chirp';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import axios from 'axios';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
    const [templateSuggestions, setTemplateSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState('');

    // Fetch template suggestions when the query changes and starts with '/'
    useEffect(() => {
        if (query.startsWith('/')) {
            const templateName = query.slice(1); // Remove the '/' for search
            // Fetch templates from the server based on query
            axios.get(route('templates.search', { name: templateName })).then(response => {
                setTemplateSuggestions(response.data);
                setShowSuggestions(true);
            });
        } else {
            setShowSuggestions(false);
        }
    }, [query]);

    // Handle input change in the text area
    const handleInputChange = (e) => {
        const value = e.target.value;
        setData('message', value);

        // Check if the input includes `/` to trigger template suggestions
        const lastSlashIndex = value.lastIndexOf('/');
        if (lastSlashIndex !== -1 && lastSlashIndex === value.length - 1) {
            setQuery('/');
        } else if (lastSlashIndex !== -1) {
            setQuery(value.slice(lastSlashIndex));
        } else {
            setQuery('');
        }
    };

    // Handle the click on a template suggestion
    const handleSuggestionClick = (template) => {
        const updatedMessage = data.message.replace(query, template.content);
        setData('message', updatedMessage);
        setShowSuggestions(false); // Hide suggestions after selection
    };

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Chirps" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={handleInputChange}
                    ></textarea>
                    
                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                        <div className="bg-white border rounded mt-2 shadow-lg max-h-48 overflow-y-auto">
                            {templateSuggestions.map(template => (
                                <div
                                    key={template.id}
                                    onClick={() => handleSuggestionClick(template)}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                >
                                    {template.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
