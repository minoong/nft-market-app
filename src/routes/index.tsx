import { useRoutes } from 'react-router-dom'
import Button from '@components/Button'
import Layout from '@components/organisms/Layout'
import MarketMain from '@pages/market/Main'

export default function ThemeRoutes() {
 return useRoutes([
  {
   path: '/',
   element: <Layout />,
   children: [
    {
     path: '/market/:symbol',
     element: <MarketMain />,
    },
    {
     path: '/test',
     element: <Button />,
    },
   ],
  },
 ])
}
