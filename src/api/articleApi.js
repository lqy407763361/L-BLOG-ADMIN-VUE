import httpRequest from "@/config/axiosConfig";

export const articleApi = {
    //添加文章
    async addArticle(params = {}){
        return await httpRequest.post('/addArticle', params);
    },

    //编辑文章
    async editArticle(params = {}){
        return await httpRequest.post('/editArticle', params);
    },

    //删除文章
    async deleteArticle(id = {}){
        return await httpRequest.delete('/deleteArticle', {data: id});
    },

    //获取文章列表
    async getArticleList(params = {}){
        return await httpRequest.get('/getArticleList', {params});
    },

    //获取文章详情
    async getArticleDetail(articleId){
        return await httpRequest.get('/getArticleDetail', {params: articleId});
    },

    //获取文章数量
    async getArticleTotal(){
        return await httpRequest.get('/getArticleTotal');
    }
}