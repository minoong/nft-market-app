import { useState } from 'react'
import { useQuery } from 'react-query'
import MarketInfoGrid from '@components/organisms/MarketInfoGrid'
import StockChart from '@components/organisms/StockChart'
import { upbitMarket } from '@features/upblit/market'
import { apiCall } from '@libs/api'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import { useObservable, useSubscription } from 'observable-hooks'
import { map, switchMap, timer } from 'rxjs'
import { krwMarketAtom, Market, marketAtom, searchAtom } from 'src/jotai/market/marketAtom'

export default function MarketMain() {
 const [input, setInput] = useState<string>('')
 const setMarket = useSetAtom(marketAtom)
 const setSearch = useSetAtom(searchAtom)
 const market = useAtomValue(krwMarketAtom)

 useQuery(['market'], () => apiCall<Market[]>({ url: 'https://api.upbit.com/v1/market/all', method: 'GET' }), {
  onSuccess({ data }) {
   setMarket(data)
  },
  enabled: !market.length,
 })

 const search$ = useObservable((inputs$) => inputs$.pipe(switchMap(([text]) => timer(750).pipe(map(() => text)))), [input])
 useSubscription(search$, setSearch)

 return (
  <Grid container spacing={2}>
   <Grid item xs={8}>
    <StockChart />
   </Grid>
   <Grid item xs={4}>
    <Box>
     <TextField
      fullWidth
      id="market-search"
      label="코인명/심볼검색"
      type="search"
      variant="standard"
      onChange={(e) => setInput(e.target.value)}
      InputProps={{
       endAdornment: (
        <InputAdornment position="end">
         <SearchIcon />
        </InputAdornment>
       ),
      }}
     />
     {market.length && <MarketInfoGrid fetchFunc={upbitMarket} />}
    </Box>
   </Grid>
  </Grid>
 )
}
