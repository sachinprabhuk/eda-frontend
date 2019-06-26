import ax from "axios";

export const axios = ax.create({
  headers: {
    authorization: localStorage.getItem("eda-token")
  },
  baseURL: "/api"
});
