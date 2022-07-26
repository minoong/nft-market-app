/* eslint-disable camelcase */
import { marketFetcher } from '@features/upblit/market'
import { Avatar, Box, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { numberToHuman } from '@utils/index'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import * as _ from 'lodash'
import { useObservable, useObservableState } from 'observable-hooks'
import { catchError, distinctUntilChanged, forkJoin, map, of, repeat, startWith, switchMap, timer } from 'rxjs'
import { krwMarketAtom, Market, marketAtom, searchAtom, selectSymbolAtom } from 'src/jotai/market/marketAtom'
import { CandleByTickerProps } from 'src/types/upbit/market'

export type finishMarkets = Market & CandleByTickerProps

function StateDefault() {
 return null
}

function StateLoading() {
 return (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
   <CircularProgress />
  </Box>
 )
}

const changeClass = {
 RISE: 'error.main',
 EVEN: 'text.primary',
 FALL: 'info.main',
}

interface Column {
 id: keyof finishMarkets
 label: string
 minWidth?: number
 align?: 'right' | 'center' | 'left'
}

const columns: readonly Column[] = [
 { id: 'market', label: '한글명', minWidth: 100 },
 { id: 'trade_price', label: '현재가', minWidth: 100, align: 'right' },
 {
  id: 'signed_change_rate',
  label: '전일대비',
  minWidth: 90,
  align: 'right',
 },
 {
  id: 'acc_trade_price_24h',
  label: '거래대금',
  minWidth: 90,
  align: 'right',
 },
]

function StateGrid({ data }: { data: finishMarkets[] }) {
 const setSymbol = useUpdateAtom(selectSymbolAtom)
 return (
  <Box sx={{ flexGrow: 1, overflow: 'hidden', width: '100%', fontSize: '0.765rem' }}>
   <TableContainer sx={{ maxHeight: `calc(100vh - 120px)` }}>
    <Table size="small" stickyHeader aria-label="sticky table" sx={{ width: `calc(100% - 20px)` }}>
     <TableHead>
      <TableRow>
       {columns.map((column) => (
        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
         {column.label}
        </TableCell>
       ))}
      </TableRow>
     </TableHead>
     <TableBody>
      {data.map((coin) => (
       <TableRow hover role="checkbox" tabIndex={-1} key={coin.market} sx={{ verticalAlign: 'top' }} onClick={() => setSymbol(coin.market)}>
        {columns.map((column) => {
         let jsxEl = null
         if (column.id === 'market') {
          jsxEl = (
           <Stack direction="row" spacing={1}>
            <Avatar alt={coin.market.split('-')[1][0]} src={`/markets/${coin.market.split('-')[1]}.png`} sx={{ width: 24, height: 24 }} />
            <Stack>
             <Typography sx={{ fontSize: '0.565rem' }}>{coin.korean_name}</Typography>
             <Typography sx={{ fontSize: '0.125rem' }}>{coin.market.split('-')[1]}</Typography>
            </Stack>
           </Stack>
          )
         } else if (column.id === 'trade_price') {
          jsxEl = <Typography sx={{ color: changeClass[coin.change], fontSize: '0.765rem' }}>{coin.trade_price.toLocaleString()}</Typography>
         } else if (column.id === 'signed_change_rate') {
          jsxEl = (
           <>
            <Typography sx={{ color: changeClass[coin.change], fontSize: '0.765rem' }}>{(coin.signed_change_rate * 100).toFixed(2)}%</Typography>
            <Typography sx={{ color: changeClass[coin.change], fontSize: '0.765rem' }}>{coin.signed_change_price.toLocaleString()}</Typography>
           </>
          )
         } else if (column.id === 'acc_trade_price_24h') {
          jsxEl = <Typography sx={{ fontSize: '0.765rem' }}>{numberToHuman(coin.acc_trade_price_24h)}</Typography>
         }
         return (
          <TableCell key={column.id} align={column.align} sx={{ p: '3px' }}>
           {jsxEl}
          </TableCell>
         )
        })}
       </TableRow>
      ))}
     </TableBody>
    </Table>
   </TableContainer>
  </Box>
 )
}

function StateError() {
 return <div className="notification is-danger has-text-centered">Failed fetching...</div>
}

export interface GridProps {
 fetchFunc: marketFetcher
}

function MarketInfoGrid(props: GridProps) {
 const { fetchFunc } = props
 const text = useAtomValue(searchAtom)
 const market = useAtomValue(marketAtom)
 const marketList = useAtomValue(krwMarketAtom)
  .map((value) => value.market)
  .join(',')

 const status$ = useObservable(
  (inputs$) =>
   inputs$.pipe(
    distinctUntilChanged((a, b) => a[0] === b[0]),
    switchMap(([text, fetchFunc, marketList]) =>
     timer(650).pipe(
      repeat({ delay: 1000 * 60 }),
      map(() => {
       if (text === '') return marketList
       return 'KRW-XRP'
      }),
      switchMap((result) =>
       forkJoin({ candles: fetchFunc(result) }).pipe(
        map(({ candles }) => {
         const initialState: finishMarkets[] = []
         const result = _.reduce(
          candles,
          (acc, value) => {
           const attech = _.find(market, (base) => base.market === value.market)!
           const test = { ...value, ...attech }
           return [...acc, test]
          },
          initialState,
         )

         return result
        }),
       ),
      ),
      map((data) => {
       return <StateGrid data={data} />
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

export default MarketInfoGrid
