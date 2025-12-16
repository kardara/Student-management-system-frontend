import { authApi } from "./apiClient";

export const manageGradesService = {

    get: async () => {
        const resp = await authApi.get("/grade/get");
        return resp.data;
    },

    getByCourses: async (id) => {
        const resp = await authApi.get(`/grade/get/course?id=${id}`);
        return resp.data;
    },

    addCourse: async (grades, courseId) => {
        try {
            const resp = await authApi.post(`/grade/addcourse?courseId=${courseId}`, grades);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);
        }
    },

    update: async (course, academicUnit) => {
        try {
            const resp = await authApi.put(`/grade/update?academicUnitCode=${academicUnit}`, course);
            return resp.data;

        } catch (error) {
            console.log(error);
            return Promise.reject(error.response.data);
        }
    },

}



