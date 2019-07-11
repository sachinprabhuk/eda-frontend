import React, { Component } from "react";
import { Header, Grid } from "semantic-ui-react";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";

import {
  FileUpload,
  FileUploadResp
} from "../../utils/DarkInput/FileUpload.component";
import "../../utils/DarkInput/index.css";
import { DarkButton } from "../../utils/DarkButton";
import { axios } from "../../../shared/axios";
import { toast } from "react-toastify";
import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";
import { DarkInput } from "../../utils/DarkInput";

interface IState {
  slotCount: number;
  date: string;
  type: ISelectOption | null;
}
@observer
export class AddSlot extends Component<any, IState> {
  state = {
    slotCount: 0,
    date: new Date().toISOString().slice(0, 10),
    type: null
  };
  @observable submittingForm = false;
  dropDownOptions: ISelectOption[] = [
    { value: "aft", label: "Afternoon" },
    { value: "morn", label: "Morning" }
  ];

  updateSlotInfo = (e: any) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  updateType = (index: number, selected: ISelectOption) => {
    this.setState({ ...this.state, type: selected });
  };

  handleFileSubmitFinish = ({ error, msg }: FileUploadResp) => {
    if (error) toast.error(msg);
    else toast("Successfull uploaded slots");
  };

  onFormSubmit = async (e: any) => {
    e.preventDefault();
    runInAction(() => (this.submittingForm = true));
    try {
      await axios.post("/admin/slot", {
        slot: {
          date: this.state.date,
          type: (this.state.type! as ISelectOption).value,
          total: this.state.slotCount
        }
      });
      toast("Slot added successfully!");
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while adding slot to db!!";
      toast.error(msg);
    }
    runInAction(() => (this.submittingForm = false));
  };

  render() {
    return (
      <div>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Slot details
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width="7">
              <form onSubmit={this.onFormSubmit}>
                <div className="dark-input-element">
                  <label className="el-label">Date</label>
                  <input
                    className="text-input fluid"
                    name="date"
                    onChange={this.updateSlotInfo}
                    value={this.state.date}
                    type="date"
                    required
                  />
                </div>
                <DarkInput
                  name="slotCount"
                  value={this.state.slotCount}
                  onChange={this.updateSlotInfo}
                  label="slot count"
                  required
                  type="number"
                  fluid
                />
                <DarkDropdown
                  label="select type"
                  options={this.dropDownOptions}
                  value={this.state.type}
                  placeholder="Slot type"
                  required
                  fluid
                  onChange={this.updateType}
                />
                <DarkButton
                  type="submit"
                  loading={this.submittingForm}
                  disabled={this.submittingForm}
                >
                  Submit slot
                </DarkButton>
              </form>
            </Grid.Column>
            <Grid.Column width="1" floated="right" />
            <Grid.Column width="6" floated="left">
              <FileUpload
                errorMsg="Error while adding slots to db"
                uploadURL="/admin/slots"
                onFinish={this.handleFileSubmitFinish}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
