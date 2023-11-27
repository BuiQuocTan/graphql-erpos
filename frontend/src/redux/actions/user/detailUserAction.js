import { DETAIL_STAFF } from "../../types/UserType";

export const loadSingleStaff = (data) => {
  return {
    type: DETAIL_STAFF,
    payload: data,
  };
};
