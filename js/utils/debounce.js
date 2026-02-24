// Annuler et créer un nouvel timeout
export function debounce(callback, delay) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
           callback(...args); 
        }, delay);
    };
}