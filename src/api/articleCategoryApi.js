import httpRequest from "@/axios/axiosConfig";

export const articleCategoryApi = {
    //获取文章分类列表
    async getArticleCategoryList(params = {}){
        return await httpRequest.get('/getArticleCategoryList', {params});
    }
}