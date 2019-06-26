import React, { Component } from "react";
import { Container, Grid, GridColumn } from "semantic-ui-react";

import { Navbar } from "../../components/Navbar.component";
import { SlotListTable } from "../../components/SlotListTable.component";
import { SlotTypeMenu } from "../../components/SlotTypeMenu.component";
import { SlotProvider } from "../../contexts/Slot.context";
import { SelectionInfo } from "./SelectionInfo.container";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Container>
          <SlotProvider>
            <Grid>
              <GridColumn width={10}>
                <SlotTypeMenu />

                <SlotListTable />
              </GridColumn>

              <GridColumn width={5} floated="right">
                <SelectionInfo />
							</GridColumn>
            </Grid>
          </SlotProvider>
        </Container>
      </>
    );
  }
}

export default Home;
