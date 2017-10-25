module.exports = {
  entry: './client/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js' // assumes your bundle.js will also be in the root of your project folder
  },
  devtool: 'source-map',
  // resolve: {
  //   extensions: ['.jsx', '.js']
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
        }
      },
      // use the style-loader/css-loader/sass-loader combos for anything matching the .scss extension
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
