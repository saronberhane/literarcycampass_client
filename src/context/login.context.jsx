// import { Navigate, Outlet } from "react-router-dom";
// // import { Redirect } from "react-router-dom";

// import Cookies from "js-cookie";
// import { AdminLogin } from "../admin-pages/admin-login/admin-login";
import { createContext, useState } from "react";

export const DataContext = createContext({
  isLoggedIn: false,
});

export const DataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
