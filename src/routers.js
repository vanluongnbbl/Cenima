import React from "react";

import Home from "./components/Home";
import NotFound from "./components/NotFount";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";

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
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routers;
