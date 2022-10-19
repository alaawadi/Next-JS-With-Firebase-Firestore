import React from "react";
import { withPublic } from "../firebase/hook/route";

import Header from "../components/header";
import styles from "../styles/Signup.module.scss";
import GoogleImg from "../images/google.jpeg";
import Image from "next/image";
import { Button, Card, CardContent, Container } from "@material-ui/core";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../firebase/hook/AuthContext";
import { useRouter } from "next/router";

interface LoginType {
  email: string;
  password: string;
}

function Login({ auth }: any) {
  const methods = useForm<LoginType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { logIn } = useAuth();
  const { user, loginWithGoogle, error } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginType) => {
    try {
      await logIn({ email: data.email, password: data.password });

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Header />

      <Card
        style={{
          maxWidth: "416px",
          height: "520px",
          padding: "20px 5px",
          margin: "0 auto",
          marginTop: "3rem",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <h5 style={{ color: "#16227B" }}>Welcome Back!</h5>
          </Container>

          <Container style={{ marginTop: "2rem" }}>
            {/* {error && <h1>{error}</h1>} */}
            <div
              onClick={loginWithGoogle}
              className={styles.google}
              style={{
                display: "flex",
                width: "320px",
                height: "38px",
                borderRadius: "42px",
                background: "#F0F2F5",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                {/* <h1>{user?.uid}</h1> */}

                <Image width="25px" height="25px" src={GoogleImg} />
              </div>
              <div style={{ marginLeft: "10px", marginTop: "-0.3rem" }}>
                <h6>Sign up with Google</h6>
              </div>
            </div>
          </Container>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ paddingLeft: "30px", maxWidth: "22rem" }}>
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="block mb-3 font-sans text-blue-900"
                    >
                      Email
                    </label>
                  </div>

                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                  />
                  {errors.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div style={{ paddingLeft: "30px", maxWidth: "22rem" }}>
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="block mb-3 font-sans text-blue-900"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                  />
                  {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    marginLeft: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      style={{ marginRight: "0.4rem", marginTop: "1rem" }}
                      type="checkbox"
                    />
                    <p style={{ paddingTop: "1rem" }}>Remember me</p>
                  </div>
                </div>
                <div style={{ marginLeft: "5.4rem", fontSize: "14px" }}>
                  <Link href="/signup">
                    <p style={{ color: "#16227B", paddingTop: "1rem" }}>
                      Forgot password?
                    </p>
                  </Link>
                </div>
              </div>

              <Container style={{ marginTop: "0.6rem" }}>
                <Button
                  type="submit"
                  style={{
                    background: "#16227B",
                    color: "#fff",
                    width: "320px",
                    height: "38px",
                    borderRadius: "25px",
                  }}
                >
                  Log in
                </Button>

                <p
                  style={{
                    color: "#778699",
                    fontSize: "12px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Don’t have an account yet?{" "}
                  <span style={{ color: "#16227B" }}>
                    <Link href="/signup">Sign Up</Link>
                  </span>
                </p>
              </Container>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
}

export default withPublic(Login);
