import React, { PureComponent } from "react";
import { Header, Grid, Loader, Table } from "semantic-ui-react";
import { axios } from "../../../shared/axios";
import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";

interface IState {
  loading: boolean;
  data: Array<any>;
  designation: ISelectOption;
  fetchError: string;
}
interface IPendingData {
  id: string;
  name: string;
  email: string;
  contact: string;
  branch: string;
}

const desigOptions = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" }
];

export class PendingFaculty extends PureComponent<any, IState> {
  state = {
    loading: true,
    fetchError: "",
    designation: desigOptions[0],
    data: []
  };

  fetchPendingAndSet = async (desigIndex: number) => {
    this.setState({ loading: true });
    try {
      const { data } = await axios.get("/admin/pending-faculty", {
        params: {
          designation: desigOptions[desigIndex].value
        }
      });
      this.setState({
        loading: false,
        data: data,
        fetchError: "",
        designation: desigOptions[desigIndex]
      });
    } catch (e) {
      const msg =
        e && e.response
          ? e.response.data.message
          : "Error while fetching data!! refresh to try again";
      this.setState({
        fetchError: msg,
        loading: false
      });
    }
  };

  async componentDidMount() {
    await this.fetchPendingAndSet(0);
  }

  handleDesignationChange = async (index: number, option: ISelectOption) => {
    await this.fetchPendingAndSet(index);
  };

  render() {
    console.log("Render => pending fac");
    let toRender = null;
    if (this.state.loading)
      toRender = <Loader active size="large" content="Loading..." inverted />;
    else if (this.state.fetchError || this.state.data.length === 0) {
      const msg = this.state.fetchError || "No data to display!!";
      toRender = (
        <Grid.Row>
          <div style={{ textAlign: "center", width: "100%" }}>
            <h3 style={{ color: "white" }}>{msg}</h3>
          </div>
        </Grid.Row>
      );
    } else {
      toRender = (
        <>
          <Grid.Row>
            <DarkDropdown
              style={{ minWidth: "150px" }}
              placeholder="Select designation"
              options={desigOptions}
              value={this.state.designation}
              onChange={this.handleDesignationChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Table inverted striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>id</Table.HeaderCell>
                  <Table.HeaderCell>name</Table.HeaderCell>
                  <Table.HeaderCell>email</Table.HeaderCell>
                  <Table.HeaderCell>contact</Table.HeaderCell>
                  <Table.HeaderCell>branch</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.data.map((el: IPendingData) => {
                  return (
                    <Table.Row key={el.id}>
                      <Table.Cell>{el.id}</Table.Cell>
                      <Table.Cell>{el.name}</Table.Cell>
                      <Table.Cell>{el.email}</Table.Cell>
                      <Table.Cell>{el.contact || "coming soon.."}</Table.Cell>
                      <Table.Cell>{el.branch}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
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
