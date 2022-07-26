import { atom } from 'jotai'

export interface Market {
 market: string
 korean_name: string
 english_name: string
}

export const marketAtom = atom<Market[]>([])
export const krwMarketAtom = atom((get) => get(marketAtom).filter((market) => market.market.startsWith('KRW-')))
export const searchAtom = atom<string>('')
export const selectSymbolAtom = atom<string>('KRW-BTC')
