import { ChangeEvent, useState } from 'react'
import useCountdown from '@hooks/useCountdown'

export default function Component() {
 const [intervalValue, setIntervalValue] = useState<number>(1000)
 const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
  initialValue: 60,
  intervalMs: intervalValue,
 })

 const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
  setIntervalValue(Number(event.target.value))
 }
 return (
  <div className="pt-12">
   <p>Count: {count}</p>

   <input type="number" value={intervalValue} onChange={handleChangeIntervalValue} />
   <button type="button" onClick={startCountdown}>
    start
   </button>
   <button type="button" onClick={stopCountdown}>
    stop
   </button>
   <button type="button" onClick={resetCountdown}>
    reset
   </button>
  </div>
 )
}
