// UserContext.jsx
import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { auth, db } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State to store user data
  const [userData, setUserData] = useState({
    email: "",
    displayName: "",
    phoneNumber: "",
    dob: "",
    city: "",
    role: "",
  });

  // callback function to handle authentication state changes
  const handleAuthStateChanged = useCallback(async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { displayName, email, phoneNumber, dob, city, role } =
            userDoc.data();
          // update user data in state
          setUserData({
            displayName,
            email,
            phoneNumber,
            dob,
            city,
            role,
          });
        } else {
          // handle case when user document not found in Firestore
          console.error("User document not found in Firestore");
        }
      } catch (error) {
        // handle error fetching user document
        console.error(error.message);
      }
    } else {
      // reset user data when user is not authenticated
      setUserData({
        email: "",
        displayName: "",
        phoneNumber: "",
        dob: "",
        city: "",
        role: "",
      });
    }
  }, []);

  // use effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    // cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [handleAuthStateChanged]);

  // memoized context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
