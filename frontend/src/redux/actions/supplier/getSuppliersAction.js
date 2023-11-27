import { SUPPLIERS } from "../../types/SuppliersType";

export const loadSuppliers = (data) => {
	return {
		type: SUPPLIERS,
		payload: data,
	};
};
