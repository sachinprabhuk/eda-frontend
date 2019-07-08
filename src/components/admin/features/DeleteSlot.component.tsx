import React, { Component } from "react";
import {
  Loader,
  CheckboxProps,
  Table,
  Button,
  Checkbox,
  Header,
  Grid
} from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable, flow, action, computed } from "mobx";

import { axios } from "../../../shared/axios";
import { toast } from "react-toastify";
import { DarkDropdown } from "../../utils/DarkDropdown";

// "id": "2b477109-84f1-4a97-bf53-bfb37ebd4f83",
// "type": "morn",
// "date": "2019-07-25",
// "total" : 121,
// remaining: "212"

interface ISlotInfo {
  id: string;
  date: Date;
  type: "morn" | "aft";
  total: number;
  remaining: number;
  selected: boolean;
}

type filterType = "all" | "morn" | "aft";

const DTableRow = observer(function(
  props: {
    index: number;
    onSelect: (e: any, data: CheckboxProps) => void;
  } & ISlotInfo
) {
  console.log("Render => Row");
  return (
    <Table.Row>
      <Table.Cell>{props.type}</Table.Cell>
      <Table.Cell>{props.date}</Table.Cell>
      <Table.Cell>{props.total}</Table.Cell>
      <Table.Cell>{props.remaining}</Table.Cell>
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

const filterOptions = [
  { value: "all", label: "All" },
  { value: "morn", label: "Morning" },
  { value: "aft", label: "Afternoon" }
];

const DTableHeader = observer(
  (props: {
    selectedCount: number;
    allSelected: boolean;
    filter: filterType;
    onSelectAll: (e: any, data: CheckboxProps) => void;
    onDeleteClick: (e: any) => void;
    onFilterChange: (e: any) => void;
  }) => {
    console.log("Render => Header");
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3" verticalAlign="middle">
            <span>
              You have selected{" "}
              <span className="color theme-one" style={{ fontSize: "20px" }}>
                {props.selectedCount}
              </span>{" "}
              slots
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
          <Table.HeaderCell
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            Slot type
            <DarkDropdown
              options={filterOptions}
              initSelected={filterOptions[0]}
              onChange={props.onFilterChange}
              justArrow
            />
          </Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Available</Table.HeaderCell>
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
export class DeleteSlot extends Component {
  @observable mobxState = {
    selectedCount: 0,
    fetchingSlots: true,
    slots: [] as ISlotInfo[],
    currentType: "all"
  };

  setType = (type: filterType) => {
    console.log("type =>", type);
    this.mobxState.currentType = type;
  };

  @computed get selectedSlotIds() {
    return this.mobxState.slots.filter(slt => slt.selected).map(slt => slt.id);
  }

  fetchAndSetSlots = flow(function*(this: DeleteSlot) {
    try {
      const { data } = yield axios.get("/admin/slots");
      this.mobxState.slots = data;
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while fetching data!! refresh to try again";
      toast.error(msg);
    }
    this.mobxState.fetchingSlots = false;
  });

  async componentDidMount() {
    await this.fetchAndSetSlots();
  }

  onRowEvent = action((e: any, { checked, value: rowIndex }: CheckboxProps) => {
    this.mobxState.selectedCount += checked ? 1 : -1;
    this.mobxState.slots[rowIndex as number].selected = checked as boolean;
  });

  handleAllSelect = action((e: any, { checked }: CheckboxProps) => {
    this.mobxState.slots.forEach(slt => {
      slt.selected = checked as boolean;
    });
    this.mobxState.selectedCount = checked ? this.mobxState.slots.length : 0;
  });

  handleDelete = flow(function*(this: DeleteSlot) {
    try {
      this.mobxState.fetchingSlots = true;
      const toDelete = this.selectedSlotIds;
      yield axios.delete("/admin/slots", {
        data: {
          slotIDs: toDelete
        }
      });
      // map for quick lookup
      const map = toDelete.reduce((acc, curr) => {
        acc.set(curr, curr);
        return acc;
      }, new Map());
      this.mobxState.slots = this.mobxState.slots.filter(
        fac => !map.has(fac.id)
      );
      this.mobxState.selectedCount = 0;
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.message
          : "Oops something went wrong!!some records may not be deleted";
      console.log(e);
      console.log(this.fetchAndSetSlots);
      yield this.fetchAndSetSlots();
      toast.error(msg);
    }
    this.mobxState.fetchingSlots = false;
  });

  render() {
    console.log("Render => Table");
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Delete slots
        </Header>
        <Grid>
          <Grid.Row>
            {this.mobxState.fetchingSlots ? (
              <div style={{ display: "block", width: "100%" }}>
                <Loader
                  style={{ display: "block" }}
                  size="large"
                  inverted
                  content="Loading...please wait"
                  active
                />
              </div>
            ) : this.mobxState.slots.length === 0 ? (
              <div style={{ textAlign: "center", width: "100%" }}>
                <h3 style={{ color: "white" }}>No data to display!!</h3>
              </div>
            ) : (
              <Table inverted celled striped>
                <DTableHeader
                  filter={this.mobxState.currentType as "all"}
                  onFilterChange={this.setType}
                  selectedCount={this.mobxState.selectedCount}
                  onSelectAll={this.handleAllSelect}
                  allSelected={
                    this.mobxState.selectedCount === this.mobxState.slots.length
                  }
                  onDeleteClick={this.handleDelete.bind(this)}
                />
                <Table.Body>
                  {this.mobxState.currentType === "all"
                    ? this.mobxState.slots.map((el: any, index: number) => (
                        <DTableRow
                          key={index}
                          index={index}
                          {...el}
                          onSelect={this.onRowEvent}
                        />
                      ))
                    : this.mobxState.slots
                        .filter(
                          (el: any, index: number) =>
                            el.type === this.mobxState.currentType
                        )
                        .map((el, index) => (
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
