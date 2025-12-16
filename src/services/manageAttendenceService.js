import api, { authApi } from "./apiClient";



export const manageAttendenceService = {

    saveList: async (list, courseId) => {

        // await promiseWhileWaitingTokenToBeStored();
        const resp = await authApi.post(`/attendance/savelist?courseId=${courseId}`, list);
        console.log(resp.data);

        return resp.data;
    },

    // getStudent: async (id) => {
    //     // await promiseWhileWaitingTokenToBeStored();

    //     const resp = await authApi.get(`/globalSearch/student?id=${id}`);
    //     console.log(resp.data);

    //     return resp.data;
    // },






}



