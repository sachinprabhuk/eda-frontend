import React, { Component } from "react";
import { Header, Grid, Dropdown, DropdownProps } from "semantic-ui-react";
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
import { DarkDropdown, IDrowdownoption } from "../../utils/DarkDropdown";

@observer
export class AddSlot extends Component {
  @observable slotCount: number = 0;
  @observable date: Date = new Date();
  @observable type: string | null = null;
  @observable submittingForm = false;
  dropDownOptions: IDrowdownoption[] = [
    { value: "aft", label: "Afternoon" },
    { value: "morn", label: "Morning" }
  ];

  updateSlotCount = (e: any) => (this.slotCount = e.target.value);
  updateDate = (e: any) => {
    console.log(e.target.value);
    this.date = new Date(e.target.value);
  };
  updateType = (type: "aft" | "morn") => {
    this.type = type;
  };

  handleFileSubmitFinish = ({ error, msg }: FileUploadResp) => {
    if (error) toast.error(msg);
    else toast("Successfull uploaded slots");
  };

  onFormSubmit = async (e: any) => {
    e.preventDefault();
    runInAction(() => (this.submittingForm = true));
    console.log({
      date: this.date,
      type: this.type,
      total: this.slotCount
    });
    try {
      await axios.post("/admin/slot", {
        slot: {
          date: this.date.toISOString().slice(0, 10),
          type: this.type,
          total: this.slotCount
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
                <div className="dark-form-element">
                  <label>Date</label>
                  <input
                    name="slot-date"
                    onChange={this.updateDate}
                    value={this.date.toISOString().slice(0, 10)}
                    type="date"
                    className="dark-input fluid"
                  />
                </div>
                <div className="dark-form-element">
                  <label>Slot count</label>
                  <input
                    type="number"
                    onChange={this.updateSlotCount}
                    value={this.slotCount}
                    className="fluid dark-input"
                    required
                  />
                </div>

                <div className="dark-form-element">
                  <DarkDropdown
                    labelText="slot type"
                    onChange={this.updateType}
                    fluid
                    required
                    placeholder="Slot type"
                    options={this.dropDownOptions}
                  />
                </div>
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
