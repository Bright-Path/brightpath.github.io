const babel = require('rollup-plugin-babel');
const multi = require('@rollup/plugin-multi-entry');
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonJS = require('@rollup/plugin-commonjs');
const fileSize = require('rollup-plugin-filesize');

// The first input is now an ephemeral placeholder that gets prorperly transpiled
module.exports = [
    {
        input: {
            include: [
                'src/partials/**/*.js',
                'src/scripts/**/*.js'
            ]
        },
        output: {
            file: 'dist/assets/js/bpb-temp.js',
            format: 'umd',
            name: 'bpb'
        },
        plugins: [
            resolve(),
            commonJS(),
            multi(),
            babel({
                exclude: 'node_modules/**'
            })
        ]
    },
    {
        input: 'dist/assets/js/bpb-temp.js',
        output: {
            file: 'dist/assets/js/brightpath.js',
            format: 'umd',
            name: 'bpb'
        },
        plugins: [
            resolve(),
            commonJS(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser(),
            fileSize()
        ]
    }
];
