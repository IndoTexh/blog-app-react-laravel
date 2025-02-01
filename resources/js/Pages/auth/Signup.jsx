import { Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";


const Signup = () => {
    const route = useRoute();
    const error = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        profile: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });


    function submit(e) {
        e.preventDefault();
        post(route("register"));
    }

    return (
        <>
        {data.profile_path}
            <div className="max-w-sm bg-white shadow-lg rounded-md p-5 mt-5 mx-auto">
                <h1 className="text-center text-3xl font-semibold text-orange-500 mb-5">
                    Signup
                </h1>

                <form onSubmit={submit}>
                    <div className="mb-5">
                        <label
                            htmlFor="profile"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Profile
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            onChange={e => setData("profile", e.target.files[0])
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Username
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Username"
                        />
                       { error.errors && <p className="text-red-500 text-sm">{error.errors.name}</p> }
                    </div>
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
                         { error.errors && <p className="text-red-500 text-sm">{error.errors.email}</p> }
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
                         { error.errors && <p className="text-red-500 text-sm">{error.errors.password}</p> }
                    </div>
                    <div class="mb-5">
                        <label
                            htmlFor="password_confirmation"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="*****"
                        />
                    </div>
                    <div className="flex items-center gap-2 mb-5">
                        <p className="text-sm text-orange-500 ">
                            Already have an account?{" "}
                            <Link href={route('login')} className="underline text-orange-500 font-bold">
                                Login
                            </Link>
                        </p>
                    </div>

                    <button
                        disabled={processing}
                        type="submit"
                        className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup;
