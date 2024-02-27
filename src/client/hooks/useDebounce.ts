import { useEffect, useState } from 'react'

export default function useDebounce<T>(value : T, delayMs : number) : T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, delayMs)

        return () => {
            clearTimeout(timeOut)
        }
    }, [value])

    return debouncedValue
}