const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  node: {
    __filename: false,
    __dirname: false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: [/node_modules/, path.resolve(__dirname, 'node_modules')],
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              quiet: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    historyApiFallback: true,
  }
};
