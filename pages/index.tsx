import { useEffect, useState } from 'react'
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../firebase/hook/AuthContext";
import { useRouter } from "next/router";
import Header from "../components/header";

const Home: NextPage = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user?.uid) {
      router.push('/login')
    }
    
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>{auth.user?.displayName}</div>
      <div>{auth.user?.email}</div>
      <div>{auth.user?.uid}</div>
      {auth.user ? <>you are loged in</> : <>you are loged out</>}
    </>
  );
};

export default Home;
