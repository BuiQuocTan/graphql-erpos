import { DELETE_DESIGNATION } from "../../types/DesignationType";

export const deleteDesignation = (id) => {
	return {
		type: DELETE_DESIGNATION,
		payload: id,
	};
};