export const getCookie = (name) => {
    const b = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : null;
}