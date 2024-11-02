// resources/js/MessageTemplates/Index.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TemplateModal from './TemplateModal';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, templates, pagination }) {
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Open the modal for creating or editing a template
    const openModal = (template = null) => {
        setEditingTemplate(template);
        setShowModal(true);
    };

    // Close the modal and reset the editing state
    const closeModal = () => {
        setEditingTemplate(null);
        setShowModal(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // If you're implementing server-side search, you can make an API call here.
    };

    // Filter templates based on search term
    const filteredTemplates = templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Message Templates" />

            <div className="container mx-auto p-4">
                {/* Search Bar and Create Button */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border rounded-lg px-4 py-2 w-1/3"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => openModal()}
                    >
                        Create New Template
                    </button>
                </div>

                {/* Table */}
                <table className="table-auto w-full mt-4 border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Content</th>
                            <th className="px-4 py-2 border">Created By</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map(template => (
                                <tr key={template.id}>
                                    <td className="px-4 py-2 border">{template.name}</td>
                                    <td className="px-4 py-2 border">{template.content}</td>
                                    <td className="px-4 py-2 border">{template.user.name}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                            onClick={() => openModal(template)}
                                        >
                                            Edit
                                        </button>
                                        <Link
                                            href={route('message-templates.destroy', template.id)}
                                            method="delete"
                                            as="button"
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 border text-center" colSpan="4">
                                    No templates found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div>From {pagination.from} to {pagination.to} of {pagination.total} records</div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={pagination.prev_page_url || '#'}
                            className="px-2 py-1 border rounded"
                            disabled={!pagination.prev_page_url}
                        >
                            &laquo;
                        </Link>
                        <span>Page {pagination.current_page} of {pagination.last_page}</span>
                        <Link
                            href={pagination.next_page_url || '#'}
                            className="px-2 py-1 border rounded"
                            disabled={!pagination.next_page_url}
                        >
                            &raquo;
                        </Link>
                    </div>
                </div>
            </div>

            {/* Template Modal */}
            <TemplateModal
                show={showModal}
                onClose={closeModal}
                template={editingTemplate}
            />
        </AuthenticatedLayout>
    );
}
