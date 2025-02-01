import UserInfo from "../components/UserInfo";
import UserPassword from "../components/UserPassword";
import DeleteUser from "./DeleteUser";

const Profile = () => {
    return (
        <>
            <div className="max-w-screen-md mx-auto bg-white shadow-lg rounded-lg p-5 mt-5 mb-10">
                <UserInfo />
            </div>
            <div className="max-w-screen-md mx-auto bg-white shadow-lg rounded-lg p-5 mt-5 mb-10">
                <UserPassword />
            </div>
            <div className="max-w-screen-md mx-auto bg-white shadow-lg rounded-lg p-5 mt-5 mb-10">
                <DeleteUser />
            </div>
        </>
    );
};

export default Profile;
