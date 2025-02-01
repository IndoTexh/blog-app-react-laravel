import { useState, useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const Post = ({ categories }) => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const user_id = usePage().props.auth.user.id;
    const route = useRoute();

    const { data, setData, post, errors, processing } = useForm({
        user_id: user_id,
        title: "",
        image: image,
        content: content,
        published_at: "",
        featured: false,
        categories: [],
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setData("image", file);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setSelectedCategories(selectedOptions);
        setData("categories", selectedOptions);
    };

    function submit(e) {
        e.preventDefault();
        post(route("post"));
    }

    return (
        <>
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
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto max-w-md rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="font-medium">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => {
                                setContent(newContent);
                                setData("content", newContent);
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2 mb-4">
                            <label
                                htmlFor="published_at"
                                className="font-medium"
                            >
                                Published at
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
                        </div>

                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="categories" className="font-medium">
                                Categories
                            </label>
                            <select
                                id="categories"
                                multiple
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                className="border border-gray-300 p-2 rounded-md focus:outline-2 focus:outline-orange-500"
                            >
                                {categories.map((category) => (
                                    <option
                                      key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))}
                            </select>
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
                        {processing ? "Processing..." : "Post"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Post;
