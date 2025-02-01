import { Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const List = ({ posts }) => {
    const route = useRoute();
    const { delete: destroy } = useForm();
    const message = usePage().props;
    function submit(e, id) {
        e.preventDefault();
        if (confirm("Are you sure want to delete?")) {
            destroy(route("destroy", id));
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto p-5 mt-5">
            {message.email_message && (
                <p className="text-orange-500 text-sm mt-2 mb-2 font-semibold">
                    {message.email_message}
                </p>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
                    <thead className="bg-orange-500 text-white text-left">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 font-medium">
                                #
                            </th>
                            <th className="border border-gray-300 px-4 py-2 font-medium">
                                Title
                            </th>
                            <th className="border border-gray-300 px-4 py-2 font-medium">
                                Image
                            </th>
                            <th className="border border-gray-300 px-4 py-2 font-medium">
                                Published at
                            </th>
                            <th className="border border-gray-300 px-4 py-2 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.map((post) => (
                            <tr className="hover:bg-gray-50" key={post.id}>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {post.id}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {post.title}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    <img
                                        className="w-10 h-10"
                                        src={`/storage/${post.image}`}
                                        alt=""
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {new Date(
                                        post.published_at
                                    ).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-blue-500">
                                    <Link
                                        href={route("edit", post.id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>

                                    <form
                                        onSubmit={(e) => submit(e, post.id)}
                                        className="inline-block ml-2"
                                    >
                                        <button
                                            type="submit"
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-12">
                {posts.links.map((link) =>
                    link.url ? (
                        <Link
                            preserveScroll
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${
                                link.active ? "text-orange-500 font-bold" : ""
                            }`}
                        ></Link>
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </div>
    );
};

export default List;
