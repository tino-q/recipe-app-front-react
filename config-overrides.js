const { addWebpackAlias, override, useBabelRc } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        ['@components']: path.resolve(__dirname, './src/components'),
        ['@contexts']: path.resolve(__dirname, './src/contexts'),
        ['@helpers']: path.resolve(__dirname, './src/helpers'),
        ['@errors']: path.resolve(__dirname, './src/errors'),
        ['@hooks']: path.resolve(__dirname, './src/hooks'),
        ['@reducers']: path.resolve(__dirname, './src/reducers'),
        ['@services']: path.resolve(__dirname, './src/services'),
        ['@src']: path.resolve(__dirname, './src'),
        ['@env']: path.resolve(__dirname, './src/config/environment.js')
    }),
    useBabelRc()
)
