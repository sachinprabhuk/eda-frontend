import React, { Component } from "react";
import { Header, FormProps, Grid } from "semantic-ui-react";
import { VForm, VField } from "../../../shared/VirtualForm";
import { AutoForm } from "../../utils/Form.component";
import { axios } from "../../../shared/axios";
import { observable } from "mobx";
import { observer } from "mobx-react";
// @ts-ignore
import { withToastManager } from "react-toast-notifications";

import { FileUpload, FileUploadResp } from "../FileUpload.component";
import { DarkButton } from "../../utils/DarkButton";

@observer
class AddFaculty_ extends Component<any> {
  form: VForm;
  @observable file = null;
  @observable loading = false;

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
  submitHandler = async (e: any, data: FormProps) => {
    try {
      await axios.post("/admin/faculty", {
        faculty: this.form.getData()
      });
      this.props.toastManager.add("Saved successfully...", {
        appearance: "success"
      });
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while adding faculty!!";

      this.props.toastManager.add(msg, {
        appearance: "error"
      });
    }
  };

  handleFileSubmit = ({ error, msg }: FileUploadResp) => {};

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
                submitButton={() => <DarkButton>Submit</DarkButton>}
              />
            </Grid.Column>
            <Grid.Column width="6" floated="right">
              <FileUpload
                uploadURL="/admin/faculties"
                onSubmit={this.handleFileSubmit}
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

export const AddFaculty = withToastManager(AddFaculty_);
