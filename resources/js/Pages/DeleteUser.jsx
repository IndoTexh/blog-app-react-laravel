import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";

const DeleteUser = () => {
    const route = useRoute();
    const error = usePage().props;
    const id = usePage().props.auth.user.id;
    const [toggle, setToggle] = useState(false);
    const { data, setData, delete: destroy, errors, processing } = useForm({
        id: id,
        password: "",
    });

    function closeToggle(e)  {
      e.preventDefault();
      setToggle(!toggle)
    }

    function submit(e) {
      e.preventDefault();
      destroy(route('delete-account'), {
        preserveScroll: true
      })
    }

    return (
        <>
            <div className={`${toggle ? "hidden" : "block"}`}>
                <p className="text-red-500 text-md font-medium">
                    Note! Once you delete your account all of its resource will
                    be gone and cannot be undo.
                </p>
                <button
                    onClick={(e) => setToggle(!toggle)}
                    className="bg-red-500 text-sm font-medium px-4 py-2 text-white rounded-md mt-2"
                >
                    Delete anyway
                </button>
            </div>
            <div className={`${toggle ? "block" : "hidden"}`}>
                <h1 className="text-4xl text-orange-500 font-medium">
                    Delete section
                </h1>
                <form onSubmit={submit} className="mt-5">
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input
                            type="text"
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                            placeholder="Confirm password"
                        />
                        {error.errors && (
                            <p className="text-red-500 text-sm">
                                {error.errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={closeToggle}
                            className={`${toggle ? 'block bg-orange-500 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' : 'hidden' }'` }
                        >
                            Cancel
                        </button>
                        <button
                            disabled={processing}
                            type="submit"
                            className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                          ${
                              processing
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                          }`}
                        >
                            {processing ? "Processing..." : "Delete account"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DeleteUser;
