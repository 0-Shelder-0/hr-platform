<?php

namespace App\Http\Controllers;

use App\Models\Mentor;

class MentorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    /**
     * Create mentor
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $user = auth()->user();

        $mentor = Mentor::where('user_id', $user->id)->first();
        if ($mentor == null) {
            $mentor = new Mentor();
            $mentor->user_id = $user->id;
            $mentor->save();
        }

        return response()->json(['message' => 'Mentor has been added with id ' . $mentor->id]);
    }
}
