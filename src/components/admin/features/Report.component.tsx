import React, { Component } from "react";
import { Loader, Header, Grid } from "semantic-ui-react";

import { DarkDropdown, IDrowdownoption } from "../../utils/DarkDropdown";
import { axios } from "../../../shared/axios";

interface IState {
  type: String | null;
  date: String | null;
  initializing: boolean;
  fetchingReport: boolean;
}
export class Report extends Component<any, IState> {
  mornDates: IDrowdownoption[] = [];
  aftDates: IDrowdownoption[] = [];
  slotOptions: IDrowdownoption[] = [
    { label: "Morning", value: "morn" },
    { label: "Afternoon", value: "aft" }
  ];

  state = {
    type: "morn",
    date: null,
    initializing: true,
    fetchingReport: false,
    report: []
  };

  setDate = (value: any) => this.setState({ date: value });
  setType = (value: any) => this.setState({ type: value });

  fetchReport = async () => {
    if (!this.state.type || !this.state.date) return;
    // do the fetching
  };

  async componentDidMount() {
    const {
      data: { aft, morn }
    } = await axios.get("/admin/report-meta");
    // modify label to display date in proper format.
    this.mornDates = morn.map((el: String) => ({
      value: el,
      label: el
    }));
    this.aftDates = aft.map((el: String) => ({
      value: el,
      label: el
    }));
    this.setState({
      initializing: false
    });
  }

  render() {
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Report
        </Header>
        <Grid>
          <Grid.Row>
            {this.state.initializing ? (
              <Loader size="huge" content="intializing..." inverted active />
            ) : (
              <>
                <Grid.Row>
                  <DarkDropdown
                    onChange={this.setType}
                    initSelected={this.slotOptions[0]}
                    options={this.slotOptions}
                    fluid
                    placeholder="Slot type"
                  />
                  <DarkDropdown
                    onChange={this.setDate}
                    placeholder="Dates"
                    fluid
                    options={
                      this.state.type === "morn"
                        ? this.mornDates
                        : this.aftDates
                    }
                  />
                </Grid.Row>
                <Grid.Row>
                  <h1>Report goes here</h1>
                </Grid.Row>
              </>
            )}
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
