import { SlotStore, ISlotStore } from "./Slot.store";
import { IUserStore, UserStore } from "./User.store";

export interface IRootStore {
  userStore: IUserStore;
  slotStore: ISlotStore;
}

class RootStore {
  userStore: IUserStore;
  slotStore: ISlotStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.slotStore = new SlotStore(this);
  }
}

export const RootStoreInstance = new RootStore();
