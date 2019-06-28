import React from "react";
import { Grid } from "semantic-ui-react";
import { SlotCount } from "../../components/SlotCount.component";
import { SelectedSlot } from "../../components/SelectedSlot.component";

export function SelectionInfo() {
  return (
    <Grid width={16}>
      <Grid.Row>
        <SlotCount />
      </Grid.Row>
      <Grid.Row>
        <SelectedSlot />
      </Grid.Row>
      <Grid.Row>{/* <AllotedSlots /> */}</Grid.Row>
    </Grid>
  );
}
