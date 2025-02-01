<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\PostLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        return Inertia('Post', [
            'categories' => Category::all()
        ]);
    }
    public function show(Post $post)
    {
        $post->load(['user:id,name,profile', 'categories:title']);
        return Inertia('Show', [
            'post' => $post
        ]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'user_id' => 'required',
            'title' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'content' => 'required',
            'published_at' => 'required',
            'featured' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
        }

        $post = Post::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'image' => $path ?? null,
            'content' => $request->content,
            'published_at' => $request->published_at,
            'featured' => $request->featured,
            'categories' => $request->categories
        ]);
        $post->categories()->attach($request->categories);

        return redirect()->route('home');
    }
    public function list()
    {
        $posts = Post::with('categories')->paginate(10);
        return Inertia('List', compact('posts'));
    }
    public function edit(Post $post)
    {
        $post->load(['categories:id,title', 'user:id']);
        return Inertia('Edit', [
            'posts' => $post,
            'categories' => Category::all()
        ]);
    }
    public function update(Request $request, Post $post)
    {
        
        $attributes = $request->validate([
            'user_id' => 'required',
            'title' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'content' => 'required',
            'published_at' => 'required',
            'featured' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $attributes['image'] = $path;
        } else {
            $attributes['image'] = $post->image;
        }


        $post->update($attributes);
        $post->categories()->sync($request->categories);

        return redirect()->route('home');
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return back()->with('message', 'The post was deleted!');
    }
    public function like($postID)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postID);

        $existingLike = PostLike::where('user_id', $user->id)
        ->where('post_id', $postID)
        ->first();

        if($existingLike) {
            $existingLike->delete();
        } else {
            PostLike::create([
                'user_id' => $user->id,
                'post_id' => $postID
            ]);
        }
        return redirect()->back();
    }
    
}
