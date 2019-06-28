import { observable, action, runInAction, toJS, computed } from "mobx";
import { Slot } from "../shared/interfaces";
import { axios } from "../shared/axios";

export interface ISlotStore {
  currentSlotsType: string;
  currentSlots: Slot[];
	fetchingSlots: boolean;
	selectedSlots: Slot[]

  setSlotsType(slotsType: string): void;
  setSlots(slots: Slot[]): void;
  setFetchingSlots(fetching: boolean): void;
	updateSlot(slotID: string, selectSlot: boolean): void;
}

class SlotStore implements ISlotStore {
	
	constructor() {
		this.fetchSlots(this.currentSlotsType);
	}

  @observable currentSlotsType: string = "morn";
  @observable currentSlots: Slot[] = [];
	@observable fetchingSlots: boolean = false;

	@computed get selectedSlots() {
		return this.currentSlots.filter((slot: Slot) => slot.selected)
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
		if(slot) {
			slot.selected = selectSlot;
			slot.type = !selectSlot ? undefined : this.currentSlotsType;
		}
	}
	
	async fetchSlots(type: string) {
		runInAction(() => this.fetchingSlots = true);
		try {
			const { data } = await axios.get("/faculty/slots", {
				params: { type }
			})
			runInAction(() => {
				this.fetchingSlots = false;
				this.currentSlots = data;
			})
		}catch(e) {
			console.log(e);
			runInAction(() => this.fetchingSlots = false)
		}
	}

}

export const slotStoreInstance = new SlotStore();
