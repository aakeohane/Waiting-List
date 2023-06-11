const path = require('path')
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/scripts/script.js', './src/scripts/firebase.js', './src/scripts/sortable.js' ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html'
    })
 ],
  "module": { 
    "rules": [ { 
      "test": /\.css$/, 
      "use": [ "style-loader", "css-loader" ] 
    }, 
    { 
      "test": /\.js$/, 
      "exclude": /node_modules/, 
      "use": { 
        "loader": "babel-loader", 
        "options": { 
          "presets": [ "@babel/preset-env", ] 
        } 
      } 
    }, 
  ] }
}