import React, { useContext } from "react";
import { Table } from "semantic-ui-react";


import { Slot } from "../../utils/interfaces";
import { SlotContext } from "../../contexts/Slot.context";
import { Loader } from "../Loader.component";
import { SlotTableFooter } from './TableFooter.component';
import { SlotTableRow } from "./SlotTableRow.component";

export const SlotListTable = () => {
	console.log("Render => Table")

  const slotContext = useContext(SlotContext);

  return slotContext.fetching ? (
    <Loader size={4} />
  ) : (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Available</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {slotContext.slots.map((slot: Slot, slotIndex: number) => (
          <SlotTableRow 
          key={slotIndex} slot={slot} 
          type={slotContext.type} />
        ))}
      </Table.Body>
      <SlotTableFooter />
    </Table>
  );
};
