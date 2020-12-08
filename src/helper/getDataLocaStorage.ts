export const getAccessToken = () => {
    const accessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}')?.user || '{}')?.token
    return accessToken;
}