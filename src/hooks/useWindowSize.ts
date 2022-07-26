import { useObservable, useObservableState } from 'observable-hooks'
import { debounceTime, fromEvent, map, switchMap } from 'rxjs'

interface WindowSize {
 width: number
 height: number
}

interface IuseWindowResizeProps {
 initialValue?: number
}

const getWindowMetric: () => WindowSize = () => {
 const { innerWidth, innerHeight } = window
 return { width: innerWidth, height: innerHeight }
}

export default function useWindowSize(props: IuseWindowResizeProps) {
 const { initialValue = 150 } = props
 const output$ = useObservable(
  (data) => data.pipe(switchMap(([timer]) => fromEvent(window, 'resize').pipe(debounceTime(timer), map(getWindowMetric)))),
  [initialValue],
 )

 return useObservableState(output$, () => ({
  width: window.innerWidth,
  height: window.innerHeight,
 }))
}
