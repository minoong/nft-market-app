import { marketFetcher } from '@features/upblit/market'
import { useAtomValue } from 'jotai'
import { useObservable, useObservableState } from 'observable-hooks'
import { catchError, distinctUntilChanged, map, of, repeat, startWith, switchMap, timer } from 'rxjs'
import { krwMarketAtom, searchAtom } from 'src/jotai/market/marketAtom'

function StateDefault() {
 return null
}

function StateLoading() {
 return <div className="notification is-primary has-text-centered">Searching...</div>
}

function StateError() {
 return <div className="notification is-danger has-text-centered">Failed fetching...</div>
}

export interface GridProps {
 fetchFunc: marketFetcher
}

function Grid(props: GridProps) {
 const { fetchFunc } = props
 const text = useAtomValue(searchAtom)
 const marketList = useAtomValue(krwMarketAtom)
  .map((value) => value.market)
  .slice(0, 5)
  .join(',')

 const status$ = useObservable(
  (inputs$) =>
   inputs$.pipe(
    distinctUntilChanged((a, b) => a[0] === b[0]),
    switchMap(([text, fetchFunc, marketList]) =>
     timer(0).pipe(
      repeat({ delay: 5000 }),
      map(() => {
       if (text === '') return marketList
       return 'KRW-XRP'
      }),
      switchMap((result) => fetchFunc(result)),
      map(() => {
       return <div>ok</div>
      }),
      catchError(() => of(<StateError />)),
      startWith(<StateLoading />),
     ),
    ),
   ),
  [text, fetchFunc, marketList],
 )
 return useObservableState(status$, () => <StateDefault />)
}

export default Grid
