import httpRequest from "@/config/axiosConfig";

export const siteConfigApi = {
    //编辑配置
    async editSiteConfig(params = {}){
        return await httpRequest.post('/editSiteConfig', params);
    },

    //上传LOGO图片
    async uploadLogoImage(file){
        const formData = new FormData();
        formData.append('logoImage', file);

        return await httpRequest.post('/uploadLogoImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    //获取配置详情
    async getSiteConfigDetail(){
        return await httpRequest.get('/getSiteConfigDetail');
    }
}