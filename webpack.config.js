var webpack = require("webpack");

function WebpackConfigBuilder() {
  this.publicPath = __dirname + '/dist';
  this.wwwPath = '/dist';
  this.bundlesDir = '/bundles';
}

WebpackConfigBuilder.prototype = {
  build: function() {
    return {
      node: {
        fs: "empty"
      },
      entry: {
        main: './src/index.ts'
      },
      output: {
        filename: '[name].js',
        path: this.publicPath + '/' + this.bundlesDir,
        publicPath: this.wwwPath + '/' + this.bundlesDir + '/'
      },
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      watchOptions: {
        poll: true
      },
      module: {
        loaders: [
          {
            test: /\.jpe?g$|\.gif$|\.png$/i,
            loader: "file"
          },
          {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: [
              /\.(spec|e2e)\.ts$/,
              /node_modules\/(?!(ng2-.+))/
            ]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
          },
          {
            test: /\.pug$/,
            loaders: ['pug-loader']
          },
          {
            test: /\.less$/,
            loaders: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'less-loader'
            ]
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          Promise: 'bluebird'
        })
      ]
    }
  }
};

module.exports = (new WebpackConfigBuilder()).build();