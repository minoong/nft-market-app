import { useRoutes } from 'react-router-dom'
import Button from '@components/Button'
import Component from '@components/Component'
import Layout from '@components/organisms/Layout'

export default function ThemeRoutes() {
 return useRoutes([
  {
   path: '/',
   element: <Layout />,
   children: [
    {
     path: '/test',
     element: <Component />,
    },
    {
     path: '/button',
     element: <Button />,
    },
   ],
  },
 ])
}
