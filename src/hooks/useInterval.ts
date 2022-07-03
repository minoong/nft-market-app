import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null): void {
 const cacheCallback = useRef(callback)

 useEffect(() => {
  cacheCallback.current = callback
 }, [callback])

 useEffect(() => {
  const isPause = !delay && delay !== 0

  if (isPause) return

  const id = setInterval(() => cacheCallback.current(), delay)

  // eslint-disable-next-line consistent-return
  return () => clearInterval(id)
 }, [delay])
}
