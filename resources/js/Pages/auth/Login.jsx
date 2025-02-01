import { Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

const Signup = () => {
    const route = useRoute();

    const error = usePage().props;

    const message = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("login"));
    }

    return (
        <>
            <div className="max-w-sm bg-white shadow-lg rounded-md p-5 mt-5 mx-auto">
                <h1 className="text-center text-3xl font-semibold text-orange-500 mb-5">
                    Login
                </h1>

                {message.message && (
                    <p className="text-orange-500 text-sm mt-2 mb-2 font-semibold">
                        {message.message}
                    </p>
                )}

                <form onSubmit={submit}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="example@gmail.com"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.email}
                            </p>
                        )}
                    </div>
                    <div class="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="*****"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.password}
                            </p>
                        )}
                    </div>

                    <div class="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <div class="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                class="ms-2 text-sm font-medium text-orange-500 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <div>
                            <Link
                                href={route("password.request")}
                                className="text-sm text-orange-500 font-medium underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-5">
                        <p className="text-sm text-orange-500 ">
                            Don't have an account yet?{" "}
                            <Link
                                href={route("register")}
                                className="underline text-orange-500 font-bold"
                            >
                                Signup
                            </Link>
                        </p>
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
                        {processing ? "Processing..." : "Login"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup;
