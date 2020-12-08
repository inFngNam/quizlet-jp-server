export const convertRefToObject = (refsArray:any) => {
    let resultConverting: any = {};
    Object.entries(refsArray).forEach(entry => {
        const [key, value]: any = entry;
        resultConverting[`${key}`] = value.value
    });
    
    return resultConverting;
}