function setCookie(name,value, hours) {
    let expires = "";
    if (hours) {
        const date = new Date();
        date.setTime(date.getHours() + hours);
        expires = "; expires=" + date.toUTCString();
    }
    console.log("HELLO", expires)
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        const c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export {eraseCookie, getCookie, setCookie}