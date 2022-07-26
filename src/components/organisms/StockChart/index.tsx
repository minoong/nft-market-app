/* eslint-disable import/no-cycle */
import React, { Suspense, useEffect, useRef } from 'react'
import useElementSize from '@hooks/useElementSize'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import { useAtomValue } from 'jotai'
import * as _ from 'lodash'
import { ObservableResource, useObservableSuspense } from 'observable-hooks'
import { from, map, share, startWith, Subject, switchMap } from 'rxjs'
import { selectSymbolAtom } from 'src/jotai/market/marketAtom'

import Candle from './Candle'

export interface CandleProps {
 market: 'KRW-BTC'
 candle_date_time_utc: string
 candle_date_time_kst: string
 opening_price: number
 high_price: number
 low_price: number
 trade_price: number
 timestamp: number
 candle_acc_trade_price: number
 candle_acc_trade_volume: number
 unit: number
}

const fetchCandle$$ = new Subject<{ symbol: string; utcString: string }>()

const candleResource$$ = fetchCandle$$.pipe(
 switchMap(({ symbol, utcString }) =>
  from<Promise<CandleProps[]>>(
   fetch(`https://api.upbit.com/v1/candles/minutes/1?market=${symbol}&to=${utcString}&count=200`, { mode: 'cors' }).then((t) => t.json()),
  ).pipe(
   startWith(null),
   map((data) => {
    if (data) {
     return _.reverse(data)
    }
    return data
   }),
  ),
 ),
 share(),
)

const candleResource = new ObservableResource(candleResource$$, (value: CandleProps[] | null): value is CandleProps[] => !!value)

function fetchCandle(symbol: string, utcString: string) {
 fetchCandle$$.next({ symbol, utcString })
}

fetchCandle('KRW-BTC', new Date().toISOString())

function DataList() {
 const candle = useObservableSuspense(candleResource)
 const symbol = useAtomValue(selectSymbolAtom)
 const divRef = useRef<HTMLDivElement>(null)
 const ref = useRef<SVGSVGElement>(null)
 const [width, height] = useElementSize(divRef)

 useEffect(() => {
  return () => {
   if (ref.current) {
    d3.select(ref.current).call((g) => g.selectAll('line').remove())
    d3.select(ref.current).call((g) => g.selectAll('rect').remove())
   }
  }
 })

 useEffect(() => {
  fetchCandle(symbol, new Date().toISOString())
 }, [symbol])

 const xScale = d3
  .scaleTime()
  .domain([new Date(candle[0].candle_date_time_utc), new Date(candle[candle.length - 1].candle_date_time_utc)])
  .nice()
  .range([0, width])

 const dollarHigh = d3.max(candle.map((bar) => bar.high_price))!
 const dollarLow = d3.min(candle.map((bar) => bar.low_price))!

 const chartDims = {
  pixelWidth: width,
  pixelHeight: height,
  dollarHigh,
  dollarLow,
  dollarDelta: dollarHigh - dollarLow,
 }

 const candleWidth = Math.floor((width / candle.length) * 0.7)

 const pixelFor = (dollar: any) => {
  return Math.abs(((dollar - chartDims.dollarLow) / chartDims.dollarDelta) * chartDims.pixelHeight - chartDims.pixelHeight)
 }

 return (
  <Box ref={divRef} sx={{ height: '100vh' }}>
   <svg ref={ref} width={width} height={height}>
    {candle.map((bar, i) => {
     const candleX = xScale(new Date(bar.candle_date_time_utc))
     // eslint-disable-next-line react/no-array-index-key
     return <Candle key={`candle-${i}`} data={bar} x={candleX} candleWidth={candleWidth} pixelFor={pixelFor} refEl={ref} />
    })}
   </svg>
  </Box>
 )
}

function StockChart() {
 const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  fetchCandle(e.target.value, new Date().toISOString())
 }

 return (
  <Box>
   StockChart{' '}
   <select onChange={onChange}>
    <option value="KRW-BTC">비트코인</option>
    <option value="KRW-XRP">리플</option>
    <option value="KRW-ETH">이더리움</option>
   </select>
   <Suspense fallback={<h1>Loading profile...</h1>}>
    <DataList />
   </Suspense>
  </Box>
 )
}

export default StockChart
