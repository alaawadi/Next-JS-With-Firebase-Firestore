// import {Container, Card, Input, Lable} from'@material-ui/core';
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import IMG from "../images/logo.jpeg";
import { withPublic } from "../firebase/hook/route";

import { Button } from "@material-ui/core";
import useAuth from "../firebase/hook/auth";
import { useRouter } from "next/router";
import Router from "next/router";
import { useState } from "react";
import {Home} from "../pages/home";

export default function Header() {
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(true);  
  const auth = useAuth();
  const router = useRouter();
  console.log(search)

  function sendProps(){
    Router.push({
      pathname:'/home',
      query:{search}
    })
    setLoading(false)
  }

  
  return (
    <div>
      {/* <Home ali={search} /> */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ width: "100%" }}
      >
        <a className="navbar-brand" href="#">
          <Image src={IMG} width="30px" height="30px" />
          MASHVISOR
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ml-3">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Product overview
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Search Properties
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ marginLeft: "18rem", marginRight: "1rem" }}
          >
            
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="How to..."
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
              
              
            />
            {}
          </form>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Resources
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>

            <div
              className="nav-item"
              style={{
                background: "#D9D9D9",
                width: "1px",
                height: "30px",
                marginTop: "0.38rem",
                margin: "0 1rem 0 1rem",
              }}
            ></div>

            <li className="nav-item">
              {auth.user ? (
                <>
                  <div
                    onClick={() => {
                      auth.logout(auth.user);
                      router.push("/login");
                    }}
                    className="nav-item"
                  >
                    Log out
                  </div>
                </>
              ) : (
                <>
                  <Link className="nav-link" href="/login">
                    Log in
                  </Link>
                </>
              )}
            </li>
            <li className="nav-item">
              <Button
                style={{
                  background: "#16227B",
                  color: "#fff",
                  width: "100px",
                  height: "38px",
                  borderRadius: "25px",
                  marginLeft: "1rem",
                }}
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <div
        style={{
          height: "2px",
          width: "100%",
          background: "rgb(198, 221, 243)",
        }}
      ></div>
    </div>
  );
}

 

