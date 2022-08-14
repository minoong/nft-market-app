import { ComponentMeta, ComponentStory } from '@storybook/react'

import Button from '.'

export default {
 title: 'Example/Button',
 component: Button,
 argTypes: {
  backgroundColor: { control: 'color' },
 },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
 text: 'test',
}
