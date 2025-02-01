import { useForm, usePage } from "@inertiajs/react";

const ForgotPassword = ({}) => {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
    });

    const error = usePage().props;

    const message = usePage().props;

    function submit(e) {
        e.preventDefault();
        post(route("password.email"));
    }

    console.log(message);
    return (
        <>
            <div className="max-w-sm mx-auto bg-white p-5 mt-5 shadow-lg rounded-md">
                <h1 className="text-center text-3xl font-semibold text-orange-500 mb-5">
                    Request link
                </h1>

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
                        {message.message && (
                            <p className="text-orange-500 text-sm mt-2 font-semibold">
                                {message.message}
                            </p>
                        )}
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
                        {processing ? "Processing..." : "Request"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
