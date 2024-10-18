import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabase";

const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }){
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  async function register(email, password) {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    // throw error otherwise return user
    if (error) {
      throw new Error(error.message);
    }

    return user;
  }
  
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // throw error otherwise return data
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  
  //children only renders when loading is finished
  useEffect(() => {

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null);
        } else if (session) {
          setSession(session);
        }
        // Set loading to false for auth state changes
        setLoading(false);
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session); // Initialize session if it exists
      }
      setLoading(false); // Set loading to false after initial session check
    });


    return () => {
      subscription.unsubscribe()
    };
  }, []);

  //pass login, register functions and currentUser to children using context
  const value = {
    session,
    login,
    register,
  };
  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* {children} */}
    </AuthContext.Provider>
  )
}

