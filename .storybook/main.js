const path = require('path')
const tsconfigPaths = require('vite-tsconfig-paths').default

module.exports = {
 stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
 addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-addon-react-router-v6'],
 framework: '@storybook/react',
 core: {
  builder: '@storybook/builder-vite',
 },
 features: {
  storyStoreV7: true,
 },
 viteFinal: async (config) => {
  config.plugins.push(
   tsconfigPaths({
    projects: [path.resolve(path.dirname(__dirname), '.', 'tsconfig.json')],
   }),
  )

  return config
 },
}
