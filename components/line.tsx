import React, { useEffect, useState } from "react";
import { Button, Container, Link } from "@material-ui/core";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../firebase/hook/AuthContext";

interface SignupType {
  email: string;
  password: string;
}

export default function SignupPage() {
  const methods = useForm<SignupType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: SignupType) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
      });
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [state, setState] = useState("");
  let regExpWeak = /[a-z]/g;
  let cap = /[A-Z]/;
  let num = /[0-9]/;
  let regExpMedium = /\d+/;
  let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

  useEffect(() => {
    var pas: any = document.getElementById("x1");
    var pas2: any = document.getElementById("x2");
    var pas3: any = document.getElementById("x3");
    var pas4: any = document.getElementById("x4");
    var pas5: any = document.getElementById("x5");

    var error1: any = document.getElementById("error1");
    var error2: any = document.getElementById("error2");

    // setState(currentvalue=>!currentvalue)
    if (
      state.match(" ") ||
      (state.length <= 3 &&
        (state.match(regExpWeak) ||
          state.match(regExpMedium) ||
          state.match(regExpStrong) ||
          state.match(cap) ||
          state.match(num)))
    ) {
      pas.style.background = "red";
      pas2.style.background = "#F0F2F5";
      pas3.style.background = "#F0F2F5";
      pas4.style.background = "#F0F2F5";
      pas5.style.background = "#F0F2F5";
      error1.innerHTML = "error1";
      error2.innerHTML = "error1";
    } else if (
      state.match(" ") ||
      (state.length >= 3 &&
        state.length < 6 &&
        (state.match(regExpWeak) ||
          state.match(regExpMedium) ||
          state.match(regExpStrong) ||
          state.match(cap) ||
          state.match(num)))
    ) {
      pas.style.background = "red";
      pas2.style.background = "red";
      pas3.style.background = "#F0F2F5";
      pas4.style.background = "#F0F2F5";
      pas5.style.background = "#F0F2F5";
      error1.innerHTML = "error2";
      error2.innerHTML = "error2";
    } else if (state == "") {
      pas.style.background = "#F0F2F5";
      pas2.style.background = "#F0F2F5";
      pas3.style.background = "#F0F2F5";
      pas4.style.background = "#F0F2F5";
      pas5.style.background = "#F0F2F5";
      error1.innerHTML = "";
      error2.innerHTML = "";
    } else if (
      state.length >= 6 &&
      state.length < 8 &&
      //   state.length <= 8 &&
      ((state.match(regExpWeak) && state.match(regExpMedium)) ||
        (state.match(regExpMedium) && state.match(regExpStrong)) ||
        (state.match(regExpWeak) && state.match(regExpStrong)))
    ) {
      pas.style.background = "#FAAD14";
      pas2.style.background = "#FAAD14";
      pas3.style.background = "#FAAD14";
      pas4.style.background = "#F0F2F5";
      pas5.style.background = "#F0F2F5";
      error1.innerHTML = "mediam";
      error2.innerHTML = "mediam";
    } else if (
      state.length == 8 &&
      //   state.match(regExpWeak) &&
      //   state.match(regExpMedium) &&
      state.match(regExpStrong) &&
      //   state.match(cap) &&
      state.match(num)
      //   state.match(regExpMedium) &&
    ) {
      pas.style.background = "green";
      pas2.style.background = "green";
      pas3.style.background = "green";
      pas4.style.background = "green";
      pas5.style.background = "#F0F2F5";
      error1.innerHTML = "strong";
      error2.innerHTML = "strong";
    } else if (
      state.length > 8 &&
      //   state.match(regExpWeak) &&
      //   state.match(regExpMedium) &&
      state.match(regExpStrong) &&
      state.match(cap) &&
      state.match(num)
      //   state.match(regExpMedium) &&
    ) {
      pas.style.background = "green";
      pas2.style.background = "green";
      pas3.style.background = "green";
      pas4.style.background = "green";
      pas5.style.background = "green";
      error1.innerHTML = "strng1";
      error2.innerHTML = "strong1";
    }
  }, [state]);

  return (
    <div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ paddingLeft: "30px", maxWidth: "22rem" }}>
              <div className="mt-4">
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
              <div className="mt-2">
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
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
                {errors.password && (
                  <p className="text-red-400">{errors.password.message}</p>
                )}
              </div>
            </div>

            <Container>
              <div style={{ display: "flex" }}>
                <div
                  id="x1"
                  style={{
                    height: "5px",
                    width: "60.8px",
                    background: "#F0F2F5",
                    marginLeft: "4px",
                    marginTop: "10px",
                    borderRadius: "999px",
                  }}
                ></div>
                <div
                  id="x2"
                  style={{
                    height: "5px",
                    width: "60.8px",
                    background: "#F0F2F5",
                    marginLeft: "4px",
                    marginTop: "10px",
                    borderRadius: "999px",
                  }}
                ></div>
                <div
                  id="x3"
                  style={{
                    height: "5px",
                    width: "60.8px",
                    background: "#F0F2F5",
                    marginLeft: "4px",
                    marginTop: "10px",
                    borderRadius: "999px",
                  }}
                ></div>
                <div
                  id="x4"
                  style={{
                    height: "5px",
                    width: "60.8px",
                    background: "#F0F2F5",
                    marginLeft: "4px",
                    marginTop: "10px",
                    borderRadius: "999px",
                  }}
                ></div>
                <div
                  id="x5"
                  style={{
                    height: "5px",
                    width: "60.8px",
                    background: "#F0F2F5",
                    marginLeft: "4px",
                    marginTop: "10px",
                    borderRadius: "999px",
                  }}
                ></div>
              </div>
            </Container>

            <Container>
              <div style={{ display: "flex" }}>
                <div id="error1"></div>
                <div id="error2"></div>
              </div>
            </Container>

            <Container style={{ marginBottom: "0.7rem" }}>
              <p
                style={{
                  color: "#778699",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                By signing up, you are agreeing to our{" "}
                <span style={{ color: "#16227B" }}>Terms & Conditions</span> and{" "}
                <span style={{ color: "#16227B" }}>Privacy Policy.</span>
              </p>
            </Container>

            <Container>
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
                Sign up
              </Button>
              <p
                style={{
                  color: "#778699",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                Already have an account?{" "}
                <span style={{ color: "#16227B" }}>
                  <Link href="/login">Log in</Link>
                </span>
              </p>
            </Container>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
