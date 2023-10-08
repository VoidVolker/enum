import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    input: 'src/enum.js',
    output: {
        file: 'dist/enum.bundle.js',
        format: 'es',
        sourcemap: true
    },
    // Fix rewriting of .call(this) to .call(undefined)
    context: 'this',
    plugins: [
        // https://github.com/rollup/plugins/tree/master/packages/node-resolve
        // Plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules
        nodeResolve()
    ]
}
