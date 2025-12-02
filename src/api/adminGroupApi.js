import httpRequest from "@/axios/axiosConfig";

export const adminGroupApi = {
    //添加管理员群组
    async addAdminGroup(params = {}){
        return await httpRequest.post('/addAdminGroup', params);
    },

    //编辑管理员群组
    async editAdminGroup(params = {}){
        return await httpRequest.post('/editAdminGroup', params);
    },

    //删除管理员群组
    async deleteAdminGroup(id = {}){
        return await httpRequest.delete('/deleteAdminGroup', {data: id});
    },

    //获取管理员群组列表
    async getAdminGroupList(params = {}){
        return await httpRequest.get('/getAdminGroupList', {params});
    },

    //获取管理员群组详情
    async getAdminGroupDetail(){
        return await httpRequest.get('/getAdminGroupDetail');
    },

    //获取管理员群组数量
    async getAdminGroupTotal(){
        return await httpRequest.get('/getAdminGroupTotal');
    }
}