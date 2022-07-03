import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface ReturnType {
 count: number
 setCount: Dispatch<SetStateAction<number>>
 increament: () => void
 decreament: () => void
 reset: () => void
}

export default function useCounter(initialValue?: number): ReturnType {
 const [count, setCount] = useState<number>(initialValue ?? 0)

 const increament = useCallback(() => setCount((prev) => prev + 1), [])
 const decreament = useCallback(() => setCount((prev) => prev - 1), [])
 const reset = useCallback(() => setCount(initialValue ?? 0), [initialValue])

 return {
  count,
  setCount,
  increament,
  decreament,
  reset,
 }
}
