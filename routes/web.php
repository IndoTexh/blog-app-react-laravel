<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/blog-detailts/show/{post}', [PostController::class, 'show'])->name('show');

Route::middleware('guest')->group(function () {

    Route::get('/login', [AuthController::class, 'create'])
        ->name('login');

    Route::post('/login', [AuthController::class, 'store']);

    Route::get('/register', [RegisterController::class, 'create'])
        ->name('register');

    Route::post('/register', [RegisterController::class, 'store']);

    Route::get('/forgot-password', [PasswordResetController::class, 'forgotPassword'])
        ->name('password.request');

    Route::post('/forgot-password', [PasswordResetController::class, 'validateEmail'])
        ->name('password.email');

    Route::get('/reset-password/{token}', [PasswordResetController::class, 'resetForm'])
        ->name('password.reset');

    Route::post('/reset-password', [PasswordResetController::class, 'updatePassword'])
        ->name('password.update');
});

Route::middleware('auth')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');

    Route::get('/dashboard', [HomeController::class, 'dashboard'])
        ->middleware(['verified', 'password.confirm'])->name('dashboard');

    Route::get('/email/verify', [EmailVerificationController::class, 'notice'])
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware('signed')->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resendEmail'])
        ->middleware(['throttle:6,1'])
        ->name('verification.send');

    Route::get('/confirm-password', [PasswordResetController::class, 'confirm'])
        ->name('password.confirm');

    Route::post('/confirm-password', [PasswordResetController::class, 'checkPassword'])
        ->middleware('throttle:6,1')
        ->name('checkPassword');

    Route::get('/profile', [ProfileController::class, 'show'])
        ->middleware(['password.confirm', 'verified'])
        ->name('user.profile');

    Route::put('/profile', [ProfileController::class, 'updateInfo'])
        ->name('update.profile-info');

    Route::patch('/profile', [ProfileController::class, 'updatePassword'])
        ->name('update-profile-pass');

    Route::delete('/delete-account', [ProfileController::class, 'deleteAccount'])
        ->middleware('verified')
        ->name('delete-account');

    Route::get('/favorite', [ProfileController::class, 'favorite'])
        ->middleware(['verified', 'password.confirm'])
        ->name('favorite');

    Route::get('/list-post', [PostController::class, 'list'])->name('list');
    Route::get('/post', [PostController::class, 'index'])->name('post');
    Route::post('/post', [PostController::class, 'store']);
    Route::get('/post-edit/{post}', [PostController::class, 'edit'])->name('edit');
    Route::put('/post-edit/{post}', [PostController::class, 'update']);
    Route::delete('/post-delete/{post}', [PostController::class, 'destroy'])->name('destroy');
    Route::post('/post/{postID}/like', [PostController::class, 'like'])->name('like');
});
