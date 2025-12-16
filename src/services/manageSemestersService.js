import { authApi } from "./apiClient";

export const manageSemestersService = {

    get: async (i) => {
        const resp = await authApi.get("/semester/get", { id: i ? i : null });
        console.log(resp.data);

        return resp.data;
    },

    add: async (semester) => {
        try {
            const resp = await authApi.post(`/semester/add`, semester);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    update: async (semester) => {
        try {
            const resp = await authApi.put(`/semester/update`, semester);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    


}



