import { observable, flow, action } from "mobx";
import { axios } from "../../shared/axios";

//// <reference path="../../shared/Admin.namespace.ts" />

export interface IAuthStore {
  token: string | null;
  checkingAuthStatus: boolean;

  checkAuth(): void;
  setToken(token: string): void;
}

export class AuthStore implements IAuthStore {
  @observable token: string | null = null;
  @observable checkingAuthStatus: boolean = true;

  constructor() {
    console.log("%c Auth store initialized", "color: green;font-size: 18px");
    this.checkAuth();
  }

  @action
  setToken = (token: string | null) => {
    console.log("Setting token to --> ", token);
    if (token === null) localStorage.removeItem("eda-token");
    else localStorage.setItem("eda-token", token);
    this.token = token;
  };

  checkAuth = flow(function*(this: AuthStore) {
    try {
      if (!localStorage.getItem("eda-token")) throw new Error();
      const { data } = yield axios.get("/auth/auth-status", {
        params: { admin: true }
      });
      this.token = localStorage.getItem("eda-token");
      if (!data) throw new Error();
    } catch (e) {
      this.setToken(null);
    }
    this.checkingAuthStatus = false;
  });
}
