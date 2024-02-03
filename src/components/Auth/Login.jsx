// Login.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase.config";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the profile page
        navigate("/profile");
      }
    });

    // cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // handle authentication errors
      console.error(error.message);
    }
  };

  return (
    <div className="mt-10 mb-10 pt-4 p-12 w-[500px] bg-zinc-200 rounded-lg drop-shadow-md text-zinc-800">
      <h2 className="text-3xl font-bold my-3 text-center">Login</h2>
      <hr className="mb-6 border-2 border-zinc-800" />

      <Input
        label="Email:"
        type="email"
        placeholder="abc@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password:"
        type="password"
        placeholder="password must be at least 6 digits"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="mt-4 mb-6 w-full p-2 bg-zinc-800 text-white text-center font-semibold"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Link to Register Page */}
      <p className="text-center font-semibold">
          Don't have an account?
           <Link className="text-blue-600" to="/">
             Register
           </Link>
        </p>
    </div>
  );
};

export default Login;
