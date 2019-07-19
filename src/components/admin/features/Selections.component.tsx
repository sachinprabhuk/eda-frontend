import React, { Component } from "react";
import { Loader, Header, Grid, Table, Modal, Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable, runInAction, computed, action } from "mobx";

import { axios } from "../../../shared/axios";
import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";

interface ISlot {
  slot_id: string;

  slot_type: string;
  slot_date: string;
  slot_total: number;
  slot_remaining: number;
  faculties: string[];
}

const TableHeader = observer(function(props: {
  onTypeChange: (index: number, options: ISelectOption) => void;
}) {
  const ddoptions = [
    { value: "all", label: "All" },
    { value: "morn", label: "Morning" },
    { value: "aft", label: "Afternoon" }
  ];
  return (
    <>
      <Table.Header>
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
          <Table.HeaderCell textAlign="center">Selection</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </>
  );
});

const parsedDate = (d: string) => {
  const dateObj = new Date(d);
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${date}-${month}-${year}`;
};

interface IRowProps {
  slot: ISlot;
}
const TableRow = observer(function(props: IRowProps) {
  console.log("Render => Table row");
  const faculties = props.slot.faculties;
  const modalConent =
    faculties[0] === null && faculties.length === 1 ? (
      <h4 style={{ margin: "21px" }}>
        <span>No data to display!!</span>
        <Icon name="database" />
      </h4>
    ) : (
      props.slot.faculties.join(", ")
    );
  return (
    <Table.Row>
      <Table.Cell>{props.slot.slot_type}</Table.Cell>
      <Table.Cell>{parsedDate(props.slot.slot_date)}</Table.Cell>
      <Table.Cell>{props.slot.slot_total}</Table.Cell>
      <Table.Cell>{props.slot.slot_remaining}</Table.Cell>
      <Table.Cell textAlign="center">
        <Modal
          size="small"
          trigger={<span className="modal-trigger">show</span>}
          header="Slot selections"
          content={modalConent}
          actions={[{ key: "done", content: "Done", positive: true }]}
        />
      </Table.Cell>
    </Table.Row>
  );
});

@observer
export class Selections extends Component {
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
        el => el.slot_type === this.mobxState.slotType
      );
  }

  @computed get displayedSlotCount(): number {
    return this.slotsToDisplay.length;
  }

  fetchAndSetSelections = async () => {
    try {
      runInAction(() => {
        this.mobxState.initializing = true;
      });
      const { data } = await axios.get("/admin/slot-selections");
      runInAction(() => {
        this.mobxState.initializing = false;
        this.mobxState.slots = data;
      });
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

  async componentDidMount() {
    await this.fetchAndSetSelections();
  }

  onTypeChange = action((index: number, option: ISelectOption) => {
    this.mobxState.slotType = option.value;
  });

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
            <TableHeader onTypeChange={this.onTypeChange} />
            <Table.Body>
              {this.slotsToDisplay.map((slot: ISlot) => {
                return <TableRow key={slot.slot_id} slot={slot} />;
              })}
            </Table.Body>
          </Table>
        </Grid.Row>
      );
    }
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Slot selection
        </Header>
        <Grid>{toRender}</Grid>
      </>
    );
  }
}
