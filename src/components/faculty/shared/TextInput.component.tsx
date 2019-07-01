import React, { Component } from "react";
import { FormField, FormInput, InputOnChangeData } from "semantic-ui-react";
import { observer } from "mobx-react";

interface ITextInput {
  name: string;
  error?: boolean;
  value: string;
  required?: boolean;
  onChange(e: any, data: InputOnChangeData): void;
}

@observer
export class TextInput extends Component<ITextInput> {
  render() {
    console.log("Render => TextInput");

    const {
      name,
      error = false,
      value,
      required = false,
      onChange
    } = this.props;

    return (
      <FormField required>
        <label>{name}</label>
        <FormInput
          name={name}
          error={error}
          value={value}
          required={required}
          onChange={onChange}
        />
      </FormField>
    );
  }
}
