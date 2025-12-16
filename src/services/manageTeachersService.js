import { authApi } from "./apiClient";

export const manageTeachersService = {

    get: async (id) => {
        console.log("ID: ", id)
        const resp = await authApi.get(`/teacher/get${id? "?id="+id:""}`);
        console.log(resp.data);

        return resp.data;
    },

    add: async (teacher) => {
        try {
            const resp = await authApi.post(`/teacher/add`, teacher);
            return resp.data;
            
        } catch (error) {
            console.log(error);
            
            return Promise.reject( error.message ||error.response.data);

        }
    },

    update: async (teacher) => {
        try {
            const resp = await authApi.put(`/teacher/update`, teacher);
            return resp.data;

        } catch (error) {
            console.log(error);
            
            return Promise.reject( error.message ||error.response.data);

        }
    },

     getTeacherCourse: async (id) => {
        console.log("ID: ", id)
        const resp = await authApi.get(`/teacher/getcourses${id? "?teacher="+id:""}`);
        console.log(resp.data);

        return resp.data;
    },

    



}



