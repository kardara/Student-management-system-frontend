import { authApi } from "./apiClient";

export const manageStaffService = {
  get: async (id) => {
    console.log("ID: ", id);
    const resp = await authApi.get(`/staff/get${id ? "?id=" + id : ""}`);
    console.log(resp.data);

    return resp.data;
  },

  add: async (staff) => {
    try {
      const resp = await authApi.post(`/staff/add`, staff);
      return resp.data;
    } catch (error) {
      console.log(error);

      return Promise.reject(error.message || error.response.data);
    }
  },

  update: async (staff) => {
    try {
      const resp = await authApi.put(`/staff/update`, staff);
      return resp.data;
    } catch (error) {
      console.log(error);

      return Promise.reject(error.message || error.response.data);
    }
  },

  delete: async (email) => {
    try {
      const resp = await authApi.delete(`/staff/delete`, { data: email });
      return resp.data;
    } catch (error) {
      console.log(error);

      return Promise.reject(error.message || error.response.data);
    }
  },
};
