import React, { Component } from "react";
import {
  Header,
  Button,
  FormProps,
  Grid,
  Input,
  Form
} from "semantic-ui-react";
import { VForm, VField } from "../../../shared/VirtualForm";
import { AutoForm } from "../../utils/Form.component";
import { axios } from "../../../shared/axios";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
export class AddFaculty extends Component {
  form: VForm;
  @observable file = null;

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
      )
      .addField(
        new VField()
          .label("Name")
          .required()
          .type("text")
      )
      .addField(
        new VField()
          .label("Branch")
          .required()
          .type("text")
      )
      .addField(
        new VField()
          .label("Email")
          .required()
          .type("email")
      )
      .addField(
        new VField()
          .label("Contact number")
          .required()
          .type("number")
          .name("contact")
      )
      .addField(
        new VField()
          .label("Designation")
          .required()
          .type("number")
      );
  }
  submitHandler = async (e: any, data: FormProps) => {
    try {
      const { data } = await axios.post("/admin/faculty", {
        faculty: this.form.getData()
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  handleFileChange = action((e: any) => {
    this.file = e.target.files[0];
  });

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
                submitButton={() => <Button inverted>Add user</Button>}
              />
            </Grid.Column>
            <Grid.Column width="6" floated="right">
              <Form inverted>
                <Form.Field>
                  <label htmlFor="file">Upload excel file here(.xlsx)</label>
                  <Input
                    type="file"
                    name="file"
                    onChange={this.handleFileChange}
                  />
                </Form.Field>
                <Button type="submit" inverted disabled={this.file === null}>
                  Submit file
                </Button>
              </Form>
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
