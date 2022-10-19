import React from "react";
import { withPublic } from "../firebase/hook/route";
import styles from "../styles/Signup.module.scss";
import GoogleImg from "../images/google.jpeg";
import Image from "next/image";
import { Card, CardContent, Container } from "@material-ui/core";
import Header from "../components/header";
import Line from "../components/line";
import { useAuth } from "../firebase/hook/AuthContext";

function Signup() {
  const { user, loginWithGoogle, error } = useAuth();

  return (
    <div>
      <div className={styles.page}>
        <Header />
        <Card
          style={{
            maxWidth: "416px",
            height: "650px",
            padding: "20px 5px",
            margin: "0 auto",
            marginTop: "5rem",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Container style={{ display: "flex", justifyContent: "center" }}>
              <h5 style={{ color: "#16227B" }}>Smart investing starts here</h5>
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.5rem",
                marginBottom: "1.4rem",
              }}
            >
              <h6 style={{ color: "#16227B" }}>Start your free 7-day trial</h6>
            </Container>

            <Container style={{ display: "flex", justifyContent: "center" }}>
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
                  <Image width="25px" height="25px" src={GoogleImg} />
                </div>
                <div style={{ marginLeft: "10px", marginBottom: "0.5rem" }}>
                  <h6>Sign up with Google</h6>
                </div>
              </div>
            </Container>

            <Line />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withPublic(Signup);
