import React, { Component, createRef } from "react";
import "./index.css";
import { VField } from "../../../shared/VirtualForm";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

interface IProps {
  fluid?: boolean;
  autofocus?: boolean;
  formField: VField;
}

@observer
export class DarkInput extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  @observable value: string = this.props.formField.valueProp;

  handleChange = action((e: any) => {
    this.value = e.target.value;
    this.props.formField.valueProp = e.target.value;
  });

  private input = createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.props.autofocus) this.input.current!.focus();
  }

  render() {
    console.log("Render => Dark input");
    const classList = ["dark-input"];
    if (this.props.fluid) classList.push("fluid");

    return (
      <>
        <div className="dark-form-element">
          <label>{this.props.formField.labelProp}</label>
          <input
            type={this.props.formField.typeProp}
            required={this.props.formField.requiredProp}
            onChange={this.handleChange}
            value={this.value}
            className={classList.join(" ")}
            ref={this.input}
          />
        </div>
      </>
    );
  }
}
