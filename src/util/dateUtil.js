import dayjs from "dayjs";

export const formatDate = (timestamp) => {
    return dayjs(timestamp * 1000).format('YYYY-MM-DD');
}

export const formatDateTime = (timestamp) => {
    return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
}