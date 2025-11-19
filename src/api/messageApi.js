import httpRequest from "@/axios/axiosConfig";

export const messageApi = {
    //删除消息
    async deleteMessage(id = {}){
        return await httpRequest.delete('/deleteMessage', {data: id});
    },

    //获取消息列表
    async getMessageList(params = {}){
        return await httpRequest.get('/getMessageList', {params});
    },

    //获取消息详情
    async getMessageDetail(messageId){
        return await httpRequest.get('/getMessageDetail', {params: messageId});
    },

    //获取消息数量
    async getMessageTotal(){
        return await httpRequest.get('/getMessageTotal');
    }
}