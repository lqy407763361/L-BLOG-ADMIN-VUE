import httpRequest from "@/config/axiosConfig";

export const captchaApi = {
    //获取验证码
    async generateCaptcha(){
        return await httpRequest.get('/generateCaptcha');
    }
}