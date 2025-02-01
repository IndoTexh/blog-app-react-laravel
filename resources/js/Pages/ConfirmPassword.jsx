import { Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

const ConfirmPassword = () => {
    const { data, setData, post, errors, processing } = useForm({
        password: "",
    });

    const route = useRoute();
    const error = usePage().props;

    function submit(e) {
        e.preventDefault();
        post(route("checkPassword"));
    }
    return (
        <>
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md p-5 mt-5">
                <p className="text-sm text-orange-500 font-semibold mb-2"></p>
                <div className="space-y-4">
                    <p className="text-orange-500 text-sm font-semibold">
                        Because this is the sensitive area, we would like you to
                        confirm your password before redirecting you to your
                        destination!
                    </p>
                    <form onSubmit={submit}>
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:right-1 focus:outline-none"
                                placeholder="*****"
                            />
                            {error.errors && (
                                <p className="text-red-500 text-sm">
                                    {error.errors.password}
                                </p>
                            )}
                        </div>

                        <div>
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
                                {processing ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ConfirmPassword;
