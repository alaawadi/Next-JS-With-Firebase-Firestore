import type { NextPage } from "next";
import Header from "../components/header";

const Error404: NextPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15rem",
        }}
      >
        page not found!
      </div>
    </>
  );
};

export default Error404;
