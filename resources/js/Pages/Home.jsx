import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

const Home = ({ posts }) => {
    const [likedPosts, setLikedPosts] = useState(
        posts.data.reduce((acc, post) => {
            acc[post.id] = post.is_liked;
            return acc;
        }, {})
    );

    const handleLike = (e, id) => {
        e.preventDefault();

        // Toggle like state
        setLikedPosts((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id],
        }));

        // Send request to Laravel
        router.post(`/post/${id}/like`, {}, { preserveScroll: true });
    };

    return (
        <div className="max-w-screen-xl mx-auto p-5 mt-5 grid grid-cols-3 max-sm:grid-cols-1 gap-4">
            {posts.data.map((post) => (
                <div key={post.id} className="border border-gray-200">
                    <div>
                        <img src={`/storage/${post.image}`} alt="" />
                    </div>
                    <div className="flex items-center justify-between px-5 py-2">
                        <p className="text-sm font-medium text-orange-500">
                            {new Date(post.published_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        </p>
                        <button
                            className="flex items-center gap-2"
                            onClick={(e) => handleLike(e, post.id)}
                        >
                            <span className="font-medium text-sm text-orange-500">
                                {post.likes_count}
                            </span>
                            <i
                                className={`fa fa-heart mt-0.5 ${
                                    likedPosts[post.id]
                                        ? "text-red-400"
                                        : "text-gray-500"
                                }`}
                            ></i>
                        </button>
                    </div>

                    <div className="px-5 py-2">
                        <Link
                            href={`/blog-detailts/show/${post.id}`}
                            className="text-lg font-semibold text-slate-700"
                        >
                            {post.title}
                        </Link>
                    </div>

                    <div className="px-5 py-2 flex items-center gap-2">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={`/storage/${post.user.profile}`}
                            alt=""
                        />
                        <h1 className="text-sm font-medium text-slate-700">
                            {post.user.name}
                        </h1>
                    </div>

                    <div className="px-5 py-2">
                        {post.categories.map((category) => (
                            <button
                                className="text-sm text-white bg-orange-500 px-4 py-1 rounded-md"
                                key={category.id}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
