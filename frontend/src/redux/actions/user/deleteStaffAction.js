import { DELETE_STAFF } from "../../types/UserType";

export const deleteStaff = (id) => {
	return {
		type: DELETE_STAFF,
		payload: id,
	};
};
