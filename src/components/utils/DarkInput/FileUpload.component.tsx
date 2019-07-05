import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { axios } from "../../../shared/axios";
import { DarkButton } from "../DarkButton";
import "./index.css";

export interface FileUploadResp {
  error: boolean;
  msg: string;
}

interface IFileUpload {
  uploadURL: string;
  onFinish(data: FileUploadResp): void;
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
    e.preventDefault();
    runInAction(() => (this.submitting = true));
    const formData = new FormData();
    if (this.file !== null) formData.append("file", this.file);
    try {
      await axios.post(this.props.uploadURL, formData);
      this.props.onFinish({
        error: false,
        msg: "Succesfully added faculties to db"
      });
    } catch (e) {
      this.props.onFinish({ error: true, msg: "Error while adding faculties" });
    }
    runInAction(() => {
      this.submitting = false;
      this.file = null;
    });
    this.inputRef.current.value = "";
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="dark-form-element">
          <label>upload faculty file here(.xlsx)</label>
          <input
            type="file"
            onChange={this.handleFileChange}
            className="fluid"
            ref={this.inputRef}
            required
          />
        </div>
        <DarkButton
          loading={this.submitting}
          disabled={this.submitting}
          type="submit"
        >
          Submit file
        </DarkButton>
      </form>
    );
  }
}
