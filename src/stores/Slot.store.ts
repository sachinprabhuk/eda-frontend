import { observable, action, runInAction, computed } from "mobx";
import { Slot } from "../shared/interfaces";
import { axios } from "../shared/axios";
import { userStoreInstance as userStore } from "./User.store";

export interface ISlotStore {
  currentSlotsType: string;
  currentSlots: Slot[];
  fetchingSlots: boolean;

  selectedSlots: Slot[];

  mornSelectionCount: number;
  aftSelectionCount: number;
  mornSelectable: number;
  aftSelectable: number;

  setSlotsType(slotsType: string): void;
  setSlots(slots: Slot[]): void;
  setFetchingSlots(fetching: boolean): void;
  updateSlot(slotID: string, selectSlot: boolean): void;

  fetchSlots(type: string): void;
}

export class SlotStore implements ISlotStore {
  @observable currentSlotsType: string = "morn";
  @observable currentSlots: Slot[] = [];
  @observable fetchingSlots: boolean = false;

  @computed get selectedSlots(): Slot[] {
    return this.currentSlots.filter(slot => slot.selected);
  }

  @computed get mornSelectionCount() {
    this.selectedSlots.filter((slot: Slot) => slot.type === "morn");
    return this.selectedSlots.filter((slot: Slot) => slot.type === "morn")
      .length;
  }

  @computed get aftSelectionCount() {
    return this.selectedSlots.filter((slot: Slot) => slot.type === "aft")
      .length;
  }

  @computed get mornSelectable() {
    const { mornMax } = userStore.currentUser!.slotLim;
    const { mornAllotedSlotCount } = userStore!;

    const morn = mornMax - mornAllotedSlotCount - this.mornSelectionCount;
    return morn;
  }

  @computed get aftSelectable() {
    const { aftMax } = userStore.currentUser!.slotLim;
    const { aftAllotedSlotCount } = userStore!;

    const aft = aftMax - aftAllotedSlotCount - this.aftSelectionCount;
    return aft;
  }

  @action setSlotsType(slotsType: string) {
    this.currentSlotsType = slotsType;

    this.fetchSlots(slotsType);
  }

  @action setFetchingSlots(value: boolean) {
    this.fetchingSlots = value;
  }

  @action setSlots(slots: Slot[]) {
    this.currentSlots = slots;
  }

  @action updateSlot(slotID: string, selectSlot: boolean) {
    const slot: Slot | undefined = this.currentSlots.find(
      (slot: Slot) => slot.id === slotID
    );
    if (slot) {
      slot.type = this.currentSlotsType;
      slot.selected = selectSlot;
    }
  }

  async fetchSlots(type: string) {
    runInAction(() => (this.fetchingSlots = true));
    try {
      const { data } = await axios.get("/faculty/slots", {
        params: { type }
      });
      console.log("-------->", data);
      runInAction(() => {
        this.fetchingSlots = false;
        this.currentSlots = data;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => (this.fetchingSlots = false));
    }
  }
}

export const SlotStoreInstance = new SlotStore();
