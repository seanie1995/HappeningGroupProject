import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-Purple rounded-lg hover:bg-BrightOrange focus:ring-4 focus:outline-none focus:ring-BrightOrange dark:bg-Purple dark:hover:bg-BrightOrange dark:focus:ring-BrightOrange font-bebas"
    >
      Logga ut
    </button>
  );
};

export default LogOutButton;
