// Register.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/profile");
      }
    });

    // cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  // handle registration button click
  const handleRegister = async () => {
    try {
      // create user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        phoneNumber,
        dob,
        city,
        role,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mt-10 mb-10 pt-4 p-12 w-[500px] bg-zinc-200 rounded-lg drop-shadow-md text-zinc-800">
      <h2 className="text-3xl font-bold my-3 text-center">Register</h2>
      <hr className="mb-6 border-2 border-zinc-800" />

      <Input
        label="Email:"
        type="email"
        placeholder="abc@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password:"
        type="password"
        placeholder="password must be at least 6 digits"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

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
        onClick={handleRegister}
      >
        Register
      </button>

      {/* Link to Login Page */}
      <p className="text-center font-semibold">
        Already have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
