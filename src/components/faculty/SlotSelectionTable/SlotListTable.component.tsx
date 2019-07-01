import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Loader } from "../shared/Loader.component";
import { Slot, IRootStoreProps } from "../../../shared/interfaces";
import { SlotTableRow } from "./SlotTableRow.component";

interface ISlotsTable extends IRootStoreProps {}

@inject("rootStore")
@observer
export class SlotsTable extends Component<ISlotsTable> {
  render() {
    console.log(
      "Render => Table",
      this.props.rootStore!.slotStore.fetchingSlots,
      this.props.rootStore!.slotStore.currentSlots
    );

    return this.props.rootStore!.slotStore.fetchingSlots ? (
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
          {this.props.rootStore!.slotStore.currentSlots.map(
            (slot: Slot, idx: number) => (
              <SlotTableRow key={idx} slot={slot} />
            )
          )}
        </Table.Body>
        {/* <SlotTableFooter /> */}
      </Table>
    );
  }
}
