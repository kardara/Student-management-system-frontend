import { authApi } from "./apiClient";

export const manageStudentRegistrationService = {

    get: async () => {
        const resp = await authApi.get("/studentregistration/get");
        console.log(resp.data);

        return resp.data;
    },
    create: async (id) => {
        try {
            const resp2 = await authApi.post(`/studentregistration/create?studentId=${id}`);
            console.log(resp2);
            return resp2.data;
        } catch (error) {
            throw error;
        }
    },

    getStudent: async (id) => {
        try {
            console.log("ID: ", id)
            const resp = await authApi.get(`/studentregistration/student/get?studentId=${id}`);
            console.log("Unique reg: ", resp.data);
            console.log("typeof", resp);
            return resp.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error.response.data);
        }
    },

    addCourse: async (studentId, courses) => {
        try {
            const resp = await authApi.put(`/studentregistration/course/add?studentId=${studentId}${courses.map(c => `&coursesId=${c.id}`).join("")}`);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    removeCourse: async (studentId, course) => {
        try {
            const resp = await authApi.delete(`/studentregistration/course/remove?studentId=${studentId}&coursesId=${course}`);
            return resp.data;

        } catch (error) {

            return Promise.reject(error.response.data);

        }
    },

    update: async (student, department) => {
        try {
            const resp = await authApi.put(`/studentregistration/update?department=${department}`, student);
            return resp.data;

        } catch (error) {
            console.log(error);

            return Promise.reject(error.response.data);

        }
    },

     getStudentByOfferedCourse: async (id) => {
        try {
            console.log("ID: ", id)
            const resp = await authApi.get(`/studentregistration/course/getstudent?courseId=${id}`);
            console.log("Unique reg: ", resp.data);
            console.log("typeof", resp);
            return resp.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error.response.data);
        }
    },

}



