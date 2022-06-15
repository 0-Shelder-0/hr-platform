<?php

namespace App\Http\Controllers;

use App\Models\StudyDirection;

class StudyDirectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    /**
     * Create study direction
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $name = request('name');

        $studyDirection = new StudyDirection();
        $studyDirection->name = $name;
        $studyDirection->save();

        return response()->json(['message' => 'Study direction have been added with id ' . $studyDirection->id]);
    }
}
