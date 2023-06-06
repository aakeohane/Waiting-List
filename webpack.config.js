module.exports = {
  entry: {
    app: ['./src/scripts/script.js', './src/scripts/firebase.js', './src/scripts/sortable.js' ]
  },
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
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