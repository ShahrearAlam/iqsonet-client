export function accessToken() {
    const iqNetAuth = JSON.parse(localStorage.getItem("iqNetAuth"));
    const { access_token } = iqNetAuth || {};
    if (access_token) {
        return access_token
    }
    return undefined;
}

export function refreshToken() {
    const iqNetAuth = JSON.parse(localStorage.getItem("iqNetAuth"));
    const { refreshToken } = iqNetAuth || {};
    if (refreshToken) {
        return refreshToken
    }
    return undefined;
}

export function isAccessTokenExist() {
    const iqNetAuth = JSON.parse(localStorage.getItem("iqNetAuth"));
    const { access_token } = iqNetAuth || {};
    if (access_token) {
        return true;
    }
    return false;
}

export function registerCredantial(email, password) {
    localStorage.setItem("iqNetRegisterCredantial", JSON.stringify({ email, password }));
    return undefined;
}

export function getRegisterCredantial() {
    const data = JSON.parse(localStorage.getItem("iqNetRegisterCredantial"));
    return data;
}
export function removeRegisterCredantial() {
    localStorage.removeItem("iqNetRegisterCredantial");
    return undefined;
}

export function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
}

export const localStorageTheme = () => {
    const theme = localStorage.getItem("theme");
    return theme;
}

export const setThemeInLocalStorage = (theme) => {
    localStorage.setItem("theme", theme);
    return undefined;
}