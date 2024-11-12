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
        // Paginate the results, fetching 10 templates per page
        $templates = MessageTemplate::with('user:id,name')
            ->where('user_id', Auth::id()) // Filter by the logged-in user's ID
            ->latest()
            ->paginate(5); // Adjust the number of items per page as needed

        // Return paginated templates to Inertia, including pagination metadata
        return Inertia::render('MessageTemplates/Index', [
            'templates' => $templates->items(), // Only pass the current page of templates
            'pagination' => [
                'total' => $templates->total(),
                'per_page' => $templates->perPage(),
                'current_page' => $templates->currentPage(),
                'last_page' => $templates->lastPage(),
                'from' => $templates->firstItem(),
                'to' => $templates->lastItem(),
                'prev_page_url' => $templates->previousPageUrl(),
                'next_page_url' => $templates->nextPageUrl(),
            ],
        ]);
    }


    /**
     * Store a newly created message template in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'content' => 'required|string|max:160',
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
            'name' => 'required|string|max:50',
            'content' => 'required|string|max:160',
        ]);

        $messageTemplate->update($validated);

        return redirect(route('message-templates.index'));
    }

    public function destroy(MessageTemplate $messageTemplate)
    {
        $messageTemplate->delete();

        return redirect(route('message-templates.index'));
    }

    public function search(Request $request)
    {
        $query = $request->input('name', '');
        $templates = MessageTemplate::where('user_id', Auth::id())
            ->where('name', 'like', "%{$query}%")
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'content']); // Only select needed fields

        return response()->json($templates);
    }

}
