import { ComponentMeta, ComponentStory } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import NavBar from './NavBar'

export default {
 title: 'Example/NavBar',
 component: NavBar,
 decorators: [withRouter],
 parameters: {
  reactRouter: {
   routePath: '/users/:userId',
   routeParams: { userId: '42' },
  },
 },
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = () => <NavBar />

export const Default = Template.bind({})
Default.args = {}
