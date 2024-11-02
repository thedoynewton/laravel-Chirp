// resources/js/MessageTemplates/Index.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TemplateModal from './TemplateModal';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, templates }) {
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);

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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Message Templates" />

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Message Templates</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => openModal()}
                >
                    Create New Template
                </button>

                <table className="table-auto w-full mt-4 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Content</th>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map(template => (
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
                        ))}
                    </tbody>
                </table>
            </div>

            <TemplateModal
                show={showModal}
                onClose={closeModal}
                template={editingTemplate}
            />
        </AuthenticatedLayout>
    );
}
