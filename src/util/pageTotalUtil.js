export const pageTotal = (total, size) => {
    if(!total || !size){
        return 1;
    }

    return Math.ceil(total / size);
}