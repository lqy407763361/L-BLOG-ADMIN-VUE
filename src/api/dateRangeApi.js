import httpRequest from "@/axios/axiosConfig";

export const dateRangeApi = {
    //获取最近一周的访问人次列表
    async getLastWeekVisitsList(){
        return await httpRequest.get('/getLastWeekVisitsList');
    },
}