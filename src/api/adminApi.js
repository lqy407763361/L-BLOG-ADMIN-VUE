import httpRequest from "@/config/axiosConfig";

export const adminApi = {
    //添加管理员
    async addAdmin(params = {}){
        return await httpRequest.post('/addAdmin', params);
    },

    //编辑管理员
    async editAdminByAdmin(params = {}){
        return await httpRequest.post('/editAdminByAdmin', params);
    },

    //删除管理员
    async deleteAdmin(id = {}){
        return await httpRequest.delete('/deleteAdmin', {data: id});
    },

    //获取管理员列表
    async getAdminList(params = {}){
        return await httpRequest.get('/getAdminList', {params});
    },

    //获取管理员详情
    async getAdminDetailByAdmin(adminId){
        return await httpRequest.get('/getAdminDetailByAdmin', {params: adminId});
    },

    //获取管理员数量
    async getAdminTotal(){
        return await httpRequest.get('/getAdminTotal');
    },

    //退出登录
    async adminLoginOut(){
        return await httpRequest.get('/adminLoginOut');
    }
}