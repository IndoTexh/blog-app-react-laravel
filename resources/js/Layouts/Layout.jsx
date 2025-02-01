import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import Dropdown from "../components/Dropdown";
import Title from "../components/Title";

const Layout = ({ children }) => {
    const route = useRoute();
    
    return (
        <>
            <header className="bg-white-700 shadow-lg text-black">
                <nav className="max-w-screen-xl font-medium mx-auto p-5 flex items-center justify-between">
                    <Title />
                    <Dropdown />
                </nav>
            </header>

            <main>{children}</main>
        </>
    );
};

export default Layout;
