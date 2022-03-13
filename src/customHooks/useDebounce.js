import React,{useRef, useLayoutEffect, useMemo} from 'react'
import {debounce} from '../debounce'

export const useDebounce = (callback, delay) => {
    const callbackRef = useRef(callback)

    useLayoutEffect(() => {
        callbackRef.current = callback
    })

    return useMemo(() => {
        return debounce(callbackRef.current, delay)
    },[delay])
}