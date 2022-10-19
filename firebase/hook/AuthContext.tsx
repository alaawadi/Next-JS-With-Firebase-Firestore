import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/config";
import AuthService from "../service/AuthService";

interface UserType {
  email: string | null;
  uid: string | null;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

interface ISignup {
  email: string;
  password: string;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = ({ email, password }: ISignup) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = ({ email, password }: ISignup) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  const loginWithGoogle = async () => {
    const { error, user }:any = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, loginWithGoogle }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
