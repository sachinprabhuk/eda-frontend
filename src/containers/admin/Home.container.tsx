import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { AdminInts } from "../../shared/interfaces";
import { PageLoader } from "../../components/utils/PageLoader.component";
import { Redirect } from "react-router";

interface IAdminHomeProps extends AdminInts.IRootStoreProps {}

@inject("rootStore")
@observer
export class AdminHome extends Component<IAdminHomeProps> {
  render() {
    if (this.props.rootStore!.authStore.checkingAuthStatus) {
      return <PageLoader msg="Checking authentication status..." />;
    } else if (!this.props.rootStore!.authStore.token)
      return <Redirect to="/admin/login" />;

    console.log("Render => Home");

    return <div>Admin home</div>;
  }
}
