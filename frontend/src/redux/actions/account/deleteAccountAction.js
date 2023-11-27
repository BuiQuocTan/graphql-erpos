import { DELETE_ACCOUNT } from "../../types/AccountType";

export const deleteAccount = (id) => {
  return {
    type: DELETE_ACCOUNT,
    payload: id,
  };
};