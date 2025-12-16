import api, { authApi } from "./apiClient";

export const manageAcademicUnitService = {

    get: async (i) => {
        const resp = await api.get("/academicunit/get", { id: i ? i : null });
        console.log(resp.data);

        return resp.data;
    },

    add: async (academicUnit, parent) => {
        try {
            const resp = await authApi.post(`/academicunit/add?parentCode=${parent}`, academicUnit);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    update: async (academicUnit, parent) => {
        try {
            const resp = await authApi.put(`/academicunit/update?parentCode=${parent}`, academicUnit);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    


}



