/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: [
        'prettier-plugin-tailwindcss',
        '@trivago/prettier-plugin-sort-imports',
    ],
    tabWidth: 4,
    semi: false,
    trailingComma: 'all',
    singleQuote: true,
}

export default config
