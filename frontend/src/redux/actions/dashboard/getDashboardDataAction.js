import { DASHBOARD } from "../../types/DashboardType";

export const loadDashboardData = (data) => {
  return {
    type: DASHBOARD,
    payload: data,
  };
};