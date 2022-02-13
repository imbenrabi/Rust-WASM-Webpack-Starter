const path = require ('path');
const WasmPackPlugin = require ('@wasm-tool/wasm-pack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
  // TODO - mode via ENV
  mode: 'development',
  entry: './ts/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve (__dirname, 'dist'),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', 'wasm'],
  },
  plugins: [
    new WasmPackPlugin ({
      crateDirectory: __dirname, // Define where the root of the rust code is located (where the cargo.toml file is located)
    }),
    new HtmlWebpackPlugin (),
  ],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {
        test: /\.wasm$/,
        type: 'webassembly/sync',
      },
    ],
  },
  experiments: {
    syncWebAssembly: true,
  },
  devServer: {
    static: {
      directory: path.join (__dirname, 'public'),
    },
  },
};
