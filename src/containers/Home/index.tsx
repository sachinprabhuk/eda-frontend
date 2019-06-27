import React, { Component } from "react";
import { Container, Grid, GridColumn } from "semantic-ui-react";

import { Navbar } from "../../components/Navbar.component";
import { SlotListTable } from "../../components/SlotSelectionTable/SlotListTable.component";
import { SlotTypeMenu } from "../../components/SlotTypeMenu.component";
import { SlotProvider } from "../../contexts/Slot.context";
import { SelectedSlotProvider } from '../../contexts/SelectedSlots.context'
import { SelectionInfo } from "./SelectionInfo.container";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Container>
          <SlotProvider>
            <Grid>

              <Grid.Row>
                <Grid.Column width={10}>
                  <SlotTypeMenu />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <GridColumn width={10}>
                  <SelectedSlotProvider>
                    <SlotListTable />
                  </SelectedSlotProvider>
                </GridColumn>
                <GridColumn width={5} floated="right">
                  <SelectionInfo />
                </GridColumn>
              </Grid.Row>

            </Grid>
          </SlotProvider>
        </Container>
      </>
    );
  }
}

export default Home;
