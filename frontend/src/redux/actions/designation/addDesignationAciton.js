import { ADD_DESIGNATION } from "../../types/DesignationType";

export const addDesignation = (data) => {
	return {
		type: ADD_DESIGNATION,
		payload: data,
	};
};