import httpRequest from "@/axios/axiosConfig";

export const articleCategoryApi = {
    //添加文章
    async addArticleCategory(params = {}){
        return await httpRequest.post('/addArticleCategory', params);
    },

    //编辑文章
    async editArticleCategory(params = {}){
        return await httpRequest.post('/editArticleCategory', params);
    },

    //删除文章
    async deleteArticleCategory(id = {}){
        return await httpRequest.delete('/deleteArticleCategory', {data: id});
    },

    //获取文章分类列表
    async getArticleCategoryList(params = {}){
        return await httpRequest.get('/getArticleCategoryList', {params});
    },

    //获取文章详情
    async getArticleCategoryDetail(articleCategoryId){
        return await httpRequest.get('/getArticleCategoryDetail', {params: articleCategoryId});
    },

    //获取文章数量
    async getArticleCategoryTotal(){
        return await httpRequest.get('/getArticleCategoryTotal');
    }
}