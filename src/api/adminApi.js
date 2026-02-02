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

    //获取管理员详情（当前登录的管理员）
    async getAdminDetail(){
        return await httpRequest.get('/getAdminDetail');
    },
    
    //获取管理员详情（管理员列表和详情使用）
    async getAdminDetailByAdmin(adminId){
        return await httpRequest.get('/getAdminDetailByAdmin', {params: adminId});
    },

    //获取管理员数量
    async getAdminTotal(){
        return await httpRequest.get('/getAdminTotal');
    },

    //获取验证码
    async generateCaptcha(){
        return await httpRequest.get('/generateCaptcha');
    },

    //登录
    async adminLogin(params = {}){
        return await httpRequest.post('/adminLogin', params);
    },

    //退出登录
    async adminLoginOut(){
        return await httpRequest.post('/adminLoginOut');
    },

    //获取RSA公钥
    async getAdminRsaPublicKey(){
        return await httpRequest.get('/getAdminRsaPublicKey');
    },
}