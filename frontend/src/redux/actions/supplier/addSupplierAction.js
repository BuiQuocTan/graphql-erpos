import { ADD_SUPPLIER } from "../.././types/SuppliersType";

export const addSupplier = (data) => {
	return {
		type: ADD_SUPPLIER,
		payload: data,
	};
};