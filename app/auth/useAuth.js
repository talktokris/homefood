import { useContext, useState } from "react";
//import { useState, createContext, useContext } from "react";
import AuthContext from "./context";
import TokenContext from "./tokenContext";

import authStorage from "./storage";
import userRetrive from "./userRetrive";
//import users from "../api/users";

//const AuthContext = createContext();

export default useAuth = () => {
  const [user, setUser] = useContext(AuthContext);
  const [token, setToken] = useContext(TokenContext);

  const logOut = () => {
    setUser(null);
    setToken(null);
    authStorage.removeToken();
  };

  const logIn = async (authToken) => {
    // console.log(authToken);
    authStorage.storeToken(authToken);
    // console.log(authToken);
    const profile = await userRetrive(authToken);
    // console.log(profile.data);
    if (!profile.ok) return;
    // console.log(profile.data);
    // const user = jwtDecode(authToken);
    setUser(profile.data);
  };

  const logInAuto = async (authToken) => {
    // console.log(authToken);
    const newToken = authToken.access_token;

    // console.log(newToken);
    authStorage.storeToken(newToken);
    // console.log(authToken);
    const profile = await userRetrive(authToken);
    // console.log(profile);
    if (!profile.ok) return;
    // console.log(profile);
    // const user = jwtDecode(authToken);
    setUser(profile.data);
  };
  return { user, logIn, logInAuto, logOut };
};
