import { from, Observable } from 'rxjs'
import { CandleByTickerProps } from 'src/types/upbit/market'

export const upbitMarket: (text: string) => Observable<CandleByTickerProps[]> = (text: string) =>
 from<Promise<CandleByTickerProps[]>>(fetch(`https://api.upbit.com/v1/ticker?markets=${text}`, { mode: 'cors' }).then((t) => t.json()))

export type marketFetcher = typeof upbitMarket
