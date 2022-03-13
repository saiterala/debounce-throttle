import React, {useRef, useMemo, useLayoutEffect} from 'react'
import {throttle} from '../throttle'

export const useThrottle = (callback, delay) => {
    const callbackRef = useRef(callback)

    useLayoutEffect(() => {
        callbackRef.current = callback
    })

    return useMemo(() => {
        return throttle(callbackRef.current, delay)
    }, [delay])
}