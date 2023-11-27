import { ADD_STAFF } from "../../types/UserType";

export const addStaff = (data) => {
	return {
		type: ADD_STAFF,
		payload: data,
	};
};
