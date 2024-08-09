/**
 *
 * @param {string} name
 * @returns {string}
 */
const getQueryParam = (name) => {
    const urlParam = new URLSearchParams(window.location.search)
    // @ts-ignore
    return urlParam.get(name);
}

window.onload = () => {
    const email = getQueryParam('email');
    if (email) {
        // @ts-ignore
        document.getElementById('emailInput').value = decodeURIComponent(email)
    }
    console.log({message: email})
}