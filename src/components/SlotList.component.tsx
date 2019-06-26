import React, { useContext } from "react";
import { Table, Checkbox } from "semantic-ui-react";
import { Slot } from "../utils/interfaces";
import { readableDate } from "../utils/tools";
import { SlotContext } from "../contexts/Slot.context";
import { Loader } from "./Loader.component";

export const SlotListTable = () => {
  console.log("render -----> Table");

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
        {slotContext.slots.map((slot: Slot) => {
          return (
            <Table.Row key={slot.id}>
              <Table.Cell>{readableDate(slot.date)}</Table.Cell>
              <Table.Cell>{slot.total}</Table.Cell>
              <Table.Cell>{slot.remaining}</Table.Cell>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
