import React, { Component, RefObject } from "react";

import "./index.css";

export interface IDrowdownoption {
  value: string;
  label: string;
}

interface IProps {
  labelText?: string;
  placeholder?: string;
  initSelected?: IDrowdownoption;
  fluid?: boolean;
  justArrow?: boolean;
  required?: boolean;
  options: IDrowdownoption[];
  onChange: Function;
}

interface IState {
  active: boolean;
  selected: IDrowdownoption | null;
}

export class DarkDropdown extends React.Component<IProps, IState> {
  hiddenInputRef: RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
      selected: null
    };
    this.hiddenInputRef = React.createRef<HTMLInputElement>();
  }

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  };
  updateSelected = (e: any) => {
    const selectedIndex = Number.parseFloat(e.target.value);
    this.props.onChange(this.props.options[selectedIndex].value);
    this.setState({
      selected: this.props.options[selectedIndex],
      active: false
    });
    if (this.props.required)
      this.hiddenInputRef.current!.value = this.props.options[
        selectedIndex
      ].label;
  };

  render() {
    const { active } = this.state;
    const selectClasses = "select" + (active ? " active" : "");
    const optionsClasses = "options" + (active ? " active" : "");
    const ddClasses = ["dropdown"];
    if (this.props.fluid) ddClasses.push("fluid");
    if (this.props.justArrow) ddClasses.push("justArrow");

    const requiredMarkup = this.props.required ? (
      <input
        type="text"
        required
        ref={this.hiddenInputRef}
        className="ddd-hidden"
        name={"slot type"}
      />
    ) : null;
    const formElementStyle = this.props.justArrow
      ? {
          margin: "0px"
        }
      : {};

    return (
      <div className="dark-form-element" style={formElementStyle}>
        {this.props.labelText ? <label>{this.props.labelText}</label> : null}
        <div className={ddClasses.join(" ")}>
          {requiredMarkup}
          <div
            className={selectClasses}
            tabIndex={0}
            onClick={this.toggleActive}
          >
            <div className="content">
              {this.props.justArrow
                ? null
                : this.state.selected
                ? this.state.selected.label
                : this.props.placeholder}
            </div>
            <div className="arrow">&#9662;</div>
          </div>
          <ul className={optionsClasses}>
            {this.props.options.map((option, idx) => {
              return (
                <li tabIndex={0} onClick={this.updateSelected} value={idx}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
