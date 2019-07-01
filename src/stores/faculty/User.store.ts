import { observable, action, computed } from "mobx";
import { Faculty, Slot } from "../../shared/interfaces";
import { IRootStore } from "./Root.store";

export type tokenType = string | null;
export type facultyType = Faculty | null;

export interface IUserStore {
  rootStore: IRootStore;

  token: tokenType;
  currentUser: facultyType;
  mornAllotedSlotCount: number;
  aftAllotedSlotCount: number;

  updateAllotedSlots(allotedSlots: Slot[]): void;

  login(token: string, currentUser: facultyType): void;
  logout(): void;
}

export class UserStore implements IUserStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    console.log("%c User store initialized...", "color: green;font-size: 18px");
    this.rootStore = rootStore;
  }

  @observable token: string | null = null;
  @observable currentUser: Faculty | null = null;

  @computed get mornAllotedSlotCount() {
    if (!this.currentUser) return 0;
    return this.currentUser.selections.filter(
      (sel: Slot) => sel.type === "morn"
    ).length;
  }

  @computed get aftAllotedSlotCount() {
    if (!this.currentUser) return 0;
    return this.currentUser.selections.filter((sel: Slot) => sel.type === "aft")
      .length;
  }

  @action login(token: string, faculty: facultyType) {
    if (!token || !faculty) return;
    localStorage.setItem("eda-token", token);
    this.rootStore.activateSlotStore();
    this.token = token;
    this.currentUser = faculty;
  }

  @action logout() {
    localStorage.removeItem("eda-token");
    console.log("%c deleting slot store..", "color: red;font-size: 18px");
    delete this.rootStore.slotStore;
    this.token = null;
    this.currentUser = null;
  }

  @action updateAllotedSlots(slots: Slot[]) {
    // if(!this.currentUser) return;
    slots.forEach(slot => {
      this.currentUser!.selections.push(slot);
    });
  }
}
