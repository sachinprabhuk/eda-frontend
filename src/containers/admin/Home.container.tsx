import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Grid } from "semantic-ui-react";
import { Redirect, Switch, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import { AdminInts } from "../../shared/interfaces";
import { PageLoader } from "../../components/utils/PageLoader.component";
import { SideNav } from "../../components/admin/SideNav.component";

import {
  Selections,
  AddFaculty,
  DeleteFaculty,
  AddSlot,
  DeleteSlot,
  Report,
  SendMail,
  PendingFaculty
} from "../../components/admin/features";

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

    return (
      <Grid>
        <Grid.Row
          style={{
            backgroundColor: "var(--theme-tertiary)",
            paddingBottom: "0px"
          }}
        >
          <Grid.Column width="4" style={{ paddingRight: "0px" }}>
            <SideNav />
          </Grid.Column>
          <Grid.Column
            width="12"
            floated="right"
            style={{ paddingLeft: "0px" }}
          >
            <div style={{ padding: "32px 36px" }}>
              <Switch>
                <Route path="/admin/home/selections" component={Selections} />
                <Route path="/admin/home/add-faculty" component={AddFaculty} />
                <Route
                  path="/admin/home/delete-faculty"
                  component={DeleteFaculty}
                />
                <Route path="/admin/home/add-slot" component={AddSlot} />
                <Route path="/admin/home/delete-slot" component={DeleteSlot} />
                <Route path="/admin/home/report" component={Report} />
                <Route
                  path="/admin/home/pending-faculty"
                  component={PendingFaculty}
                />
                <Route path="/admin/home/mail" component={SendMail} />
                <Route path="/admin/home" exact component={Selections} />
                <Redirect to="/404" />
              </Switch>
            </div>
            <ToastContainer position="bottom-right" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
