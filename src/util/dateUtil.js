import dayjs from "dayjs";

//指定年月日
export const formatDate = (timestamp) => {
    return dayjs(timestamp * 1000).format('YYYY-MM-DD');
}

//指定年月日时分秒
export const formatDateTime = (timestamp) => {
    return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
}

//当前年
export const formatCurrentYear = () => {
    return dayjs().format('YYYY')
}

//当前年月日
export const formatCurrentDate = () => {
    return dayjs().format('YYYY-MM-DD')
}

//当前年月日时分秒
export const formatCurrentTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

//当前时间戳（秒）
export const getCurrentTimestamp = () => {
    return dayjs().unix();
}