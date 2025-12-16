import { authApi } from "./apiClient";

export const manageCoursesService = {

    get: async (id) => {
        const resp = await authApi.get(`/course/get${id? "?id="+id:""}`);
        return resp.data;
    },

    add: async (course, academicUnit) => {
        try {
            const resp = await authApi.post(`/course/add?academicUnitCode=${academicUnit}`, course);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);
        }
    },

    update: async (course, academicUnit) => {
        try {
            const resp = await authApi.put(`/course/update?academicUnitCode=${academicUnit}`, course);
            return resp.data;

        } catch (error) {
            console.log(error);
            return Promise.reject(error.response.data);
        }
    },

}



