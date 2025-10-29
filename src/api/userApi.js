import httpRequest from "@/axios/axiosConfig";

export const userApi = {
    //获取用户数量
    async getUserTotal(){
        return await httpRequest.get('/getUserTotal');
    }
}