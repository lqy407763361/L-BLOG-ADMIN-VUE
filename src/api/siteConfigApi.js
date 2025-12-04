import httpRequest from "@/config/axiosConfig";

export const siteConfigApi = {
    //编辑配置
    async editSiteConfig(params = {}){
        return await httpRequest.post('/editSiteConfig', params);
    },

    //获取配置详情
    async getSiteConfigDetail(){
        return await httpRequest.get('/getSiteConfigDetail');
    }
}