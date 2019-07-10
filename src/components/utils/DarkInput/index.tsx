import React, { createRef, RefObject, PureComponent } from "react";
import "./index.css";

interface IProps {
  autofocus?: boolean;
  fluid?: boolean;
  name?: string;
  required?: boolean;
  type?: "number" | "text";

  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export class DarkInput extends PureComponent<IProps> {
  private inputRef: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.inputRef = createRef<HTMLInputElement>();
  }

  componentDidMount() {
    if (!!this.props.autofocus) this.inputRef.current!.focus();
  }

  render() {
    console.log("Render => Input", this.props.name);
    const { label, fluid, name, required, type } = this.props;
    const inputProps = { type: "text" } as any;
    if (name) inputProps["name"] = name;
    if (required) inputProps["required"] = required;
    if (type) inputProps["type"] = type;

    const classList = ["text-input"];
    if (fluid) classList.push("fluid");
    return (
      <div className="dark-input-element">
        <label className="el-label">{label}</label>
        <input
          autoComplete="off"
          onChange={this.props.onChange}
          value={this.props.value}
          {...inputProps}
          className={classList.join(" ")}
          ref={this.inputRef}
        />
      </div>
    );
  }
}
