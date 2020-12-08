export const getPathUrl = () => {
    const paths = window.location.pathname;
    const arr = paths.split('/');
    return arr;
}