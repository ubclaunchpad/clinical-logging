import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../config/firebase";

//
const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function register(email, password) {
    // If the new account was created, the user is signed in automatically.
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  //set listener to notify when user is signed in
  //children only renders when loading is finished
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //pass login, register functions and currentUser to children using context
  const value = {
    currentUser,
    login,
    register,
  };
  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

