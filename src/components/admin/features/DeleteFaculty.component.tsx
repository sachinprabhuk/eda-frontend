import React, { Component } from "react";
import {
  Loader,
  Header,
  Grid,
  Table,
  Checkbox,
  CheckboxProps,
  Button
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
    onDeleteClick: (e: any) => void;
  }) => {
    console.log("Render => Header");
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="5" verticalAlign="middle">
            <span>
              You have selected{" "}
              <span className="color theme-one" style={{ fontSize: "20px" }}>
                {props.selectedCount}
              </span>{" "}
              faculties
            </span>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2">
            <Button
              color="youtube"
              floated="right"
              size="small"
              onClick={props.onDeleteClick}
              disabled={props.selectedCount === 0}
            >
              Delete selected
            </Button>
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
export class DeleteFaculty extends Component {
  @observable mobxState = {
    selectedCount: 0,
    fetchingFaculties: true,
    faculties: [] as IFacultyInfo[]
  };

  @computed get selectedFacultyIds() {
    return this.mobxState.faculties
      .filter(fac => fac.selected)
      .map(fac => fac.id);
  }

  fetchAndSetFaculties = flow(function*(this: DeleteFaculty) {
    try {
      const { data } = yield axios.get("/admin/faculties");
      const parsedData = data.map((el: any) => {
        el.selectionInfo = `${el.selections.length} / ${el.slotLim.maximum}`;
        el.designation = el.slotLim.designation;

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
    this.mobxState.selectedCount += checked ? 1 : -1;
    this.mobxState.faculties[rowIndex as number].selected = checked as boolean;
  });

  handleAllSelect = action((e: any, { checked }: CheckboxProps) => {
    this.mobxState.faculties.forEach(fac => {
      fac.selected = checked as boolean;
    });
    this.mobxState.selectedCount = checked
      ? this.mobxState.faculties.length
      : 0;
  });

  handleDelete = async (e: any) => {
    try {
      runInAction(() => (this.mobxState.fetchingFaculties = true));
      const toDelete = this.selectedFacultyIds;
      await axios.delete("/admin/faculties", {
        data: {
          facultyIDs: toDelete
        }
      });
      // map for quick lookup
      const map = toDelete.reduce((acc, curr) => {
        acc.set(curr, curr);
        return acc;
      }, new Map());

      this.mobxState.faculties = this.mobxState.faculties.filter(
        fac => !map.has(fac.id)
      );
      this.mobxState.selectedCount = 0;
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.message
          : "Oops something went wrong!!some records may not be deleted";
      await this.fetchAndSetFaculties();
      toast.error(msg);
    }
    runInAction(() => (this.mobxState.fetchingFaculties = false));
  };

  render() {
    console.log("Render => Table");
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Delete faculties
        </Header>
        <Grid>
          <Grid.Row>
            {this.mobxState.fetchingFaculties ? (
              <div>
                <Loader
                  style={{ display: "block" }}
                  size="large"
                  inverted
                  content="Loading...please wait"
                  active
                />
              </div>
            ) : this.mobxState.faculties.length === 0 ? (
              <div style={{ textAlign: "center", width: "100%" }}>
                <h3 style={{ color: "white" }}>No data to display!!</h3>
              </div>
            ) : (
              <Table inverted celled striped>
                <DTableHeader
                  selectedCount={this.mobxState.selectedCount}
                  onSelectAll={this.handleAllSelect}
                  allSelected={
                    this.mobxState.selectedCount ===
                    this.mobxState.faculties.length
                  }
                  onDeleteClick={this.handleDelete}
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
            )}
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
