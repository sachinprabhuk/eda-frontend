export class VField {
  labelProp: string = "label";
  requiredProp: boolean = false;
  iconProp: string = "";
  valueProp: string = "";
  typeProp: string = "text";
  nameProp: string = "";

  name(name: string) {
    this.nameProp = name;
    return this;
  }
  type(type: string) {
    this.typeProp = type;
    return this;
  }
  initValue(defaultValue: string) {
    this.valueProp = defaultValue;
    return this;
  }
  label(label: string) {
    this.labelProp = label;
    if (!this.nameProp) this.nameProp = label.toLowerCase();
    return this;
  }
  required(isRequired: boolean = true) {
    this.requiredProp = isRequired;
    return this;
  }
  icon(iconName: string) {
    this.iconProp = iconName;
    return this;
  }
}

export class VForm {
  form: VField[];
  constructor() {
    this.form = [];
  }
  addField(field: VField) {
    this.form.push(field);
    return this;
  }
  getData() {
    return this.form.reduce((acc: any, curr: VField) => {
      acc[curr.nameProp] = curr.valueProp;
      return acc;
    }, {});
  }
}
