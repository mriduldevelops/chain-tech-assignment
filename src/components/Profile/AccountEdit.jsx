// AccountEdit.jsx
import React, { useState, useContext } from "react";
import { db, auth } from "../../../firebase.config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import Input from "../common/Input";

const AccountEdit = () => {
  const user = auth.currentUser;

  // get user data from context
  const { userData } = useContext(UserContext);

  const [displayName, setDisplayName] = useState(userData.displayName);
  const [dob, setDob] = useState(userData.dob);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [city, setCity] = useState(userData.city);
  const [role, setRole] = useState(userData.role);

  const navigate = useNavigate();

  // handle update button click
  const handleUpdate = async () => {
    try {
      // update user data in Firestore
      await updateDoc(doc(collection(db, "users"), user.uid), {
        displayName,
        phoneNumber,
        dob,
        city,
        role,
      });

      // navigate to the profile page after update
      navigate("/profile");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="mt-10 mb-10 pt-4 p-12 w-[500px] bg-zinc-200 rounded-lg drop-shadow-md text-zinc-800">
        <h2 className="text-3xl font-bold my-3 text-center">
          Edit Account Information
        </h2>
        <hr className="mb-6 border-2 border-zinc-800" />

        <Input
          label="Username:"
          type="text"
          placeholder="John Doe"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <Input
          label="DOB:"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <Input
          label="City:"
          type="text"
          placeholder="e.g. Delhi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Input
          label="Mobile Number:"
          type="text"
          placeholder="+91706075XXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Input
          label="Role:"
          type="text"
          placeholder="e.g. Reactjs Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button
          className="mt-4 mb-6 w-full p-2 bg-zinc-800 text-white text-center font-semibold"
          onClick={handleUpdate}
        >
          Update
        </button>

        {/* link to Profile Page */}
        <p className="text-center font-semibold">
          <Link className="text-blue-600" to="/profile">
            Go to Profile
          </Link>
        </p>
      </div>
    </>
  );
};

export default AccountEdit;


