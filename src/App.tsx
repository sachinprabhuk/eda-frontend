import React, { Component, lazy } from "react";
import { Route, Switch } from "react-router-dom";
// @ts-ignore
import { SemanticToastContainer } from "react-semantic-toasts";

import { lazyLoaded } from "./components/utils/lazyLoaded.hoc";
import { FacultyIndex } from "./containers/faculty";
import { Page404 } from "./containers/admin/Page404.container";

const AdminInit = lazy(() => import("./containers/admin/AdminInit.container"));

export class App extends Component {
  render() {
    console.log("Render => App");
    return (
      <>
        <Switch>
          <Route path="/" exact component={FacultyIndex} />
          <Route path="/admin" component={lazyLoaded(AdminInit)} />
          <Route path="*" component={Page404} />
        </Switch>
        <SemanticToastContainer position="top-right" />
      </>
    );
  }
}
