import React from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ShowChartIcon from '@mui/icons-material/ShowChart'

type MenuInfoProps = {
 path: string
 menuName: string
 icon?: React.ReactNode
}

// eslint-disable-next-line import/prefer-default-export
export const MENU_INFO_LIST: MenuInfoProps[] = [
 { path: '/button', menuName: '원화마켓', icon: <ShowChartIcon /> },
 { path: '/test', menuName: '투자내역', icon: <AssessmentIcon /> },
]
