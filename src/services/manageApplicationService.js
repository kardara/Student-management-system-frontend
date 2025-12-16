import api, { authApi } from "./apiClient";

export const manageApplicationService = {

    apply: async (application, department) => {
        try {
            const resp = await api.post(`/application/apply?code=${department}`, application);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    get: async () => {
        const resp = await authApi.get("/application/get");
        console.log(resp.data);
        return resp.data;
    },

    approve: async (id) => {
        try {
            const resp = await authApi.post(`/application/approve`, id);
            return resp.data;

        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },

     reject: async (id) => {
        try {
            const resp = await authApi.post(`/application/reject`, id);
            return resp.data;

        } catch (error) {
            return Promise.reject(error.response.data);
        }
    },

}



