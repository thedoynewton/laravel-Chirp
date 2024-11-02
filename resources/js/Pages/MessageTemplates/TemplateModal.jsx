// resources/js/Pages/MessageTemplates/TemplateModal.jsx
import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function TemplateModal({ show, onClose, template = {} }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: template?.name || '',     // Default to an empty string if template is null
        content: template?.content || '', // Default to an empty string if template is null
    });

    useEffect(() => {
        // Update form data when a new template is passed in for editing
        if (template) {
            setData({
                name: template.name || '',   // Provide empty string as a default
                content: template.content || '', // Provide empty string as a default
            });
        }
    }, [template]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = template?.id
            ? route('message-templates.update', template.id)
            : route('message-templates.store');
        const action = template?.id ? put : post;

        action(routeName, { onSuccess: () => { reset(); onClose(); } });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">{template?.id ? 'Edit Template' : 'Create Template'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Template Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Content</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        ></textarea>
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {template?.id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
