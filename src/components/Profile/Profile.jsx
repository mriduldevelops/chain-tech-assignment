// Profile.jsx
import React, { useContext } from "react";
import { auth } from "../../../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { userData } = useContext(UserContext);

  // get the current authenticated user
  const user = auth.currentUser;
  const navigate = useNavigate();

  // redirect to login if user is not authenticated
  if (!user) {
    navigate("/");

    return null;
  }

  // handle user sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-[100vw] px-8 py-4 bg-zinc-800 text-white font-semibold flex justify-between">
        <div className="my-auto">
          <h2 className="leading-3 text-xl">{userData.displayName}</h2>
          <span className="text-sm text-zinc-200">{userData.role}</span>
        </div>
        <div className="my-auto">
          <Link className="mr-6 border-2 px-4 py-2 rounded-lg" to="/update">
            Update Info
          </Link>
          <button
            className="mr-6 bg-white text-zinc-800 font-bold px-4 py-2 rounded-lg"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex h-[400px] justify-center w-full">
        <h1 className="text-4xl my-auto font-bold">Home Page</h1>
      </div>
    </div>
  );
};

export default Profile;
