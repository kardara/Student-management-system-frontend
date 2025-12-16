import { authApi } from "./apiClient";

export const manageStudentService = {

    get: async (id) => {
        const resp = await authApi.get(`/student/get${id? "?id="+id:""}`);
        console.log(resp.data);

        return resp.data;
    },

    add: async (student, department) => {
        try {
            const resp = await authApi.post(`/student/add?department=${department}`, student);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    update: async (student, department) => {
        try {
            console.log(student);
            const resp = await authApi.put(`/student/update?department=${department}`, student);
            return resp.data;

        } catch (error) {
            console.log(error);

            return Promise.reject(error.response.data);

        }
    },

}



