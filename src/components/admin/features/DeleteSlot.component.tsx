import React, { Component } from "react";
import {
  Loader,
  Header,
  Grid,
  Table,
  Checkbox,
  Button,
  CheckboxProps
} from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable, runInAction, computed, action } from "mobx";

import { axios } from "../../../shared/axios";
import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";
import { toast } from "react-toastify";

interface ISlot {
  id: string;
  date: string;
  type: string;
  remaining: number;
  total: number;

  selected: boolean;
}

interface ITHProps {
  onTypeChange: (index: number, options: ISelectOption) => void;
  massSelectionHandler: (e: any, data: CheckboxProps) => void;
  deleteHandler: (e: any) => void;
  selectCount: number;
}

const TableHeader = observer(function(props: ITHProps) {
  const ddoptions = [
    { value: "all", label: "All" },
    { value: "morn", label: "Morning" },
    { value: "aft", label: "Afternoon" }
  ];
  return (
    <>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            You have selected{" "}
            <span className="select-count-statistic">{props.selectCount}</span>{" "}
            slots.
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2">
            <Button
              floated="right"
              color="youtube"
              onClick={props.deleteHandler}
              disabled={props.selectCount <= 0}
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
            type
            <DarkDropdown
              justArrow
              onChange={props.onTypeChange}
              value={ddoptions[0]}
              options={ddoptions}
            />
          </Table.HeaderCell>
          <Table.HeaderCell>date</Table.HeaderCell>
          <Table.HeaderCell>total</Table.HeaderCell>
          <Table.HeaderCell>remaining</Table.HeaderCell>
          <Table.HeaderCell>
            <Checkbox onChange={props.massSelectionHandler} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </>
  );
});

interface IRowProps {
  slot: ISlot;
  onCheckBoxClick: (e: any, data: CheckboxProps) => void;
}
const TableRow = observer(function(props: IRowProps) {
  console.log("Render => Table row");
  return (
    <Table.Row>
      <Table.Cell>{props.slot.type}</Table.Cell>
      <Table.Cell>{props.slot.date}</Table.Cell>
      <Table.Cell>{props.slot.total}</Table.Cell>
      <Table.Cell>{props.slot.remaining}</Table.Cell>
      <Table.Cell>
        <Checkbox
          value={props.slot.id}
          onChange={props.onCheckBoxClick}
          checked={!!props.slot.selected}
        />
      </Table.Cell>
    </Table.Row>
  );
});

@observer
export class DeleteSlot extends Component {
  @observable mobxState = {
    initializing: true,
    initError: "",
    slots: [] as ISlot[],

    slotType: "all"
  };

  @computed get slotsToDisplay(): ISlot[] {
    if (this.mobxState.slotType === "all") return this.mobxState.slots;
    else
      return this.mobxState.slots.filter(
        el => el.type === this.mobxState.slotType
      );
  }

  @computed get displayedSlotCount(): number {
    return this.slotsToDisplay.length;
  }

  @computed get selectedCount(): number {
    return this.mobxState.slots.filter(el => !!el.selected).length;
  }

  fetchAndSetSlots = async () => {
    try {
      const { data } = await axios.get("/admin/slots");
      runInAction(() => {
        this.mobxState.initializing = false;
        this.mobxState.initError = "";
        this.mobxState.slots = data;
      });
      console.log("slots fetched ------->", data);
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.message
          : "Error while fetching slots!! refresh the page to try again";
      runInAction(() => {
        this.mobxState.initError = msg;
        this.mobxState.initializing = false;
      });
    }
  };

  componentDidMount() {
    this.fetchAndSetSlots();
  }

  onTypeChange = action((index: number, option: ISelectOption) => {
    this.mobxState.slotType = option.value;
  });

  onRowClick = action((e: any, { value, checked }: CheckboxProps) => {
    const selectedSlot = this.mobxState.slots.find(slot => slot.id === value);
    if (!selectedSlot) return;
    selectedSlot.selected = checked as boolean;
  });

  massSelectionHandler = action((e: any, { checked }: CheckboxProps) => {
    this.slotsToDisplay.forEach(slot => {
      slot.selected = checked as boolean;
    });
  });

  handleDelete = async (e: any) => {
    try {
      runInAction(() => (this.mobxState.initializing = true));
      const toDelete = this.mobxState.slots
        .filter(slot => !!slot.selected)
        .map(slot => slot.id);
      console.log(toDelete);
      await axios.delete("/admin/slots", {
        data: {
          slotIDs: toDelete
        }
      });
      // map for quick lookup
      const map = toDelete.reduce((acc, curr) => {
        acc.set(curr, curr);
        return acc;
      }, new Map());
      runInAction(() => {
        this.mobxState.slots = this.mobxState.slots.filter(
          slot => !map.has(slot.id)
        );
        this.mobxState.initializing = false;
      });
      toast("deletetion sucessfull");
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message || e.response.message || e.message
          : "Oops something went wrong!!some records may not be deleted";
      await this.fetchAndSetSlots();
      runInAction(() => {
        this.mobxState.initializing = false;
      });
      toast.error(msg);
    }
  };

  render() {
    console.log("Render => Table");
    let toRender = null;
    if (this.mobxState.initializing)
      toRender = <Loader size="big" active inverted content="Loading..." />;
    else if (this.mobxState.initError || this.mobxState.slots.length === 0) {
      const msg = this.mobxState.initError || "No data to display!!";
      toRender = (
        <Grid.Row>
          <div style={{ textAlign: "center", width: "100%" }}>
            <h3 style={{ color: "white" }}>{msg}</h3>
          </div>
        </Grid.Row>
      );
    } else {
      toRender = (
        <Grid.Row>
          <Table inverted striped celled>
            <TableHeader
              onTypeChange={this.onTypeChange}
              massSelectionHandler={this.massSelectionHandler}
              selectCount={this.selectedCount}
              deleteHandler={this.handleDelete}
            />
            <Table.Body>
              {this.slotsToDisplay.map((slot: ISlot) => {
                return (
                  <TableRow
                    key={slot.id}
                    onCheckBoxClick={this.onRowClick}
                    slot={slot}
                  />
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Row>
      );
    }
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Report
        </Header>
        <Grid>{toRender}</Grid>
      </>
    );
  }
}
