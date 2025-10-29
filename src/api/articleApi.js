import httpRequest from "@/axios/axiosConfig";

export const articleApi = {
    //获取文章数量
    async getArticleTotal(){
        return await httpRequest.get('/getArticleTotal');
    }
}