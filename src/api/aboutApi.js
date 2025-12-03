import httpRequest from "@/config/axiosConfig";

export const aboutApi = {
    //编辑单页
    async editAbout(params = {}){
        return await httpRequest.post('/editAbout', params);
    },

    //获取单页详情
    async getAboutDetail(){
        return await httpRequest.get('/getAboutDetail');
    }
}