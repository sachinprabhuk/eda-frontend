import { observable, action, computed } from 'mobx';
import { Faculty, Slot } from '../shared/interfaces';

export type tokenType = string | null
export type facultyType = Faculty | null

export interface IUserStore {
	token: tokenType
	currentUser: facultyType
	mornAllotedSlotCount: number
	aftAllotedSlotCount: number

	setTokenAndUser(token: tokenType, currentUser: facultyType): void
}

class UserStore implements IUserStore {
	@observable token: string | null = null;
	@observable currentUser: Faculty | null = null;

	@computed get mornAllotedSlotCount() {
		if(!this.currentUser) return 0;
		return this.currentUser.selections.filter((sel: Slot) => sel.type === 'morn').length 
	}

	@computed get aftAllotedSlotCount() {
		if(!this.currentUser) return 0;
		return this.currentUser.selections.filter((sel: Slot) => sel.type === 'aft').length 
	}

	@action setTokenAndUser(token: tokenType, currentUser: facultyType) {
		if(token === null)
			localStorage.removeItem("eda-token");
		else
			localStorage.setItem("eda-token", token);

		this.token = token;
		this.currentUser = currentUser;
	}
}

export const userStoreInstance = new UserStore();