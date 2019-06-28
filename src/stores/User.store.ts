import { observable, action } from 'mobx';
import { Faculty } from '../shared/interfaces';

export type tokenType = string | null
export type facultyType = Faculty | null

export interface IUserStore {
	token: tokenType
	currentUser: facultyType

	setTokenAndUser(token: tokenType, currentUser: facultyType): void
}

class UserStore implements IUserStore {
	@observable token: string | null = null;
	@observable currentUser: Faculty | null = null;

	@action setTokenAndUser(token: tokenType, currentUser: facultyType) {
		if(token === null)
			localStorage.removeItem("eda-token");
		else
			localStorage.setItem("eda-token", token);
		console.log(token, currentUser);

		this.token = token;
		this.currentUser = currentUser;
	}
}

export const userStoreInstance = new UserStore();