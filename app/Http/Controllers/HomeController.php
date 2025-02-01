<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::with('likes', 'user', 'categories')->paginate(5);

        return Inertia::render('Home', [
            'posts' => $posts->through(fn($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'image' => $post->image,
                'published_at' => $post->published_at,
                'user' => [
                    'name' => $post->user->name,
                    'profile' => $post->user->profile,
                ],
                'categories' => $post->categories,
                'likes_count' => $post->likes->count(), 
                'is_liked' => auth()->user() ? $post->likes->contains('user_id', auth()->id()) : false,
            ]),
        ]);
    }

    public function dashboard()
    {
        return Inertia('Dashboard');
    }
}
