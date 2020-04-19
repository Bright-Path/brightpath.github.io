const commonJS = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

module.exports = [
    {
        input: 'src/admin/netlifyCms.js',
        output: {
            file: 'dist/admin/netlifyCms.js',
            format: 'umd',
            globals: {
                'netlify-cms': 'CMS'
            }
        },
        plugins: [
            resolve({
                // pass custom options to the resolve plugin
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            commonJS({
                include: 'node_modules/**'
            }),
            terser()
        ]
    }
];
