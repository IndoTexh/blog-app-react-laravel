import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

const UserPassword = () => {
    const route = useRoute();
    const error = usePage().props;
    const message = usePage().props.pass_message;

    const { data, setData, patch, errors, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        patch(route("update-profile-pass"), {
            preserveScroll: true,
        });
    }

    return (
        <>
            <div>
                <h1 className="text-4xl text-orange-500 font-medium">
                    Password section
                </h1>
                <form onSubmit={submit} className="mt-5">
                    <div className="mb-5">
                        <label
                            htmlFor="current_password"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current_password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                            placeholder="Current password"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.current_password}
                            </p>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                            placeholder="New password"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.password}
                            </p>
                        )}
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password_confirmation"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                            placeholder="Confirm password"
                        />
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
                        {processing ? "Processing..." : "Update password"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserPassword;
