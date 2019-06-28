import { observable, action, runInAction, computed } from "mobx";
import { Slot } from "../shared/interfaces";
import { axios } from "../shared/axios";
import { userStoreInstance as userStore } from "./User.store";

export interface ISlotStore {
  currentSlotsType: string;
  morningSlots: Slot[];
  afternoonSlots: Slot[];
  currentSlots: Slot[];
  fetchingSlots: boolean;
  selectedSlots: Slot[];
  mornSelectionCount: number;
  aftSelectionCount: number;
  mornSelectable: number;
  aftSelectable: number;

  setSlotsType(slotsType: string): void;
  // setSlots(slots: Slot[]): void;
  setFetchingSlots(fetching: boolean): void;
  updateSlot(slotID: string, selectSlot: boolean, type?: string): void;

  fetchSlots(type: string): void;
}

export class SlotStore implements ISlotStore {
  @observable currentSlotsType: string = "morn";
  @observable morningSlots: Slot[] = [];
  @observable afternoonSlots: Slot[] = [];
  @observable fetchingSlots: boolean = false;

  @computed get currentSlots(): Slot[] {
    if (this.currentSlotsType === "morn") return this.morningSlots;
    return this.afternoonSlots;
  }

  @computed get selectedSlots(): Slot[] {
    return this.morningSlots
      .filter(slot => slot.selected)
      .concat(this.afternoonSlots.filter(slot => slot.selected));
  }

  @computed get mornSelectionCount() {
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
    // this.fetchSlots(slotsType);
  }

  @action setFetchingSlots(value: boolean) {
    this.fetchingSlots = value;
  }

  // @action setSlots(slots: Slot[]) {
  //   this.currentSlots = slots;
  // }

  @action updateSlot(slotID: string, selectSlot: boolean, type?: string) {
    let slots;
    if (type) {
      if (type === "morn") slots = this.morningSlots;
      else slots = this.afternoonSlots;
    } else slots = this.currentSlots;
    const slot: Slot | undefined = slots.find((slt: Slot) => slt.id === slotID);
    if (slot) {
      slot.type = type || this.currentSlotsType;
      slot.selected = selectSlot;
    }
  }

  async fetchSlots(type: string) {
    runInAction(() => (this.fetchingSlots = true));
    try {
      const { data } = await axios.get("/faculty/all-slots", {
        params: { type }
      });
      console.log("Slots fetched", data);
      runInAction(() => {
        this.fetchingSlots = false;
        const [mornSlots, aftSlots] = data.reduce(
          (acc: any, curr: any) => {
            if (curr.type === "morn") acc[0].push(curr);
            else acc[1].push(curr);
            return acc;
          },
          [[], []]
        );
        this.morningSlots = observable(mornSlots);
        this.afternoonSlots = observable(aftSlots);
      });
    } catch (e) {
      console.log(e);
      runInAction(() => (this.fetchingSlots = false));
    }
  }
}

export const SlotStoreInstance = new SlotStore();
