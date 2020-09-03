import React from "react";

import Home from "./components/Home";
import NotFound from "./components/NotFount";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Movies from "./components/Menu/Movies/Movies"
import Theaters from "./components/Menu/Theaters/Theaters"
import Membership from "./components/Menu/Membership/Membership"

const routers = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/login",
    exact: false,
    main: ({ location }) => <Login location={location} />,
  },
  {
    path: "/register",
    exact: false,
    main: ({ location }) => <Register location={location} />,
  },
  {
    path: "/logout",
    exact: false,
    main: ({ location }) => <Logout location={location} />,
  }
  ,
  {
    path: "/movies",
    exact: false,
    main: ({ location }) => <Movies location={location} />,
  }
  ,
  {
    path: "/theaters",
    exact: false,
    main: ({ location }) => <Theaters location={location} />,
  }
  ,
  {
    path: "/membership",
    exact: false,
    main: ({ location }) => <Membership location={location} />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routers;
