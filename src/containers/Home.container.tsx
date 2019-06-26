import React, { Component } from "react";
import { Container, Grid, GridColumn } from "semantic-ui-react";

import { Navbar } from "../components/Navbar.component";
import { SlotListTable } from "../components/SlotList.component";
import { SlotTypeMenu } from "../components/SlotTypeMenu.component";
import { Slot } from "../utils/interfaces";
import { Loader } from "../components/Loader.component";

interface IHomeState {
  slots: Array<Slot>;
  loadingSlots: boolean;
}

class Home extends Component<any, IHomeState> {
  state = {
    slots: [],
    loadingSlots: false
  };

  slotTypeChangedHandler = (name: string) => {
    this.setState({ loadingSlots: true });
    setTimeout(() => {
      if (name === "morning")
        this.setState({
          slots: [
            { id: "1", date: new Date(2018, 6, 5), total: 10, remaining: 4 },
            { id: "2", date: new Date(2018, 6, 6), total: 10, remaining: 4 },
            { id: "3", date: new Date(2018, 6, 7), total: 10, remaining: 4 },
            { id: "4", date: new Date(2018, 6, 8), total: 10, remaining: 4 },
            { id: "5", date: new Date(2018, 6, 9), total: 10, remaining: 4 }
          ]
        });
      else
        this.setState({
          slots: [
            { id: "1", date: new Date(2018, 6, 6), total: 10, remaining: 4 },
            { id: "2", date: new Date(2018, 6, 7), total: 10, remaining: 4 },
            { id: "3", date: new Date(2018, 6, 8), total: 10, remaining: 4 },
            { id: "4", date: new Date(2018, 6, 9), total: 10, remaining: 4 },
            { id: "5", date: new Date(2018, 6, 10), total: 10, remaining: 4 }
          ]
        });
      this.setState({ loadingSlots: false });
    }, 2000);
  };

  componentDidMount() {
    this.setState({
      slots: [
        { id: "1", date: new Date(2018, 6, 5), total: 10, remaining: 4 },
        { id: "2", date: new Date(2018, 6, 6), total: 10, remaining: 4 },
        { id: "3", date: new Date(2018, 6, 7), total: 10, remaining: 4 },
        { id: "4", date: new Date(2018, 6, 8), total: 10, remaining: 4 },
        { id: "5", date: new Date(2018, 6, 9), total: 10, remaining: 4 }
      ]
    });
    // fetch selectable slots from server
  }

  render() {
    return (
      <>
        <Navbar />
        <Container>
          <Grid>
            <GridColumn width={10}>
              <SlotTypeMenu
                items={["morning", "afternoon"]}
                onSelect={this.slotTypeChangedHandler}
              />
              {this.state.loadingSlots ? (
                <Loader size={4} />
              ) : (
                <SlotListTable slots={this.state.slots} />
              )}
            </GridColumn>
						
            <GridColumn width={5} floated="right" />
          </Grid>
        </Container>
      </>
    );
  }
}

export default Home;
