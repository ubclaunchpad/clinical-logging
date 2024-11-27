import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  async function register(firstName, lastName, email, password) {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    if (error) {
      throw error;
    }
    return user;
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw error;
    }
    return data;
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
    } catch (error) {
      if (error.message === "Auth session missing!") {
        setSession(null);
        return;
      }
      console.error("Logout error:", error);
      throw error;
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
        console.log("This is the session:", session);
      }

      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session);
      }
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
