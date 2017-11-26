const path = require('path')

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'main.bundle.js',
    path: __dirname + '/build'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      use: [{ loader: 'ts-loader' }]
    }]
  },
  plugins: [
    new DtsBundlePlugin()
  ]
}

function DtsBundlePlugin() { }
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function () {
    var dts = require('dts-bundle');

    dts.bundle({
      name: 'r-gitlab-api',
      main: './build/dist/index.d.ts',
      out: '../index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};

module.exports = config