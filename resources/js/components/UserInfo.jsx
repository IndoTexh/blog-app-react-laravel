import { Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

const UserInfo = () => {
    const route = useRoute();
    const authUser = usePage().props.auth.user;
    const error = usePage().props;
    const message = usePage().props.info_message;

    const { data, setData, put, errors, processing } = useForm({
        name: authUser.name,
        email: authUser.email,
    });

    function submit(e) {
        e.preventDefault();
        put(route("update.profile-info"));
    }

    return (
        <>
            <div>
                <h1 className="text-4xl text-orange-500 font-medium">
                    Information section
                </h1>
                <form onSubmit={submit} className="mt-5">
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.email}
                            </p>
                        )}
                    </div>

                    {message && (
                        <p className="text-orange-500 text-sm mt-2 mb-2 font-semibold">
                            {message}
                        </p>
                    )}
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
                        {processing ? "Processing..." : "Update information"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserInfo;
