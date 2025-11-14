import httpRequest from "@/axios/axiosConfig";

export const articleCategoryApi = {
    //删除文章
    async deleteArticleCategory(id = {}){
        return await httpRequest.delete('/deleteArticleCategory', {data: id});
    },

    //获取文章分类列表
    async getArticleCategoryList(params = {}){
        return await httpRequest.get('/getArticleCategoryList', {params});
    },

    //获取文章数量
    async getArticleCategoryTotal(){
        return await httpRequest.get('/getArticleCategoryTotal');
    }
}