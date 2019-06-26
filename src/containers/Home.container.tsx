import React, { Component } from "react";
import { Container, Grid, GridColumn } from "semantic-ui-react";

import { Navbar } from "../components/Navbar.component";
import { SlotListTable } from "../components/SlotList.component";
import { SlotTypeMenu } from "../components/SlotTypeMenu.component";
import { SlotProvider } from "../contexts/Slot.context";

class Home extends Component {
  render() {
		console.log("render -----> Home");
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

              <GridColumn width={5} floated="right" />
            </Grid>
          </SlotProvider>
        </Container>
      </>
    );
  }
}

export default Home;
