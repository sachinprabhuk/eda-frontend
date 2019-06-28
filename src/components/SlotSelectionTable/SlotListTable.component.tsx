import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { ISlotStore } from "../../stores/Slot.store";
import { Loader } from "../shared/Loader.component";
import { Slot } from "../../shared/interfaces";
import { SlotTableRow } from "./SlotTableRow.component";

interface ISlotsTable {
  slotStore?: ISlotStore;
}

@inject("slotStore")
@observer
export class SlotsTable extends Component<ISlotsTable> {
  componentDidMount() {
    // this.props.slotStore.fetchSlots()
  }
  render() {
    console.log("Render => Table", this.props.slotStore!.currentSlots);

    return this.props.slotStore!.fetchingSlots ? (
      <Loader size={4} />
    ) : (
      <Table compact celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Available</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.slotStore!.currentSlots.map((slot: Slot, idx: number) => (
            <SlotTableRow key={idx} slot={slot} />
          ))}
        </Table.Body>
        {/* <SlotTableFooter /> */}
      </Table>
    );
  }
}
