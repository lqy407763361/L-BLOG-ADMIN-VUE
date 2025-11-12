import httpRequest from "@/axios/axiosConfig";

export const articleApi = {
    //添加文章
    async addArticle(params = {}){
        return await httpRequest.post('/addArticle', params);
    },

    //删除文章
    async deleteArticle(id = {}){
        return await httpRequest.delete('/deleteArticle', {data: id});
    },

    //获取文章列表
    async getArticleList(params = {}){
        return await httpRequest.get('/getArticleList', {params});
    },

    //获取文章数量
    async getArticleTotal(){
        return await httpRequest.get('/getArticleTotal');
    }
}