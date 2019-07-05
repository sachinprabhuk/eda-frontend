import React, { Component } from "react";
import { VForm, VField } from "../../shared/VirtualForm";
import { DarkInput } from "./DarkInput";
import { observer } from "mobx-react";

// interface IInputField {
//   formField: VField;
// }

// @observer
// export class InputField extends Component<IInputField> {
//   @observable value: string = this.props.formField.valueProp;

//   handleChange = action((e: any, { value }: InputOnChangeData) => {
//     this.value = value;
//     this.props.formField.valueProp = value;
//   });

//   render() {
//     console.log("Render => Input field");
//     return (
//       <Form.Field>
//         <label>{this.props.formField.labelProp}</label>
//         <Input
//           type={this.props.formField.typeProp}
//           required={this.props.formField.requiredProp}
//           placeholder={this.props.formField.labelProp}
//           value={this.value}
//           onChange={this.handleChange}
//         />
//       </Form.Field>
//     );
//   }
// }

interface IReactForm {
  formData: VForm;
  submitting: boolean;
  onSubmit: (e: any) => void;
  submitButton: (loading: boolean) => JSX.Element;
}

@observer
export class AutoForm extends Component<IReactForm> {
  render() {
    console.log("Render => Form");
    return (
      <form onSubmit={this.props.onSubmit}>
        {this.props.formData.form.map((el: VField, idx) => {
          return <DarkInput formField={el} fluid key={idx} />;
        })}
        {this.props.submitButton(this.props.submitting)}
      </form>
    );
  }
}
