<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia('Profile');
    }
    public function updateInfo(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => [
                'required',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($request->user()->id)
            ]
        ]);

        $request->user()->fill($fields);
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
            $request->user()->sendEmailVerificationNotification();
        }
        $request->user()->save();

        return redirect()->route('user.profile')->with('info_message', 'Your information was updated!');
    }
    public function updatePassword(Request $request)
    {
        $fields = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', 'min:3']
        ]);

        $request->user()->update([
            'password' => Hash::make($fields['password'])
        ]);
        return redirect()->route('user.profile')->with('pass_message', 'Your password was updated!');
    }
    public function deleteAccount(Request $request)
    {
        if (! Hash::check($request->password, $request->user()->password)) {
            return back()->withErrors([
                'password' => ['The provided password does not match our records.']
            ]);
        }

        Auth::logout();

        $user = User::find($request->id);

        if ($user) {
            if ($user->profile) {
                $filePath = $user->profile;
                if (Storage::disk('public')->exists($filePath)) {
                    Storage::disk('public')->delete($filePath);
                }
            }
            $user->delete();
        }

        return redirect()->route('home');
    }
    public function favorite()
    {
        $postUserLiked = PostLike::with([
            'post',
            'post.user' => function ($query) {
                $query->select('id', 'name', 'profile');
            }
        ])->where('user_id', auth()->id())->get();
        return Inertia('Favorite', [
            'postUserLiked' => $postUserLiked
        ]);
    }
}
