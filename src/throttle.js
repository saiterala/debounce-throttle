export const throttle = (callback, delay) => {
    let timerId
    return (...args) => {
        if(timerId) return
        timerId = setTimeout(() => {
            clearTimeout(timerId)
            timerId = false
            callback.apply(this, args)
        }, delay)
    }
}