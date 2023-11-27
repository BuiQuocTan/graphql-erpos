import { DELETE_SUPPLIER } from "../../types/SuppliersType";

export const deleteSupplier = (id) => {
	return {
		type: DELETE_SUPPLIER,
		payload: id,
	};
};