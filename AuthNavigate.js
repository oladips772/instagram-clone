/** @format */
import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";
import { SingedInStack, SignedOutStack } from "././screens/Navigation";

const AuthNavigate = () => {
  const [currentUser,setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => 
    firebase.auth().onAuthStateChanged((user) => userHandler(user))
  ,[]);

  return <>{ currentUser ?  <SingedInStack /> : <SignedOutStack /> }</>
};

export default AuthNavigate;


