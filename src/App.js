import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import routers from "./routers";
import "./sass/layout.scss";

const App = () => {
  const showContentMenus = (routers) => {
    let result = null;

    if (routers.length > 0) {
      result = routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return result;
  };

  return (
    <Router>
      <div className='App'>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <Switch>{showContentMenus(routers)}</Switch>
      </div>
    </Router>
  );
};

export default App;
