// App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div className="w-full flex justify-center">
        <Outlet />
      </div>
    </UserProvider>
  );
};

export default App;
