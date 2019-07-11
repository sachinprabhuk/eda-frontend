import React, { Component } from "react";
import { Loader, Header, Grid, Table } from "semantic-ui-react";

import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";
import { axios } from "../../../shared/axios";
import { DarkButton } from "../../utils/DarkButton";

interface IReportData {
  branch: string;
  contact: string;
  email: string;
  id: string;
  name: string;
  designation: number;
}
interface IState {
  selectedType: null | ISelectOption;
  selectedDate: ISelectOption | null;
  initError: string;
  initializing: boolean;
  fetchError: string;
  fetching: boolean;

  data: Array<IReportData>;
}
export class Report extends Component<any, IState> {
  state = {
    selectedDate: null,
    selectedType: null,

    initError: "",
    initializing: true,

    fetchError: "",
    fetching: false,

    data: [] as IReportData[]
  };

  typeOptions: ISelectOption[] = [];
  dateOptions: { morn: ISelectOption[]; aft: ISelectOption[] } = {
    morn: [],
    aft: []
  };

  updateType = (index: number, option: ISelectOption) => {
    this.setState({ selectedType: option });
  };
  updateDate = (index: number, option: ISelectOption) => {
    this.setState({ selectedDate: option });
  };
  fetchReport = async () => {
    this.setState({ fetching: true });
    try {
      const { data } = await axios.get("/admin/report", {
        params: {
          date: (this.state.selectedDate! as ISelectOption).value,
          type: (this.state.selectedType! as ISelectOption).value
        }
      });
      this.setState({ fetching: false, data });
    } catch (e) {
      const msg = e && e.response ? e.response.data.message : e.message;
      this.setState({
        fetching: false,
        fetchError: msg || "error while fetching data"
      });
    }
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("/admin/report-meta");
      console.log(data);
      const keylen = Object.keys(data).length;
      if (keylen >= 1) {
        this.typeOptions = [
          { value: "morn", label: "Morning" },
          { value: "aft", label: "Afternoon" }
        ];
        let newState = {};
        if (keylen === 1) {
          // either morn or aft;
          const parsed = (data["morn"] || data["aft"]).map((el: string) => ({
            label: el,
            value: el
          }));
          if (data["morn"]) {
            this.dateOptions.morn = parsed;
            newState = {
              selectedDate: parsed[0],
              selectedType: this.typeOptions[0],
              initializing: false
            };
          } else {
            this.dateOptions.aft = parsed;
            newState = {
              selectedDate: parsed[0],
              selectedType: this.typeOptions[1],
              initializing: false
            };
          }
        } else {
          // both morn and aft;
          this.dateOptions.morn = data["morn"].map((el: string) => ({
            label: el,
            value: el
          }));
          this.dateOptions.aft = data["aft"].map((el: string) => ({
            label: el,
            value: el
          }));
          newState = {
            initializing: false,
            selectedType: this.typeOptions[0],
            selectedDate: this.dateOptions.morn[0]
          };
        }

        this.setState(newState, () => {
          this.fetchReport();
        });
      } else {
        // no data case.
        this.setState({ initializing: false });
      }
    } catch (e) {
      this.setState({
        initializing: false,
        initError: "Ooops!!something went wrong!refresh the page to try again."
      });
    }
  }

  render() {
    console.log("Render => Report");
    let toRender = null;
    if (this.state.initializing)
      toRender = (
        <Loader size="big" active inverted content="initializing..." />
      );
    else if (this.state.initError) toRender = <h1>{this.state.initError}</h1>;
    else if (this.typeOptions.length === 0) toRender = <h1>No data!!</h1>;
    else {
      // @ts-ignore
      const dateOptions = this.dateOptions[this.state.selectedType.value];
      toRender = (
        <>
          <Grid.Row style={{ alignItems: "flex-end", dispaly: "flex" }}>
            <DarkDropdown
              label="select type"
              placeholder="Slot type"
              options={this.typeOptions}
              value={this.state.selectedType}
              onChange={this.updateType}
              required
              fluid
              style={{ minWidth: "210px" }}
            />
            <DarkDropdown
              label="select date"
              placeholder="Dates"
              options={dateOptions}
              value={this.state.selectedDate}
              onChange={this.updateDate}
              required
              fluid
              style={{ minWidth: "210px" }}
            />
            <DarkButton
              onClick={this.fetchReport}
              loading={this.state.fetching}
            >
              Fetch report
            </DarkButton>
          </Grid.Row>
          {this.state.fetching ? (
            <Loader
              size="medium"
              active
              inverted
              content="fetching report..."
            />
          ) : (
            <Grid.Row>
              <Table inverted striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>id</Table.HeaderCell>
                    <Table.HeaderCell>name</Table.HeaderCell>
                    <Table.HeaderCell>contact</Table.HeaderCell>
                    <Table.HeaderCell>email</Table.HeaderCell>
                    <Table.HeaderCell>branch</Table.HeaderCell>
                    <Table.HeaderCell>designation</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.data.map((el: IReportData) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{el.id}</Table.Cell>
                        <Table.Cell>{el.name}</Table.Cell>
                        <Table.Cell>{el.contact}</Table.Cell>
                        <Table.Cell>{el.email}</Table.Cell>
                        <Table.Cell>{el.branch}</Table.Cell>
                        <Table.Cell>{el.designation}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Row>
          )}
        </>
      );
    }
    return (
      <>
        <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
          Report
        </Header>
        <Grid>{toRender}</Grid>
      </>
    );
  }
}
