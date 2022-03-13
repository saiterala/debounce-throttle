export const debounce = (callback, delay) => {
    let timerId
    return (...args) => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}