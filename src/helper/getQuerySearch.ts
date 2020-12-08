export const getQuerySearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
}