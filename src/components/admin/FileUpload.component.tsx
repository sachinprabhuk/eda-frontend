import React, { Component, createRef } from "react";
import { Form, Input, Ref } from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { axios } from "../../shared/axios";
import { DarkButton } from "../utils/DarkButton";

export interface FileUploadResp {
  error: boolean;
  msg: string;
}

interface IFileUpload {
  uploadURL: string;
  onSubmit(data: FileUploadResp): void;
}

@observer
export class FileUpload extends Component<IFileUpload> {
  @observable file: Blob | null = null;
  @observable submitting: boolean = false;
  inputRef: any = createRef();

  handleFileChange = (e: any) => {
    this.file = e.target.files[0] || null;
  };

  submitHandler = async (e: any) => {
    runInAction(() => (this.submitting = true));
    const formData = new FormData();
    if (this.file !== null) formData.append("file", this.file);
    try {
      await axios.post(this.props.uploadURL, formData);
      this.props.onSubmit({
        error: false,
        msg: "Succesfully added faculties to db"
      });
    } catch (e) {
      this.props.onSubmit({ error: true, msg: "Error while adding faculties" });
    }
    runInAction(() => {
      this.submitting = false;
      this.file = null;
    });
    this.inputRef.current.children[0].value = "";
  };

  render() {
    return (
      <Form inverted>
        <Form.Field>
          <label htmlFor="file">Upload excel file here(.xlsx)</label>
          <Ref innerRef={this.inputRef}>
            <Input
              ref={this.inputRef}
              type="file"
              name="file"
              onChange={this.handleFileChange}
            />
          </Ref>
        </Form.Field>
        <DarkButton
          loading={this.submitting}
          disabled={this.submitting || this.file === null}
          onClick={this.submitHandler}
        >
          Submit file
        </DarkButton>
      </Form>
    );
  }
}
