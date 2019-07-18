import React, { Component } from "react";
import {
  Loader,
  Header,
  Grid,
  Table,
  Checkbox,
  CheckboxProps,
  Button,
  Icon
} from "semantic-ui-react";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import { observable, runInAction, action, computed, flow } from "mobx";

import { axios } from "../../../shared/axios";

interface IFacultyInfo {
  id: string;
  name: string;
  branch: string;
  designation: number;
  contact: string;
  selectionInfo: string;
  pending: boolean;
  selected: boolean;
}

const DTableRow = observer(function(
  props: {
    index: number;
    onSelect: (e: any, data: CheckboxProps) => void;
  } & IFacultyInfo
) {
  console.log("Render => Row");
  return (
    <Table.Row>
      <Table.Cell>{props.id}</Table.Cell>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.branch}</Table.Cell>
      <Table.Cell>{props.designation}</Table.Cell>
      <Table.Cell>{props.contact}</Table.Cell>
      <Table.Cell>{props.selectionInfo}</Table.Cell>
      <Table.Cell>
        <Checkbox
          onChange={props.onSelect}
          value={props.index}
          checked={props.selected}
        />
      </Table.Cell>
    </Table.Row>
  );
});

const DTableHeader = observer(
  (props: {
    selectedCount: number;
    onSelectAll: (e: any, data: CheckboxProps) => void;
    allSelected: boolean;
    sendMailClicked: (e: any) => void;
    applyFilter: (e: any, data: CheckboxProps) => void;
  }) => {
    console.log("Render => Header");
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="4" verticalAlign="middle">
            <span>
              You have selected{" "}
              <span className="select-count-statistic">
                {props.selectedCount}
              </span>{" "}
              faculties
            </span>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Checkbox
                onClick={props.applyFilter}
                name="pending"
                label={
                  <label>
                    <span style={{ color: "white" }}>Pending</span>
                  </label>
                }
              />
              <Checkbox
                onClick={props.applyFilter}
                name="non-pending"
                label={
                  <label>
                    <span style={{ color: "white" }}>Non-pengin</span>
                  </label>
                }
              />
              <Button
                color="instagram"
                floated="right"
                onClick={props.sendMailClicked}
              >
                <Icon name="send" /> Send Mail
              </Button>
            </div>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Faculty id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Branch</Table.HeaderCell>
          <Table.HeaderCell>Designation</Table.HeaderCell>
          <Table.HeaderCell>contact number</Table.HeaderCell>
          <Table.HeaderCell>Selection info</Table.HeaderCell>
          <Table.HeaderCell>
            <Checkbox
              checked={props.allSelected}
              onChange={props.onSelectAll}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
);

@observer
export class SendMail extends Component {
  @observable mobxState = {
    fetchingFaculties: true,
    faculties: [] as IFacultyInfo[]
  };

  @computed get selectedFacultyIds() {
    return this.mobxState.faculties
      .filter(fac => fac.selected)
      .map(fac => fac.id);
  }

  @computed get selectedCount() {
    return this.mobxState.faculties.filter(fac => !!fac.selected).length;
  }

  fetchAndSetFaculties = flow(function*(this: SendMail) {
    try {
      const { data } = yield axios.get("/admin/faculties");
      const parsedData = data.map((el: any) => {
        el.selectionInfo = `${el.selections.length} / ${el.slotLim.maximum}`;
        el.designation = el.slotLim.designation;
        el.pending = el.selections.length < el.slotLim.maximum;

        delete el.selections;
        delete el.slotLim;
        return el;
      });
      this.mobxState.fetchingFaculties = false;
      this.mobxState.faculties = parsedData;
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while fetching data!! refresh to try again";
      toast.error(msg);
      this.mobxState.fetchingFaculties = false;
    }
  });

  async componentDidMount() {
    await this.fetchAndSetFaculties();
  }

  onRowEvent = action((e: any, { checked, value: rowIndex }: CheckboxProps) => {
    this.mobxState.faculties[rowIndex as number].selected = checked as boolean;
  });

  handleAllSelect = action((e: any, { checked }: CheckboxProps) => {
    this.mobxState.faculties.forEach(fac => {
      fac.selected = checked as boolean;
    });
  });

  sendMail = async (e: any) => {
    console.log("send mail clicked");
    try {
      const { data } = await axios.post("/admin/send-mails", {
        facultyIDs: this.selectedFacultyIds
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  applyFilter = (e: any, { checked, name }: CheckboxProps) => {
    let count = 0;
    if (name === "pending")
      this.mobxState.faculties = this.mobxState.faculties.map(fac => {
        ++count;
        if (fac.pending) fac.selected = checked as boolean;
        return fac;
      });
    else
      this.mobxState.faculties = this.mobxState.faculties.map(fac => {
        ++count;
        if (!fac.pending) fac.selected = checked as boolean;
        return fac;
      });
  };
  render() {
    console.log("Render => Table");
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Delete faculties
        </Header>
        <Grid>
          {this.mobxState.fetchingFaculties ? (
            <Loader
              style={{ display: "block" }}
              size="large"
              inverted
              content="Loading...please wait"
              active
            />
          ) : this.mobxState.faculties.length === 0 ? (
            <Grid.Row>
              <div style={{ textAlign: "center", width: "100%" }}>
                <h3 style={{ color: "white" }}>No data to display!!</h3>
              </div>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Table inverted celled striped>
                <DTableHeader
                  selectedCount={this.selectedCount}
                  onSelectAll={this.handleAllSelect}
                  allSelected={
                    this.selectedCount === this.mobxState.faculties.length
                  }
                  applyFilter={this.applyFilter}
                  sendMailClicked={this.sendMail}
                />
                <Table.Body>
                  {this.mobxState.faculties.map((el: any, index: number) => (
                    <DTableRow
                      key={index}
                      index={index}
                      {...el}
                      onSelect={this.onRowEvent}
                    />
                  ))}
                </Table.Body>
              </Table>
            </Grid.Row>
          )}
          }
        </Grid>
      </>
    );
  }
}
