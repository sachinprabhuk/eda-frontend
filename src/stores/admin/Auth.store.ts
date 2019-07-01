import { observable, flow } from "mobx";
import { axios } from "../../shared/axios";

//// <reference path="../../shared/Admin.namespace.ts" />

export interface IAuthStore {
  token: string | null;
  checkingAuthStatus: boolean;
  checkAuth(): void;
}

export class AuthStore implements IAuthStore {
  @observable token: string | null = null;
  @observable checkingAuthStatus: boolean = true;

  constructor() {
    console.log("%c Auth store initialized", "color: green;font-size: 18");
    this.checkAuth();
  }

  checkAuth = flow(function*(this: AuthStore) {
    try {
      const { data } = yield axios.get("/auth/auth-status");
      this.token = data;
    } catch (e) {
      this.token = null;
    }
    this.checkingAuthStatus = false;
  });
}
