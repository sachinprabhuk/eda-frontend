import React, { Component } from "react";
import { Grid, Segment, Container } from "semantic-ui-react";
import { Login } from "../../components/admin/Login.component";
import { inject, observer } from "mobx-react";
import { AdminInts } from "../../shared/interfaces";
import { PageLoader } from "../../components/utils/PageLoader.component";
import { Redirect } from "react-router";

interface IAdminLoginProps extends AdminInts.IRootStoreProps {}
@inject("rootStore")
@observer
export class AdminLogin extends Component<IAdminLoginProps> {
  render() {
    if (this.props.rootStore!.authStore.checkingAuthStatus) {
      return <PageLoader msg="Checking authentication status..." />;
    } else if (this.props.rootStore!.authStore.token)
      return <Redirect to="/admin/home" />;

    console.log("Render => AdminLoginContainer");
    return (
      <Segment inverted>
        <Container>
          <Grid>
            <Grid.Row
              style={{ width: "100%", height: "100vh" }}
              verticalAlign="middle"
            >
              <Grid.Column width={7} floated="left">
                <h2>Some title</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Inventore aliquid architecto distinctio iusto, nesciunt
                  laboriosam cumque vitae libero quis unde placeat praesentium,
                  qui quos. Officia perferendis ipsa aut dolore vitae!
                </p>
              </Grid.Column>
              <Grid.Column width={8} floated="right">
                <Login />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}
