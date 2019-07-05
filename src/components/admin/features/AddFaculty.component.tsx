import React, { Component } from "react";
import { Header, Grid } from "semantic-ui-react";
import { VForm, VField } from "../../../shared/VirtualForm";
import { AutoForm } from "../../utils/Form.component";
import { axios } from "../../../shared/axios";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FileUpload,
  FileUploadResp
} from "../../utils/DarkInput/FileUpload.component";
import { DarkButton } from "../../utils/DarkButton";

@observer
export class AddFaculty extends Component<any> {
  form: VForm;
  @observable file = null;
  @observable submitting = false;

  constructor(props: any) {
    super(props);
    // prepping form
    this.form = new VForm()
      .addField(
        new VField()
          .label("Faculty id")
          .required()
          .type("text")
          .name("id")
          .initValue("6666")
      )
      .addField(
        new VField()
          .label("Name")
          .required()
          .type("text")
          .initValue("some name")
      )
      .addField(
        new VField()
          .label("Branch")
          .required()
          .type("text")
          .initValue("CSE")
      )
      .addField(
        new VField()
          .label("Email")
          .required()
          .type("email")
          .initValue("6666@gmail.com")
      )
      .addField(
        new VField()
          .label("Contact number")
          .required()
          .type("number")
          .name("contact")
          .initValue("121212121")
      )
      .addField(
        new VField()
          .label("Designation")
          .required()
          .type("number")
          .initValue("1")
      );
  }

  submitHandler = async (e: any) => {
    e.preventDefault();
    runInAction(() => (this.submitting = true));
    try {
      await axios.post("/admin/faculty", {
        faculty: this.form.getData()
      });
      toast(<h3>{"Faculty added successfully"}</h3>);
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while adding faculty!!";
      toast(<h3>{msg}</h3>);
    }
    runInAction(() => (this.submitting = false));
  };

  handleFileSubmit = ({ error, msg }: FileUploadResp) => {
    console.log(error);
    toast(msg);
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
              <AutoForm
                onSubmit={this.submitHandler}
                formData={this.form}
                submitting={this.submitting}
                submitButton={loading => (
                  <DarkButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Submit
                  </DarkButton>
                )}
              />
            </Grid.Column>
            <Grid.Column width="1" floated="right" />
            <Grid.Column width="6" floated="left">
              <FileUpload
                uploadURL="/admin/faculties"
                onFinish={this.handleFileSubmit}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  componentWillUnmount() {
    delete this.form;
  }
}
