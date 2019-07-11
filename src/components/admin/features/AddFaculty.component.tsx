import React, { Component, ChangeEvent } from "react";
import { Header, Grid } from "semantic-ui-react";
import { axios } from "../../../shared/axios";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FileUpload,
  FileUploadResp
} from "../../utils/DarkInput/FileUpload.component";
import { DarkInput } from "../../utils/DarkInput";
import { DarkButton } from "../../utils/DarkButton";

interface IState {
  id: string;
  name: string;
  branch: string;
  email: string;
  contact: string;
  designation: string;
}

@observer
export class AddFaculty extends Component<any, IState> {
  @observable file = null;
  @observable submittingForm = false;
  state = {
    id: "",
    name: "",
    branch: "",
    email: "",
    contact: "",
    designation: ""
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  submitHandler = async (e: any) => {
    e.preventDefault();
    runInAction(() => (this.submittingForm = true));
    try {
      await axios.post("/admin/faculty", {
        faculty: this.state
      });
      toast("Faculty added successfully");
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while adding faculty!!";
      toast.error(msg);
    }
    runInAction(() => (this.submittingForm = false));
  };

  handleFileSubmitFinish = ({ error, msg }: FileUploadResp) => {
    if (error) toast.error(msg);
    else toast("Faculties added to db successfully");
  };

  render() {
    return (
      <div>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Faculty details
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width="7">
              <form onSubmit={this.submitHandler}>
                <DarkInput
                  label="id"
                  value={this.state.id}
                  onChange={this.onChange}
                  name="id"
                  required
                  fluid
                />
                <DarkInput
                  label="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                  required
                  fluid
                />
                <DarkInput
                  label="branch"
                  value={this.state.branch}
                  onChange={this.onChange}
                  name="branch"
                  required
                  fluid
                />
                <DarkInput
                  label="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  required
                  fluid
                />
                <DarkInput
                  type="number"
                  label="contact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  name="contact"
                  required
                  fluid
                />
                <DarkInput
                  type="number"
                  label="designation"
                  value={this.state.designation}
                  onChange={this.onChange}
                  name="designation"
                  required
                  fluid
                />

                <DarkButton
                  type="submit"
                  disabled={this.submittingForm}
                  loading={this.submittingForm}
                >
                  Add faculty
                </DarkButton>
              </form>
            </Grid.Column>
            <Grid.Column width="1" floated="right" />
            <Grid.Column width="6" floated="left">
              <FileUpload
                errorMsg="Error while adding facultiy detail to db!"
                uploadURL="/admin/faculties"
                onFinish={this.handleFileSubmitFinish}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
