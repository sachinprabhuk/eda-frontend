// @ts-ignore
import { toast } from "react-semantic-toasts";

export const readableDate = (date: Date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const date_ = date.getDate();
  const datePrefix = date_ < 10 ? "0" : "";
  const monthPrefix = month < 10 ? "0" : "";
  return `${datePrefix}${date_} / ${monthPrefix}${month} / ${year}`;
};

export const showToast = (
  type: string,
  title: string,
  description: string,
  errorList?: string[]
) => {
  const toastConfig: any = {
    type,
    icon: "cancel",
    title,
    description,
    time: 7500,
    animation: "bounce",
    size: "large"
  };
  if (errorList) toastConfig.list = errorList;

  toast(toastConfig);
};
