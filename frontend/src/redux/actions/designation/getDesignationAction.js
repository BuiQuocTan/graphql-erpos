import { DESIGNATIONS } from "../../types/DesignationType";

export const loadAllDesignation = (data) => {
	return {
		type: DESIGNATIONS,
		payload: data,
	};
};