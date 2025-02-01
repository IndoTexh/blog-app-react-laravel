import { useState } from "react";
import { usePage, Link, useForm } from "@inertiajs/react";
import { route } from "../../../vendor/tightenco/ziggy/src/js";

const Dropdown = () => {
    const { auth } = usePage().props; // Get authenticated user data
    const { component } = usePage();
    const isActive = (routeName) => component === routeName;
    const { post } = useForm();
    const [toggle, setToggle] = useState(false);

    function logout(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
            post(route("logout"));
        }
    }

    return (
        <div className="flex items-center gap-6 relative">
            {auth.user ? (
                <>
                    <div
                        className="flex items-center gap-4 hover:cursor-pointer text-orange-500"
                        onClick={() => setToggle(!toggle)}
                    >
                        <p>{auth.user.name}</p>{" "}
                        <i
                            className={`fa-solid fa-chevron-down transform transition-transform duration-300 ${
                                toggle ? "rotate-180" : "rotate-0"
                            }`}
                        ></i>
                    </div>

                    <div
                        onClick={() => setToggle(!toggle)}
                        className={`${
                            toggle ? "block" : "hidden"
                        }  bg-white shadow-lg text-orange-500 p-5 flex flex-col gap-2 rounded-md absolute top-10 w-full`}
                    >
                        <Link
                            className={
                                isActive("Home")
                                    ? "font-bold"
                                    : "hover:font-bold"
                            }
                            href={route("home")}
                        >
                            Home
                        </Link>

                        {/* Show only if user role is 'admin' */}
                        {auth.user.role === "admin" && (
                            <>
                                <Link
                                    className={
                                        isActive("Post")
                                            ? "font-bold"
                                            : "hover:font-bold"
                                    }
                                    href={route("post")}
                                >
                                    Add Post
                                </Link>
                                <Link
                                    className={
                                        isActive("List")
                                            ? "font-bold"
                                            : "hover:font-bold"
                                    }
                                    href={route("list")}
                                >
                                    List Post
                                </Link>
                                <Link
                                    className={
                                        isActive("Dashboard")
                                            ? "font-bold"
                                            : "hover:font-bold"
                                    }
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}

                        <Link
                            className={
                                isActive("Profile")
                                    ? "font-bold"
                                    : "hover:font-bold"
                            }
                            href={route("user.profile")}
                        >
                            Profile
                        </Link>
                        <Link
                            className={
                                isActive("Favorite")
                                    ? "font-bold"
                                    : "hover:font-bold"
                            }
                            href={route('favorite')}
                        >
                            Favorite
                        </Link>

                        <form onSubmit={logout}>
                            <button>Logout</button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-6 text-orange-500">
                    <Link
                        className={
                            isActive("Home") ? "font-bold" : "hover:font-bold"
                        }
                        href={route("home")}
                    >
                        Home
                    </Link>
                    <Link
                        className={
                            isActive("auth/Login")
                                ? "font-bold"
                                : "hover:font-bold"
                        }
                        href={route("login")}
                    >
                        Login
                    </Link>
                    <Link
                        className={
                            isActive("auth/Signup")
                                ? "font-bold"
                                : "hover:font-bold"
                        }
                        href={route("register")}
                    >
                        Signup
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
