import httpRequest from "@/axios/axiosConfig";

export const adminApi = {
    //获取管理员信息
    async getAdminDetail(){
        return await httpRequest.get('/getAdminDetail');
    },

    //获取管理员数量
    async getAdminTotal(){
        return await httpRequest.get('/getAdminTotal');
    }
}