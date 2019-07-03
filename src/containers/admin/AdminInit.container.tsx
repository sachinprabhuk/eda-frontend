import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { IRootStore, RootStore } from "../../stores/admin/Root.store";
import { AdminLogin } from "./Login.container";
import { AdminHome } from "./Home.container";
import { Page404 } from "./Page404.container";

interface IAdminInit extends RouteComponentProps {}

@observer
export default class AdminInit extends Component<IAdminInit> {
  rootStore: IRootStore;
  homeRegex: RegExp;
  loginRegex: RegExp;
  constructor(props: any) {
    super(props);
    this.rootStore = new RootStore();
    this.homeRegex = /^(\/admin\/home)\/?$/;
    this.loginRegex = /^(\/admin\/login)\/?$/;
  }

  componentWillUnmount() {
    delete this.rootStore;
  }

  render() {
    console.log("Render => AdminInit");
    return (
      <Provider rootStore={this.rootStore}>
        <>
          <Switch>
            <Route path="/admin/login" exact component={AdminLogin} />
            <Route path="/admin/home" exact component={AdminHome} />
            <Route path="/admin" exact component={AdminLogin} />
            <Route to="/admin/*" component={Page404} />
          </Switch>
        </>
      </Provider>
    );
  }
}
