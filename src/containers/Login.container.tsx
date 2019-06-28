import React, { Component } from "react";
import { Grid, GridColumn, Container } from "semantic-ui-react";
import { LoginForm } from "../components/LoginForm.component";
import { axios } from '../shared/axios';
import { observer, inject } from "mobx-react";
import { IUserStore } from "../stores/User.store";

interface Props {
	userStore?: IUserStore
}

@inject("userStore")
@observer
export class Login extends Component<Props> {

	async componentDidMount() {
		const token = localStorage.getItem("eda-token");

		if (token) {
			try {
				const { data: faculty } = await axios.get("/auth/auth-status");
				this.props.userStore!.setTokenAndUser(token, faculty);
			} catch (e) {
				localStorage.removeItem("token");
				this.props.userStore!.setTokenAndUser(null, null);
			}
		}
	}

  render() {
    console.log("Render => Login");
    return (
      <Container>
        <Grid relaxed columns={2} style={{ height: "100vh" }}>
          <GridColumn width={6} verticalAlign="middle" floated="left">
            <LoginForm />
          </GridColumn>

          <GridColumn width={8} floated="right" verticalAlign="middle">
            <h1>Some title</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates velit eum voluptate aspernatur inventore deleniti
              molestiae aliquam modi dolor architecto quis dicta accusantium
              dignissimos numquam est cumque, temporibus error itaque?
            </p>
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}
