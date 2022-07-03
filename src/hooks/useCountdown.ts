import { useCallback } from 'react'

import useBoolean from './useBoolean'
import useCounter from './useCounter'
import useInterval from './useInterval'

interface IuseCountdownProps {
 initialValue: number
 stopValue?: number
 intervalMs?: number
 isIncreament?: boolean
}

interface ReturnType {
 startCountdown: () => void
 stopCountdown: () => void
 resetCountdown: () => void
}

export default function useCountdown(props: IuseCountdownProps): [number, ReturnType] {
 const { initialValue, stopValue = 0, intervalMs = 1000, isIncreament = false } = props

 const { count, increament, decreament, reset: resetCounter } = useCounter(initialValue)
 const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false)

 const resetCountdown = useCallback(() => {
  stopCountdown()
  resetCounter()
 }, [resetCounter, stopCountdown])

 const countdownCallback = useCallback(() => {
  if (count === stopValue) {
   stopCountdown()
  } else if (isIncreament) {
   increament()
  } else {
   decreament()
  }
 }, [count, decreament, stopCountdown, increament, isIncreament, stopValue])

 useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

 return [
  count,
  {
   startCountdown,
   stopCountdown,
   resetCountdown,
  },
 ]
}
