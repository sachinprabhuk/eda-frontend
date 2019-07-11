import React, { Component } from "react";
import { Loader, Header, Grid } from "semantic-ui-react";

import { DarkDropdown, ISelectOption } from "../../utils/DarkDropdown";
import { axios } from "../../../shared/axios";

const typeOptions: ISelectOption[] = [
  { value: "morn", label: "Morning" },
  { value: "aft", label: "Afternoon" }
];
const dateOption: ISelectOption[] = [];

interface IState {
  type: null | ISelectOption;
  date: string | null;
}
export class Report extends Component<any, IState> {
  state = {
    type: null,
    date: null
  };
  // onOptionSelect = (index: number, option: )

  render() {
    console.log("Render => Report");
    return (
      <h1>heyy</h1>
      // <>
      //   <Header className="color theme-one" as="h1" style={{ fontWeight: 400 }}>
      //     Report
      //   </Header>
      //   <Grid>
      //     <Grid.Row>
      //       <DarkDropdown

      //       />
      //     </Grid.Row>
      //   </Grid>
      // </>
    );
  }
}
