import React from "react";
import "./sass/layout.scss";
import "./sass/header.scss"
import Header from "./components/Partials/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routers from "./routers";
import Footer from "./components/Partials/Footer";
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
        <Header />
        <Switch>{showContentMenus(routers)}</Switch>

        <Footer />
      </div>
    </Router>

  );
};

export default App;
