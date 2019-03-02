const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  entry: {
    app: "./server.js",
  },
  output: {
    path: __dirname, // + "/build/"),
    filename: "bundle_back.js"
  },
  watch: true,
  externals: [nodeExternals()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8765,
    https: true
  },


  resolve: {
    alias: {
      'hiredis': path.join(__dirname, 'aliases/hiredis.js')
    }
  }

};
