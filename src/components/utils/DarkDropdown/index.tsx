import React, { PureComponent, RefObject } from "react";
import "./index.css";

export interface ISelectOption {
  label: string;
  value: string;
}

interface IProps {
  value: ISelectOption | null;
  onChange: (index: number, item: ISelectOption) => void;
  options: ISelectOption[];

  required?: boolean;
  justArrow?: boolean;
  fluid?: boolean;
  placeholder?: string;
}

export class DarkDropdown extends PureComponent<IProps> {
  private hiddenInputRef: RefObject<HTMLInputElement>;
  state = {
    active: false
  };
  constructor(props: IProps) {
    super(props);
    this.hiddenInputRef = React.createRef<HTMLInputElement>();
  }

  toggleActive = (e: any) => {
    this.setState({ active: !this.state.active });
  };

  onOptionSelect = (e: any) => {
    const {
      target: { value: index }
    } = e;
    this.props.onChange(index, this.props.options[index]);
    this.setState({ active: false });
    this.hiddenInputRef.current!.value = this.props.options[index].label;
  };

  render() {
    console.log("Render => Dropdown", this.props.value);
    const { active } = this.state;
    const ddClasses = ["dropdown"];
    const selectClass = ["select"];
    const optionsClass = ["options"];
    if (active) {
      selectClass.push("active");
      optionsClass.push("active");
    }
    if (this.props.fluid) ddClasses.push("fluid");
    if (this.props.justArrow) ddClasses.push("justArrow");

    const requiredMarkup = this.props.required ? (
      <input
        type="text"
        required
        ref={this.hiddenInputRef}
        className="hidden-input"
      />
    ) : null;

    return (
      <div className="dark-dropdown-element">
        {this.props.justArrow ? null : <label>label</label>}
        <div className={ddClasses.join(" ")}>
          {requiredMarkup}
          <div
            className={selectClass.join(" ")}
            tabIndex={0}
            onClick={this.toggleActive}
          >
            {this.props.justArrow ? null : (
              <div className="content">
                {this.props.value
                  ? this.props.value.label
                  : this.props.placeholder}
              </div>
            )}
            <div className="arrow">&#9662;</div>
          </div>
          <ul className={optionsClass.join(" ")}>
            {this.props.options.map((option, idx) => {
              return (
                <li
                  tabIndex={0}
                  onClick={this.onOptionSelect}
                  value={idx}
                  key={idx}
                >
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
