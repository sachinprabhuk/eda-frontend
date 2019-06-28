import React, { Component } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Navbar } from "../../components/Navbar.component";
import { SelectionInfo } from "./SelectionInfo.container";
import { Provider } from "mobx-react";
import { SlotStoreInstance } from "../../stores/Slot.store";
import { SlotTypeMenu } from "../../components/SlotTypeMenu.component";
import { SlotsTable } from "../../components/SlotSelectionTable/SlotListTable.component";

// import { SlotListTable } from "../../../ref/components/SlotSelectionTable/SlotListTable.component";
// import { SlotTypeMenu } from "../../../ref/components/SlotTypeMenu.component";
// import { SlotProvider } from "../../../ref/contexts/Slot.context";
// import { SelectedSlotProvider } from '../../../ref/contexts/SelectedSlots.context'

// interface IHome extends IUserStoreProps {}

export class Home extends Component {
  componentDidMount() {
    SlotStoreInstance.fetchSlots("morn");
  }

  render() {
    console.log("Render => Home");
    return (
      <>
        <Navbar />
        <div style={{ margin: "0px 20px" }}>
          <Provider slotStore={SlotStoreInstance}>
            <Grid width={16}>
              <Grid.Row>
                <Grid.Column width={8}>
                  <SlotTypeMenu />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <GridColumn width={8}>
                  <SlotsTable />
                </GridColumn>
                <GridColumn width={7} floated="right">
                  <SelectionInfo />
                </GridColumn>
              </Grid.Row>
            </Grid>
          </Provider>
        </div>
      </>
    );
  }
}
