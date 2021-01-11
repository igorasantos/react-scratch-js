const webpack = require('webpack');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: "./src/index.js",
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin()
  ],
  resolve: { extensions: ['.js', '.jsx'] },
};
