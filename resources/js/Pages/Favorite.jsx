import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Favorite = ({ postUserLiked }) => {
 
    const handleLike = (e, id) => {
        e.preventDefault();
        router.post(`/post/${id}/like`, {}, { preserveScroll: true });
    };

    console.log(postUserLiked);

    return (
        <div className="max-w-screen-xl mx-auto p-5 mt-5 grid grid-cols-3 max-sm:grid-cols-1 gap-4">
            {postUserLiked.map(
                (like) =>
                    like.post && (
                        <div
                            key={like.post.id}
                            className="border border-gray-200"
                        >
                            <div>
                                <img
                                    src={`/storage/${like.post.image}`}
                                    alt=""
                                />
                            </div>
                            <div className="flex items-center justify-between px-5 py-2">
                                <p className="text-sm font-medium text-orange-500">
                                    {new Date(
                                        like.post.published_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>

                                <button
                                    className="flex items-center gap-2"
                                    onClick={(e) => handleLike(e, like.post.id)}
                                >
                                    <i
                                        className="fa fa-heart mt-0.5 text-red-400"
                                    ></i>
                                </button>
                            </div>

                            <div className="px-5 py-2">
                                <Link
                                    href={`/blog-detailts/show/${like.post.id}`}
                                    className="text-lg font-semibold text-slate-700"
                                >
                                    {like.post.title}
                                </Link>
                            </div>

                            <div className="px-5 py-2 flex items-center gap-2">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={`/storage/${like.post.user.profile}`}
                                    alt=""
                                />
                                <h1 className="text-sm font-medium text-slate-700">
                                    {like.post.user.name}
                                </h1>
                            </div>
                        </div>
                    )
            )}
        </div>
    );
};

export default Favorite;
