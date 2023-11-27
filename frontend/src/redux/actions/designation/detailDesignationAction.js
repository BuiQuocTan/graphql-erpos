import { DESIGNATION_DETAILS } from "../../types/DesignationType";

export const loadSingleDesignation = (data) => {
	return {
		type: DESIGNATION_DETAILS,
		payload: data,
	};
};