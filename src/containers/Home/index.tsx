import React, { Component } from "react";
import { Container, Grid, GridColumn } from "semantic-ui-react";
import { Navbar } from "../../components/Navbar.component";
import { SelectionInfo } from "./SelectionInfo.container";
import { Provider } from "mobx-react";
import { slotStoreInstance } from "../../stores/Slot.store";
import { SlotTypeMenu } from "../../components/SlotTypeMenu.component";
import { SlotsTable } from "../../components/SlotSelectionTable/SlotListTable.component";

// import { SlotListTable } from "../../../ref/components/SlotSelectionTable/SlotListTable.component";
// import { SlotTypeMenu } from "../../../ref/components/SlotTypeMenu.component";
// import { SlotProvider } from "../../../ref/contexts/Slot.context";
// import { SelectedSlotProvider } from '../../../ref/contexts/SelectedSlots.context'

export class Home extends Component {
  render() {
    console.log("Render => Home");
    return (
      <>
        <Navbar />

        <Container>
          <Provider slotStore={slotStoreInstance}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <SlotTypeMenu />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <GridColumn width={10}>
                  <SlotsTable />
                </GridColumn>
                <GridColumn width={5} floated="right">
                  <SelectionInfo />
                </GridColumn>
              </Grid.Row>
            </Grid>
          </Provider>
        </Container>
      </>
    );
  }
}
