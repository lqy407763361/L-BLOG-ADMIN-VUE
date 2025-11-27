import httpRequest from "@/axios/axiosConfig";

export const userApi = {
    //编辑用户
    async editUser(params = {}){
        return await httpRequest.post('/editUser', params);
    },

    //删除用户
    async deleteUser(id = {}){
        return await httpRequest.delete('/deleteUser', {data: id});
    },

    //获取用户列表
    async getUserList(params = {}){
        return await httpRequest.get('/getUserList', {params});
    },

    //获取用户详情
    async getUserDetailByAdmin(userId){
        return await httpRequest.get('/getUserDetailByAdmin', {params: userId});
    },

    //获取用户数量
    async getUserTotal(){
        return await httpRequest.get('/getUserTotal');
    }
}