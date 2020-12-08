export const formatDate = (args: Array<Object>) => {
    let formattedDate: string = '';
    Object.entries(args).forEach((entry, index) => {
        const [key, value]: any = entry
        if (index !== 2) {
            if (value.value < 10) {
                formattedDate = '-' + '0' + value.value +formattedDate
            }
            else {
                formattedDate = '-' + value.value +formattedDate
            }
        }
        else {
            formattedDate =  value.value + formattedDate;
        }
    });
    return formattedDate
}