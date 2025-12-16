import { authApi } from "./apiClient";

export const manageOfferedCoursesService = {

    get: async (id) => {
        const resp = await authApi.get(`/offeredcourse/get${id? "?id="+id:""}`);
        console.log(resp.data);
        return resp.data;
    },

    add: async (offeredcourse, course, teacher) => {
        try {
           
            const resp = await authApi.post(`/offeredcourse/add?courseCode=${course}&teacherId=${teacher}`, offeredcourse);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);
        }
    },

    update: async (course, academicUnit) => {
        try {
            const resp = await authApi.put(`/offeredcourse/update?academicUnitCode=${academicUnit}`, course);
            return resp.data;

        } catch (error) {
            console.log(error);
            return Promise.reject(error.response.data);
        }
    },

}



