import httpRequest from "@/axios/axiosConfig";

export const messageApi = {
    //获取消息数量
    async getMessageTotal(){
        return await httpRequest.get('/getMessageTotal');
    }
}