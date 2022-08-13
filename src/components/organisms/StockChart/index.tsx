/* eslint-disable import/no-cycle */
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DEFAULT_MARKET_SYMBOL } from '@constants/market'
import useElementSize from '@hooks/useElementSize'
import { Box } from '@mui/material'
import * as d3 from 'd3'
import * as _ from 'lodash'
import { ObservableResource, useObservableSuspense } from 'observable-hooks'
import { from, map, share, startWith, Subject, switchMap } from 'rxjs'

import Candle from './Candle'
import CrossHairs from './CrossHair'

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

fetchCandle(DEFAULT_MARKET_SYMBOL, new Date().toISOString())

function DataList() {
 const { symbol = DEFAULT_MARKET_SYMBOL } = useParams<{ symbol: string }>()
 const candle = useObservableSuspense(candleResource)
 const divRef = useRef<HTMLDivElement>(null)
 const ref = useRef<SVGSVGElement>(null)
 const [width] = useElementSize(divRef)
 const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({
  x: 0,
  y: 0,
 })

 useEffect(() => {
  // const focus = d3.select(ref.current).append('g').style('display', 'none')
  const max = d3.max(candle, (d) => {
   return d.high_price
  })
  const min = d3.min(candle, (d) => {
   return d.low_price
  })
  const yScale = d3.scaleLinear().domain([min!, max!]).range([345, 10]).nice()

  d3
   .select(ref.current)
   .call((g) => g.selectAll('g').remove())
   .append('g')
   .call(d3.axisRight(yScale).ticks(5))
   .attr('transform', `translate(${width - 50},10)`)
  const xScale = d3
   .scaleTime()
   .domain([new Date(candle[0].candle_date_time_kst), new Date(candle[candle.length - 1].candle_date_time_kst)])
   .nice()
   .range([0, width - 50])

  d3
   .select(ref.current)
   .append('g')
   .call(
    d3
     .axisBottom(xScale)
     .ticks(7)
     .tickFormat((d) => d3.timeFormat('%H:%M')(d as unknown as Date)),
   ) // Append it to svg
   .attr('transform', `translate(0,356)`)
 }, [candle, width])

 useEffect(() => {
  return () => {
   if (ref.current) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    d3.select(ref.current).call((g) => g.selectAll('line, rect').remove())
   }
  }
 }, [symbol, candle, width])

 useEffect(() => {
  fetchCandle(symbol, new Date().toISOString())
 }, [symbol])

 const xScale = d3
  .scaleTime()
  .domain([new Date(candle[0].candle_date_time_kst), new Date(candle[candle.length - 1].candle_date_time_kst)])
  .nice()
  .range([0, width - 50])

 const dollarHigh = d3.max(candle.map((bar) => bar.high_price))!
 const dollarLow = d3.min(candle.map((bar) => bar.low_price))!

 const chartDims = {
  pixelWidth: width - 50,
  pixelHeight: 335,
  dollarHigh,
  dollarLow,
  dollarDelta: dollarHigh - dollarLow,
 }

 const candleWidth = Math.floor(((width - 50) / candle.length) * 0.7)

 const pixelFor = (dollar: number) => {
  return Math.abs(((dollar - chartDims.dollarLow) / chartDims.dollarDelta) * chartDims.pixelHeight - chartDims.pixelHeight) + 20
 }

 const onMouseLeave = () => {
  setMouseCoords({
   x: 0,
   y: 0,
  })
 }

 const onMouseMoveInside = (e: React.MouseEvent) => {
  setMouseCoords({
   x: e.nativeEvent.x - e.currentTarget.getBoundingClientRect().left,
   y: e.nativeEvent.y - e.currentTarget.getBoundingClientRect().top,
  })
 }

 return (
  <Box ref={divRef} sx={{ height: '100vh' }}>
   <svg ref={ref} width={width} height={385} onMouseMove={onMouseMoveInside} onMouseLeave={onMouseLeave}>
    {candle.map((bar) => {
     const candleX = xScale(new Date(bar.candle_date_time_kst))
     return <Candle key={bar.candle_date_time_kst} data={bar} x={candleX} candleWidth={candleWidth} pixelFor={pixelFor} refEl={ref} />
    })}
    <CrossHairs x={mouseCoords.x} y={mouseCoords.y} pixelWidth={chartDims.pixelWidth} pixelHeight={chartDims.pixelHeight} refEl={ref} data={candle} />
   </svg>
  </Box>
 )
}

function StockChart() {
 return (
  <Box sx={{ padding: '1rem' }}>
   <Suspense fallback={<h1>Loading profile...</h1>}>
    <DataList />
   </Suspense>
  </Box>
 )
}

export default React.memo(StockChart)
