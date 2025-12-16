import api, { authApi } from "./apiClient";

// const promiseWhileWaitingTokenToBeStored = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(), 500);
// }).then(() => setTimeout(() => {}, 1000))

export const globalSearchService = {

    getAdmin: async () => {

        // await promiseWhileWaitingTokenToBeStored();
        const resp = await authApi.get("/globalSearch/admin");
        console.log(resp.data);

        return resp.data;
    },

    getStudent: async (id) => {
        // await promiseWhileWaitingTokenToBeStored();

        const resp = await authApi.get(`/globalSearch/student?id=${id}`);
        console.log(resp.data);

        return resp.data;
    },

    getTeacher: async () => {

        // await promiseWhileWaitingTokenToBeStored();
        const resp = await authApi.get("/globalSearch/admin");
        console.log(resp.data);

        return resp.data;
    },






}



