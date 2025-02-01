<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia('auth/Signup');
    }
    public function store(Request $request)
    {
        $request->validate([
            'profile' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6'
        ]);

        if ($request->hasFile('profile')) {
            $path = $request->file('profile')->store('profiles', 'public');
        }
        $user = User::create([
            'profile' => $path ?? null,
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect()->route('dashboard');
    }
}
