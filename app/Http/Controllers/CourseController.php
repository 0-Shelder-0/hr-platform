<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Mentor;
use App\Models\User;
use App\Models\UserCourse;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    /**
     * Create course
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $title = request('title');
        $description = request('description');
        $study_direction_id = request('study_direction_id');
        $user = auth()->user();
        $mentor = Mentor::where('user_id', $user->id)->first();

        $course = new Course();
        $course->title = $title;
        $course->description = $description;
        $course->study_direction_id = $study_direction_id;
        $course->mentor_id = $mentor->id;
        $course->save();

        return response()->json(['message' => 'Course have been added with id ' . $course->id]);
    }

    /**
     * Set user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function setUser()
    {
        $user_id = request('user_id');
        $course_id = request('course_id');

        $userCourse = new UserCourse();
        $userCourse->user_id = $user_id;
        $userCourse->course_id = $course_id;
        $userCourse->save();

        $user = User::where('id', $user_id)->first();

        return response()->json(['message' => 'Course set for user "' . $user->name . '"']);
    }
}
