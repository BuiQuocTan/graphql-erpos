import { STAFFS } from "../../types/UserType";

export const loadAllStaff = (data) => {
	return {
		type: STAFFS,
		payload: data,
	};
};
