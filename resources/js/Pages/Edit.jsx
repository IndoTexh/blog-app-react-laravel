import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const Edit = ({ posts, categories }) => {
    const editor = useRef(null);
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState({
        file: null,
        preview: `/storage/${posts.image}`,
    });
    const route = useRoute();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageData({
                file: file,
                preview: URL.createObjectURL(file),
            });
            setData("image", file);
        } else {
            setData("image", null);
        }
    };

    const { data, setData, post, errors, processing } = useForm({
        user_id: posts.user.id,
        title: posts.title,
        image: null,
        content: posts.content,
        published_at: posts.published_at,
        featured: posts.featured,
        categories: posts.categories.map((category) => category.id),
        _method: "PUT",
    });

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setData("categories", selectedOptions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("edit", { post: posts.id }));
    };

    return (
        <div className="max-w-screen-xl mx-auto p-5 mt-5">
            <form onSubmit={submit}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="title" className="font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-2 focus:outline-orange-500"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">
                            {errors.title}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="image" className="font-medium">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-300 p-2 rounded-md"
                    />
                    {imageData.preview && (
                        <div className="mt-2">
                            <img
                                src={imageData.preview}
                                alt="Preview"
                                className="w-full h-auto max-w-md rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    {errors.image && (
                        <span className="text-red-500 text-sm">
                            {errors.image}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="content" className="font-medium">
                        Content
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={data.content}
                        onChange={(newContent) =>
                            setData("content", newContent)
                        }
                    />
                    {errors.content && (
                        <span className="text-red-500 text-sm">
                            {errors.content}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="published_at" className="font-medium">
                            Published At
                        </label>
                        <input
                            type="date"
                            id="published_at"
                            value={data.published_at}
                            onChange={(e) =>
                                setData("published_at", e.target.value)
                            }
                            className="border border-gray-300 p-2 rounded-md focus:outline-2 focus:outline-orange-500"
                        />
                        {errors.published_at && (
                            <span className="text-red-500 text-sm">
                                {errors.published_at}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="categories" className="font-medium">
                            Categories
                        </label>
                        <select
                            id="categories"
                            multiple
                            value={data.categories}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 p-2 rounded-md focus:outline-2 focus:outline-orange-500"
                        >
                            {posts.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                        {errors.categories && (
                            <span className="text-red-500 text-sm">
                                {errors.categories}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="featured" className="font-medium">
                            Featured
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={data.featured}
                                onChange={(e) =>
                                    setData("featured", e.target.checked)
                                }
                                className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-2 focus:ring-orange-500"
                            />
                            <span className="text-gray-700">
                                Mark as Featured
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    disabled={processing}
                    type="submit"
                    className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                      ${
                          processing
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300"
                      }`}
                >
                    {processing ? "Processing..." : "Update Post"}
                </button>
            </form>
        </div>
    );
};

export default Edit;
