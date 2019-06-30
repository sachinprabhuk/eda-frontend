import React, { Component } from "react";
import { Grid, GridColumn, Container } from "semantic-ui-react";
import { Navbar } from "../../components/Navbar.component";
import { SelectionInfo } from "./SelectionInfo.container";
import { inject } from "mobx-react";
import { SlotTypeMenu } from "../../components/SlotTypeMenu.component";
import { SlotsTable } from "../../components/SlotSelectionTable/SlotListTable.component";
import { IRootStoreProps } from "../../shared/interfaces";

interface IHome extends IRootStoreProps {}

@inject("rootStore")
export class Home extends Component<IHome> {
  componentDidMount() {
    console.log(this.props.rootStore!);
    this.props.rootStore!.slotStore.fetchSlots("morn");
  }
  render() {
    console.log("Render => Home");
    return (
      <>
        <Navbar />
        <Container>
          <Grid width={16}>
            <Grid.Row>
              <Grid.Column width={7}>
                <SlotTypeMenu />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <GridColumn width={7}>
                <SlotsTable />
              </GridColumn>
              <GridColumn width={8} floated="right">
                <SelectionInfo />
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}
