import httpRequest from "@/config/axiosConfig";

export const articleCategoryApi = {
    //添加文章分类
    async addArticleCategory(params = {}){
        return await httpRequest.post('/addArticleCategory', params);
    },

    //编辑文章分类
    async editArticleCategory(params = {}){
        return await httpRequest.post('/editArticleCategory', params);
    },

    //删除文章分类
    async deleteArticleCategory(id = {}){
        return await httpRequest.delete('/deleteArticleCategory', {data: id});
    },

    //获取文章分类列表
    async getArticleCategoryList(params = {}){
        return await httpRequest.get('/getArticleCategoryList', {params});
    },

    //获取文章分类详情
    async getArticleCategoryDetail(articleCategoryId){
        return await httpRequest.get('/getArticleCategoryDetail', {params: articleCategoryId});
    },

    //获取文章分类数量
    async getArticleCategoryTotal(){
        return await httpRequest.get('/getArticleCategoryTotal');
    }
}