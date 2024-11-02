<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MessageTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MessageTemplateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('MessageTemplates/Index', [
            'templates' => MessageTemplate::with('user:id,name')
                ->where('user_id', Auth::id()) // Filter by the logged-in user's ID
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Store a newly created message template in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $request->user()->messageTemplates()->create($validated);

        return redirect(route('message-templates.index'));
    }

    /**
     * Update the specified message template in storage.
     */
    public function update(Request $request, MessageTemplate $messageTemplate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $messageTemplate->update($validated);

        return redirect(route('message-templates.index'));
    }

    public function destroy(MessageTemplate $messageTemplate)
    {
        $messageTemplate->delete();

        return redirect(route('message-templates.index'));
    }
}
