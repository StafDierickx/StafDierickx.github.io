const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
    category: path.resolve(__dirname, "./src/category.js"),
    library: path.resolve(__dirname, "./src/library.js"),
    playlist: path.resolve(__dirname, "./src/playlist.js"),
    createPlaylist: path.resolve(__dirname, "./src/createPlaylist.js"),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};