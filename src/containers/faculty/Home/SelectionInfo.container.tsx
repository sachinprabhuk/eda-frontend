import React from "react";
import { Grid } from "semantic-ui-react";
import { SlotCount } from "../../../components/faculty/SlotCount.component";
import { InfoAccordion } from "../../../components/faculty/SelectionInfo/InfoAccordion.component";

export function SelectionInfo() {
  return (
    <Grid width={16}>
      <Grid.Row>
        <SlotCount />
      </Grid.Row>
      <Grid.Row>
        <InfoAccordion />
      </Grid.Row>
    </Grid>
  );
}
